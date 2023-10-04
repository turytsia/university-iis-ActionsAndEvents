/**
 * This file contains class that implements user controller.
 *
 * @author Oleksandr Turytsia (xturyt00)
 */
package com.project.actionsandevents.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService service;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
  
    @PostMapping("/register")
    public String register(@RequestBody User userInfo) {
        return service.addUser(userInfo);
    }
    
    @GetMapping("/user/profile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile(Authentication authentication) {
        
        return "Welcome to User Profile";
    }
  
    @GetMapping("/admin/profile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminProfile(Authentication authentication) {
        return "Welcome to Admin Profile";
    }
  
    @PostMapping("/login")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getLogin(), authRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                return jwtService.generateToken(authRequest.getLogin());
            } else {
                throw new UsernameNotFoundException("Authentication failed for an unknown reason.");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new UsernameNotFoundException("Authentication failed: " + ex.getMessage(), ex);
        }

    }
}

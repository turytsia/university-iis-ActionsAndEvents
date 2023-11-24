package com.project.actionsandevents.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.actionsandevents.User.AuthRequest;
import com.project.actionsandevents.User.JwtService;
import com.project.actionsandevents.User.User;
import com.project.actionsandevents.User.UserService;
import com.project.actionsandevents.User.exceptions.DuplicateUserException;
import com.project.actionsandevents.User.responses.UserPostResponse;
import com.project.actionsandevents.common.ResponseMessage;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService service;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
  
    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody User userInfo, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new UserPostResponse(null,
                    "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        try {
            Long userId = service.addUser(userInfo);
            return ResponseEntity.ok(
                new UserPostResponse(userId,
                        "User was successfully registered", ResponseMessage.Status.SUCCESS));
        } catch (DuplicateUserException ex) {
            return ResponseEntity.badRequest().body(new UserPostResponse(null,
                    "User with such parameters already exists", ResponseMessage.Status.ERROR));
        }
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

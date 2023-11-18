/**
 * This file contains class that implements user controller.
 *
 * @author Oleksandr Turytsia (xturyt00)
 */
package com.project.actionsandevents.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.project.actionsandevents.User.exceptions.UserNotFoundException;
import com.project.actionsandevents.User.requests.UserPatchRequest;
import com.project.actionsandevents.User.responses.UserResponse;
import com.project.actionsandevents.User.responses.UsersResponse;
import com.project.actionsandevents.common.ResponseMessage;
import com.project.actionsandevents.common.ResponseMessage.Status;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getUser(Authentication authentication) throws UserNotFoundException {
        User user = null;

        if (authentication != null) {
            // Get the authenticated user's details from the Authentication object
            UserInfoDetails userInfoDetails = (UserInfoDetails) authentication.getPrincipal();
            user = userService.getUserById(userInfoDetails.getId());
        }

        if (user == null) {
            return ResponseEntity.status(403).body(new ResponseMessage("Unauthorized", Status.ERROR));
        }

        return ResponseEntity.ok(new UserResponse(user));
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getUserById(@PathVariable Long id, Authentication authentication) throws UserNotFoundException {
        User user = userService.getUserById(id);

        return ResponseEntity.ok(new UserResponse(user));
    }

    @PatchMapping("/user/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> patchUserById(
            @PathVariable Long id,
            @Valid @RequestBody UserPatchRequest patchRequest,
            BindingResult bindingResult,
            Authentication authentication) throws UserNotFoundException {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                    "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        userService.patchUserById(id, patchRequest);

        return ResponseEntity.ok(new ResponseMessage("User was successfully updated", ResponseMessage.Status.SUCCESS));
    }
    
    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> getUserIds(Authentication authentication) {
        return ResponseEntity.ok(new UsersResponse(userService.getUserIds()));
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id, Authentication authentication) throws UserNotFoundException {
        userService.deleteUserById(id);

        // TODO add log to db

        return ResponseEntity.ok(new ResponseMessage("User was successfully removed", ResponseMessage.Status.SUCCESS));
    }

}

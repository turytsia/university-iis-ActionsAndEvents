package com.project.actionsandevents.User.responses;

import com.project.actionsandevents.User.User;
import com.project.actionsandevents.common.ResponseMessage;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserPostResponse {
    // private Long id;

    // private String email;

    // private String login;
    // private String firstname;
    // private String lastname;
    // private String phone;
    // private String role;
    private Long userId;
    private ResponseMessage message;

    // public UserPostResponse(User user, String message, ResponseMessage.Status status) {
    //     this.id = user.getId();
    //     this.email = user.getEmail();
    //     this.login = user.getLogin();
    //     this.firstname = user.getFirstname();
    //     this.lastname = user.getLastname();
    //     this.phone = user.getPhone();
    //     this.role = user.getRoles();
    //     this.message = new ResponseMessage(message, status);
    // }

    public UserPostResponse(Long id, String message, ResponseMessage.Status status) {
        this.userId = id;
        this.message = new ResponseMessage(message, status);
    }
}

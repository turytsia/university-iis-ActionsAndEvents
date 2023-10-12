package com.project.actionsandevents.User.responses;

import com.project.actionsandevents.User.User;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserResponse {
    private Long id;
    private String email;
    private String login;
    private String name;
    private String surname;
    private String phone;

    public UserResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.login = user.getLogin();
        this.name = user.getFirstname();
        this.surname = user.getLastname();
        this.phone = user.getPhone();
    }
}

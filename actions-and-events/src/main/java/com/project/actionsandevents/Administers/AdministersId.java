package com.project.actionsandevents.Administers;

import java.io.Serializable;

import com.project.actionsandevents.User.User;

public class AdministersId implements Serializable {
    private User admin;
    private User user;

    public AdministersId(User admin, User user) {
        this.admin = admin;
        this.user = user;
    }
}
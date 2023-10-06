package com.project.actionsandevents.User;

import java.io.Serializable;

public class AdministersId implements Serializable {
    private User admin;
    private User user;

    public AdministersId(User admin, User user) {
        this.admin = admin;
        this.user = user;
    }
}
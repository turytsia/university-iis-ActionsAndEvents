package com.project.actionsandevents.Event;

import java.io.Serializable;

import com.project.actionsandevents.User.User;

public class RegistersId implements Serializable {
    private User user;
    private Event event;

    public RegistersId(User user, Event event) {
        this.user = user;
        this.event = event;
    }
}
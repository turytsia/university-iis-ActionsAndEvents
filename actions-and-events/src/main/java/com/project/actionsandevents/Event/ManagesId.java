package com.project.actionsandevents.Event;

import java.io.Serializable;

import com.project.actionsandevents.User.User;

public class ManagesId implements Serializable {
    private User manager;
    private Event event;

    public ManagesId(User manager, Event event) {
        this.manager = manager;
        this.event = event;
    }
}
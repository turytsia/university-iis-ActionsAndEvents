package com.project.actionsandevents.Event;

import java.io.Serializable;

import com.project.actionsandevents.User.User;

public class CommentsId implements Serializable{
    private User user;
    private Event event;

    public CommentsId(User user, Event event) {
        this.user = user;
        this.event = event;
    }
}

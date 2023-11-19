package com.project.actionsandevents.Event.responses;

import java.util.Date;

import com.project.actionsandevents.Event.Comment;
import com.project.actionsandevents.Event.Event;
import com.project.actionsandevents.User.User;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentResponse {
    private Long id;
    private User user;
    private Event event;
    private Date date;
    private int rating;
    private String text;

    public CommentResponse(Comment comments) {
        this.id = comments.getId();
        this.user = comments.getUser();
        this.event = comments.getEvent();
        this.date = comments.getDate();
        this.rating = comments.getRating();
        this.text = comments.getText();
    }
}

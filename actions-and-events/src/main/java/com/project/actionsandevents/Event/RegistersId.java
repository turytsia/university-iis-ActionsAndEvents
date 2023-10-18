package com.project.actionsandevents.Event;

import java.io.Serializable;

import com.project.actionsandevents.User.User;
import com.project.actionsandevents.TicketType.TicketType;

public class RegistersId implements Serializable {
    private User user;
    private TicketType ticketType;

    public RegistersId(User user, TicketType ticketType) {
        this.user = user;
        this.ticketType = ticketType;
    }
}
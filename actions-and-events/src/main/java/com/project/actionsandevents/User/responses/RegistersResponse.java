package com.project.actionsandevents.User.responses;

import java.util.Date;

import com.project.actionsandevents.Event.Registers;
import com.project.actionsandevents.Event.RegistersStatus;
import com.project.actionsandevents.TicketType.TicketType;
import com.project.actionsandevents.User.User;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegistersResponse {
    private RegistersStatus status;
    private Date date;
    private Long ticketId;
    private Long userId;

    public RegistersResponse(Registers registers) {
        this.status = registers.getStatus();
        this.date = registers.getDate();
        this.ticketId = registers.getTicketType().getId();
        this.userId = registers.getUser().getId();
    }
}

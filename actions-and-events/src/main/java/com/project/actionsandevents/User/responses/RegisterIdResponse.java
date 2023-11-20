package com.project.actionsandevents.User.responses;

import com.project.actionsandevents.Event.RegistersId;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterIdResponse {
    private Long userId;
    private Long ticketId;

    public RegisterIdResponse(RegistersId registersId) {
        this.userId = registersId.getUser().getId();
        this.ticketId = registersId.getTicketType().getId();
    }
}

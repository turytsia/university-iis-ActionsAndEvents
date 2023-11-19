package com.project.actionsandevents.Event.responses;

import com.project.actionsandevents.Event.Event;
import com.project.actionsandevents.TicketType.TicketType;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TicketResponse {
    private Long id;
    private String name;
    private Long capacity;
    private String description;
    private Long event;
    private Float price;
    
    public TicketResponse(TicketType ticketType) {
        this.id = ticketType.getId();
        this.name = ticketType.getName();
        this.capacity = ticketType.getCapacity();
        this.description = ticketType.getDescription();
        this.price = ticketType.getPrice();
        this.event = ticketType.getEvent().getId();
    }
}

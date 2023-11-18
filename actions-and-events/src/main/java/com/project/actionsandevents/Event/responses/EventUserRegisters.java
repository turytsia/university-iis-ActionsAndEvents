package com.project.actionsandevents.Event.responses;

import lombok.Getter;
import lombok.Setter;

import com.project.actionsandevents.Event.RegistersStatus;

@Setter
@Getter
public class EventUserRegisters {
    private Long users;
    private RegistersStatus status;

    public EventUserRegisters(Long ids, RegistersStatus status) {
        this.users = ids;
        this.status = status;
    }
}

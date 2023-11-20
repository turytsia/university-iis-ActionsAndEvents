package com.project.actionsandevents.User.responses;

import java.util.List;

import com.project.actionsandevents.Event.Registers;
import com.project.actionsandevents.Event.RegistersId;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegistersListResponse {
    private List<RegistersId> registers;

    public RegistersListResponse(List<RegistersId> registers) {
        this.registers = registers;
    }
}

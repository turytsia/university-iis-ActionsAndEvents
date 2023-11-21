package com.project.actionsandevents.Event.responses;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.project.actionsandevents.Event.RegistersId;

@Setter
@Getter
public class RegistersIdsResponse {
    private List<RegistersId> ids;

    public RegistersIdsResponse(List<RegistersId> ids) {
        this.ids = ids;
    }
}

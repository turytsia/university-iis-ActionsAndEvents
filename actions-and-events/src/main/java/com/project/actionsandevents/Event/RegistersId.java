package com.project.actionsandevents.Event;

import java.io.Serializable;

import com.project.actionsandevents.User.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

import com.project.actionsandevents.TicketType.TicketType;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegistersId implements Serializable {
    // private User user;
    // private TicketType ticketType;

    private Long userId;
    private Long ticketTypeId;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        RegistersId that = (RegistersId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(ticketTypeId, that.ticketTypeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, ticketTypeId);
    }
}
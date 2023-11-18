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
    private User user;
    private TicketType ticketType;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        RegistersId that = (RegistersId) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(ticketType, that.ticketType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, ticketType);
    }
}
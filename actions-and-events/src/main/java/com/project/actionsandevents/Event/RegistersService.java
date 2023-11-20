package com.project.actionsandevents.Event;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import com.project.actionsandevents.Event.exceptions.TicketNotFoundException;
import com.project.actionsandevents.TicketType.TicketType;
import com.project.actionsandevents.TicketType.TicketTypeRepository;
import com.project.actionsandevents.User.User;
import com.project.actionsandevents.User.UserRepository;
import com.project.actionsandevents.User.UserService;
import com.project.actionsandevents.User.exceptions.UserNotFoundException;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
public class RegistersService {
    @Autowired
    private RegistersRepository registersRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    public RegistersId getId(Long userId, Long ticketId) throws UserNotFoundException, TicketNotFoundException {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found with id: " + userId);
        }

        Optional<TicketType> ticket = ticketTypeRepository.findById(ticketId);
        if (!user.isPresent()) {
            throw new TicketNotFoundException("Ticket not found with id: " + ticketId);
        }
 
        return new RegistersId(user.get(), ticket.get());
    }
}

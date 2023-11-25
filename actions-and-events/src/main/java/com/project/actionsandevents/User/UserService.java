/**
 * This file contains class that implements user services.
 *
 * @author Oleksandr Turytsia (xturyt00)
 */
package com.project.actionsandevents.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.actionsandevents.Event.Event;
import com.project.actionsandevents.Event.EventRepository;
import com.project.actionsandevents.Event.Registers;
import com.project.actionsandevents.Event.RegistersRepository;
import com.project.actionsandevents.TicketType.TicketType;
import com.project.actionsandevents.TicketType.TicketTypeRepository;
import com.project.actionsandevents.User.exceptions.UserNotFoundException;
import com.project.actionsandevents.User.exceptions.DuplicateUserException;
import com.project.actionsandevents.User.requests.UserPatchRequest;


import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    @Autowired
    private RegistersRepository registersRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<User> userDetail = repository.findByLogin(login);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + login));
    }

    /**
     * Insert user to a database and hash his password
     * 
     * @param user User
     * @return Message
     */
    public Long addUser(User user) throws DuplicateUserException {
    try {
        user.setPassword(encoder.encode(user.getPassword()));
        return repository.save(user).getId();
    } catch (DataIntegrityViolationException e) {
        // Handle the exception here. For example, you might want to log the error and throw a custom exception.
        throw new DuplicateUserException("A user with this email or username already exists.");
    }
}

    /**
     * TODO
     * @param id
     * @return
     * @throws UserNotFoundException
     */
    public User getUserById(Long id) throws UserNotFoundException {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }

        return user.get();
    }
    
    /**
     * TODO
     * @param id
     * @throws UserNotFoundException
     */
    public void deleteUserById(Long id) throws UserNotFoundException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new UserNotFoundException("User with ID " + id + " not found");
        }
    }

    /**
     * TODO
     * @param id
     * @param patchRequest
     * @return
     * @throws UserNotFoundException
     */
    public void patchUserById(Long id, UserPatchRequest patchRequest) 
        throws UserNotFoundException, DuplicateUserException
    {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }

        User existingUser = user.get();

        if (patchRequest.getEmail() != null) {
            existingUser.setEmail(patchRequest.getEmail());
        }

        if (patchRequest.getFirstname() != null) {
            existingUser.setFirstname(patchRequest.getFirstname());
        }

        if (patchRequest.getLastname() != null) {
            existingUser.setLastname(patchRequest.getLastname());
        }

        if (patchRequest.getPhone() != null) {
            existingUser.setPhone(patchRequest.getPhone());
        }

        try {
            repository.save(existingUser);
        } catch (DataIntegrityViolationException e) {
            // Handle the exception here. For example, you might want to log the error and throw a custom exception.
            throw new DuplicateUserException("A user with this email or username already exists.");
        }
    }

    /**
     * TODO
     * @return
     */
    public List<Long> getUserIds() {
        return repository.findAllIds();
    }


    public List<Long> getUserEvents(Long id) throws UserNotFoundException {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }

        return eventRepository.findAllByAuthor(user.get()).stream().map(Event::getId).collect(Collectors.toList());
    }

    public List<Long> getUserTickets(Long id) throws UserNotFoundException {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }

        return ticketTypeRepository
                .findAllIdsByUser(user.get()).stream()
                .map(_id -> ticketTypeRepository.findById(_id).orElse(null)) // Assuming findById returns an
                // Optional<TicketType>
                .filter(Objects::nonNull)
                .map(TicketType::getId).collect(Collectors.toList());
    }

    public Registers getUserTicketRegistration(Long id, Long ticketId) throws UserNotFoundException {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }

        Optional<TicketType> ticketType = ticketTypeRepository.findById(ticketId);

        if (!ticketType.isPresent()) {
            throw new UserNotFoundException("Ticket not found with ID: " + ticketType);
        }

        Optional<Registers> registers = registersRepository.findByUserAndTicketType(user.get(), ticketType.get());

        return registers.get();
    }
}

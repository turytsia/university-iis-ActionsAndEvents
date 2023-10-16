/**
 * This file contains class that implements user services.
 *
 * @author Vadim Goncearenco (xgonce00)
 */
package com.project.actionsandevents.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.actionsandevents.Event.exceptions.EventNotFoundException;
import com.project.actionsandevents.Event.exceptions.TicketNotFoundException;
import com.project.actionsandevents.Event.requests.EventPatchRequest;
import com.project.actionsandevents.TicketType.TicketType;
import com.project.actionsandevents.TicketType.TicketTypeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    
    @Autowired
    private EventRepository repository;

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    /**
     * TODO
     * @param id
     * @return
     * @throws EventNotFoundException
     */
    public Event getEventById(Long id) throws EventNotFoundException {
        Optional<Event> event = repository.findById(id);

        if (!event.isPresent()) {
            throw new EventNotFoundException("Event not found with id: " + id);
        }

        return event.get();
    }

    /**
     * TODO
     * @return
     */
    public List<Long> getEventIds() {
        return repository.findAllIds();
    }

    /**
     * TODO
     * @param id
     * @param patchRequest
     * @throws EventNotFoundException
     */
    public void patchEventById(Long id, EventPatchRequest patchRequest) throws EventNotFoundException {
        Optional<Event> event = repository.findById(id);

        if (!event.isPresent()) {
            throw new EventNotFoundException("Event not found with ID: " + id);
        }

        Event eventToPatch = event.get();

        if (patchRequest.getTitle() != null) {
            eventToPatch.setTitle(patchRequest.getTitle());
        }

        if (patchRequest.getDescription() != null) {
            eventToPatch.setDescription(patchRequest.getDescription());
        }

        if (patchRequest.getDateFrom() != null) {
            eventToPatch.setDateFrom(patchRequest.getDateFrom());
        }

        if (patchRequest.getDateTo() != null) {
            eventToPatch.setDateTo(patchRequest.getDateTo());
        }

        if (patchRequest.getIcon() != null) {
            eventToPatch.setIcon(patchRequest.getIcon());
        }

        if (patchRequest.getImage() != null) {
            eventToPatch.setImage(patchRequest.getImage());
        }

        // if (patchRequest.getStatus() != null) {
        //     eventToPatch.setStatus(patchRequest.getStatus());
        // }

        repository.save(eventToPatch);
    }

    /**
     * TODO
     * @param event
     * @return
     */
    public Long addEvent(Event event) {
        return repository.save(event).getId();
    }

    /**
     * TODO
     * @param id
     * @throws EventNotFoundException
     */
    public void deleteEventById(Long id) throws EventNotFoundException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new EventNotFoundException("Event with ID " + id + " not found");
        }
    }

    // get all ticket types
    public List<TicketType> getTicketTypes(Long id) throws EventNotFoundException {
        Optional<Event> event = repository.findById(id);

        if (!event.isPresent()) {
            throw new EventNotFoundException("Event not found with id: " + id);
        }

        return ticketTypeRepository.findByEvent(id);
    }

    // TODO: Also need event id? Why?
    public TicketType getTicketTypeById(Long id) throws EventNotFoundException {
        Optional<TicketType> ticketType = ticketTypeRepository.findById(id);

        if (!ticketType.isPresent()) {
            throw new EventNotFoundException("Ticket type not found with id: " + id);
        }

        return ticketType.get();
    }

    public String addTicketType(Long id, TicketType ticketType) throws EventNotFoundException {
        Optional<Event> event = repository.findById(id);

        if (!event.isPresent()) {
            throw new EventNotFoundException("Event not found with id: " + id);
        }

        ticketType.setEvent(event.get());
        ticketTypeRepository.save(ticketType);

        return "Ticket type was successfully added";
    }

    public String patchTicketTypeById(Long id, TicketType ticketType) throws TicketNotFoundException {
        Optional<TicketType> ticketTypeToPatch = ticketTypeRepository.findById(id);

        if (!ticketTypeToPatch.isPresent()) {
            throw new TicketNotFoundException("Ticket type not found with id: " + id);
        }

        if (ticketType.getName() != null) {
            ticketTypeToPatch.get().setName(ticketType.getName());
        }

        if (ticketType.getPrice() != null) {
            ticketTypeToPatch.get().setPrice(ticketType.getPrice());
        }

        if (ticketType.getCapacity() != null) {
            ticketTypeToPatch.get().setCapacity(ticketType.getCapacity());
        }

        if (ticketType.getDescription() != null) {
            ticketTypeToPatch.get().setDescription(ticketType.getDescription());
        }

        ticketTypeRepository.save(ticketTypeToPatch.get());

        return "Ticket type was successfully updated";
    }


}

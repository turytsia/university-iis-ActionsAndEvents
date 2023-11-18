/**
 * This file contains class that implements user controller.
 *
 * @author Vadim Goncearenco (xgonce00)
 */
package com.project.actionsandevents.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.project.actionsandevents.Event.exceptions.EventLogNotFoundException;
import com.project.actionsandevents.Event.exceptions.EventNotFoundException;
import com.project.actionsandevents.Event.exceptions.TicketNotFoundException;
import com.project.actionsandevents.Event.exceptions.UserNotRegisteredException;

import com.project.actionsandevents.Event.requests.EventPatchRequest;

import com.project.actionsandevents.Event.responses.EventResponse;
import com.project.actionsandevents.Event.responses.EventsResponse;
import com.project.actionsandevents.Event.responses.TicketsResponse;
import com.project.actionsandevents.Event.responses.UsersRegisteredToEventResponse;
import com.project.actionsandevents.Event.responses.EventPostResponse;

import com.project.actionsandevents.User.UserInfoDetails;
import com.project.actionsandevents.User.exceptions.UserNotFoundException;
import com.project.actionsandevents.User.UserService;
import com.project.actionsandevents.User.User;

import com.project.actionsandevents.TicketType.TicketType;

import com.project.actionsandevents.common.ResponseMessage;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class EventController {
    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @GetMapping("/event/{id}")
    public ResponseEntity<Object> getEventById(@PathVariable Long id, Authentication authentication) throws EventNotFoundException {

        return ResponseEntity.ok(
            new EventResponse(eventService.getEventById(id), 
            eventService.getEventCategories(id)));
    }

    @GetMapping("/events")
    public ResponseEntity<Object> getEventIds() {
        return ResponseEntity.ok(new EventsResponse(eventService.getEventIds()));
    }

    @PatchMapping("/event/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> patchEventById(
            @PathVariable Long id,
            @Valid @RequestBody EventPatchRequest patchRequest,
            BindingResult bindingResult,
            Authentication authentication) throws EventNotFoundException {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                    "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        eventService.patchEventById(id, patchRequest);

        return ResponseEntity.ok(new ResponseMessage("Event was successfully updated", ResponseMessage.Status.SUCCESS));
    }

    @PostMapping("/event")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> addEvent(
            @Valid @RequestBody Event event,
            BindingResult bindingResult,
            Authentication authentication) throws UserNotFoundException
    {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new EventPostResponse(null,
                    "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        UserInfoDetails userDetails = (UserInfoDetails) authentication.getPrincipal();
        
        User author = userService.getUserById(userDetails.getId());
        event.setAuthor(author);
        
        return ResponseEntity.ok(
            new EventPostResponse(eventService.addEvent(event), 
            "Event was successfully added", ResponseMessage.Status.SUCCESS));
    }

    private boolean hasElevatedPrivileges(Authentication authentication) {

        for (GrantedAuthority auth : authentication.getAuthorities()) {
            if (auth.getAuthority().equals("ROLE_ADMIN") || 
                    auth.getAuthority().equals("ROLE_MANAGER")) {
                    
                System.out.println("***************hasElevatedPrivileges: " + auth.getAuthority());
                
                return true;
            }
        }

        System.out.println("***************DOESN't have elevated");

        return false;
    }

    private boolean hasPrivilegesOnEvent(Authentication authentication, Event event) {
        // Among users only author of the event can modify it or its tickets

        // if (!(authentication.getDetails() instanceof UserInfoDetails)) {
        //     System.out.println("***************Is not instance of UserInfoDetails");
        //     return false;
        // }

        UserInfoDetails userDetails = (UserInfoDetails) authentication.getPrincipal();
        System.out.println("***************Casted");

        boolean isAuthor = userDetails.getId() == event.getAuthor().getId();
        if (isAuthor) {
            System.out.println("***************isAuthor: " + userDetails.getId() + " " + event.getAuthor().getId());
        }
        return isAuthor || hasElevatedPrivileges(authentication);
    }



    @DeleteMapping("/event/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> deleteEvent(@PathVariable Long id, Authentication authentication) throws EventNotFoundException {
        
        System.out.println("***************DELETE EVENT");
        if (!hasPrivilegesOnEvent(authentication, eventService.getEventById(id))) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                    "You are not allowed to delete this event", ResponseMessage.Status.ERROR));
        }

        eventService.deleteEventById(id);

        return ResponseEntity.ok(new ResponseMessage("Event was successfully removed", ResponseMessage.Status.SUCCESS));
    }

    @GetMapping("/event/{id}/tickets")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getEventTickets(@PathVariable Long id, Authentication authentication) throws EventNotFoundException {
        return ResponseEntity.ok(new TicketsResponse(eventService.getTicketTypeIds(id)));
    }

    @GetMapping("/event/ticket/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getTicketById(@PathVariable Long id, Authentication authentication) throws TicketNotFoundException {
        return ResponseEntity.ok(eventService.getTicketTypeById(id));
    }

    @PostMapping("/event/{id}/ticket")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> addEventTicket(
            @PathVariable Long id,
            @Valid @RequestBody TicketType ticketType,
            BindingResult bindingResult,
            Authentication authentication) throws EventNotFoundException {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                    "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        return ResponseEntity.ok(new ResponseMessage(eventService.addTicketType(id, ticketType), ResponseMessage.Status.SUCCESS));
    }

   
    @PatchMapping("/event/ticket/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> patchTicketById(
            @PathVariable Long id,
            @Valid @RequestBody TicketType ticketType,
            BindingResult bindingResult,
            Authentication authentication) throws TicketNotFoundException {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                    "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        if (!hasPrivilegesOnEvent(authentication, eventService.getTicketTypeById(id).getEvent())) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                    "You are not allowed to patch this ticket", ResponseMessage.Status.ERROR));
        }

        return ResponseEntity.ok(new ResponseMessage(eventService.patchTicketTypeById(id, ticketType), ResponseMessage.Status.SUCCESS));
    }

    @DeleteMapping("/event/ticket/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> deleteTicket(@PathVariable Long id, Authentication authentication) throws TicketNotFoundException {
        
        if (!hasPrivilegesOnEvent(authentication, eventService.getTicketTypeById(id).getEvent())) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                    "You are not allowed to delete this ticket", ResponseMessage.Status.ERROR));
        }
        
        eventService.deleteTicketTypeById(id);

        return ResponseEntity.ok(new ResponseMessage("Ticket type was successfully removed", ResponseMessage.Status.SUCCESS));
    }

    @GetMapping("/event/ticket/{id}/register/{userId}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> registerUserForTicketType(
        @PathVariable Long id, 
        @PathVariable Long userId, 
        Authentication authentication) 
        throws TicketNotFoundException, UserNotFoundException 
    {
        return ResponseEntity.ok(
            new ResponseMessage(eventService.registerUserForTicketType(id, userId), 
            ResponseMessage.Status.SUCCESS)
        );
    }

    @GetMapping("/event/{id}/users")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getRegisteredUsersByEventId(
        @PathVariable Long id, Authentication authentication) throws EventNotFoundException {

        return ResponseEntity.ok(
            new UsersRegisteredToEventResponse(eventService.getRegisteredUsersByEventId(id))
        );
    }

    @GetMapping("/event/{id}/user/{userId}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getRegisteredUserById(
        @PathVariable Long id, @PathVariable Long userId, Authentication authentication) 
            throws EventNotFoundException, UserNotFoundException, UserNotRegisteredException {
        return ResponseEntity.ok(eventService.getRegisteredUserById(id, userId));
    }

    @DeleteMapping("/event/{id}/user/{userId}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> unregisterUserFromEvent(
        @PathVariable Long id, @PathVariable Long userId, Authentication authentication) 
            throws EventNotFoundException, UserNotFoundException, UserNotRegisteredException {

        if (!hasPrivilegesOnEvent(authentication, eventService.getEventById(id))) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                "You are not allowed to unregister this user", ResponseMessage.Status.ERROR));
        }
        
        return ResponseEntity.ok(eventService.unregisterUserFromEvent(id, userId));
    }

    @PostMapping("/event/{id}/approve")
    @PreAuthorize("hasAnyAuthority('ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> approveEvent(
            @PathVariable Long id,
            Authentication authentication) throws EventNotFoundException {
            
        return ResponseEntity.ok(new ResponseMessage(eventService.approveEvent(id), ResponseMessage.Status.SUCCESS));
    }

    @GetMapping("/event/{id}/logs")
    @PreAuthorize("hasAnyAuthority('ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getEventLogs(@PathVariable Long id, Authentication authentication) 
            throws EventNotFoundException {
        return ResponseEntity.ok(eventService.getEventLogs(id));
    }

    @GetMapping("/event/log/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getEventLogById(
        @PathVariable Long id, Authentication authentication) 
            throws EventLogNotFoundException {
        return ResponseEntity.ok(eventService.getEventLogById(id));
    }

    @DeleteMapping("/event/log/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> deleteEventLogById(
        @PathVariable Long id, Authentication authentication) 
            throws EventLogNotFoundException {
        return ResponseEntity.ok(new ResponseMessage(eventService.deleteEventLogById(id), ResponseMessage.Status.SUCCESS));
    }
}

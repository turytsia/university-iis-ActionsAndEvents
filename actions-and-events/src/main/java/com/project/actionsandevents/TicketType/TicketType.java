package com.project.actionsandevents.TicketType;


import java.util.Set;

import com.project.actionsandevents.Event.Event;
import com.project.actionsandevents.User.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
//import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="_tickettype")
public class TicketType {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    private Float price;

    @Column(nullable = false)
    private Long capacity;

    @Column
    private String description;

    //@PrimaryKeyJoinColumn(name = "_event", referencedColumnName = "id")
    @ManyToOne
    private Event event;

    @ManyToMany
    @JoinTable(
        name = "ticket_user",
        joinColumns = @JoinColumn(name = "tickettype_id"), 
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> registeredUsers;
}

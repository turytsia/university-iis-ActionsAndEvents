/**
 * This file contains class that represents User in SQL database.
 *
 * @author Oleksandr Turytsia (xturyt00)
 */
package com.project.actionsandevents.User;

import java.util.Set;

import com.project.actionsandevents.Administers.Administers;
import com.project.actionsandevents.Event.Event;
import com.project.actionsandevents.TicketType.TicketType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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
@Table(name="_user")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    //@ManyToMany(mappedBy = "users")
    @OneToMany(mappedBy = "user")
    private Set<Administers> administrators;

    //TODO: @OneToMany(mappedBy = "admin") ?

    @Column(unique = true)
    private String login;

    @Column(nullable = true)
    private String firstname;

    @Column(nullable = true)
    private String lastname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private String phone;

    // @JsonIgnore // This property is ignored when parsing to JSON format
    @Column(nullable = false)
    private String password;

    private String roles;

    @ManyToMany(mappedBy = "registeredUsers")
    private Set<TicketType> registeredTicketTypes;
}

/**
 * This file contains class that implements Administers class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Administers;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import com.project.actionsandevents.User.User;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(AdministersId.class)
public class Administers {
    // @Id
    // @GeneratedValue
    // private Long id;

    @Id
    @ManyToOne
    private User admin;
    
    @Id
    @ManyToOne
    private User user;

    // @ManyToOne
    // private User admin;
    
    // @ManyToOne
    // private User user;

    // @ManyToMany
    // private Set<User> users;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(nullable = true)
    private String text;
}

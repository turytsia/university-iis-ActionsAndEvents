/**
 * This file contains class that implements Administers class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Administers {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User admin;
    
    @ManyToMany
    private Set<User> users;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(nullable = true)
    private String text;
}

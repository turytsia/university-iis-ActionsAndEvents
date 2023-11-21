/**
 * This file contains class that implements Administers class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Administers;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.GeneratedValue;

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
public class Administers {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User admin;
    
    @ManyToOne
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(nullable = true)
    private String text;
}

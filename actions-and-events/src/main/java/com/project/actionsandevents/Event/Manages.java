/**
 * This file contains class that implements Manages class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Event;

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
@IdClass(ManagesId.class)
public class Manages {
    @Id
    @ManyToOne
    //@Column(nullable = true)
    private User manager;
    
    @Id
    @ManyToOne
    //@Column(nullable = true)
    private Event event;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private String status;

    @Column(nullable = true)
    private String text;
}

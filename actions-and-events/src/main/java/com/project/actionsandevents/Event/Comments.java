/**
 * This file contains class that implements Comments class.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.project.actionsandevents.User.User;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comments {
    @Id
    @ManyToMany
    private User user;

    @Id
    @ManyToMany
    private Event event;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(nullable = true)
    private int rating;

    @Column(nullable = true)
    private String text;
}

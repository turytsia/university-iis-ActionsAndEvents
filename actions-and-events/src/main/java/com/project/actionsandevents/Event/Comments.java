/**
 * This file contains class that implements Comments class.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
@IdClass(CommentsId.class)
public class Comments {
    @Id
    @ManyToOne
    //@JoinColumn(name = "_user", referencedColumnName = "id")
    private User user;

    @Id
    @ManyToOne
    //@JoinColumn(name = "_event", referencedColumnName = "id")
    private Event event;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(nullable = true)
    private int rating;

    @Column(nullable = true)
    private String text;
}

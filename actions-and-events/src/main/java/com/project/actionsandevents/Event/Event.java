/**
 * This file contains class that implements Event class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import com.project.actionsandevents.Place.Place;
import com.project.actionsandevents.User.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="event")
public class Event {
    @Id
    @GeneratedValue
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateFrom;

    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTo;

    private String description;

    private String title;

    @Column(nullable = true)
    private String icon;

    @Column(nullable = true)
    private String image;

    @ManyToOne
    @JoinColumn(name = "_user", referencedColumnName = "id")
    private User userManages;

    @ManyToOne
    @JoinColumn(name = "_place", referencedColumnName = "id")
    private Place place;
}

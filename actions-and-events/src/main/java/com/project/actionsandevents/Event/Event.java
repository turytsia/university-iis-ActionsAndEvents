/**
 * This file contains class that implements Event class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.CascadeType;

import com.project.actionsandevents.Category.Category;
import com.project.actionsandevents.Place.Place;
import com.project.actionsandevents.TicketType.TicketType;
import com.project.actionsandevents.User.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@Table(name="event")
public class Event {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateFrom;

    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTo;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String icon;

    @Column(nullable = true)
    private String image;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status;

    @ManyToOne
    @JoinColumn(name = "author", referencedColumnName = "id", nullable = true)
    // @Column(nullable = true)
    private User author;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User userManages;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Place place;

    // @ManyToMany
    // @JoinTable(
    //     name = "event_category",
    //     joinColumns = @JoinColumn(name = "event_id"), 
    //     inverseJoinColumns = @JoinColumn(name = "category_id"))
    // private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TicketType> ticketTypes;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Category category;
}

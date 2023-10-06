package com.project.actionsandevents.TicketType;


import org.hibernate.annotations.ManyToAny;

import com.project.actionsandevents.Event.Event;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
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

    @ManyToOne
    @PrimaryKeyJoinColumn(name = "_event", referencedColumnName = "id")
    private Event event;

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
}

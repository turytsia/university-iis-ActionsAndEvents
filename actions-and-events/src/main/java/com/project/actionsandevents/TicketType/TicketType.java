package com.project.actionsandevents.TicketType;

import com.project.actionsandevents.Event.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TicketType {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false) // unique = true, 
    private String name;

    @Size(min = 0, max = 1000000)
    @Column(nullable = false)
    private Float price;

    @Size(min = 0, max = 1000000)
    @Column(nullable = false)
    private Long capacity;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Event event; 
}

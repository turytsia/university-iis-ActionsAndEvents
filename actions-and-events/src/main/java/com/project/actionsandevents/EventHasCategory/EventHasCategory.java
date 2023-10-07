/**
 * This file contains class that represents EventHasCategory in SQL database.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.EventHasCategory;

import com.project.actionsandevents.Category.Category;
import com.project.actionsandevents.Event.Event;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "_eventhascategory")
public class EventHasCategory {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "_category", referencedColumnName = "id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "_event", referencedColumnName = "id")
    private Event event;
}

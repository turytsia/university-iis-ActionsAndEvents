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
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(EventHasCategoryId.class)
public class EventHasCategory {
    @Id
    @ManyToOne
    //@JoinColumn(name = "_category", referencedColumnName = "id")
    private Category category;

    @Id
    @ManyToOne
    //@JoinColumn(name = "_event", referencedColumnName = "id")
    private Event event;
}

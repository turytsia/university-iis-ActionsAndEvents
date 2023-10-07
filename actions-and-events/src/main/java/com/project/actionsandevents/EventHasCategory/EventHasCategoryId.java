package com.project.actionsandevents.EventHasCategory;

import java.io.Serializable;

import com.project.actionsandevents.Category.Category;
import com.project.actionsandevents.Event.Event;

public class EventHasCategoryId implements Serializable{
    private Category category;
    private Event event;

    public EventHasCategoryId(Category category, Event event) {
        this.category = category;
        this.event = event;
    }
}

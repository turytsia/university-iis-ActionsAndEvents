/**
 * This file contains class that implements EventResponse.
 *
 * @author Vadim Goncearenco (xgonce00)
 */
package com.project.actionsandevents.Event.responses;

import java.util.Date;

import com.project.actionsandevents.Event.Event;
import com.project.actionsandevents.Event.EventStatus;
import com.project.actionsandevents.User.User;

import com.project.actionsandevents.Category.Category;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EventResponse {
    private Long id;
    private Date dateFrom;
    private Date dateTo;
    private String description;
    private String title;
    private String icon;
    private String image;
    private EventStatus status;
    private Long placeId;
    private User author;
    private Category category;

    public EventResponse(Event event) {
        this.id = event.getId();
        this.dateFrom = event.getDateFrom();
        this.dateTo = event.getDateTo();
        this.description = event.getDescription();
        this.title = event.getTitle();
        this.icon = event.getIcon();
        this.image = event.getImage();
        this.status = event.getStatus();
        this.placeId = event.getPlace().getId();
        this.author = event.getAuthor();
        this.category = event.getCategory();
    }
}

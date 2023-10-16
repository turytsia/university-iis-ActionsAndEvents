package com.project.actionsandevents.Event.requests;

import java.util.Date;
// import java.util.Set;

// import com.project.actionsandevents.Category.Category;
// import com.project.actionsandevents.Place.Place;
import com.project.actionsandevents.Event.EventStatus;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EventPatchRequest {
    @NotBlank(message = "Starting date is required")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateFrom;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTo;

    private String description;

    @NotBlank(message = "Title is required")
    private String title;

    private String icon;

    private String image;

    // private Place place;
    // private Set<Category> categories;

    private EventStatus status;
}

package com.project.actionsandevents.Place.requests;

import com.project.actionsandevents.Place.PlaceStatus;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PlacePatchRequest {
    private String image;

    private String description;
    
    private String address;
    
    @NotBlank(message = "Name is required")
    private String name;

    private PlaceStatus status;
}

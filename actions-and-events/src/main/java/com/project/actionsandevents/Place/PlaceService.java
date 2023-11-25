/**
 * This file contains class that implements place services.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */

package com.project.actionsandevents.Place;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

import com.project.actionsandevents.Place.exceptions.DuplicatePlaceException;
import com.project.actionsandevents.Place.exceptions.PlaceNotFoundException;

import com.project.actionsandevents.Place.requests.PlacePatchRequest;

@Service
public class PlaceService {
    
    @Autowired
    private PlaceRepository repository;

    /**
     * TODO
     * @param id
     * @return
     * @throws PlaceNotFoundException
     */
    public Place getPlaceById(Long id) throws PlaceNotFoundException {
        Optional<Place> place = repository.findById(id);

        if (!place.isPresent()) {
            throw new PlaceNotFoundException("Place not found with id: " + id);
        }

        return place.get();
    }

    /**
     * TODO
     * @return
     */
    public List<Long> getPlaceIds() {
        return repository.findAllIds();
    }

    /**
     * TODO
     * @param id
     * @param patchRequest
     * @throws PlaceNotFoundException
     */
    public void patchPlaceById(Long id, PlacePatchRequest patchRequest) 
        throws PlaceNotFoundException, DuplicatePlaceException 
    {
        Optional<Place> place = repository.findById(id);
        if (!place.isPresent()) {
            throw new PlaceNotFoundException("Place not found with ID: " + id);
        }

        Place placeToPatch = place.get();

        if (patchRequest.getAddress() != null) {
            placeToPatch.setAddress(patchRequest.getAddress());
        }

        if (patchRequest.getDescription() != null) {
            placeToPatch.setDescription(patchRequest.getDescription());
        }

        if (patchRequest.getImage() != null) {
            placeToPatch.setImage(patchRequest.getImage());
        }

        if (patchRequest.getName() != null) {
            placeToPatch.setName(patchRequest.getName());
        }

        if (patchRequest.getStatus() != null) {
            placeToPatch.setStatus(patchRequest.getStatus());
        }

        try {
            repository.save(placeToPatch);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicatePlaceException("Place with such parameters already exists");
        }
    }

    /**
     * TODO
     * @param place
     * @return
     */
    public Long addPlace(Place place) 
        throws DuplicatePlaceException
    {
        try {
            return repository.save(place).getId();
        } catch (DataIntegrityViolationException e) {
            throw new DuplicatePlaceException("Place with such parameters already exists");
        }
    }

    /**
     * TODO
     * @param id
     * @throws PlaceNotFoundException
     */
    public void deletePlaceById(Long id) throws PlaceNotFoundException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new PlaceNotFoundException("Place with ID " + id + " not found");
        }
    }

    /**
     * TODO
     * @param placeId
     * @return
     * @throws PlaceNotFoundException
     */
    public String approvePlace(Long placeId) throws PlaceNotFoundException {
        Optional<Place> place = repository.findById(placeId);

        if (!place.isPresent()) {
            throw new PlaceNotFoundException("Place not found with ID: " + placeId);
        }

        place.get().setStatus(PlaceStatus.APPROVED);

        return "Place was successfully approved";
    }
}

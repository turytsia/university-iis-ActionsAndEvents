/**
 * This file contains class that implements repository for the place.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Place;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
  
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>{
    Optional<Place> findByName(String name);
}

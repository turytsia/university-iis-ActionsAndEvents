/**
 * This file contains class that implements EventRepository class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    @Query("SELECT e.id FROM Event e")
    List<Long> findAllIds();

    //Find all categories by event
    // @Query("SELECT ec.category FROM event_category ec WHERE ec.event = :event")
    // List<Category> findAllCategoriesByEvent(Event event);

    // @Query("SELECT c FROM Category c JOIN c.events e WHERE e = :event")
    // List<Category> findAllCategoriesByEvent(@Param("event") Event event);
}

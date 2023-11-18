/**
 * This file contains class that implements repository for the category.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Category;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.actionsandevents.Event.Event;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    Optional<Category> findByName(String name);

    @Query("SELECT c.id FROM Category c")
    List<Long> findAllIds();

    //List<Category> findAllByEvent(Event event);

    // Find all catergories by event
    // @Query("SELECT ec.category_id FROM event_category ec WHERE ec.event_id = :eventId")
    // List<Category> findAllIdsByEvent(@Param("eventId") Long eventId);
}

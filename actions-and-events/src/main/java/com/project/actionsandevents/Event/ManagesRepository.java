/**
 * This file contains class that implements ManagesRepository class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagesRepository extends JpaRepository<Manages, Long> {
    @Query("SELECT m.id FROM Manages m WHERE m.event = :event")
    List<Long> findAllIdsByEvent(Event event);
}

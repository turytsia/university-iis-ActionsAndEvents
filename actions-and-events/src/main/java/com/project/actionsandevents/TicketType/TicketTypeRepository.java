package com.project.actionsandevents.TicketType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import com.project.actionsandevents.Event.Event;

@Repository
public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {
    @Query("SELECT tt.id FROM TicketType tt WHERE tt.event = :event")
    List<Long> findAllIdsByEvent(@Param("event") Event event);

    List<TicketType> findAllByEvent(Event event);

    // @Query("SELECT tt.id FROM TicketType tt")
    // List<Long> findAllIds();
}

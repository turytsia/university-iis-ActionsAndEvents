/**
 * This file contains class that implements RegistersRepository class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Event;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.actionsandevents.User.User;
import com.project.actionsandevents.TicketType.TicketType;

import java.util.Optional;
import java.util.List;


@Repository
public interface RegistersRepository extends JpaRepository<Registers, Long> {

    @Query("SELECT r.id FROM Registers r")
    List<Long> findAllIds();

    @Query("SELECT r.id FROM Registers r WHERE r.ticketType = ?1")
    List<Long> findAllIdsByTicketType(TicketType ticketType);

    Optional<Registers> findByUserAndTicketType(User user, TicketType ticketType);


    // List<Registers> findByTicketType(TicketType ticketType);



    // @Query("SELECT new RegistersId(r.user, r.ticketType) FROM Registers r WHERE r.ticketType = ?1")
    // List<RegistersId> findAllIdsByTicketType(TicketType ticketType);

    // @Query("SELECT r.user, r.ticketType FROM Registers r WHERE r.ticketType = ?1")
    // List<Object[]> findAllIdsByTicketType(TicketType ticketType);
}

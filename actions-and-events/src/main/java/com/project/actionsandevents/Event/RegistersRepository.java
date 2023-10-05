/**
 * This file contains class that implements RegistersRepository class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.Event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistersRepository extends JpaRepository<Registers, RegistersId> {
    
}

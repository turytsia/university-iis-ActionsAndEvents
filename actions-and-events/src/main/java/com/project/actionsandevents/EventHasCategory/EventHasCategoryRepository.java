/**
 * This file contains class that implements EventHasCategoryRepository class.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.EventHasCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventHasCategoryRepository extends JpaRepository<EventHasCategory, EventHasCategoryId> {
    
}

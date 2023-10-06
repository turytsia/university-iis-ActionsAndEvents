/**
 * This file contains class that implements CommentsRepository class.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, CommentsId> {
    
}

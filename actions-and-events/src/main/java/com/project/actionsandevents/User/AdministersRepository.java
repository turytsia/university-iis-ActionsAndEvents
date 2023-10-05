/**
 * This file contains class that implements AdministersRepository class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */
package com.project.actionsandevents.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
  
//import java.util.Optional;
  
@Repository
public interface AdministersRepository extends JpaRepository<Administers, Long> {
    //Optional<User> findByLogin(String login);
}

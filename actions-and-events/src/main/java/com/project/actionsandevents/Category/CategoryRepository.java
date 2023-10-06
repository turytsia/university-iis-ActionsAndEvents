/**
 * This file contains class that implements repository for the category.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
  
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    Optional<Category> findByName(String name);
}

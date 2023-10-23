/**
 * This file contains class that implements CategoryResponse.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Category.responses;

import com.project.actionsandevents.Category.Category;
import com.project.actionsandevents.Category.CategoryStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategoryResponse {
    private Long id;
    private String name;
    private Long parentId;
    private CategoryStatus status;

    public CategoryResponse(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.parentId = category.getParentCategory().getId();
        this.status = category.getStatus();
    }
}

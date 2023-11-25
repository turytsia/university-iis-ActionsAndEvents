/**
 * This file contains class that implements category services.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */

package com.project.actionsandevents.Category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.actionsandevents.Category.exceptions.CategoryNotFoundException;
import com.project.actionsandevents.Category.requests.CategoryPatchRequest;
import com.project.actionsandevents.Category.requests.CategoryPostRequest;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository repository;

    /**
     * TODO
     * @param id
     * @return
     * @throws CategoryNotFoundException
     */
    public Category getCategoryById(Long id) throws CategoryNotFoundException {
        Optional<Category> category = repository.findById(id);

        if (!category.isPresent()) {
            throw new CategoryNotFoundException("Category not found with id: " + id);
        }

        return category.get();
    }

    /**
     * TODO
     * @return
     */
    public List<Long> getCategoryIds() {
        return repository.findAllIds();
    }

    /**
     * TODO
     * @param id
     * @param patchRequest
     * @throws CategoryNotFoundException
     */
    public void patchCategoryById(Long id, CategoryPatchRequest patchRequest) throws CategoryNotFoundException {
        Optional<Category> category = repository.findById(id);

        if (!category.isPresent()) {
            throw new CategoryNotFoundException("Category not found with ID: " + id);
        }

        Category categoryToPatch = category.get();

        if (patchRequest.getCategoryId() != null) {
            Optional<Category> parent = repository.findById(patchRequest.getCategoryId());

            if (!parent.isPresent()) {
                throw new CategoryNotFoundException("Parent category not found with ID: " + patchRequest.getCategoryId());
            }

            categoryToPatch.setParentCategory(parent.get());
        }

        if (patchRequest.getName() != null) {
            categoryToPatch.setName(patchRequest.getName());
        }

        if (patchRequest.getStatus() != null) {
            categoryToPatch.setStatus(patchRequest.getStatus());
        }

        repository.save(categoryToPatch);
    }

    /**
     * TODO
     * @param category
     * @return
     * @throws CategoryNotFoundException
     */
    public Long addCategory(CategoryPostRequest category) throws CategoryNotFoundException {
        Optional<Category> parentCateogry = repository.findById(category.getParentCategory());

        if (!parentCateogry.isPresent()) {
            throw new CategoryNotFoundException("Category not found with ID: " + category.getParentCategory());
        }

        Category newCategory = new Category();

        newCategory.setName(category.getName());
        newCategory.setParentCategory(parentCateogry.get());
        newCategory.setStatus(category.getStatus());

        return repository.save(newCategory).getId();
    }

    /**
     * TODO
     * @param category
     * @param id
     * @return
     * @throws CategoryNotFoundException
     */
    public Long addCategoryWithParent(Category category, Long id) throws CategoryNotFoundException{
        Optional<Category> parent = repository.findById(id);

        if (!parent.isPresent()) {
            throw new CategoryNotFoundException("Category not found with ID: " + id);
        }
        
        category.setParentCategory(parent.get());

        return repository.save(category).getId();
    }

    /**
     * TODO
     * @param id
     * @throws CategoryNotFoundException
     */
    public void deleteCategoryById(Long id) throws CategoryNotFoundException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new CategoryNotFoundException("Category with ID " + id + " not found");
        }
    }

    /**
     * TODO
     * @param categoryId
     * @return
     * @throws CategoryNotFoundException
     */
    public String approveCategory(Long categoryId) throws CategoryNotFoundException {
        Optional<Category> category = repository.findById(categoryId);

        if (!category.isPresent()) {
            throw new CategoryNotFoundException("Category not found with ID: " + categoryId);
        }

        category.get().setStatus(CategoryStatus.ACCEPTED);

        return "Category was successfully approved";
    }
}

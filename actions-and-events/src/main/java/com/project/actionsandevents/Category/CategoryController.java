/**
 * This file contains class that implements category controller.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.actionsandevents.Category.exceptions.CategoryNotFoundException;
import com.project.actionsandevents.Category.requests.CategoryPatchRequest;
import com.project.actionsandevents.Category.requests.CategoryPostRequest;
import com.project.actionsandevents.Category.responses.CategoriesResponse;
import com.project.actionsandevents.Category.responses.CategoryPostResponse;
import com.project.actionsandevents.Category.responses.CategoryResponse;
import com.project.actionsandevents.common.ResponseMessage;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/category/{id}")
    public ResponseEntity<Object> getCategoryById(@PathVariable Long id, Authentication authentication) throws CategoryNotFoundException {
        Category category = categoryService.getCategoryById(id);

        return ResponseEntity.ok(new CategoryResponse(category));
    }

    @GetMapping("/categories")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> getCategoryIds(Authentication authentication) {
        return ResponseEntity.ok(new CategoriesResponse(categoryService.getCategoryIds()));
    }

    @PatchMapping("/category/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> patchCategoryById(
            @PathVariable Long id,
            @Valid @RequestBody CategoryPatchRequest patchRequest,
            BindingResult bindingResult,
            Authentication authentication) throws CategoryNotFoundException {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new ResponseMessage(
                    "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        categoryService.patchCategoryById(id, patchRequest);

        return ResponseEntity.ok(new ResponseMessage("Category was successfully updated", ResponseMessage.Status.SUCCESS));
    }

    @PostMapping("/category")
    @PreAuthorize("hasAnyAuthority('ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> addCategory(
                @Valid @RequestBody CategoryPostRequest category,
                BindingResult bindingResult,
                Authentication authentication) throws CategoryNotFoundException {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new CategoryPostResponse(null, 
                            "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        return ResponseEntity.ok(new CategoryPostResponse(categoryService.addCategory(category), "Category was successfully added", ResponseMessage.Status.SUCCESS));
    }

    @PostMapping("/category/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> addCategoryWithParent(
                @PathVariable Long id,
                @Valid @RequestBody Category category,
                BindingResult bindingResult,
                Authentication authentication) throws CategoryNotFoundException{
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new CategoryPostResponse(null, 
                            "Validation failed: " + bindingResult.getAllErrors(), ResponseMessage.Status.ERROR));
        }

        return ResponseEntity.ok(new CategoryPostResponse(categoryService.addCategoryWithParent(category, id), "Category was successfully added", ResponseMessage.Status.SUCCESS));
    }

    @DeleteMapping("/category/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_MANAGER', 'ROLE_ADMIN')")
    public ResponseEntity<Object> deleteCategory(@PathVariable Long id, Authentication authentication) throws CategoryNotFoundException {
        categoryService.deleteCategoryById(id);

        return ResponseEntity.ok(new ResponseMessage("Category was successfully removed", ResponseMessage.Status.SUCCESS));
    }
}

/**
 * This file contains class that represents Category in SQL database.
 *
 * @author Aleksandr Shevchenko (xshevc01)
 */
package com.project.actionsandevents.Category;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.project.actionsandevents.Event.Event;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@Table(name="_category")
public class Category {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = true) //name = "parent_category",
    private Category parentCategory;

    @ManyToMany(mappedBy = "categories")
    private Set<Event> events = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryStatus status;
}

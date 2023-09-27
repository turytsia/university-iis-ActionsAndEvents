/**
 * This file contains class that represents User in SQL database.
 *
 * @author Oleksandr Turytsia (xturyt00)
 */
package com.project.actionsandevents.User;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="_user")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String login;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @JsonIgnore // This property is ignored when parsing to JSON format
    @Column(nullable = false)
    private String password;
}

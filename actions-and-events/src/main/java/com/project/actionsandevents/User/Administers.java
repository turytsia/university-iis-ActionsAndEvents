/**
 * This file contains class that implements Administers class.
 *
 * @author Vadim Goncearenco (xgonce00)
 */

package com.project.actionsandevents.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="_administers")
public class Administers {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Long admin;
    
    @ManyToMany
    private Long user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(nullable = true)
    private String text;
}

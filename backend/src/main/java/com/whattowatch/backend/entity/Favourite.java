package com.whattowatch.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.whattowatch.backend.entity.enums.MediaType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "favourite")
public class Favourite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long itemId;
    private String name;
    private String imageURL;

    @Enumerated(EnumType.STRING)
    private MediaType type;

    @ManyToOne
    @JsonIgnore
    private User user;
}

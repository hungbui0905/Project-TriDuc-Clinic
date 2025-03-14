package com.hungvit.TriDuc_Clinic.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="userinfo")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    @JsonProperty("user_id")
    private int id;

    @Column(name="fullname")
    @JsonProperty("full_name")
    private String fullname;

    @Column(name="phoneNumber")
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Column(name="description")
    @JsonProperty("description")
    private String description;
}

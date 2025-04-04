package com.hungvit.TriDuc_Clinic.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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

    @NotNull(message = "Trường này không được để trống")
    @Column(name="fullname")
    @JsonProperty("full_name")
    private String fullname;

    @NotNull(message = "Trường này không được để trống")
    @Pattern(regexp = "^0\\d{9,10}$", message = "Số điện thoại không phù hợp")
    @Column(name="phoneNumber")
    @JsonProperty("phone_number")
    private String phoneNumber;

    @NotNull(message = "Trường này không được để trống")
    @Min(value = 10, message = "Viết ít nhất 10 kí tự")
    @Column(name="description")
    @JsonProperty("description")
    private String description;
}

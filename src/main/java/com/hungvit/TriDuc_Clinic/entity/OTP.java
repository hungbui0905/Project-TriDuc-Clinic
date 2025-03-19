package com.hungvit.TriDuc_Clinic.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "otp")
public class OTP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("otp_id")
    private int Id;

    @Column(name = "phoneNumber")
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Column(name = "expiredTime")
    @JsonProperty("expired_time")
    private long expiredTime;

    public OTP(String phoneNumber, long expiredTime) {
        this.phoneNumber = phoneNumber;
        this.expiredTime = expiredTime;
    }
}

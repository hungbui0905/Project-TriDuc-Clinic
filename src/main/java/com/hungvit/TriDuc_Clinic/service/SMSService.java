package com.hungvit.TriDuc_Clinic.service;

public interface SMSService {
     String verificationCheck(String phoneNumber, String otpCode);
     String sendVerificationMessage(String phoneNumber);

}

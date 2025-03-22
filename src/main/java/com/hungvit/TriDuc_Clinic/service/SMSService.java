package com.hungvit.TriDuc_Clinic.service;

public interface SMSService {
     abstract String sendVerificationMessage(String phoneNumber);
     abstract String checkVerificationMessage(String phoneNumber, String otpCode);
     abstract String cancelVerificationMessage(String phoneNumber);
}

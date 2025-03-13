package com.hungvit.TriDuc_Clinic.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SendSMSService {

    @Value("${TWILIO_ACCOUNT_SID}")
    private String ACCOUNT_SID;

    @Value("${TWILIO_AUTH_TOKEN}")
    private String AUTH_TOKEN;

    @Value("${TWILIO_SERVICE_SID}")
    private String SERVICE_SID;

    @PostConstruct
    private void setUp() {
        log.info("Initializing Twilio API...");
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public String sendVerificationSMS(String phoneNumber) {
        try {
            Verification verification = Verification.creator(
                    SERVICE_SID, // ✅ Phải dùng SERVICE_SID, không phải ACCOUNT_SID
                    phoneNumber, // ✅ Dùng số điện thoại người nhận
                    "sms"
            ).create();

            log.info("Verification SID: " + verification.getSid());
            return verification.getStatus();
        } catch (Exception e) {
            log.error("Error sending SMS: " + e.getMessage());
            return "Failed: " + e.getMessage();
        }
    }
}

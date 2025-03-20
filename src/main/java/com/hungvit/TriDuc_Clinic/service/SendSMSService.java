package com.hungvit.TriDuc_Clinic.service;

import com.hungvit.TriDuc_Clinic.configuration.TwilioConfig;
import com.hungvit.TriDuc_Clinic.entity.OTP;
import com.hungvit.TriDuc_Clinic.repository.OTPRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SendSMSService implements SMSService {
    private final TwilioConfig twilioConfig;
    @Autowired
    private OTPRepository otpRepository;

    public SendSMSService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());

    }

    @Override
    public String sendVerificationMessage(String phoneNumber) {
        System.out.println("Phone: "+phoneNumber);
        Verification verification = Verification.creator(
                        "VA9b200d1dfdee76173923b45c09263633",
                        "+84"+phoneNumber,
                        "sms")
                .create();
        System.out.println("VerificationSent: "+verification.getStatus());

        return verification.getStatus();
    }

    @Override
    public String checkVerificationMessage(String phoneNumber, String otpCode) {
        VerificationCheck verificationCheck= VerificationCheck.creator(
                "VA9b200d1dfdee76173923b45c09263633")
                .setTo(phoneNumber)
                .setCode(otpCode)
                .create();
        System.out.println("VerificationCheck: "+verificationCheck.getSid());
        return verificationCheck.getStatus();
    }
}

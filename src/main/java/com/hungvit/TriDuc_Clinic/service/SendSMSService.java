package com.hungvit.TriDuc_Clinic.service;

import com.hungvit.TriDuc_Clinic.configuration.TwilioConfig;
import com.hungvit.TriDuc_Clinic.repository.OTPRepository;
import com.twilio.Twilio;
import com.twilio.base.ResourceSet;
import com.twilio.rest.verify.v2.VerificationAttempt;
import com.twilio.rest.verify.v2.VerificationAttemptReader;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLOutput;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SendSMSService implements SMSService {
    List<String> otpSid = new ArrayList<>();
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
                        "+1"+phoneNumber,
                        "sms")
                .create();
        System.out.println("VerificationSent: "+verification.getStatus());
        otpSid.add(verification.getSid());
        return verification.getSid();
    }

    @Override
    public String checkVerificationMessage(String phoneNumber, String otpCode) {
        VerificationCheck verificationCheck= VerificationCheck.creator(
                "VA9b200d1dfdee76173923b45c09263633")
                .setTo("+1" + phoneNumber)
                .setCode(otpCode)
                .create();
        System.out.println("VerificationCheck: "+verificationCheck.getStatus());
        return verificationCheck.getStatus();
    }

    @Override
    public String cancelVerificationMessage(String phoneNumber) {
        Verification verification= Verification.updater(
                "VA9b200d1dfdee76173923b45c09263633",
                otpSid.get(0),
                Verification.Status.CANCELED
        ).update();
        otpSid.clear();
        System.out.println("VerificationStatus: "+verification.getStatus());
        return "";
    }


}

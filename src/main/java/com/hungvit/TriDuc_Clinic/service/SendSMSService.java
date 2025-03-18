package com.hungvit.TriDuc_Clinic.service;

import com.hungvit.TriDuc_Clinic.configuration.TwilioConfig;
import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.Random;

@Service
public class SendSMSService implements SMSService {
    private final TwilioConfig twilioConfig;

    public SendSMSService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());

    }


    @Override

    public String verificationCheck(String phoneNumber, String otpCode) {
        VerificationCheck verificationCheck = VerificationCheck.creator(
                        "VA9b200d1dfdee76173923b45c09263633")
                .setTo(phoneNumber)
                .setCode(otpCode)
                .create();
        if (verificationCheck.getStatus().equals("approved")) {
            return "Yêu cầu của bạn đã được gửi đi";
        }
        return "Mã OTP của bạn không đúng";
    }

    @Override
    public String sendVerificationMessage(String phoneNumber) {
        System.out.println("This method is oke");
        Verification verification = Verification.creator(
                        "VA9b200d1dfdee76173923b45c09263633",
                        phoneNumber,
                        "sms")
                .create();
        System.out.println(verification.getSid());
        return "";
    }
}

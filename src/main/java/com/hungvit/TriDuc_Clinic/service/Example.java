package com.hungvit.TriDuc_Clinic.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.type.PhoneNumber;

public class Example {

    private static String ACCOUNT_SID;
    private static String AUTH_TOKEN;
    private static String TWILIO_PHONE_NUMBER;

    // Đọc giá trị từ application.properties
    static {
        try {
            Properties properties = new Properties();
            properties.load(new FileInputStream("src/main/resources/application.properties"));
            ACCOUNT_SID = properties.getProperty("TWILIO.ACCOUNT_SID");
            AUTH_TOKEN = properties.getProperty("TWILIO.AUTH_TOKEN");
            TWILIO_PHONE_NUMBER = properties.getProperty("TWILIO.PHONE_NUMBER");
        } catch (IOException e) {
            System.err.println("Lỗi khi đọc file application.properties: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        if (ACCOUNT_SID == null || AUTH_TOKEN == null || TWILIO_PHONE_NUMBER == null) {
            System.err.println("Lỗi: Không đọc được thông tin Twilio từ file cấu hình!");
            return;
        }

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Verification verification = Verification.creator(
                        "VA9b200d1dfdee76173923b45c09263633",
                        "+84845952002",
                        "sms")
                .create();
        long startTime = System.currentTimeMillis() / 1000;
        long otpExpirySeconds = 600;
        long expirationTime = startTime + otpExpirySeconds;
        System.out.println("");
        while (true) {
            long currentTime = System.currentTimeMillis() / 1000;
            long remainingTime = expirationTime - currentTime;

            if (remainingTime > 0) {
                System.out.println("Mã OTP còn hiệu lực trong: " + remainingTime + " giây.");
            } else {
                System.out.println("Mã OTP đã hết hạn.");
                break;
            }

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.err.println("Luồng bị gián đoạn: " + e.getMessage());
                break;
            }
        }
        System.out.println(verification.getSid());
    }
}


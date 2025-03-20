package com.hungvit.TriDuc_Clinic.controller;


import com.hungvit.TriDuc_Clinic.entity.UserInfo;
import com.hungvit.TriDuc_Clinic.service.SMSService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.server.csrf.CsrfToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@Controller
public class ContactController {
    @GetMapping("/contact")
    public String contactDirect() {
        return "TriDuc/contact";
    }

    @Autowired
    private SMSService smsService;

    @PostMapping("/contact")
    public String otpController(@RequestBody Map<String, Object> requestData) {
        try {
            String phoneNumber = requestData.get("phoneNumber").toString();
            String otpCode = (String) requestData.get("otpCode");
            int methodNumber = (int) requestData.get("methodNumber");
            if (methodNumber==1) {
                verificationMessage(phoneNumber);
            } else {
                confirmationMessage(phoneNumber, otpCode);
            }
            System.out.println();
        } catch (Exception e) {

        }

        return "TriDuc/contact";
    }
    public void verificationMessage(String phoneNumber) {
        smsService.sendVerificationMessage(phoneNumber);
    }

    public void confirmationMessage(String phoneNumber, String otpCode) {
        String resStatus = smsService.checkVerificationMessage(phoneNumber, otpCode);
        if (resStatus.equals("approved")) {
            System.out.println("Approved");
        }
    }
}

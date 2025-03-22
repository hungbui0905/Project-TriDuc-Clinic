package com.hungvit.TriDuc_Clinic.controller;


import com.hungvit.TriDuc_Clinic.entity.UserInfo;
import com.hungvit.TriDuc_Clinic.service.SMSService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
            String phoneNumber = requestData.get("phoneNumber").toString();
            String otpCode = (String) requestData.get("otpCode");
            int methodNumber = (int) requestData.get("methodNumber");
            if (methodNumber == 1) {
                verificationMessage(phoneNumber);
            } else {
                cancelVerificationMessage(phoneNumber);
            }
        return "TriDuc/contact";
    }
    public void verificationMessage(String phoneNumber) {
        smsService.sendVerificationMessage(phoneNumber);
    }

    public void cancelVerificationMessage(String phoneNumber) {
        smsService.cancelVerificationMessage(phoneNumber);
    }
    @PutMapping("/contact")
    @ResponseBody
    public Map<String, String> confirmationMessage(@RequestBody Map<String, String> requestData) {
        Map<String, String> response = new HashMap<>();

        String phoneNumber = requestData.get("phoneNumber");
        String otpCode = requestData.get("otpCode");

        String status = smsService.checkVerificationMessage(phoneNumber, otpCode);
        response.put("message", status);
        return response;
    }
}

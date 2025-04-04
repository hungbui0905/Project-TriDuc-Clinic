package com.hungvit.TriDuc_Clinic.controller;


import com.hungvit.TriDuc_Clinic.entity.UserInfo;
import com.hungvit.TriDuc_Clinic.service.SMSService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/contact")
public class ContactController {
    @GetMapping
    public String contactDirect() {
        return "TriDuc/contact";
    }

    @Autowired
    private SMSService smsService;

    @PostMapping
    public String otpController(@RequestBody Map<String, String> requestData) {
        String phoneNumber = requestData.get("phoneNumber");
        sendVerificationMessage(phoneNumber);
        return "TriDuc/contact";
    }

    @DeleteMapping
    public String cancelOTP(@RequestBody Map<String, String> requestData) {
        String phoneNumber = requestData.get("phoneNumber");
        cancelVerificationMessage(phoneNumber);
        return "TriDuc/contact";
    }
    @PutMapping
    @ResponseBody
    public Map<String, String> confirmationMessage(@RequestBody Map<String, String> requestData) {
        Map<String, String> response = new HashMap<>();

        String phoneNumber = requestData.get("phoneNumber");
        String otpCode = requestData.get("otpCode");

        String status = smsService.checkVerificationMessage(phoneNumber, otpCode);
        response.put("message", status);
        return response;
    }
    public void sendVerificationMessage(String phoneNumber) {
        smsService.sendVerificationMessage(phoneNumber);
    }

    public void cancelVerificationMessage(String phoneNumber) {
        smsService.cancelVerificationMessage(phoneNumber);
    }

}

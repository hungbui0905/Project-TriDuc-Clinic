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
    public String verificationMessage(@RequestBody String phoneNumber) {
        String sid = smsService.sendVerificationMessage(phoneNumber);
        return sid;
    }

    @PostMapping("/smsService")
    public String compareOtp(@RequestBody String phoneNumber, @RequestBody String otp) {
        String sid = smsService.verificationCheck(phoneNumber, otp);
        return sid;
    }
}

package com.hungvit.TriDuc_Clinic.controller;


import com.hungvit.TriDuc_Clinic.entity.UserInfo;
import com.hungvit.TriDuc_Clinic.service.SMSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ContactController {

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("user", new UserInfo());
        return "TriDuc/contact";
    }

    @PostMapping("/contact")
    public String submitContact(@ModelAttribute("user") UserInfo userInfo) {
        System.out.println("Họ tên: " + userInfo.getFullname());
        System.out.println("Số điện thoại: " + userInfo.getPhoneNumber());
        return "TriDuc/contact"; // Hoặc điều hướng sang một trang khác nếu cần
    }

    @Autowired
    private SMSService smsService;

    @PostMapping("/smsService")
    public ResponseEntity<String> verificationMessage(@RequestParam String phoneNumber) {
        String sid = smsService.sendVerificationMessage("+84845952002");
        return ResponseEntity.ok("OTP sent! SID: "+ sid);
    }
}

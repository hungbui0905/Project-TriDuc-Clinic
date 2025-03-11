package com.hungvit.TriDuc_Clinic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping
    public String homePage() {
        return "TriDuc/index";
    }
}

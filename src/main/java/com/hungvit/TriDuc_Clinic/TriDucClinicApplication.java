package com.hungvit.TriDuc_Clinic;

import com.hungvit.TriDuc_Clinic.configuration.TwilioConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(TwilioConfig.class)
public class TriDucClinicApplication {

	public static void main(String[] args) {
		SpringApplication.run(TriDucClinicApplication.class, args);
	}
}

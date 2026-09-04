# Project-TriDuc-Clinic

Resume-style **Projects** entry for Trí Đức Clinic. Copy the block below into a CV or portfolio.

---

**TRI DUC CLINIC (WEB)** &nbsp;&nbsp;&nbsp;&nbsp; 02/2025 - 04/2025

**Developer**

- Description: A public website for Trí Đức Private Clinic (Lào Cai) with clinic information, treatment specialties, announcements, and a verified contact flow. Own the end-to-end patient inquiry path (HTML/CSS/JS + Spring Boot): visitors fill in name, phone, and health notes, then confirm the request with an SMS OTP before it is accepted.
- My responsibilities:
  - Built a multi-page responsive clinic site (Home, Introduction, Services, Notifications, Contact) with separate desktop and mobile stylesheets (987px breakpoint), hamburger menu, and search bar.
  - Designed the homepage: specialty cards (digestive, musculoskeletal, cardiology), introduction block, announcement list, Facebook page plugin, and Google Maps embed for the clinic address.
  - Built the contact form (full name, phone, health description) with required-field gating and a 6-digit OTP modal: digit cells, paste support, 5-minute countdown, and overlay lock while verifying.
  - Implemented Spring Boot endpoints under `/contact` (send / verify / cancel OTP) and integrated Twilio Verify to deliver SMS OTPs to Vietnamese numbers (`+84`).
  - Set up JPA entities for `UserInfo` and `OTP` on PostgreSQL, Bean Validation on phone and message fields, Spring Security, and Dockerized the app for local deployment.
- Team size: 1
- Technologies used: HTML, CSS, JavaScript, Spring Boot, Thymeleaf, PostgreSQL, Twilio, Docker.
- Links:
  - https://github.com/hungbui0905/Tri-Duc-Clinic (Frontend)
  - https://github.com/hungbui0905/Project-TriDuc-Clinic (Backend)
  - https://hungbui0905.github.io/Tri-Duc-Clinic/ (Live demo)

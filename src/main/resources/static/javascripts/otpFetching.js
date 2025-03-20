export function otpMessage(otpInputedValue) {
    event.preventDefault();

    let phoneNumber = document.getElementById("phoneInput").value;

    fetch("http://localhost:8081/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
            otpCode: otpInputedValue,
            methodNumber: 2
        })
    })
        .then(response => response.text())

        .catch(error => console.error("Lỗi:", error));

}

//Send OTP
export function sendOtp() {
    event.preventDefault();

    let phoneNumber = document.getElementById("phoneInput").value;
    console.log(phoneNumber)
    fetch("http://localhost:8081/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
            otpCode: null,
            methodNumber: 1
        })
    })
        .then(response => response.text())

        .catch(error => console.error("Lỗi:", error));
}
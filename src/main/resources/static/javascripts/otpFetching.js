export function otpMessage(otpInputedValue) {
    event.preventDefault();

    let phoneNumber = document.getElementById("phoneInput").value;

    fetch("/contact", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
            otpCode: otpInputedValue
        })
    })
        .then(response => {
            if (!response.ok) throw new Error("Lỗi từ server");
            return response.json();
        })
        .then(data => {
            if (data.message === "pending") {
                let message = "Mã OTP của bạn chưa chính xác"
                document.getElementById("failMessage").textContent = message;
                document.getElementById("failMessage").style.color = "green";
            } else {
                alert("Yêu cầu của bạn đã được gửi đi")
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById("failMessage").textContent = "❌ Xác minh thất bại hoặc lỗi hệ thống.";
            document.getElementById("failMessage").style.color = "red";
        });

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

export function cancelOtp() {

    let phoneNumber = document.getElementById("phoneInput").value;
    console.log(phoneNumber)
    fetch("http://localhost:8081/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
            otpCode: null,
            methodNumber: 3
        })
    })
        .then(response => response.text())

        .catch(error => console.error("Lỗi:", error));
}
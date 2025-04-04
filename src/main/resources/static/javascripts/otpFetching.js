export function otpMessage(otpInputedValue, inputList) {
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
                document.getElementById("exit").style.pointerEvents = "auto";
                document.getElementById("failMessage").style.display = "block";
                document.getElementById("failMessage").style.color = "red";
                inputList.forEach(inp => inp.value = "");
                inputList.forEach(inp => inp.disabled = false);
                document.querySelector(".loader").style.display = "none";
                document.querySelectorAll(".otp-cells input")[0].focus();
            } else {
                document.getElementById("failMessage").style.display = "none";
                setTimeout(() => {
                    alert("Yêu cầu của bạn đã được gửi đi");
                    window.location.reload();
                }, 1000)
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
    fetch("http://localhost:8081/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("error-phone").innerText = "";
            if(data.phoneNumber) {
                document.getElementById("error-phone").innerText = data.phoneNumber;
            }
        })

        .catch(error => console.error("Lỗi:", error));
}

export function cancelOtp() {
    event.preventDefault();

    let phoneNumber = document.getElementById("phoneInput").value;
    console.log(phoneNumber)
    fetch("http://localhost:8081/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
        })
    })
        .then(response => response.text())

        .catch(error => console.error("Lỗi:", error));
}
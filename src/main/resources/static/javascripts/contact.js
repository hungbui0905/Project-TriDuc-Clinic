//Change otp cells
var inputList = document.querySelectorAll('.otp-cells input')

var otpEventAdded = false;
function otpTyping() {
    if (otpEventAdded) return;
    otpEventAdded = true;

    let otpInputedValue = "";

    inputList.forEach((input) => {
        input.addEventListener('input', function () {
            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, 1);
            }

            if (this.value.length === this.maxLength) {
                let nextCell = this.nextElementSibling;
                if (nextCell) nextCell.focus();
            }

            if ([...inputList].every(inp => inp.value.length === 1)) {
                inputList.forEach(inp => inp.disabled = true);
                document.querySelector(".loader").style.display = "block";
                otpInputedValue = [...inputList].map(inp => inp.value).join('');
                otpMessage(otpInputedValue);
            }
        });
    });

}

function otpMessage(otpInputedValue) {
        event.preventDefault();

        let phoneNumber = document.getElementById("phoneInput");

        fetch("http://localhost:8081/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                                  phoneNumber: "+84845952002",
                                  otpCode: otpInputedValue,
                                  methodNumber: 2
                                  })
        })
        .then(response => response.text())

        .catch(error => console.error("Lỗi:", error));

}

//Send OTP
function sendOtp() {
        event.preventDefault();

        let phoneNumber = document.getElementById("phoneInput");

        fetch("http://localhost:8081/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                                              phoneNumber: "+84845952002",
                                              otpCode: null,
                                              methodNumber: 1
                                              })
        })
        .then(response => response.text())

        .catch(error => console.error("Lỗi:", error));

}

//Disable send button
document.querySelectorAll(".contactInfo input, .contactInfo textarea").forEach((element) => {
    element.addEventListener("input", () => {
        const allInputsFilled = [...document.querySelectorAll(".contactInfo input, .contactInfo textarea")]
            .every(input => input.value.trim() !== "");

        document.querySelector(".contactInfo button").disabled = !allInputsFilled;
    });
});

//Show and hide otp form
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sendBtn").addEventListener("click", function () {
        sendOtp();
        document.querySelector(".otp").style.display = "block";
        document.querySelectorAll(".otp-cells input")[0].focus();
        otpTyping();
    });

document.getElementById("exit").addEventListener("click", function () {
        document.querySelector(".otp").style.display = "none";
        inputList.forEach(input => {
            input.value = "";
            if ([...inputList].every(inp => inp.value.length === 0)) {
                [...inputList].forEach(inp => inp.disabled = false)
                document.querySelector(".loader").style.display = "none";
            }
        })
    });
});


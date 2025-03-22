import { otpMessage, sendOtp, cancelOtp } from "./otpFetching.js";
var otpEventAdded = false;
document.getElementById("sendBtn").addEventListener("click", otpTyping);
function otpTyping() {
    if (otpEventAdded) return;
    otpEventAdded = true;
    let otpInputedValue = "";
    inputList.forEach((input) => {
        input.addEventListener('input', function () {
            document.getElementById("exit").classList.add("disabled");

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

function otpCountdown() {
    let otpTimeRange = 20;
    let endTime = Math.round(Date.now() / 1000 + otpTimeRange);

    let interval = setInterval(() => {
        let remainingTime = Math.round(endTime - Date.now() / 1000);

        if (remainingTime % 60 < 10) {
            document.getElementById("remainingTime").textContent = "0" + Math.trunc(remainingTime / 60) + " phút 0" + remainingTime % 60 + " giây";
        } else {
            document.getElementById("remainingTime").textContent = "0" + Math.trunc(remainingTime / 60) + " phút " + remainingTime % 60 + " giây";
        }

        if (remainingTime <= 0) {
            clearInterval(interval);
            console.log("Not oke")
            document.getElementById("remainingTimeOTPMessage").textContent = "Hết thời gian!";
            document.getElementById("remainingTime").style.display = "none";
            cancelOtp();
            setTimeout(function () {
                window.location.reload();
            }, 5000);

        }

        window.addEventListener("beforeunload", () => {
            clearInterval(interval);
        })
    }, 1000);
}

//Disable send button
document.querySelectorAll(".contactInfo input, .contactInfo textarea").forEach((element) => {
    element.addEventListener("input", () => {
        const allInputsFilled = [...document.querySelectorAll(".contactInfo input, .contactInfo textarea")]
            .every(input => input.value.trim() !== "");

        document.querySelector(".contactInfo button").disabled = !allInputsFilled;
    });
});

var inputList = document.querySelectorAll('.otp-cells input')

//Show and hide otp form
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sendBtn").addEventListener("click", function () {
        sendOtp();
        disableScroll();
        disableAll();
        document.querySelector(".otp").style.display = "block";
        document.querySelectorAll(".otp-cells input")[0].focus();
        otpCountdown();
        otpTyping();
    });

    document.querySelector("fa-regular fa-circle-xmark disabled").addEventListener("click", function () {
        enableAll();
        enableScroll();
        let inputArray = Array.from(inputList);

        if (inputArray.every(inp => inp.value.length === 0)) {
            document.querySelector(".otp").style.display = "none";
            inputArray.forEach(inp => inp.disabled = false);
            document.querySelector(".loader").style.display = "none";
        }
    });
});

function disableAll() {
    document.querySelectorAll("img, iframe, div, nav").forEach(el => {
        if (!el.closest(".otp")) {
            el.disabled = true;
            el.style.opacity = "0.5";
            el.style.pointerEvent = "none";
        }
    });
}

function enableAll() {
    document.querySelectorAll("img, iframe, div, nav").forEach(el => {
        if (!el.closest(".otp")) {
            el.disabled = false;
            el.style.opacity = "100";
            el.style.pointerEvent = "auto";
        }
    });
}

window.addEventListener("beforeunload", function() {
    cancelOtp();
})


function disableScroll() {
    document.body.style.overflow = "hidden";
}

function enableScroll() {
    document.body.style.overflow = "auto";
}

window.addE
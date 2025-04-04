import { otpMessage, sendOtp, cancelOtp } from "./otpFetching.js";
var otpEventAdded = false;
var inputList = document.querySelectorAll('.otp-cells input');

document.getElementById("sendBtn").addEventListener("click", function () {
    if (otpInterval) {
        console.log("Stopping previous interval:", otpInterval);
        clearInterval(otpInterval);
        otpInterval = null;
    }
    resetOtpInputs();
    otpTyping();
    sendOtp();
    disableScroll();
    disableAll();
    document.querySelector(".otp").style.display = "block";
    document.querySelectorAll(".otp-cells input")[0].focus();
    otpCountdown();
});

document.getElementById("exit").addEventListener("click", function () {
    if (otpInterval) {
        console.log("Clearing interval on exit:", otpInterval);
        clearInterval(otpInterval);
        otpInterval = null;
    }

    resetOtpInputs();
    enableAll();
    enableScroll();
    cancelOtp();
    document.querySelector(".otp").style.display = "none";
    document.querySelector(".loader").style.display = "none";
});

function otpTyping() {
    if (otpEventAdded) return;
    otpEventAdded = true;
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
                document.getElementById("exit").style.pointerEvents = "none";

                document.querySelector(".loader").style.display = "block";
                let otpInputedValue = [...inputList].map(inp => inp.value).join('');
                otpMessage(otpInputedValue, inputList);
            }
        });
    });
}

let otpInterval = null;

function otpCountdown() {
    if (otpInterval) {
        console.log("Stopping old interval before starting a new one:", otpInterval);
        clearInterval(otpInterval);
        otpInterval = null;
    }

    let otpTimeRange = 300;
    let endTime = Math.round(Date.now() / 1000 + otpTimeRange);

    otpInterval = setInterval(() => {
        let remainingTime = Math.round(endTime - Date.now() / 1000);
        let minutes = Math.trunc(remainingTime / 60);
        let seconds = remainingTime % 60;

        document.getElementById("remainingTime").textContent =
            `0${minutes} phút ${seconds < 10 ? "0" : ""}${seconds} giây`;

        if (remainingTime <= 0) {
            console.log("Time expired, clearing interval:", otpInterval);
            clearInterval(otpInterval);
            otpInterval = null;

            document.getElementById("remainingTimeOTPMessage").textContent = "Hết thời gian!";
            document.getElementById("remainingTime").style.display = "none";

            cancelOtp();
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    }, 1000);
}

function resetOtpInputs() {
    document.querySelectorAll(".otp-cells input").forEach(inp => {
        inp.value = "";
        inp.disabled = false;
        document.querySelectorAll(".otp-cells input")[0].focus();

    });
}

document.querySelectorAll(".contactInfo input, .contactInfo textarea").forEach((element) => {
    element.addEventListener("input", () => {
        const allInputsFilled = [...document.querySelectorAll(".contactInfo input, .contactInfo textarea")]
            .every(input => input.value.trim() !== "");
        console.log(allInputsFilled);
        document.querySelector(".contactInfo button").disabled = !allInputsFilled;
    });
});

function disableAll() {
    document.querySelectorAll("div, img, iframe, nav").forEach(el => {
        if (!el.closest(".otp")) {
            el.style.opacity = "0.5";
            el.style.pointerEvents = "none";
        }
    });
}

function enableAll() {
    document.querySelectorAll("div, img, iframe, nav").forEach(el => {
        if (!el.closest(".otp")) {
            el.style.opacity = "1";
            el.style.pointerEvents = "auto";
        }
    });
}

window.addEventListener("beforeunload", function () {
    if (otpInterval) {
        console.log("Clearing interval before unload:", otpInterval);
        clearInterval(otpInterval);
        otpInterval = null;
    }
    cancelOtp();
});

inputList.forEach((input, index) => {
    input.addEventListener("paste", function (event) {
        event.preventDefault();

        let pastedData = event.clipboardData.getData("text").trim();
        if (!/^\d+$/.test(pastedData)) return;

        let otpArray = pastedData.split("");

        inputList[0].focus();

        for (let i = 0; i < inputList.length; i++) {
            if (otpArray[i]) {
                inputList[i].value = otpArray[i];
            } else {
                inputList[i].value = "";
            }
        }

        otpMessage(pastedData, inputList);
    });
});


function disableScroll() {
    document.body.style.overflow = "hidden";
}

function enableScroll() {
    document.body.style.overflow = "auto";
}

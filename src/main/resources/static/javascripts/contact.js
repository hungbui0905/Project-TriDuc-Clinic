


var inputList = document.querySelectorAll('.otp-cells input')

function otpTyping() {
    var inputedOtp="";
    inputList.forEach((input) => {
        input.addEventListener('input', function () {
            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, 1);
            } else if (this.value.length === this.maxLength) {
                inputedOtp+=this.value;
                console.log("max length: "+ this.maxLength)
                console.log("length: "+ this.value.length)
                console.log("inputed otp: "+ inputedOtp)
                let nextCell = this.nextElementSibling;
                if (nextCell) nextCell.focus();
            }
            if ([...inputList].every(inp => inp.value.length === 1)) {
                [...inputList].every(inp => inp.disabled = true)
                document.querySelector(".loader").style.display = "block";
            }
        });
    console.log(inputedOtp);
    });

}



document.querySelectorAll(".contactInfo input, .contactInfo textarea").forEach((element) => {
    element.addEventListener("input", () => {
        const allInputsFilled = [...document.querySelectorAll(".contactInfo input, .contactInfo textarea")]
            .every(input => input.value.trim() !== "");

        document.querySelector(".contactInfo button").disabled = !allInputsFilled;
    });
});



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sendBtn").addEventListener("click", function () {
        document.querySelector(".otp").style.display = "block";
        document.querySelectorAll(".otp-cells input")[0].focus();
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


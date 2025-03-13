function h3alignment() {
    let namePhone = document.getElementById("namePhone");
    let phoneInput = document.getElementById("phoneInput");
    let npWidth = namePhone.offsetWidth;
    let inputWidth = phoneInput.offsetWidth;
    let paddingNum = (npWidth - (inputWidth * 2)) / 2;
    let h3Element = document.getElementById("h3Element");
    if (window.innerWidth > 500) {
        h3Element.style.paddingLeft = paddingNum + "px";
    } else {
        h3Element.style.paddingLeft = "0px";
    }
}


var inputList = document.querySelectorAll('.otp-cells input')


inputList.forEach((input) => {
    input.addEventListener('input', function () {
        if (this.value.length > this.maxLength) {
            this.value = this.value.slice(0, 1);
        } else if (this.value.length === this.maxLength) {
            let nextCell = this.nextElementSibling;
            if (nextCell) nextCell.focus();
        }
        if ([...inputList].every(inp => inp.value.length === 1)) {
            [...inputList].every(inp => inp.disabled = true)
            document.querySelector(".loader").style.display = "block";
        }
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




h3alignment();

window.addEventListener("DOMContentLoaded", h3alignment);
window.addEventListener("resize", h3alignment);

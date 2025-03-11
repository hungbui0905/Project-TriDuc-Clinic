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
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sendBtn").addEventListener("click", function () {
        document.querySelector(".otp").style.display = "block";
    });

    document.getElementById("exit").addEventListener("click", function () {
        document.querySelector(".otp").style.display = "none";
    });
});


Array.from( document.querySelector(".otp-cells").children).forEach(cell => {
    cell.addEventListener("input", function() {
        if(this.value.length === this.maxLength) {
            let nextCell = this.nextElementSibling;
            if (nextCell) nextCell.focus();
            this.disabled = true;
        }
    })
});


h3alignment();

window.addEventListener("DOMContentLoaded", h3alignment);
window.addEventListener("resize", h3alignment);

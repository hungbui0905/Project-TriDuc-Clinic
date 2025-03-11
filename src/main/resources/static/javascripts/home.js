function toggleMenu() {
    var menuIcon = document.getElementById("menuIcon");
    menuIcon.classList.toggle("active");

    checkWidth();
}

function toggleSearch() {
    var inputSearch = document.getElementById("searchIcon");
    inputSearch.classList.toggle("active");

    checkWidth();
}

function checkWidth() {
    let mainPicture = document.getElementById("mainPicture");
    let menuIconItem = document.getElementById("menuIconItem");
    let searchIconInput = document.getElementById("searchIconInput");
    let menuIconStyle = window.getComputedStyle(menuIconItem);
    let searchIconStyle = window.getComputedStyle(searchIconInput);
    if (window.innerWidth > 987) {
        mainPicture.style.marginTop = "0px";
    } else if(menuIconStyle.display === "block"){
        mainPicture.style.marginTop = menuIconItem.offsetHeight + "px";
    } else if (searchIconStyle.display === "block") {
        mainPicture.style.marginTop = searchIconInput.offsetHeight+ "px";
    } else {
        mainPicture.style.marginTop = "0px";
    }
}

window.addEventListener("resize", checkWidth);


function toggleSearchInput() {
    let searchInput = document.getElementById("searchInput");
    searchInput.style.border = "none";
}


const nav_links = document.querySelectorAll(".nav_link");
nav_links.forEach(navLink => {
    navLink.addEventListener("click", function () {
        nav_links.forEach(elt => {
            elt.className = "nav_link"
        })
        navLink.className = "nav_link active"
        const contentBloc = document.getElementById("contentBloc");
        const labels = contentBloc.querySelectorAll("label");
        labels.forEach(label => {
            label.className = ""
            if (label.getAttribute("for") === navLink.id) {
                label.className = "active"
            }
        })
    })
})

let btn = document.querySelector(".button"),
    spinIcon = document.querySelector(".spinner"),
    btnText = document.querySelector(".btn-text");

btn.addEventListener("click", () => {
    btn.style.cursor = "wait";
    btn.classList.add("checked");
    spinIcon.classList.add("spin");
    btnText.textContent = "chargement";

    setTimeout(() => {
        btn.style.pointerEvents = "none";
        spinIcon.classList.replace("spinner", "check");
        spinIcon.classList.replace("fa-circle-notch", "fa-check");
        btnText.textContent = "Done";

    }, 4500) //1s = 1000ms
});



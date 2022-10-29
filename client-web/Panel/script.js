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

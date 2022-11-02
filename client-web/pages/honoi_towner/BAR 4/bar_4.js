const menuIcon = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
	navbar.classList.toggle("change");
});

//Barre de chargement

document.querySelector('.page2').style.display = 'none';
document.getElementById('charge').classList.add('chargement');

setTimeout(()=> {

	document.getElementById('charge').classList.remove('chargement');
	document.querySelector('.page2').style.display = 'block';
}, 1000);

//The Modals


const modalTriggerliens = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modal");
const modalCloses = document.querySelectorAll(".modal-close");
const jouers = document.querySelector(".a2");
const colores = document.querySelector(".premier-a");

modalTriggerliens.forEach(elem => {
	elem.addEventListener("click", event => toggleModal(event.currentTarget.getAttribute("data-modal-target")));
});

modalCloses.forEach(elem => {
	 elem.addEventListener("click", event => toggleModal(event.currentTarget.closest(".modal").id));
});

modals.forEach(elem => {
	elem.addEventListener("click", event => {
		if(event.target.classList.contains("modal-close")) toggleModal(event.currentTarget.id);
	});
});


function toggleModal(modalId) {

	const modal = document.getElementById(modalId);

	if(getComputedStyle(modal).display==="flex"){
		modal.classList.add("modal-hide");
		jouers.style.display = "flex";
		setTimeout(() => {
			modal.style.display = "none";
			modal.classList.remove("modal-show","modal-hide");
			document.body.style.overflow = "initial";
		}, 200);
	}
	else {
		modal.style.display = "flex";
	   	jouers.style.display = "none";
	   	modal.classList.add("modal-show");
		document.body.style.overflow = "hidden";

	}
}

function aa(){
	var jeu = document.querySelector('.jeu');

	jeu.style.display = 'none';
}
aa();





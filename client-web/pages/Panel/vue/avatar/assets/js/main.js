/*=============== SHOW MODAL ===============*/
const showModal = (openButton, modalContent) =>{
    const openBtn = document.getElementById(openButton),
    modalContainer = document.getElementById(modalContent)
    
    if(openBtn && modalContainer){
        openBtn.addEventListener('click', ()=>{
            modalContainer.classList.add('show-modal')
        })
    }
}
showModal('open-modal','modal-container');
showModal('open-modalAvatar','modal-containerAvatar');

/*=============== CLOSE MODAL ===============*/
const closeBtn = document.querySelectorAll('.close-modal')
const closeBtnAvatar = document.querySelectorAll('.close-modalAvatar');

function closeModalAvatar(){
    const modalContainer = document.getElementById('modal-containerAvatar');
    modalContainer.classList.remove('show-modal');
    return true;
}

function closeModal(){
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.remove('show-modal');
    return true;
}


closeBtn.forEach(c => c.addEventListener('click', closeModal))
closeBtnAvatar.forEach(c => c.addEventListener('click', closeModalAvatar))

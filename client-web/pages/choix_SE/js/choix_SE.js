let btnHoverSOund = document.querySelector('#hoverButton'),//le son lorsqu'on click
    btnTapSOund = document.querySelector('#bouton'),//le son lorsqu'on click
    btntap = document.querySelectorAll(".glass");

btntap.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        btnHoverSOund.currentTime = 0.3;
        btnHoverSOund.play();
    });

    btn.addEventListener('click', function () {
        btnTapSOund.play();
    })

})

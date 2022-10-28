const text = document.querySelector(".circle .text-deplacement p");
// On decompose chaque cracractères en splusieur span pour faire une rotation
text.innerHTML = text.innerHTML.split("").map(
    (char, i) =>
        `<span style="transform:rotate(${i * 23.2}deg)">${char}</span>`
).join("");

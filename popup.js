document.addEventListener("DOMContentLoaded", function() {
    setTimeout(showPopup, 3000);
});

function showPopup() {
    const popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.style.display = 'flex';
    popupOverlay.style.opacity = 0;
    let opacity = 0;
    const fadeIn = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.1;
            popupOverlay.style.opacity = opacity;
        } else {
            clearInterval(fadeIn);
        }
    }, 30);
}

function closePopup() {
    const popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.style.display = 'none';
}

window.onclick = function(event) {
    const popupOverlay = document.getElementById('popup-overlay');
    if (event.target == popupOverlay) {
        closePopup();
    }
}

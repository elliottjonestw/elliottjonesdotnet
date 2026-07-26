function toggleDescription(id) {
    var desc = document.getElementById(id);
    var button = desc.previousElementSibling.querySelector('.toggle-button');
    if (desc.style.display === "none" || desc.style.display === "") {
        desc.style.display = "block";
        if (button) button.textContent = "-";
    } else {
        desc.style.display = "none";
        if (button) button.textContent = "+";
    }
}
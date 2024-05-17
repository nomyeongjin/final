const popup = document.querySelector("#popup");
const openStoreDetail = document.querySelectorAll(".open-storeDetail");
const closePopup = document.querySelector(".close-popup");

openStoreDetail.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        popup.style.display = 'block';
    });
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener("click", e => {
    if(e.target == popup) {
        popup.style.display = 'none';
    }
});
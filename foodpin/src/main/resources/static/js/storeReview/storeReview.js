const popupClose = document.querySelector("#popupClose");
const popupLayer = document.querySelector("#popupLayer");
const selectMenu = document.querySelector("#selectMenu");
const menuSection = document.querySelector("#menuSection");

popupClose.addEventListener("click", () => {
  menuSection.classList.add("popup-hidden");
});

selectMenu.addEventListener("click", ()=>{
  menuSection.classList.remove("popup-hidden");
});




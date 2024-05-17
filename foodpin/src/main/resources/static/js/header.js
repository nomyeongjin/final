const notificationBellBtn = document.querySelector(".notification-bell-btn");

if(notificationBellBtn != null){
    notificationBellBtn.addEventListener("click", () => {
        const notificationList = document.querySelector(".box-content");
        
        notificationList.classList.toggle("notification-show");
    })
}

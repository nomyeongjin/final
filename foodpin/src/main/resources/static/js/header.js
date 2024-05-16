const notificationBellBtn = document.querySelector(".notification-bell-btn");

if(notificationBellBtn != null){
    notificationBellBtn.addEventListener("click", () => {
        const notificationList = document.querySelector(".box-content");

        if (notificationList.contains("notification-show")) {
            notificationList.remove("notification-show");
            return;
        }
        
        notificationList.classList.add("notification-show");
    })
}

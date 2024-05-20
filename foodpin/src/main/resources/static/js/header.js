/* 알림 */
document.addEventListener('DOMContentLoaded', () => {

    const notificationBellBtn = document.querySelector(".notification-bell-btn");

    notificationBellBtn.addEventListener("click", () => {

        if(loginMember==null){
            alert("로그인 후 이용 가능한 서비스입니다.");
            return;
        }

        const notificationList = document.querySelector(".box-content");
        
        notificationList.classList.toggle("notification-show");
        notificationBellBtn.classList.toggle("action");
    })
});


let notificationSock;       // 알림 웹소켓 객체
let sendNotificationFn;     // 웹소켓을 이용해 알림을 보내는 함수

let notReadCheckFn;         // 비동기로 읽지 않은 알림 개수 체크하는 함수
let selectnNotificationFn; // 비동기 알림조회 함수

if(notificationLoginCheck) {

    notificationSock = new SockJS("/notification/send");
    

    /* 웹소켓을 이용해 알림을 전달하는 함수 */
    sendNotificationFn = (type, url, pkNo) => {

        const notification = {
            "notificationType" : type,
            "notificationUrl": url,
            "pkNo" : pkNo
        }

        notificationSock.send(JSON.stringify(notification));
    }
    

    /* 웹소켓을 통해 서버에서 전달된 메시지가 있을 경우 */
    notificationSock.addEventListener("message", e => {

        // 알람 버튼 활성화
        const notificationBtn = document.querySelector(".notification-bell-btn");
        notificationBtn.classList.remove("fa-regular");
        notificationBtn.classList.add("fa-solid");

        selectnNotificationFn();
    })


    /* 비동기 알림조회 */
    selectnNotificationFn = () =>{

        fetch("/notification")
        .then(resp => resp.json())
        .then(selectList => {

            const notiList = document.querySelector(".notification-list");
            notiList.innerHTML = "";

            for(let data of selectList) {
                const notiItem = document.createElement("li");
                notiItem.className = "notification-item";

                if(data.notificationCheck == 'N') {
                    notiItem.classList.add("not-read");
                }

                const notiText = document.createElement("div");
                notiText.className = "notification-text";

                notiText.addEventListener("click", e => {
                    
                    if(data.notificationCheck == 'N'){
                        fetch("/notification", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body : data.notificationNo
                        })
                    }

                    location.href = data.notificationUrl;
                })

                // 알림 내용 

                const border = document.createElement("div");
                border.className("border");

                // class="notification-content-container"
                const contentContainer = document.createElement("div");
                contentContainer.className("notification-contnet-container");

                // class="reservation-info"
                const reservationInfo = document.createElement("div");
                reservationInfo.className("reservation-info");

                //사진
                const img = document.createElement("img");
                img.className("profile");

                const notiTitle = document.createElement("span");
                notiTitle.className("notification-store");

                // 알림을 보낸 시간
                const notiDate = document.createElement("span");
                notiDate.className("notification-date");
                notiDate.innerText = data.notificationDate;

                // class="notification-content"
                const notiContent = document.createElement("div");
                notiContent.className("notification-content");

                // 알림내용
                const notiMessage = document.createElement("div");
                notiContent.className("notification-content");
                notiContent.innerHTML = data.notificationContent;

                const messageContent = document.createElement("span");
                messageContent.className("message-content");

                const xmark = document.createElement("i");
                xmark.className("fa-circle-xmark");



                /* 조립 */
                notiList.append(notiItem);
                notiTitle.append(notiText);
                notiText.append(border);
                border.append(contentContainer);

                contentContainer.append(reservationInfo, notiContent);

                reservationInfo.append(img);
                img.append(notiTitle);
                notiTitle.append(notiDate);

                notiContent.append(notiMessage);
                notiMessage.append(messageContent);
                messageContent.append(xmark);
            }

        })
    }
}
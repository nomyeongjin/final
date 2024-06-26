
/* 알림 */
document.addEventListener('DOMContentLoaded', () => {

    // 개인 채팅 페이지 이동
    const myChat = document.getElementById("myChat");

    if (myChat != null) {

        myChat.addEventListener("click", () => {

            location.href = "/chatting/chat?memberNo=" + memberNo;

        })
    }

    // 알림 아이콘 클릭 시 팝업 껐다 켰다
    const notificationBellBtn = document.querySelector(".notification-bell-btn");
    const notificationList = document.querySelector(".box-content");

    if (notificationBellBtn != null && notificationList != null) {

        notificationBellBtn.addEventListener("click", (event) => {
            notificationList.classList.toggle("notification-show");
            notificationBellBtn.classList.toggle("action");
            event.stopPropagation();
        });

        window.addEventListener("click", () => {
            if (notificationList.classList.contains("notification-show")) {
                notificationList.classList.remove("notification-show");
                notificationBellBtn.classList.remove("action");
            }
        });

        notificationList.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }



    // 알림 카테고리 클릭 시 색상 변환
    const category = document.querySelectorAll(".category");
    if (category != null && category.length > 0) {
        category[0].classList.add("click");
        for (let li of category) {

            li.addEventListener("click", () => {
                for (let item of category) {
                    item.classList.remove("click");
                }
                li.classList.add("click");
            });
        };
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

let chattingSock;
let notChattingCheckFn;

// span태그

if (notificationLoginCheck) {

    chattingSock = new SockJS("/chattingSock");

}

chattingSock.addEventListener("message", e => {

    notChattingCheckFn();

})

notChattingCheckFn = async () => {
    const resp = await fetch("/chatting/notReadChattingCount")
    const notReadChattingCount = await resp.text();
    const myChatBtn = document.querySelector("#myChat");

    if (notReadChattingCount == 0) {
        document.querySelector("#chatCount").classList.add("none");
        document.querySelector("#chatCount").classList.remove("notReadChattingCount");

        myChatBtn.classList.add("fa-regular");
        myChatBtn.classList.remove("fa-solid");

    } else {

        myChatBtn.classList.remove("fa-regular");
        myChatBtn.classList.add("fa-solid");


        document.querySelector("#chatCount").classList.remove("none");
        document.querySelector("#chatCount").classList.add("notReadChattingCount");
        document.querySelector("#chatCount").innerText = notReadChattingCount
    }
    return notReadChattingCount;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
let notificationSock;       // 알림 웹소켓 객체
let sendNotificationFn;      //웹소켓을 이용해 알림을 보내는 함수

let notReadCheckFn;          //비동기로 읽지 않은 알림 개수 체크하는 함수
let selectnNotificationFn;  //비동기 알림조회 함수

if (notificationLoginCheck) {

    notificationSock = new SockJS("/notification/send");


    /* 웹소켓을 이용해 알림을 전달하는 함수 */
    sendNotificationFn = (type, url, pkNo, reservDate, storeName, memberNickname, reportDate) => {

        const notification = {
            "notificationType": type,
            "notificationUrl": url,
            "pkNo": pkNo,
            "reservDate": reservDate,
            "storeName": storeName, /* === undefined ? null : storeName */
            "memberNickname": memberNickname,
            "reportDate": reportDate
        }

        notificationSock.send(JSON.stringify(notification));
    }


    /* 웹소켓을 통해 서버에서 전달된 메시지가 있을 경우 */
    notificationSock.addEventListener("message", e => {

        //알람 버튼 활성화
        const notificationBtn = document.querySelector(".notification-bell-btn");
        notificationBtn.classList.remove("fa-regular");
        notificationBtn.classList.add("fa-solid");

        notReadCheckFn();

        selectnNotificationFn();
    })

    notReadCheckFn = async () => {
        const resp = await fetch("/notification/notReadCheck")
        const notReadCount = await resp.text();
        const notificationBtn = document.querySelector(".notification-bell-btn");

        if (notReadCount == 0) {
            document.querySelector("#notificationCount").classList.add("none");
            document.querySelector("#notificationCount").classList.remove("notReadCount");

            notificationBtn.classList.add("fa-regular");
            notificationBtn.classList.remove("fa-solid");

        } else {

            notificationBtn.classList.remove("fa-regular");
            notificationBtn.classList.add("fa-solid");
            document.querySelector("#notificationCount").classList.remove("none");
            document.querySelector("#notificationCount").classList.add("notReadCount");

            document.querySelector("#notificationCount").innerText = notReadCount;
        }
        return notReadCount;
    }

    /* ******** 알림 조회 할 때 파라미터 전달을 다르게.... ********* */
    /* 비동기 알림조회 */
    selectnNotificationFn = (url) => {

        const requestUrl = url == undefined ? "/notification" : url;

        fetch(requestUrl)
            .then(resp => resp.json())
            .then(selectList => {

                const notiList = document.querySelector(".notification-list");
                notiList.innerHTML = "";

                for (let data of selectList) {

                    //알림 내용 
                    const border = document.createElement("div");
                    border.classList.add("border");

                    const contentContainer = document.createElement("div");
                    contentContainer.classList.add("notification-content-container");

                    if (data.notificationCheck == 'N') {

                        contentContainer.classList.remove("notification-content-container");
                        contentContainer.classList.add("not-read");

                    }

                    border.addEventListener("click", e => {

                        // 읽지 않은 알림인 경우
                        if (data.notificationCheck == 'N') {
                            fetch("/notification", {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: data.notificationNo
                            })
                        }

                        location.href = data.notificationUrl;
                    })

                    const temp = document.createElement("div");
                    temp.classList.add("temp");

                    //class="notification-content-container"

                    // class="reservation-info"
                    const reservationInfo = document.createElement("div");
                    reservationInfo.classList.add("reservation-info");

                    //사진
                    const img = document.createElement("img");
                    img.classList.add("image");
                    if (data.sendMemberProfileImg == null) img.src = notificationDefaultImage;   //기본 이미지
                    else img.src = data.sendMemberProfileImg; // 프로필 이미지

                    const notiTitle = document.createElement("span");
                    notiTitle.classList.add("notification-store");

                    // 알림을 보낸 시간
                    const notiDate = document.createElement("span");
                    notiDate.classList.add("notification-date");
                    notiDate.innerText = data.notificationDate;

                    //class="notification-content"
                    const notiContent = document.createElement("div");
                    notiContent.classList.add("notification-content");

                    //알림내용
                    const notiMessage = document.createElement("div");
                    notiMessage.classList.add("notification-message");
                    notiMessage.innerHTML = data.notificationContent;

                    const xmark = document.createElement("i");
                    xmark.classList.add('fa-regular', "fa-circle-xmark");

                    // 알림 삭제
                    xmark.addEventListener("click", e => {
                        fetch("/notification", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: data.notificationNo
                        })
                            .then(resp => resp.text())
                            .then(result => {
                                contentContainer.parentElement.remove();

                                notReadCheckFn().then(notReadCount => {

                                    const notificationBtn = document.querySelector(".notification-bell-btn");

                                    if (notReadCount > 0) {
                                        notificationBtn.classList.remove("fa-regular");
                                        notificationBtn.classList.add("fa-solid");
                                    } else {
                                        notificationBtn.classList.add("fa-regular");
                                        notificationBtn.classList.remove("fa-solid");
                                    }
                                })

                            })

                        e.stopPropagation();

                    })


                    /* 조립 */
                    notiList.append(border);
                    // border.append(temp);
                    border.append(contentContainer);
                    contentContainer.append(reservationInfo, notiContent);
                    reservationInfo.append(img, notiTitle, notiDate, xmark);
                    notiContent.append(notiMessage);
                    // notiMessage.append(xmark);

                }

            })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const notificationBtn = document.querySelector(".notification-bell-btn");
    const myChatBtn = document.querySelector("#myChat");

    notChattingCheckFn().then(notChattingCount => {

        if (notChattingCount > 0) {
            myChatBtn.classList.remove("fa-regular");
            myChatBtn.classList.add("fa-solid");



            document.querySelector("#chatCount").classList.remove("none");
            document.querySelector("#chatCount").classList.add("notReadChattingCount");

        } else {
            document.querySelector("#chatCount").classList.add("none");
            document.querySelector("#chatCount").classList.remove("notReadChattingCount");

            myChatBtn.classList.add("fa-regular");
            myChatBtn.classList.remove("fa-solid");

        }
    });

    notReadCheckFn().then(notReadCount => {

        if (notReadCount > 0) { // 알림이 있을 경우
            notificationBtn.classList.remove("fa-regular");
            notificationBtn.classList.add("fa-solid");

            document.querySelector("#notificationCount").classList.remove("none");
            document.querySelector("#notificationCount").classList.add("notReadCount");
        } else {

            notificationBtn.classList.add("fa-regular");
            notificationBtn.classList.remove("fa-solid");

            document.querySelector("#notificationCount").classList.add("none");
            document.querySelector("#notificationCount").classList.remove("notReadCount")
        }




    })

    notificationBtn.addEventListener("click", e => {
        const notiList = document.querySelector(".notification-list");

        if (notiList.classList.contains("notification-show")) {
            notiList.classList.remove("notification-show");
            return;
        }

        selectnNotificationFn();
        notiList.classList.add("notification-show");
    })
})


document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(location.search)
    const targetId = "c" + params.get("cn");

    let targetElement = document.getElementById(targetId);

    if (targetElement) {
        const scrollPosition = targetElement.offsetTop;
        window.scrollTo({
            top: scrollPosition - 200,
            behavior: 'smooth'
        });
    }
})
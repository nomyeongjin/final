document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {

        locale: 'kr',
        timeZone: 'UTC',
        initialView: 'dayGridMonth', // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
        events: [ // 일정 데이터 추가 , DB의 event를 가져오려면 JSON 형식으로 변환해 events에 넣어주면된다.
            {
                // title: '단체예약 (예약자명: 김예약)',
                start: '2024-05-16',
                // end: '2024-05-16'
            }
        ],
        editable: false
    });
    calendar.render();
});

const dateBgColor = document.querySelector(".fc .fc-daygrid-day.fc-day-today");
const selectDate = document.querySelector(".fc-theme-standard");




const storereservationbutton = document.querySelector("#storereservationbutton");

if(storereservationbutton != null) {
    storereservationbutton.addEventListener("click", () => {
        location.href = "/reservation/reservationDetail";
    });
};

// 예약 주의 사항
const noticeTitle = document.querySelector(".notice-title"); // button

if(noticeTitle !=null) {
    noticeTitle.addEventListener("click", () => {
        const noticeInnerDetail = document.querySelector(".notice-inner-detail");

        noticeInnerDetail.classList.toggle("show-box");
    });
}

//---------------------------

// 예약 인원 수 체크
const buttonItem = document.querySelectorAll(".button-item");

if(buttonItem != null) {
    for(let li of buttonItem) {

        li.addEventListener("click", () =>{
            for(let item of buttonItem){item.classList.remove("select");}
            li.classList.add("select");
        });
    };
}

// 예약 날짜 체크
const timeItem = document.querySelectorAll(".time-item");
if(timeItem != null) {
    for(let li of timeItem){
        li.addEventListener("click", () => {
            for(let item of timeItem){item.classList.remove("select");}
            li.classList.add("select");
        });
    };
}

// ------------------------------------------

// 처음 예약 페이지에서 '다음' 버튼 클릭 시 로그인 여부 확인 
const nextBtn = document.querySelector(".next-btn");
if(nextBtn != null){
    nextBtn.addEventListener("click", e => {
        if(loginMember == null) {
            alert("로그인 후 이용해 주세요");
            e.preventDefault();
            return;
        }
    });
}

/* 다음 페이지 클릭 할 때 체크박스 검사 */
const confirmBtn = document.querySelector("#confirmBtn");
confirmBtn.addEventListener("click", e => {

    /* 동의버튼 체크 x */
    const checkAgree = document.querySelector("#checkAgree");

    if(!checkAgree.checked){
        alert("개인정보 수집 및 제공 동의를 체크해 주세요");
        e.preventDefault();
        return;
    }

});



/* *** 예약 인원, 날짜 체크 *** */
// const detailObj = {
//     "reservCount": reservCount,

// }


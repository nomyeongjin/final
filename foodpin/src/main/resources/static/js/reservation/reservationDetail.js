const storereservationbutton = document.querySelector("#storereservationbutton");

if(storereservationbutton != null) {
    storereservationbutton.addEventListener("click", () => {
        location.href = "/reservation/reservationDetail";
    });
};

// 예약 주의 사항
const noticeTitle = document.querySelector(".notice-title"); // button

noticeTitle.addEventListener("click", () => {
    const noticeInnerDetail = document.querySelector(".notice-inner-detail");
    noticeInnerDetail.classList.toggle("show-box");
});

//---------------------------

// 예약 인원 수 체크
const buttonItem = document.querySelectorAll(".button-item");

for(let li of buttonItem) {

    li.addEventListener("click", () =>{
        for(let item of buttonItem){item.classList.remove("select");}
        li.classList.add("select");
        console.log(li);
    });
};

// 예약 날짜 체크
const timeItem = document.querySelectorAll(".time-item");

for(let li of timeItem){
    li.addEventListener("click", () => {
        for(let item of timeItem){item.classList.remove("select");}
        li.classList.add("select");
    });
};

// ------------------------------------------

/* 다음 페이지 클릭 할 때 로그인 검사 */

const nextBtn = document.querySelector("#nextBtn");
nextBtn.addEventListener("click", e => {
    if(loginMember == null) {
        alert("로그인 후 이용해 주세요");
        e.preventDefault();
        return;
    }
})


// 예약 주의 사항
const noticeTitle = document.querySelector(".notice-title"); // button

noticeTitle.addEventListener("click", () => {

    const noticeInnerDetail = document.querySelector(".notice-inner-detail");
    
    noticeInnerDetail.classList.toggle("show-box");
});



/* Full Calendar */
document.addEventListener('DOMContentLoaded', function () {

   var calendarEl = document.getElementById('calendar');
   var calendar = new FullCalendar.Calendar(calendarEl, {
       
       locale: 'kr',
       timeZone: 'UTC',
       initialView: 'dayGridMonth', // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
       events:[ // 일정 데이터 추가 , DB의 event를 가져오려면 JSON 형식으로 변환해 events에 넣어주면된다.
           {
               title:'단체예약 (예약자명: 김예약)',
               start:'2024-05-16',
               end:'2024-05-16'
           }
       ],
       editable: false
   });
   calendar.render();
 });
// ----------------------------- 

// 본문 div 영역
const listContainer = document.querySelector("#reservListContainer");


/**
 * 예약 정보 카드 생성하는 함수
 */
const createCard = () => {

   listContainer.innerHTML = "";

   // -- 샘플 요소 생성
   const reservCard = document.createElement("div");
   reservCard.classList.add("reserv-card");

   // 예약 유형
   const listTitleArea = document.createElement("div");
   listTitleArea.classList.add("list-title-area");

   const listTitle = document.createElement("p");
   listTitle.classList.add("list-title");
   listTitle.innerText = "확정 예약";

   const notification = document.createElement("p");
   notification.classList.add("fa-solid", "fa-circle");

   listTitleArea.append(listTitle, notification);

   // 예약 내용
   const listContent = document.createElement("div");
   listContent.classList.add("list-content");

   const row = document.createElement("div");
   row.classList.add("row");

   const name = document.createElement("p"); // 예약자 이름 -row -listContent
   name.innerHTML = "<span>예약자 이름 : </span>" + "김예약";

   const number = document.createElement("p"); // 예약자 이름 -row -listContent
   number.innerHTML = "<span>인원 : </span>" + "3명";

   const tel = document.createElement("p"); // 예약자 전화번호 -listContent
   tel.innerHTML = "예약자 전화번호 : </span>" + "010-1234-5678";

   const time = document.createElement("p"); // 예약 시간 -listContent
   time.innerHTML = "<span>예약자 시간 : </span>" + "13:00 ~ 14:00";

   row.append(name, number);
   listContent.append(row, tel, time);

   reservCard.append(listTitleArea, listContent);
   listContainer.append(reservCard);
};





/* 확정 예약 메뉴 */
const reservConfirm = document.querySelector("#reservConfirm");

reservConfirm.addEventListener("click", () => {

   listContainer.innerHTML = "";

   // 비동기로 정보 받아올것

   // -- 샘플 요소 생성
   const reservCard = document.createElement("div");
   reservCard.classList.add("reserv-card");

   // 예약 유형
   const listTitleArea = document.createElement("div");
   listTitleArea.classList.add("list-title-area");

   const listTitle = document.createElement("p");
   listTitle.classList.add("list-title");
   listTitle.innerText = "확정 예약";

   const notification = document.createElement("p");
   notification.classList.add("fa-solid", "fa-circle");

   listTitleArea.append(listTitle, notification);

   // 예약 내용
   const listContent = document.createElement("div");
   listContent.classList.add("list-content");

   const row = document.createElement("div");
   row.classList.add("row");

   const name = document.createElement("p"); // 예약자 이름 -row -listContent
   name.innerHTML = "<span>예약자 이름 : </span>" + "김예약";

   const number = document.createElement("p"); // 예약자 이름 -row -listContent
   number.innerHTML = "<span>인원 : </span>" + "3명";

   const tel = document.createElement("p"); // 예약자 전화번호 -listContent
   tel.innerHTML = "예약자 전화번호 : </span>" + "010-1234-5678";

   const time = document.createElement("p"); // 예약 시간 -listContent
   time.innerHTML = "<span>예약자 시간 : </span>" + "13:00 ~ 14:00";

   row.append(name, number);
   listContent.append(row, tel, time);

   reservCard.append(listTitleArea, listContent);
   listContainer.append(reservCard);
});

/* 예약 요청 메뉴 */
const reservApply = document.querySelector("#reservApply");

reservApply.addEventListener("click", () => {



});

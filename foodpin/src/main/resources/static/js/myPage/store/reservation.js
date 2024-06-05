

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



/**
 * 예약 정보 카드 생성하는 함수
 */
const createCard = (statusFl) => {

   fetch("/myPage/store/selectReserv?statusFl=" + statusFl)
   .then(resp => resp.text())
   .then(reservList => {

      listContainer.innerHTML = "";

      console.log(reservList);

      // for(let reserv of reservList) {
         
      //    console.log(reserv.memberName);
      //    console.log(reserv.reservTime);



      //    // // -- 샘플 요소 생성
      //    // const reservCard = document.createElement("div");
      //    // reservCard.classList.add("reserv-card");
   
      //    // // 예약 유형
      //    // const listTitleArea = document.createElement("div");
      //    // listTitleArea.classList.add("list-title-area");
   
      //    // const listTitle = document.createElement("p");
      //    // listTitle.classList.add("list-title");
   
      //    // if(reserv.reservStatusFl == "Y") listTitle.innerText = "확정 예약"; 
      //    // if(reserv.reservStatusFl == "N") listTitle.innerText = "예약 요청"; 
      //    // if(reserv.reservStatusFl == "C") listTitle.innerText = "취소 내역";
   
      //    // const notification = document.createElement("p");
      //    // notification.classList.add("fa-solid", "fa-circle");
      
      //    // listTitleArea.append(listTitle, notification);
      
      //    // // 예약 내용
      //    // const listContent = document.createElement("div");
      //    // listContent.classList.add("list-content");
      
      //    // const row = document.createElement("div");
      //    // row.classList.add("row");
      
      //    // const name = document.createElement("p"); // 예약자 이름 -row -listContent
      //    // name.innerHTML = "<span>예약자 이름 : </span>" + reserv.memberName;
      
      //    // const number = document.createElement("p"); // 예약자 이름 -row -listContent
      //    // number.innerHTML = "<span>인원 : </span>" + reserv.reservCount + "명";
      
      //    // const tel = document.createElement("p"); // 예약자 전화번호 -listContent
      //    // tel.innerHTML = "<span>예약자 전화번호 : </span>" + reserv.memberTel;
      
      //    // const time = document.createElement("p"); // 예약 시간 -listContent
      //    // time.innerHTML = "<span>예약자 시간 : </span>" + reserv.reservTime;
      
      //    // const request = document.createElement("p"); // 요청사항 -listContent
      //    // request.innerHTML = "<span>요청사항 : </span>" + reserv.reservRequest;
      
      //    // row.append(name, number);
      //    // listContent.append(row, tel, time, request);
      
      //    // // 예약 대기 목록 조회시에만
      //    // if(titleStatus == "N") {
      //    //    // 버튼 영역
      //    //    const listBtnArea = document.createElement("div");
      //    //    listBtnArea.classList.add("list-btn-area");
         
      //    //    const reservBtn = document.createElement("button");
      //    //    reservBtn.classList.add("list-btn");
      //    //    reservBtn.id = "reservBtn";
      //    //    reservBtn.innerText = "예약 승인";
      
      //    //    const reservRejectBtn = document.createElement("button");
      //    //    reservRejectBtn.classList.add("list-btn");
      //    //    reservRejectBtn.id = "reservRejectBtn";
      //    //    reservRejectBtn.innerText = "예약 거부";
      
      //    //    listBtnArea.append(reservBtn, reservRejectBtn);
      
      //    //    listContent.append(listBtnArea);
      //    // }
      
      //    // reservCard.append(listTitleArea, listContent);
      //    // listContainer.append(reservCard);
      // }
   });

   

   



};

/* 본문 영역, 메뉴 버튼 변수 선언 */
const listContainer = document.querySelector("#reservListContainer"); // 본문 div 영역

const reservAll = document.querySelector("#reservAll"); // 메뉴 버튼
const reservConfirm = document.querySelector("#reservConfirm");
const reservApply = document.querySelector("#reservApply");
const reservcancel = document.querySelector("#reservcancel");

let statusFl = ""; // 메뉴 구분용 변수 (임시)

/**
* (메뉴) 전체 버튼 클릭
*/
reservAll.addEventListener("click", () => {

   listContainer.innerHTML = "";

   createCard();

});


/**
   * (메뉴) 확정 예약 버튼 클릭
   */
reservConfirm.addEventListener("click", () => {

   statusFl = "Y";
   createCard(statusFl);
});

/**
  * (메뉴) 예약 요청 버튼 클릭
  */
reservApply.addEventListener("click", () => {
   // 비동기로 정보 받아올것 (reservList)
   // ...

    // 데이터 넣기 전까지 임시로 구분
   titleStatus = "N";

   createCard();
});

/**
* (메뉴) 취소 내역 버튼 클릭
*/
reservcancel.addEventListener("click", () => {
   // 비동기로 정보 받아올것 (reservList)
   // ...

   // 데이터 넣기 전까지 임시로 구분
   titleStatus = "C";

   createCard();
});

/* ------------------- */




addEventListener("DOMContentLoaded", () => {


   /**
    * (버튼) 예약 승인
    */
   document.querySelectorAll(".reserv-btn").forEach(btn => {
      
      btn.addEventListener("click", e => {
         const reservNo = e.target.closest("section").querySelector(".reserv-no").innerText;

         console.log(reservNo, storeNo);
         
         fetch("/myPage/store/updateReservStatus?reservNo=" + reservNo)
         .then(resp => resp.json())
         .then(result => {

            if(result > 0){
               alert("예약 번호 " + reservNo + "번 예약이 승인되었습니다.");
            }
         })
   
      }) // reservBtn.addEventListener("click"
   }); // forEach(reservBtn
});

document.addEventListener('DOMContentLoaded', function () {

   /**
    * 가게의 확정예약 리스트를 조회하고 일정이 추가된 달력 생성
    */
   const selectReservCal = () => {

      fetch("/myPage/store/reservConfirm?storeNo=" + storeNo)
      .then(resp => resp.json())
      .then(reservList => {
   
         // console.log(reservList);

         /* Full Calendar */
         let calendarEl = document.getElementById('calendar');

         // 캘린더 설정
         let calendar = new FullCalendar.Calendar(calendarEl, {
         
         locale: 'kr',
         timeZone: 'UTC',
         initialView: 'dayGridMonth',
         editable: false,
         dayMaxEvents: true,
         eventColor : '#DF8B4E',
         // eventClick : fn_calEventClick,
         // dateClick: function(){ createPopup(); }, //날짜 클릭시 해당일자 예약 표시하는 모달 생성
         
         // eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
         //    console.log(obj);
         //  },
         //  eventChange: function(obj) { // 이벤트가 수정되면 발생하는 이벤트
         //    console.log(obj);
         //  },
         //  eventRemove: function(obj){ // 이벤트가 삭제되면 발생하는 이벤트
         //    console.log(obj);
         //  },
         events: reservList,
         
         });

         calendar.render();
      })
      .catch( err => console.log(err)); // 예약 승인 처리 fetch
   } // selectReservCal

   selectReservCal();

   /**
    * (버튼) 예약 승인
    */
   document.querySelectorAll(".reserv-btn").forEach(btn => {

      btn.addEventListener("click", e => {
         const reservNo = e.target.closest("section").querySelector(".reserv-no").innerText;

         let reservDate = e.target.dataset.reservDate;

         // reservDate를 부분 문자열로 잘라내기
         const year = reservDate.slice(0, 4);
         const month = reservDate.slice(6, 8);
         const day = reservDate.slice(10, 12);
         const time = reservDate.slice(14);

         const date = new Date(`${year}-${month}-${day}T${time}`);

         // 요일을 계산
         const options = { weekday: 'short' };
         const dayOfWeek = date.toLocaleDateString('ko-KR', options);

         // 형식화된 문자열 생성
         const formattedDate = `${month}.${day}(${dayOfWeek}) ${time}`;
         reservDate = formattedDate;
   // console.log(reservDate);


         fetch("/myPage/store/updateReservStatus?reservNo=" + reservNo)
            .then(resp => resp.json())
            .then(result => {

               if (result > 0) {
                  alert("예약 번호 " + reservNo + "번 예약이 승인 처리되었습니다.");
               } else {
                  alert("예약 번호 " + reservNo + "번 예약 승인을 실패했습니다.");
               }
            })
            .catch(err => console.log(err)); // 예약 승인 처리 fetch

         // 알림
         sendNotificationFn("confirmReservation", null, reservNo,  reservDate, null);
      }) // reservBtn.addEventListener("click
   }); // forEach(reservBtn

   /**
    * (버튼) 예약 거부
    */
   document.querySelectorAll(".reserv-reject-btn").forEach(btn => {
      
      btn.addEventListener("click", e => {
         const reservNo = e.target.closest("section").querySelector(".reserv-no").innerText;

         let reservDate = e.target.dataset.reservDate;
         // reservDate를 부분 문자열로 잘라내기
         const year = reservDate.slice(0, 4);
         const month = reservDate.slice(6, 8);
         const day = reservDate.slice(10, 12);
         const time = reservDate.slice(14);

         const date = new Date(`${year}-${month}-${day}T${time}`);

         // 요일을 계산
         const options = { weekday: 'short' };
         const dayOfWeek = date.toLocaleDateString('ko-KR', options);

         // 형식화된 문자열 생성
         const formattedDate = `${month}.${day}(${dayOfWeek}) ${time}`;
         reservDate = formattedDate;

         // console.log(reservNo, storeNo);
         
         fetch("/myPage/store/rejectReservStatus?reservNo=" + reservNo)
         .then(resp => resp.json())
         .then(result => {

            if(result > 0){
               alert("예약 번호 " + reservNo + "번 예약이 거부 처리되었습니다.");
            }else {
               alert("예약 번호 " + reservNo + "번 예약 거부에 실패했습니다.");
            }
            
            console.log("reservNo: " + reservNo, "reservDate: " + reservDate);
            //  알림
            sendNotificationFn("noConfrimReservation", null, reservNo,  reservDate, null, null);
         })
         .catch( err => console.log(err)); // 예약 승인 처리 fetch


      }) // reservBtn.addEventListener("click"
   }); // forEach(reservBtn
}); // addEventListener('DOMContentLoaded'

 // ----------------------------- 



/**
 * 예약 정보 카드 생성하는 함수
 */
const createReservList = (reservStatusFl) => {
   
   listContainer.innerHTML = ""; // 이전 내용 지우기

   fetch("/myPage/store/selectReserv?storeNo=" + storeNo + "&reservStatusFl=" + reservStatusFl)
   .then(resp => resp.json())
   .then(reservList => {

      if(reservList.length == 0) {
         const noReserv = document.createElement("div");
         noReserv.classList.add("no-reserv");
         noReserv.innerText = "해당하는 예약이 존재하지 않습니다.";

         listContainer.append(noReserv);
      }

      console.log(reservList);

      for(let reserv of reservList) {

         const reservCard = document.createElement("section"); // 개별 카드를 구성하는 section
         reservCard.classList.add("reserv-card");
   
         const listTitleArea = document.createElement("div"); // 예약 유형 구성 div
         listTitleArea.classList.add("list-title-area");
   
         const listTitle = document.createElement("p"); // 예약 유형 p
         listTitle.classList.add("list-title");
   
         if(reserv.reservStatusFl == "Y") listTitle.innerText = "확정 예약"; 
         if(reserv.reservStatusFl == "N") listTitle.innerText = "예약 요청"; 
         if(reserv.reservStatusFl == "C") listTitle.innerText = "취소 내역";
   
         const reservNo= document.createElement("p");
         reservNo.classList.add('list-title', 'reserv-no');
         reservNo.innerText = reserv.reservNo;

         // const notification = document.createElement("p");
         // notification.classList.add("fa-solid", "fa-circle");
      
         // listTitleArea.append(listTitle, notification);

         listTitleArea.append(listTitle, reservNo);
      
         // 예약 내용
         const listContent = document.createElement("div");
         listContent.classList.add("list-content");
      
         // 예약 일자
         const rowTime = document.createElement("div"); 
         rowTime.classList.add("row-time");

         const dateTime = document.createElement("p"); // 예약 일자
         dateTime.innerHTML = "예약 일시 : ";

         const date = document.createElement("span"); // 예약일
         date.classList.add("reserv-date");
         date.innerText = reserv.reservDate;

         const time = document.createElement("span"); // 예약 시간
         time.classList.add("reserv-time");
         time.innerText = reserv.reservTime;

         const number = document.createElement("p"); // 인원
         number.innerHTML = "<span>인원 : </span>" + reserv.reservCount + "명";
         
         dateTime.append(date, time, number);
         rowTime.append(dateTime);

         // 예약 정보
         const row = document.createElement("div"); 
         row.classList.add("row");
         
         const name = document.createElement("p"); // 예약자명
         name.innerHTML = "<span>예약자명 : </span>" + reserv.memberName;

         const tel = document.createElement("p"); // 예약자 전화번호
         tel.innerHTML = "<span>예약자 전화번호 : </span>" + reserv.memberTel;
      
         row.append(name, tel);
         listContent.append(rowTime, row);

         // 요청사항 내용 존재시에만
         if(reserv.reservRequest != null) {
            const request = document.createElement("p"); 
            request.innerHTML = "<span>요청사항 : </span>" + reserv.reservRequest;
            listContent.append(request);
         }
      
         // 예약 대기 목록 조회시에만
         if(reserv.reservStatusFl == "N") {
            // 버튼 영역
            const listBtnArea = document.createElement("div");
            listBtnArea.classList.add("list-btn-area");
         
            const reservBtn = document.createElement("button");
            reservBtn.classList.add("reserv-btn");
            reservBtn.dataset.reservDate = `${reserv.reservDate} ${reserv.reservTime}`;
            reservBtn.innerText = "예약 승인";
      
            const reservRejectBtn = document.createElement("button");
            reservRejectBtn.classList.add("reserv-reject-btn");
            reservRejectBtn.innerText = "예약 거부";
      
            listBtnArea.append(reservBtn, reservRejectBtn);
      
            listContent.append(listBtnArea);
         }
      
         reservCard.append(listTitleArea, listContent);
         listContainer.append(reservCard);
      }
   });
};

/* 본문 영역, 메뉴 버튼 변수 선언 */
const listContainer = document.querySelector("#reservListContainer"); // 본문 div 영역

const reservAll = document.querySelector("#reservAll"); // 메뉴 버튼
const reservConfirm = document.querySelector("#reservConfirm");
const reservApply = document.querySelector("#reservApply");
const reservcancel = document.querySelector("#reservcancel");

let reservStatusFl = ""; // 메뉴 구분용 변수

/**
* (메뉴) 전체 버튼 클릭
*/
reservAll.addEventListener("click", () => {

   reservStatusFl = "";

   // 서브 메뉴에 버튼 기존 체크 클래스 제거 + 해당 메뉴 체크
   document.querySelectorAll(".sub-title-btn").forEach(menu => { 

      menu.classList.remove('title-btn-checked');
   });
   reservAll.classList.add('title-btn-checked'); // 전체 버튼에 체크 클래스 추가

   createReservList(reservStatusFl);
});


/**
   * (메뉴) 확정 예약 버튼 클릭
   */
reservConfirm.addEventListener("click", () => {

   reservStatusFl = "Y";

   // 서브 메뉴에 버튼 기존 체크 클래스 제거 + 해당 메뉴 체크
   document.querySelectorAll(".sub-title-btn").forEach(menu => { 

      menu.classList.remove('title-btn-checked');
   });
   reservConfirm.classList.add('title-btn-checked'); // 전체 버튼에 체크 클래스 추가

   createReservList(reservStatusFl);
});

/**
  * (메뉴) 예약 요청 버튼 클릭
  */
reservApply.addEventListener("click", () => {

   reservStatusFl = "N";

   // 서브 메뉴에 버튼 기존 체크 클래스 제거 + 해당 메뉴 체크
   document.querySelectorAll(".sub-title-btn").forEach(menu => { 

      menu.classList.remove('title-btn-checked');
   });
   reservApply.classList.add('title-btn-checked'); // 전체 버튼에 체크 클래스 추가

   createReservList(reservStatusFl);
});

/**
* (메뉴) 취소 내역 버튼 클릭
*/
reservcancel.addEventListener("click", () => {

   reservStatusFl = "C";

   // 서브 메뉴에 버튼 기존 체크 클래스 제거 + 해당 메뉴 체크
   document.querySelectorAll(".sub-title-btn").forEach(menu => { 

      menu.classList.remove('title-btn-checked');
   });
   reservcancel.classList.add('title-btn-checked'); // 전체 버튼에 체크 클래스 추가

   createReservList(reservStatusFl);
});


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
         eventColor : '#e14c54ba',
         events: reservList,
         eventClick : function(info) { reservPopup(info.event.id); },
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

      // 존재하지 않는 경우
      if(reservList.length == 0) {
         const noReserv = document.createElement("div");
         noReserv.classList.add("no-reserv");
         noReserv.innerText = "해당하는 예약이 존재하지 않습니다.";

         listContainer.append(noReserv);
      }

      // 존재하는 경우
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
         if(reserv.reservStatusFl == "X") listTitle.innerText = "노쇼 예약";
   
         const reservNo= document.createElement("p");
         reservNo.classList.add('list-title', 'reserv-no');
         reservNo.innerText = reserv.reservNo;
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
         
            // 예약 승인 버튼 생성 + 버튼 클릭시 이벤트 
            const reservBtn = document.createElement("button");
            reservBtn.classList.add("reserv-btn");
            reservBtn.dataset.reservDate = `${reserv.reservDate} ${reserv.reservTime}`;
            reservBtn.dataset.memberTel = `${reserv.memberTel}`;
            reservBtn.dataset.storeName = `${reserv.storeName}`;
            reservBtn.innerText = "예약 승인";

            reservBtn.addEventListener("click", e => {

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

                let memberTel = e.target.dataset.memberTel;
               let storeName = e.target.dataset.storeName;
      
               fetch("/myPage/store/sendMessage", {
                  method :"POST",
                  headers : {"Content-Type" : "application/json"},
                  body : JSON.stringify({
                     memberTel: memberTel,
                     storeName: storeName,
                     reservDate: reservDate
                 })
               })
               .then(resp => resp.text())
               .then(result => {
                  if(result != null){
                     console.log("문자 발송 성공"); 
                  } else {
                     console.log("문자 발송 실패");
                  }
               })
      
      
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

            }) // reservBtn.addEventListener("click" <- 예약대기 예약 버튼

      

            // 예약 거부
            const reservRejectBtn = document.createElement("button");
            reservRejectBtn.classList.add("reserv-reject-btn");
            reservRejectBtn.dataset.reservDate = `${reserv.reservDate} ${reserv.reservTime}`;
            reservRejectBtn.dataset.memberTel = `${reserv.memberTel}`;
            reservRejectBtn.dataset.storeName = `${reserv.storeName}`;
            reservRejectBtn.innerText = "예약 거부";

            reservRejectBtn.addEventListener("click", e => {
               
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

               let memberTel = e.target.dataset.memberTel;
               let storeName = e.target.dataset.storeName;
      
               // 예약 거부 문자 보내기
               fetch("/myPage/store/sendReject", {
                  method :"POST",
                  headers : {"Content-Type" : "application/json"},
                  body : JSON.stringify({
                     memberTel: memberTel,
                     storeName: storeName,
                     reservDate: reservDate
                 })
               })
               .then(resp => resp.text())
               .then(result => {
                  if(result != null){
                     console.log("문자 발송 성공");
                  } else {
                     console.log("문자 발송 실패");
                  }
               })
               
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
      
            }) // reservRejectBtn.addEventListener("click" <- 예약 거절 버튼

            listBtnArea.append(reservBtn, reservRejectBtn);
            listContent.append(listBtnArea);
         }

         // 지난 예약 조회시에만
         else if(reservStatusFl == "P") {
            // 버튼 영역
            const listBtnArea = document.createElement("div");
            listBtnArea.classList.add("list-btn-area");
      
            if(reserv.reservStatusFl != "X") { // 노쇼 처리된 예약이 아닐때 버튼 생성 + 처리
               const reservNoshowBtn = document.createElement("button");
               reservNoshowBtn.classList.add("reserv-noshow-btn");
               reservNoshowBtn.dataset.memberNo = `${reserv.memberNo}`;
               reservNoshowBtn.dataset.memberFlag = `${reserv.memberFlag}`;
               reservNoshowBtn.dataset.memberEmail = `${reserv.memberEmail}`;
               reservNoshowBtn.dataset.reservDate = `${reserv.reservDate}`;
               reservNoshowBtn.dataset.reservTime = `${reserv.reservTime}`;
               reservNoshowBtn.dataset.memberTel = `${reserv.memberTel}`;
               reservNoshowBtn.dataset.storeName = `${reserv.storeName}`;
               reservNoshowBtn.innerText = "노쇼 등록";

               listBtnArea.append(reservNoshowBtn);
               listContent.append(listBtnArea);

               reservNoshowBtn.addEventListener("click", e => {
                  const memberFlag = reservNoshowBtn.dataset.memberFlag;
                  const memberEmail = reservNoshowBtn.dataset.memberEmail;
                  const memberTel = reservNoshowBtn.dataset.memberTel;
                  const storeName = reservNoshowBtn.dataset.storeName;
                  console.log("경고 " + memberFlag);

                  const memberNo = reservNoshowBtn.dataset.memberNo;

                  let reservDate = reservNoshowBtn.dataset.reservDate;
                  const reservTime = reservNoshowBtn.dataset.reservTime;
                  // reservDate를 부분 문자열로 잘라내기
                  const year = reservDate.slice(0, 4);
                  const month = reservDate.slice(6, 8);
                  const day = reservDate.slice(10, 12);

                  const date = new Date(`${year}-${month}-${day}T${reservTime}`);

                  // 요일을 계산
                  const options = { weekday: 'short' };
                  const dayOfWeek = date.toLocaleDateString('ko-KR', options);

                  // 형식화된 문자열 생성
                  const formattedDate = `${month}.${day}(${dayOfWeek}) ${reservTime}`;
                  reservDate = formattedDate;

                  // console.log(memberNo);

                  // 노소 누적 1회 시 알림 발송
                  if (memberFlag == 0) {
                     sendNotificationFn("reservFirstNoshow", null, memberNo, reservDate, null, null, null)
                  };

                  // 노소 누적 2회 시 알림 발송
                  if (memberFlag == 1) {
                     sendNotificationFn("reservSecondNoshow", null, memberNo, reservDate, null, null, null)
                  };

                  // 노쇼 3회 달성 메일 발송
                  if(memberFlag == 2) {
                     fetch("/email/memberFlag", {
                        method: "POST",
                        headers : {"content-type" : "application/json"},
                        body : memberEmail
                     })
                     .then(response => response.text())
                     .then(result => {
                        if(result == 1) {
                           console.log("메일 발송 성공");
                        } else {
                           console.log("메일 발송 실패");
                        }
                     })
                  }

                  fetch("/myPage/store/sendNoshow", {
                     method : "POST",
                     headers : {"content-type" : "application/json"},
                     body : JSON.stringify({
                        memberTel: memberTel,
                        storeName: storeName,
                        reservDate: reservDate
                    })
                  }) 
                  .then(resp => resp.text())
                  .then(result => {
                     if(result != null) {
                        console.log("노쇼 발송 성공");
                     } else {
                        console.log("노쇼 발송 실패");
                     }
                  })

                  const reservNo = e.target.closest("section").querySelector(".reserv-no").innerText;
                  // console.log(reservNo);
                  fetch("/myPage/store/noshowReserv?reservNo=" + reservNo + "&memberNo=" + reservNoshowBtn.dataset.memberNo)
                     .then(resp => resp.json())
                     .then(result => {
         
                        if (result > 0) alert("예약 번호 " + reservNo + "번 노쇼 처리되었습니다.");
                        else alert("예약 번호 " + reservNo + "번 노쇼 승인을 실패했습니다.");
                     })
                     .catch(err => console.log(err)); // 예약 승인 처리 fetch
         
                  // 알림
                  // 우선 주석 처리 해뒀습니다.!!! result 1 : 경고 누적 / result 2 : 탈퇴
                  // sendNotificationFn("confirmReservation", null, reservNo,  reservDate, null);
               })// 노쇼 버튼 생성
            }
            // 노쇼 처리된 경우 취소 버튼 활성화
            else if (reserv.reservStatusFl == 'X'){
               const NoshowCancelBtn = document.createElement("button");
               NoshowCancelBtn.classList.add("noshow-cancel-btn");
               NoshowCancelBtn.innerText = "노쇼 취소";

               listBtnArea.append(NoshowCancelBtn);
               listContent.append(listBtnArea);

               NoshowCancelBtn.addEventListener("click", e => {
                  const reservNo = e.target.closest("section").querySelector(".reserv-no").innerText;
                  fetch("/myPage/store/NoshowCancel?reservNo=" + reservNo)
                  .then(resp => resp.json())
                  .then(result => {
      
                     if (result > 0) alert("예약 번호 " + reservNo + "번 노쇼 취소 처리되었습니다.");
                     else alert("예약 번호 " + reservNo + "번 노쇼 취소 처리에 실패했습니다.");
                  })
                  .catch(err => console.log(err)); // 예약 승인 처리 fetch
               }); // NoshowCancelBtn.addEventListener("click"
            }

         } // 지난 내역 조회

         reservCard.append(listTitleArea, listContent);
         listContainer.append(reservCard);
      }
   });

};



// ----------------------------------------------------
 
/* 본문 영역, 메뉴 버튼 변수 선언 */
const listContainer = document.querySelector("#reservListContainer"); // 본문 div 영역

const reservAll = document.querySelector("#reservAll"); // 메뉴 버튼
const reservConfirm = document.querySelector("#reservConfirm");
const reservApply = document.querySelector("#reservApply");
const reservcancel = document.querySelector("#reservcancel");
const reservPrev = document.querySelector("#reservPrev");

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

   /**
    * (버튼) 예약 승인
    */
   const reservBtnList = document.querySelectorAll(".reserv-btn");
         
   console.log(reservBtnList);
      
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

/**
* (메뉴) 지난 내역 버튼 클릭
*/
reservPrev.addEventListener("click", () => {

   reservStatusFl = "P";

   // 서브 메뉴에 버튼 기존 체크 클래스 제거 + 해당 메뉴 체크
   document.querySelectorAll(".sub-title-btn").forEach(menu => { 

      menu.classList.remove('title-btn-checked');
   });
   reservPrev.classList.add('title-btn-checked'); // 전체 버튼에 체크 클래스 추가

   createReservList(reservStatusFl);
});














// --------------------------------------------------
const popupLayer = document.querySelector("#popupLayer");

let popupCheck = 0; // 등록 0 / 수정, 삭제 1
let count = 0; // 등록된 휴무 갯수

/**
 * 일정 등록/수정 팝업창 생성 
 */
let addBtn = document.querySelector("#addBtn"); //  팝업창 - 일정 등록 버튼

const reservPopup = (reservNo) => {
   
   console.log(reservNo);
   
   fetch("/myPage/store/reservDetail?reservNo=" + reservNo)
   .then(resp => resp.json())
   .then(reserv => {

      const popupFrm = document.createElement("form");
      popupFrm.classList.add("popup-container");

      const divReservNo = document.createElement("div"); // 예약 번호
      divReservNo.classList.add("popup-row-reserv");
      divReservNo.innerText = "예약 번호 : ";

      const inputReservNo = document.createElement("p");  // 예약 번호 input
      inputReservNo.setAttribute("type", "text");
      inputReservNo.innerText = reservNo;
      divReservNo.append(inputReservNo);

      const divReservDateTime = document.createElement("div"); // 예약일
      divReservDateTime.classList.add("popup-row-reserv");
      divReservDateTime.innerText = "예약일 : ";

      const inputDate = document.createElement("p");  // 예약일 input
      inputDate.setAttribute("type", "text");
      inputDate.innerText = reserv.reservDate;

      const inputTime = document.createElement("p");  // 예약일 input
      inputTime.setAttribute("type", "text");
      inputTime.innerText = reserv.reservTime;
      divReservDateTime.append(inputDate, inputTime);

      const divReservCount = document.createElement("div"); // 예약 인원
      divReservCount.classList.add("popup-row-reserv");
      divReservCount.innerText = "예약 인원 : ";

      const inputReservCount = document.createElement("p");  // 예약 인원 input
      inputReservCount.setAttribute("type", "text");
      inputReservCount.innerText = reserv.reservCount + " 인";
      divReservCount.append(inputReservCount);

      const divMemberName = document.createElement("div"); // 예약자명
      divMemberName.classList.add("popup-row-reserv");
      divMemberName.innerText = "예약자명 : ";

      const inputMemberName = document.createElement("p");  // 예약자명 input
      inputMemberName.setAttribute("type", "text");
      inputMemberName.innerText = reserv.memberName;
      divMemberName.append(inputMemberName);

      const divMemberTel = document.createElement("div"); // 전화번호
      divMemberTel.classList.add("popup-row-reserv");
      divMemberTel.innerText = "전화번호 : ";

      const inputMemberTel = document.createElement("p");  // 전화번호 input
      inputMemberTel.setAttribute("type", "text");
      inputMemberTel.innerText = reserv.memberTel;
      divMemberTel.append(inputMemberTel);

      popupFrm.append(divReservNo, divReservDateTime, divReservCount, divMemberName, divMemberTel);
      
      // 요청사항이 있는 경우
      if(reserv.reservRequest != null) {
         const divReservRequest = document.createElement("div"); // 예약 요청사항
         divReservRequest.classList.add("popup-row");
         divReservRequest.innerText = "예약 요청사항 : " + reserv.reservRequest;
         popupFrm.append(divReservRequest);
      }

      // const btnRow = document.createElement("div"); // 버튼 영역
      // btnRow.classList.add("popup-row");

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.classList.add("popup-btn");
      cancelBtn.innerText = "확인";
      popupFrm.append(cancelBtn);

      listContainer.append(popupFrm);
      
      /**
       * (버튼) 확인 - 팝업창
       */
      cancelBtn.addEventListener("click", () => {

         popupFrm.remove();
      })

      window.addEventListener("click", () => {
         popupFrm.remove();
      })

      // 팝업창 외 다른 클릭 이벤트 방지
   })


};


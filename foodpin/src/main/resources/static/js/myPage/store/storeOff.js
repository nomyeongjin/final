/* 가게 정보 수정 (휴무일) */

/* full Calendar 변수 생성 */
const calendarEl = document.createElement("div"); // 달력 넣어줄 div 생성
calendarEl.id = "calendar";

let calendar;

/**
 * full Calendar 생성하는 함수
 */
function calendar_rendering() {

   /*  DB에서 휴무일 목록 조회 */
   fetch("/myPage/store/calendarOffSelect", {
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify(storeNo)
   })
   .then(resp => resp.json())
   .then(map => {

      const arr = []; // 개별의 일정 map을 배열로 묶은 형태로 추가해야함
      arr.push(map);

      // 캘린더 생성
      calendar = new FullCalendar.Calendar(calendarEl, {
   
         locale: 'kr',
         timeZone: 'UTC',
         initialView: 'dayGridMonth', // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
         editable: false, // false로 변경 시 draggable 작동 x
         //eventColor : '#5c6a96' // 이벤트 색상,
         // eventClick : fn_calEventClick, // 이벤트 클릭 시

         // 화면 구현용 샘플 데이터
         events: arr,
         
         // 헤더
         headerToolbar: { left: 'addEventButton', center: 'title' },
         
         // 커스텀 버튼 설정에서 일정 추가 버튼 추가
         customButtons: {
            addEventButton: { // 추가한 버튼 설정
                  text : "일정 추가",  // 버튼 내용
                  click : function(){ createPopup(); }
            }
         } 
      });
      calendar.render();
   })
}



/**
 * 
 * @param {*} tagName 태그명
 * @param {*} text : week + "요일"
 * @returns 
 */
const createLi = (tagName, week) => {
   const el = document.createElement(tagName); // li 태그 생성
   el.classList.add("week-li"); // 클래스 추가
   
   el.innerText = week; // 내용 추가
 
   return el;
 }
// --------------------------------------

/* 본문 영역, 서브메뉴 버튼 변수 선언 */
const StoreOffContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역

const infoBtn = document.querySelector("#infoBtn");
const menuBtn = document.querySelector("#menuBtn");
const dayoffBtn = document.querySelector("#dayoffBtn");


// /**
//  * 고정 휴무일 정보 DB 조회
//  */
// const selectWeekOff = () => {

//    fetch("/myPage/store/selectWeekOff", {
//       method : "POST",
//       headers : {"content-Type" : "application/json"},
//       body : JSON.stringify(storeNo)
//    })
//    .then(resp => resp.json())
//    .then(offList => {

//       console.log(offList);
//    })
// }


/**
 * (메뉴) 휴무일 버튼 클릭시 화면 구성
 */
dayoffBtn.addEventListener("click", () => {

   StoreOffContainer.innerText = ""; // 기존 내용 지우기
   
   // selectWeekOff(); // 기존 고정 휴무 정보 조회


   // 고정 휴무일
   const offWeekSection = document.createElement("section");
   offWeekSection.classList.add("section-title");
   offWeekSection.innerHTML = "고정 휴무일";

   const weekOffFrm = document.createElement("form"); // div 생성
   weekOffFrm.id = "off-container";

   const ul = document.createElement("ul"); // ul 생성
   ul.classList.add("week-row");

   const weekList = ['일', '월', '화', '수', '목', '금', '토'];
   const dayWeek = ['sun', 'mon', 'tue ', 'wed ', 'thu ', 'fri ', 'sat'];

   // 각 요일 li 생성 
   for(const week of weekList) {

      const li = document.createElement("li");
      li.classList.add("week-li");
      li.innerText = week + "요일";
      ul.append(li);
   }

   // 고정 휴무일 DB값 조회된 경우 checked 값 추가 (.fc-day-mon)
   fetch("/myPage/store/selectWeekOff", {
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify(storeNo)
   })
   .then(resp => resp.json())
   .then(offList => {

      for(let off of offList){

         document.querySelectorAll(".week-li").forEach( (item, index) => {

            if(off.offWeek === index) {
               item.classList.add('checked');
               // (.fc-day-mon)
               // item.classList.add('checked');
               
            }
         })
      }
   })


   const weekBtn = document.createElement("button");
   weekBtn.classList.add("update-btn");
   weekBtn.id = "offUpdateBtn";
   weekBtn.innerText = "고정 휴무일 수정";

   weekOffFrm.append(ul, weekBtn);


   
   // --------------------------------

   // 지정 휴무일
   const offDaySection = document.createElement("section");
   offDaySection.classList.add("section-title");
   offDaySection.innerHTML = "지정 휴무일";

   const offDayEditFrm = document.createElement("form"); // form 생성
   offDayEditFrm.id = "offDayEditFrm";

   const dayOffContainer = document.createElement("div"); // div 생성
   dayOffContainer.classList.add("off-container");
   
   
   dayOffContainer.append(calendarEl);
   offDayEditFrm.append(dayOffContainer);
   
   // 마이페이지 본문 컨테이너에 각 휴무일 section, form 추가
   StoreOffContainer.append(offWeekSection, weekOffFrm, offDaySection, offDayEditFrm);
   calendar_rendering() // 달력 생성 함수 호출(calendarEl 내부에 생성)
});




// /**
//  * 고정 휴무일 체크
//  */
// const weekList = document.querySelectorAll(".week-li"); // 휴무 요일 각 li 태그

// weekList.forEach( (item, index) => {

//    selectWeekOff();
   
//    if(index === offList) item.classList.add('checked');
// })


// for(let li of weekList) {

//    li.addEventListener("click", () => {

//       li.classList.toggle('checked');
//       console.log("checked");

//    })
// }

/**
 * 일정 등록하는 팝업창 생성 
 */
let addBtn = document.querySelector("#addBtn"); //  팝업창 - 일정 등록 버튼

const createPopup = () => {

   const popupFrm = document.createElement("form");
   popupFrm.classList.add("popup-container");

   const titleRow = document.createElement("div"); // 일정명
   titleRow.classList.add("popup-row");
   titleRow.innerText = "일정명 : ";

   const title = document.createElement("input"); 
   title.setAttribute("type", "text");
   title.id = "title";
   titleRow.append(title);

   const startRow = document.createElement("div"); // 시작 일자
   startRow.classList.add("popup-row");
   startRow.innerText = "시작 일자 : ";

   const start = document.createElement("input"); 
   start.setAttribute("type", "date");
   start.id = "start";
   startRow.append(start);

   const endRow = document.createElement("div"); // 종료 일자
   endRow.classList.add("popup-row");
   endRow.innerText = "종료 일자 : ";

   const end = document.createElement("input"); 
   end.setAttribute("type", "date");
   end.id = "end";
   endRow.append(end);

   const btnRow = document.createElement("div"); // 버튼 영역
   btnRow.classList.add("popup-row");

   addBtn = document.createElement("button");
   addBtn.classList.add("popup-row");
   addBtn.id = "addBtn";
   addBtn.innerText = "휴무 등록";

   const cancelBtn = document.createElement("button");
   cancelBtn.classList.add("popup-row");
   cancelBtn.innerText = "취소";

   btnRow.append(addBtn, cancelBtn);
   popupFrm.append(titleRow, startRow, endRow, btnRow);
   testArea.append(popupFrm);


   /**
    *  (버튼) 휴무 일정 등록 - 팝업창
    */
   addBtn.addEventListener("click", () => {

      const off = {
         "storeNo" : storeNo,
         "offDayTitle" : title.value,
         "offWeekStart" : start.value,
         "offWeekEnd" : end.value
      };

      fetch("/myPage/store/calendarOffInsert", {
         method : "POST",
         headers : {"content-Type" : "application/json"},
         body : JSON.stringify(off)
      })
      .then(resp => resp.json())
      .then(result => {

         if(result > 0) {
            console.log("휴무 일정 등록 성공");
         }
      })

   });


};

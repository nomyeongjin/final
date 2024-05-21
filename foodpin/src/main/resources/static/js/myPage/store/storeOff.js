/* 가게 정보 수정 (휴무일) */

/* full Calendar */
const calendarEl = document.createElement("div"); // 달력 넣어줄 div 생성
calendarEl.id = "calendar";

let calendar;

/**
 * full Calendar 생성하는 함수
 */
function calendar_rendering() {
   calendar = new FullCalendar.Calendar(calendarEl, {

      locale: 'kr',
      timeZone: 'UTC',
      initialView: 'dayGridMonth', // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
      editable: true, // false로 변경 시 draggable 작동 x 
      


      // 화면 구현용 샘플 데이터
      events:[ // 일정 데이터 추가 , DB의 event를 가져오려면 JSON 형식으로 변환해 events에 넣어주면된다.
         {
            title:'개인 사정',
            start:'2024-05-16',
            end:'2024-05-16'
         },
         {
            title:'개인 사정2',
            start:'2024-05-20',
            end:'2024-05-20'
         }
      ],
      
      // 헤더에 일정 추가 버튼 추가
      headerToolbar: {
         left: 'addEventButton',
         center: 'title'

      },

      // 커스텀 버튼 설정에서 일정 추가 버튼 추가
      customButtons: {
         addEventButton: { // 추가한 버튼 설정
               text : "일정 추가",  // 버튼 내용
               click : function(){ // 버튼 클릭 시 이벤트 추가
               
                  console.log("일정 추가 버튼 클릭됨");

                  createPopup();
            }
         }
      } 




      // ^^^ 설정 추가 마지막 ^^^
   });
   calendar.render();
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
const container = document.querySelector(".myPage-content-container"); // 본문 div 영역

const infoBtn = document.querySelector("#infoBtn");
const menuBtn = document.querySelector("#menuBtn");
const dayoffBtn = document.querySelector("#dayoffBtn");


/**
 * (메뉴) 휴무일 버튼 클릭시 화면 구성
 */
dayoffBtn.addEventListener("click", () => {

   console.log("dayoffBtn 클릭됨");

   container.innerText = ""; // 기존 내용 지우기


   // 고정 휴무일
   const offWeekSection = document.createElement("section");
   offWeekSection.classList.add("section-title");
   offWeekSection.innerHTML = "고정 휴무일";

   const weekOffContainer = document.createElement("form"); // div 생성
   weekOffContainer.classList.add("off-container");

   const menu = document.createElement("menu"); // ul 생성
   menu.classList.add("week-row");

   const weekList = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];




   // 나중에 줄일것...
   const week0 = document.createElement("li");
   week0.classList.add("week-li");
   week0.innerText = weekList[0];

   const week1 = document.createElement("li");
   week1.classList.add("week-li");
   week1.innerText = weekList[1];

   const week2 = document.createElement("li");
   week2.classList.add("week-li");
   week2.innerText = weekList[2];

   const week3 = document.createElement("li");
   week3.classList.add("week-li");
   week3.innerText = weekList[3];

   const week4 = document.createElement("li");
   week4.classList.add("week-li");
   week4.innerText = weekList[4];

   const week5 = document.createElement("li");
   week5.classList.add("week-li");
   week5.innerText = weekList[5];

   const week6 = document.createElement("li");
   week6.classList.add("week-li");
   week6.innerText = weekList[6];
   //

   const weekBtn = document.createElement("button");
   weekBtn.classList.add("update-btn");
   weekBtn.id = "offUpdateBtn";
   weekBtn.innerText = "고정 휴무일 수정";
   
   menu.append(week0, week1, week2, week3, week4, week5, week6);
   weekOffContainer.append(menu, weekBtn);

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
   container.append(offWeekSection, weekOffContainer, offDaySection, offDayEditFrm);
   calendar_rendering() // 달력 생성 함수 호출(calendarEl 내부에 생성)
});

// 고정 휴무일 체크
const weekList = document.querySelectorAll(".week-li"); // 휴무 요일 각 li 태그

for(let li of weekList) {

   li.addEventListener("click", () => {

      li.classList.add("checked");
   })
}





// /**
//  * 고정 휴무일 수정
//  */
// offUpdateBtn.addEventListener("click", () => {

//    const weekRow = document.querySelector("week")
   
// });

const testBtn = document.querySelector("#testBtn");
const popupLayer = document.querySelector("#popupLayer");
const testArea = document.querySelector("#testArea");

testBtn.addEventListener("click", () => {


   console.log(testBtn);
});


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

   const addBtn = document.createElement("button");
   addBtn.classList.add("popup-row");
   addBtn.innerText = "휴무 등록";

   const cancelBtn = document.createElement("button");
   cancelBtn.classList.add("popup-row");
   cancelBtn.innerText = "취소";

   btnRow.append(addBtn, cancelBtn);
   popupFrm.append(titleRow, startRow, endRow, btnRow);
   testArea.append(popupFrm);
};


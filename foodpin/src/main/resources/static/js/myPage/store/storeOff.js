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
      editable: true // false로 변경 시 draggable 작동 x 
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
 * (메뉴) 휴무일 버튼 클릭
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

   const ul = document.createElement("ul"); // ul 생성
   ul.classList.add("week-row");

   const weekList = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

   //
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
   weekBtn.innerText = "고정 휴무일 수정";
   
   ul.append(week0, week1, week2, week3, week4, week5, week6);
   weekOffContainer.append(ul, weekBtn);

   // 고정휴무일 비동기 db 저장 .. .

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
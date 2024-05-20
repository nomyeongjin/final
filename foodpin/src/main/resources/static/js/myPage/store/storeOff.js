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
 * 요일 버튼 생성
 * @param {*} weekList 
 */
const createBtn = (weekList) => {

   for(let week of weekList) {

      console.log(week);
      
      

   }
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

   // weekList = ['월', '화', '수', '목', '금', '토', '일'];s

   const weekOffContainer = document.createElement("div"); // div 생성
   weekOffContainer.classList.add("off-container");

   const ul = document.createElement("ul"); // div 생성
   // // weekRow.classList.add("#");

   // createBtn(weekList);

   // weekOffContainer.append(ul);
   // -- 

   // --

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
   container.append(offWeekSection, offDaySection, offDayEditFrm);
   calendar_rendering() // 달력 생성 함수 호출(calendarEl 내부에 생성)
});
/* 가게 정보 수정 (휴무일) */



// --------------------------------------

/* 서브 타이틀 버튼 */
const infoBtn = document.querySelector("#infoBtn");
const menuBtn = document.querySelector("#menuBtn");
const dayoffBtn = document.querySelector("#dayoffBtn");

const container = document.querySelector(".myPage-content-container");


/* 요일 버튼 생성 */
const createBtn = (weekList1, weekList2) => {

    const offBtn1 = document.createElement("button");
    offBtn1.innerText = "weekList1";
    weekRow1.append(offBtn1);

    const offBtn2 = document.createElement("button");
    offBtn2.innerText = "weekList2";
    weekRow1.append(offBtn2);
}







// 휴무일 - 서브 타이틀 버튼 클릭시 내용 띄우기
dayoffBtn.addEventListener("click", () => {

    container.innerText = ""; // 기존 내용 지우기

    // 고정 휴무일
    const offWeekSection = document.createElement("section");
    offWeekSection.classList.add("section-title");
    offWeekSection.innerHTML = "고정 휴무일";

    // -- 
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        
        locale: 'kr',
        timeZone: 'UTC',
        initialView: 'dayGridMonth', // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
        events:[ // 일정 데이터 추가 , DB의 event를 가져오려면 JSON 형식으로 변환해 events에 넣어주면된다.
            {
                title:'개인 사정',
                start:'2024-05-16',
                end:'2024-05-16'
            }
        ],
        editable: true // false로 변경 시 draggable 작동 x 
    });
    calendar.render();
    // --

    // 지정 휴무일
    const offDaySection = document.createElement("section");
    offDaySection.classList.add("section-title");
    offDaySection.innerHTML = "지정 휴무일";

   
    const offDayEditFrm = document.createElement("form"); // form 생성
    offDayEditFrm.id = "offDayEditFrm";

    const dayOffContainer = document.createElement("div"); // div 생성
    dayOffContainer.classList.add("off-container");

    const calendar = document.createElement("div");
    calendar.id = "calendar";


    dayOffContainer.append(calendar);

    offDayEditFrm.append(dayOffContainer);

    // 마이페이지 본문 컨테이너에 각 휴무일 section, form 추가
    container.append(offWeekSection, offDaySection, offDayEditFrm);

});

/* 풀캘린더 */
// document.addEventListener('DOMContentLoaded', function () {

//   var calendarEl = document.getElementById('calendar');
//   var calendar = new FullCalendar.Calendar(calendarEl, {
      
//       locale: 'kr',
//       timeZone: 'UTC',
//       initialView: 'dayGridMonth', // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
//       events:[ // 일정 데이터 추가 , DB의 event를 가져오려면 JSON 형식으로 변환해 events에 넣어주면된다.
//           {
//               title:'개인 사정',
//               start:'2024-05-16',
//               end:'2024-05-16'
//           }
//       ],
//       editable: true // false로 변경 시 draggable 작동 x 
//   });
//   calendar.render();
  
// });

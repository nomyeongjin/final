/* ****************** 가게 영업 시간 더보기 *********************  */

const openContainer = document.querySelector(".storedetail-opencontainer");
const busiHoursShort = document.querySelector(".busi-hours-short");

const moreScheduleInfoBtn = document.querySelector("#moreScheduleInfoBtn");
const shutScheduleInfoBtn = document.querySelector("#shutScheduleInfoBtn");

moreScheduleInfoBtn.addEventListener('click',()=>{


  // 더보기 버튼을 숨기고 줄이기 버튼 보이게 하기
  moreScheduleInfoBtn.style.display = 'none'; 
  shutScheduleInfoBtn.style.display = 'inline-block'; 
  busiHoursShort.style.display = 'inline';
})

shutScheduleInfoBtn.addEventListener("click",()=>{

  
  shutScheduleInfoBtn.style.display = 'none'; 
  moreScheduleInfoBtn.style.display = 'inline-block';
  busiHoursShort.style.display = 'none'; 
})

  // 현재 요일부터 일주일 동안의 일정을 동적으로 생성하는 함수
  function generateSchedule() {
     const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const currentDay = getCurrentDayOfWeek(); 

    // 현재 요일부터 일주일 동안의 일정 생성
       const schedule = [];
    for (let i = 0; i < 7; i++) {
        const dayIndex = (currentDay + i) % 7;
        const day = daysOfWeek[dayIndex];
        schedule.push({
            day: dayIndex === currentDay ? `[오늘] ${getCurrentDateStr()}` : day, // 현재 요일이면 "[오늘]"을 붙임
            openHour: '11:00', // 가게 영업 시작 시간 (예시)
            closeHour: '21:30', // 가게 영업 종료 시간 (예시)
            breaktimeStart: '14:30', // 브레이크타임 시작 시간 (예시)
            breaktimeEnd: '17:00' // 브레이크타임 종료 시간 (예시)
        });
    }

    return schedule; 
}

// 일정을 HTML에 동적으로 추가하는 함수
function renderSchedule() {
    const schedule = generateSchedule();
    const currentDaySchedule = document.getElementById('currentDaySchedule'); 

    // 현재 요일의 일정을 currentDaySchedule에 추가
     const currentDayIndex = getCurrentDayOfWeek();
    const currentDay = schedule[currentDayIndex];
    const currentListItem = document.createElement('li');
    currentListItem.innerHTML = `
        <p class="t-txt">${currentDay.day}</p>
        <div class="time-wrapper">
            <p class="l-txt">
                영업시간: ${currentDay.openHour} - ${currentDay.closeHour}
            </p>
            <p class="l-txt">
                브레이크타임: ${currentDay.breaktimeStart} - ${currentDay.breaktimeEnd}
            </p>
        </div>
    `;
    currentDaySchedule.appendChild(currentListItem);

    // 나머지 일정을 weeklySchedule에 추가
    const weeklySchedule = document.getElementById('weeklySchedule');
    for (let i = 1; i < schedule.length; i++) {
        const day = schedule[i];
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <p class="t-txt">${day.day}</p>
            <div class="time-wrapper">
                <p class="l-txt">
                    영업시간: ${day.openHour} - ${day.closeHour}
                </p>
                <p class="l-txt">
                    브레이크타임: ${day.breaktimeStart} - ${day.breaktimeEnd}
                </p>
            </div>
        `;
        weeklySchedule.appendChild(listItem);
    }
}

// 페이지 로드 시 일정을 동적으로 생성하여 HTML에 추가
document.addEventListener('DOMContentLoaded', function () {
    renderSchedule();
});
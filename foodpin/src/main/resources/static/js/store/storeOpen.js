document.addEventListener('DOMContentLoaded', function () {
    const openContainer = document.querySelector(".storedetail-opencontainer");
    const busiHoursShort = document.querySelector(".busi-hours-short");
    const storeStatusText = document.querySelector("#storeStatusText"); // 영업중 / 휴무일 표시하는 span

    const moreScheduleInfoBtn = document.querySelector("#moreScheduleInfoBtn");
    const shutScheduleInfoBtn = document.querySelector("#shutScheduleInfoBtn");

    if (moreScheduleInfoBtn && shutScheduleInfoBtn && busiHoursShort) {
        moreScheduleInfoBtn.addEventListener('click', () => {
            moreScheduleInfoBtn.style.display = 'none'; 
            shutScheduleInfoBtn.style.display = 'inline-block'; 
            busiHoursShort.style.display = 'block'; 
        });

        shutScheduleInfoBtn.addEventListener("click", () => {
            shutScheduleInfoBtn.style.display = 'none'; 
            moreScheduleInfoBtn.style.display = 'inline-block';
            busiHoursShort.style.display = 'none'; 
        });
    }

    

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const currentDay = getCurrentDayOfWeek(); // 오늘의 요일

    const currentDate = new Date(); // 오늘의 날짜

    function getCurrentDayOfWeek() { // 오늘 날짜를 기준으로 요일 반환하는 함수 (Sunday - Saturday : 0 - 6)
        return new Date().getDay();
    }

    

    // let opened = ""; // 영업중/휴무일 표시할 변수s

    async function generateSchedule() {
        const storeNo = window.location.href.split('/').slice(-1)[0]; // 주소에서 storeNo 받아오기
        // console.log(storeNo);

        const response = await fetch(`/store/storeOpen?storeNo=${storeNo}`); // fetch
        const map = await response.json();
        // console.log(map);
        // console.log(map.offWeek);

        const schedule = []; // 영업 시간 담을 배열

        let offWeekArr = [];
        offWeekArr.push(map.offWeek.slice(0, -1).split('/'));
        // console.log(offWeekArr);

        // span에 영업 상태 표시
        if (offWeekArr.includes(currentDay)) storeStatusText.innerText = "휴무일";
        else storeStatusText.innerText = "영업일";

        let openClose = "";
        let breaktime = "";

        for (let i = 0; i < 7; i++) { // 요일별행에 날짜-요일-영업시간-브레이크타임 추가하는 반복문 (0은 오늘 기준)
            const dayIndex = (currentDay + i) % 7; // dayIndex : 0:일요일 ~ 6:토요일
            const day = daysOfWeek[dayIndex]; // day : 해당 요일의 이름


            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i); // date : 해당 날짜
            const dateStr = `${date.getMonth() + 1}.${date.getDate()}`; // 날짜를 "월.일" 형식의 문자열로 변환

            if(map.openBreak.openHour == '00:00') openClose = "종일";
            else openClose = map.openBreak.openHour + " - " + map.openBreak.closeHour;

            if(map.openBreak.breaktimeStart == '00:00') breaktime = "없음";
            else breaktime = map.openBreak.breaktimeStart + " - " + map.openBreak.breaktimeEnd;


            schedule.push({
                day: dayIndex === currentDay ? `[오늘] ${dateStr} ${day}` : `${dateStr} ${day}`,
                openClose: openClose,
                breaktime: breaktime
            });
        }
        // console.log(schedule);

        return schedule; // 읽어온 영업시간, 휴무일, 브레이크타임 정보를 schedule에 담아 반환
    }

    async function renderSchedule() {
        const schedule = await generateSchedule();
        const currentDaySchedule = document.getElementById('currentDaySchedule'); 
        const weeklySchedule = document.getElementById('weeklySchedule');

        currentDaySchedule.innerHTML = '';
        weeklySchedule.innerHTML = '';

        const currentDay = schedule[0];

        // 오늘의 영업시간, 브레이크타임
        const currentListItem = document.createElement('li');
        currentListItem.innerHTML = `
            <div class="time-wrapper space-between">
                <p class="t-txt">${currentDay.day}</p>
                <div class="time-details">
                    <p class="l-txt">
                        영업시간: ${currentDay.openClose}
                    </p>
                    <p class="l-txt">
                        브레이크타임: ${currentDay.breaktime}
                    </p>
                </div>
            </div>
        `;
        currentDaySchedule.appendChild(currentListItem); // 오늘 정보 끝

        // 오늘 이후 6일간의 영업시간, 브레이크타임 반복문
        for (let i = 1; i < schedule.length; i++) {
            const day = schedule[i];
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <hr/>
                <div class="time-wrapper space-between">
                    <p class="t-txt">${day.day}</p>
                    <div class="time-details">
                        <p class="l-txt">
                            영업시간: ${currentDay.openClose}
                        </p>
                        <p class="l-txt">
                            브레이크타임: ${currentDay.breaktime}
                        </p>
                    </div>
                </div>
            `;
            weeklySchedule.appendChild(listItem);
        } // 6일 정보 반복 끝
    }

    renderSchedule();
});
let calendar;
let offWeek;

const selectTimeFn = async (reservDate) => {

    //reservDate의 요일이 경우 함수 실행 X
    if(offWeek.includes(String(new Date(reservDate).getDay()))) return;

    const obj = {
        "storeNo" : storeNo,
        "reservDate" : reservDate,
    };

    fetch("/store/useTime", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(result => {
        
        // console.log(result);
        const reservTimes = result.reservTimes;
        const confirmReservDate = result.confirmReservDate; // 시간별 예약 개수를 List로 조회한 결과
        console.log(confirmReservDate);
        
        const selectReservTime = confirmReservDate.length > 0 ? confirmReservDate[0].reservTime : null;

        // console.log(filteredArray);
        // 예약이 꽉 찬 시간대만 저장한 배열
        // storeMaxTable : 시간별 예약 가능 최대 팀 수
        const fullTimeList = [];
        confirmReservDate.filter(item => {
            // Ensure storeMaxTable is a number
            // const maxTable = Number(storeMaxTable);
            
            // maxTable가 0이라면 return
            if (Number(storeMaxTable) === 0) return;
            
            // storeMaxTable과 item.counts의 값 비교
            if (Number(item.counts) === Number(storeMaxTable)) {
                fullTimeList.push(item.reservTime);
                item.classList.add("disbled");
            }
        });

        let openHour = reservTimes.openHour; // 오픈시간
        let closeHour = reservTimes.closeHour; // 마감시간
        // console.log("opeenHour : ", openHour, "closeHour : ", closeHour);

        // 시간 문자열을 다음 정각으로 변환
        const roundUpToNextHour = (timeString) => {
            const [hours, minutes] = timeString.split(":").map(Number);
            return minutes > 0 ? `${hours + 1}:00` : timeString;
        }

        // 시간 문자열을 이전 정각으로 변환
        const roundDownToPreviousHour = (timeString)=> {
            const [hours, minutes] = timeString.split(":").map(Number);
            return minutes > 0 ? `${hours}:00` : timeString;
        }

        // closeHour가 00:00 이라면 22:00까지만 예약 시간 출력
        // closeHour 보다 1시간 이전까지만 출력해야 함
        
        // 24 시간 운영일 경우 10:00 - 22:00시까지만 예약 시간 표시
        if (openHour == closeHour) {
            let start = "10:00";
            let end = "22:00";
            openHour = start; // 임시 변수에 저장
            closeHour = end; // 임시 변수에 저장
            getTimeSplit(start, end, 30);
        } 

        // 만약 closeHour가 00:00이라면
        if (closeHour == "00:00") {
            let end = "22:00";
            closeHour = end;
            console.log(closeHour);
            getTimeSplit(openHour, end, 30);
        }

        // 정각 또는 30분 단위가 아닌 경우 처리
        openHour = roundUpToNextHour(openHour);
        closeHour = roundDownToPreviousHour(closeHour);


        // closeHour 보다 1시간 이전까지만 출력해야 함
        const hour = closeHour.split(":")[0]-1;
        console.log(`${hour}:00`);

        const tempHour = `${hour}:00`;
        
        const times = getTimeSplit(openHour, tempHour, 30);
        const breakTimes = getTimeSplit(reservTimes.breaktimeStart, reservTimes.breaktimeEnd, 30);

        const filteredArray = times.filter(item => !breakTimes.includes(item));


        // ----- li 태그 생성 -----
        const timeList = document.querySelector(".time-list");
        timeList.innerText = "";

        // console.log("filteredArray", filteredArray);
        // console.log("fullTimeList", fullTimeList);

        
        // 브레이크 타임을 뺀 예약 가능 시간
        for (let i of filteredArray) {

            const timeItem = document.createElement("li");
            timeItem.className = "time-item";

            timeItem.innerText = `${i}`;
            // console.log(timeItem);

            const currentTime = new Date();
        
            // 선택한 날짜
            const selectedDate = document.querySelector(".select-date").innerText.split("(")[0];
            const selectedMonth = selectedDate.split(".")[0];
            const selectedDay = selectedDate.split(".")[1];
            const currentYear = currentTime.getFullYear();
        
            const selectedDateTime = new Date(`${currentYear}-${selectedMonth}-${selectedDay}T${i}`);
        
            // 날짜가 오늘인지 확인
            const isToday = currentTime.toDateString() === selectedDateTime.toDateString();
        
            // 시간 비교
            const selectedHours = parseInt(i.split(":")[0], 10);
            const selectedMinutes = parseInt(i.split(":")[1], 10);


            // 11::00 까지는 오전, 12:00 - 22:00 까지는 오후
            // 오전/오후 구분
            const isAM = selectedHours < 12 || (selectedHours === 12 && selectedMinutes === 0);
            const selectedTimeIsPast = selectedDateTime <= currentTime; // true = 오전, false = 오후

            console.log(selectedTimeIsPast);
            

            if (isToday && selectedTimeIsPast || fullTimeList.includes(i)) {
               
                timeItem.classList.add("disabled");
                timeItem.classList.remove("select");
            }
        
            timeList.append(timeItem);

            // let ampm = isAM ? "오전" : "오후";

            let pattern = /^11:\d{2}$/;

            // 오전 오후 구분용 margin 설정
            if (pattern.test(timeItem.innerText) || timeItem.innerText === "00:00") {
                const hr = document.createElement("div");
                hr.style.width = "100%";
                hr.style.margin = "10px";
                timeList.append(hr);
            }
        }

        // 모든 요소에 disabled 클래스가 있는지 확인
        const allDisabled = Array.from(document.querySelectorAll("*")).every(element => element.classList.contains("disabled"));

        // 만약 모든 요소에 disabled 클래스가 있다면
        if (allDisabled) {

            const reservTimeContainer = document.querySelector(".reserv-time-container");

            // span 태그 생성
            const messageSpan = document.createElement("span");

            messageSpan.classList.add("reservClose");

            // 메시지 추가
            messageSpan.innerHTML = "* &nbsp 금일 예약이 종료되었습니다.";

            // body에 추가
            reservTimeContainer.append(messageSpan);
        }

        const timeItem = document.querySelectorAll(".time-item");

        if (timeItem != null) {
            for (let time of timeItem) {
                time.addEventListener("click", e => {

                   
                    if (time.classList.contains("disabled")) {
                        alert("해당 시간의 예약이 마감 되었습니다.");
                        return;
                    }

                    // li 태그에 select 클래스 추가 -> 클릭 효과
                    for (let item of timeItem) { 
                        item.classList.remove("select");
                    }

                    // 시간
                    time.classList.add("select");
                    checkObj.reservTime = true;
                    // console.log(time.innerText);

                });
            }

            // 초기 상태에도 선택된 항목이 있는지 확인

            for (let item of timeItem) {
                if (item.classList.contains("select")) {
                    checkObj.reservTime = true;
                }
                else {
                    checkObj.reservTime = false;
                }
            }
            // console.log(checkObj);

        }
    })

}

// 고정 휴무일 조회
const fixedOffWeek = async () => {
   const resp = await fetch("/store/selectOffWeek", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : storeNo
    });

    const offWeekList = await resp.json();

    
    console.log("offWeekList : ", offWeekList);

    offWeek = offWeekList.map(item => item.offWeek);

    document.querySelectorAll(".fc-scrollgrid-sync-table tr").forEach(row => {

        offWeek.forEach(item => {

            row.children[item].classList.add("week-off");   

            const tdElements = document.querySelectorAll("td.week-off");

            // 각 td 요소에 대해 조건을 만족하는 a 태그를 찾음
            tdElements.forEach(td => {

            // td의 첫 번째 div 자식을 찾습니다.
            const firstDivChild = td.querySelector("div:first-child");

            if (firstDivChild) {
                // 첫 번째 div 자식의 자식들 중 class가 fc-daygrid-day-number인 a 태그를 찾음
                const aTag = firstDivChild.querySelector("div > a");
                
                if (aTag) {
                    // console.log(aTag);
                    aTag.classList.add("innerTextColor");
                // 필요한 추가 작업을 여기에 작성합니다.
                }
            }
            });
        });
    });
}



// 지정 휴무일 조회
fetch("/store/selectOffDay", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : storeNo
})
.then(resp => resp.json())
.then(offDayList=> {
    
    console.log("offDayList : ", offDayList);

    offDayList.forEach(item => {
        console.log(item);
      
        // 숫자를 두 자리로 포맷하는 함수
        const formatDateComponent = value => {
          return value < 10 ? "0" + value : value;
        };
      
        // 날짜를 "YYYY년 MM월 DD일" 형식으로 변환하는 함수
        const formatFullDate = date => {
          const year = date.getFullYear();
          const month = formatDateComponent(date.getMonth() + 1);
          const day = formatDateComponent(date.getDate());
          return `${year}년 ${month}월 ${day}일`;

        };
      
        // 휴무 시작일("YYYY-MM-DD" 형식)
        const offDayStart = item.offDayStart;
      
        // 휴무 종료일("YYYY-MM-DD" 형식)
        const offDayEnd = item.offDayEnd;
      
        // 시작일과 종료일을 Date 객체로 변환
        let startDate = new Date(offDayStart);
        const endDate = new Date(offDayEnd);
      
        // 시작일부터 종료일까지의 모든 날짜를 계산하여 배열에 저장
        const dateArray = [];
        while (startDate <= endDate) {
          dateArray.push(formatFullDate(startDate));
          startDate.setDate(startDate.getDate() + 1);
        }
        console.log("Calculated dateArray:", dateArray);
      
        // td 요소를 반복해서 div 태그를 찾고 그 안에 있는 a 태그에 접근

        const tdElements = document.querySelectorAll("td");

        tdElements.forEach(td => {

            const firstDivChild = td.querySelector("div:first-child");

            if (firstDivChild) {
                const aTag = firstDivChild.querySelector("div > a");

                if (aTag) {
                    const ariaLabel = aTag.getAttribute("aria-label") // a 태그의 aria-label 속성 값

                    console.log("ariaLabel:", ariaLabel);

                    // dateArray의 값과 ariaLabel을 비교 (안되고 있음.. 왜???)
                    if (dateArray.includes(ariaLabel)) {

                        aTag.classList.add("day-off"); // 휴무일인 경우 off-day 클래스를 추가
                        console.log(ariaLabel);
                    }

                }
            }
        });

        // "off-day" 클래스가 추가된 요소들의 innerText 색상 변경
        const offDayElements = document.querySelectorAll(".day-off");
        
        offDayElements.forEach(item => {
            item.classList.add("innerTextColor");
        });
    });

});

document.addEventListener("DOMContentLoaded", async function () {

    const dayArr = ["일","월","화","수","목","금","토"];

    let calendarEl = document.getElementById("calendar");
    
    if(calendarEl == null) return;
    calendar = new FullCalendar.Calendar(calendarEl, {

        locale: "kr",
        timeZone: "UTC",
        initialView: "dayGridMonth",
        selectable : false, // 드래그 방지
        
        dateClick : function(info){

            // 고정 휴무일인 경우 클릭X
            if(info.dayEl.classList.contains("week-off")) return;

            // 지정 휴무일인 경우 클릭X
            if(info.dayEl.classList.contains("day-off")) return;
            // console.log(info);
            console.log(info.dateStr);
            // console.log(dayArr[info.date.getDay()]);
            
            const selectDate = document.querySelector(".select-date");

            const month = info.dateStr.slice(5,7);
            const day = info.dateStr.slice(8, 10);

            // const date = month + "." + day + "(" + ")";
            const date = `${month}.${day}(${dayArr[info.date.getDay()]})`;

            // console.log(date);
            selectDate.innerText = date;

            // 달력 날짜 클릭 시 bg 색상 변함
            document.querySelectorAll(".select-bg").forEach(item => item.classList.remove("select-bg"));
            info.dayEl.classList.add("select-bg"); // info.dayEl => 달력 한 칸
            
            selectTimeFn(info.dateStr);

        },

        validRange: {
            start: new Date(),
            end: new Date(new Date().setMonth(new Date().getMonth() + 2))
        }

    });

    calendar.render();

    // 화면 로드 시 현재 날짜 출력
    const temp = new Date();

    // 한 자릿수 월 앞에 0 붙이기
    const currentMonth = temp.getMonth()+1 < 10 ? "0" + (temp.getMonth()+1) : temp.getMonth()+1;

    // 한 자릿수 일 앞에 0 붙이기
    const currentDay = temp.getDate() < 10 ? "0" + (temp.getDate()) : temp.getDate();

    // 오늘 날짜(화면에 보여주는 용)(MM.DD(요일))
    const now = `${currentMonth}.${currentDay}(${dayArr[temp.getDay()]})`;

    // 날짜 형식으로 수정한 오늘 날짜("YYYY-MM-DD")
    const nowDate = `${temp.getFullYear()}-${currentMonth}-${currentDay}`;
    // console.log(nowDate);
    // console.log(now);
    document.querySelector(".select-date").innerText = now;

    await fixedOffWeek();
                /* 현재날짜 */
    await selectTimeFn(nowDate);
});
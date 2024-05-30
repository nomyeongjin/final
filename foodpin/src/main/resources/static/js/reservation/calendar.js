let calendar;
                        /* 예약 날짜 */
const selectTimeFn = (reservDate) => {

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
        
        console.log(result);

        const reservTimes = result.reservTimes;
        const confirmReservDate = result.confirmReservDate; // 시간병 예약 개수를 List로 조회한 결과
        console.log(confirmReservDate);
        
        const selectReservTime = confirmReservDate.length > 0 ? confirmReservDate[0].reservTime : null;

        // const counts = confirmReservDate[0].counts; // 시간에 예약된 개수
        // console.log(counts);

        
        // console.log(filteredArray);
        // 예약이 꽉 찬 시간대만 저장한 배열
        // storeMaxTable : 시간별 예약 가능 최대 팀 수
        const fullTimeList = [];
        confirmReservDate.filter(item => {
            if (Number(item.counts) === Number(storeMaxTable)) {
                fullTimeList.push(item.reservTime);
            }
        });

        let openHour = reservTimes.openHour; // 오픈시간
        let closeHour = reservTimes.closeHour; // 마감시간
        // console.log("opeenHour : ", openHour, "closeHour : ", closeHour);


        /* ************************************************************* */
        // closeHour가 00:00 이라면 22:00까지만 예약 시간 출력
        // closeHour 보다 1시간 이전까지만 출력해야 함
        /* ************************************************************* */

        // 만약 closeHour가 00:00이라면 다음 날로 처리
        if (closeHour == "00:00") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1); // 다음날로 설정
            reservTimes.closeHour = tomorrow; // 마감 시간을 00:00으로 설정
            closeHour = tomorrow;
        }

        
        // 24 시간 운영일 경우 10:00 - 22:00시까지만 예약 시간 표시
        if (openHour == closeHour) {
            let start = "10:00";
            let end = "22:00";
            openHour = start; // 임시 변수에 저장
            closeHour = end; // 임시 변수에 저장
            getTimeSplit(start, end, 60);
        } 
        
        const times = getTimeSplit(openHour, closeHour, 60);
        const breakTimes = getTimeSplit(reservTimes.breaktimeStart, reservTimes.breaktimeEnd, 60);
        // console.log(breakTimes);

        // console.log(times);
        // console.log(breakTimes);

        const filteredArray = times.filter(item => !breakTimes.includes(item));


        // ----- li 태그 생성 -----
        const timeList = document.querySelector(".time-list");
        timeList.innerText = "";

        console.log("filteredArray", filteredArray);
        console.log("fullTimeList", fullTimeList);

        
        // 브레이크 타임을 뺀 예약 가능 시간
        for (let i of filteredArray) {

            const timeItem = document.createElement("li");
            timeItem.className = "time-item";

            timeItem.innerText = `${i}`;
            // console.log(timeItem);


            const currentTime = new Date();
            // const currentHours = currentTime.getHours();
            // const currentMinutes = currentTime.getMinutes();
        
            // 선택한 날짜
            const selectedDate = document.querySelector(".select-date").innerText.split('(')[0];
            const selectedMonth = selectedDate.split('.')[0];
            const selectedDay = selectedDate.split('.')[1];
            const currentYear = currentTime.getFullYear();
        
            const selectedDateTime = new Date(`${currentYear}-${selectedMonth}-${selectedDay}T${i}`);
        
            // 날짜가 오늘인지 확인
            const isToday = currentTime.toDateString() === selectedDateTime.toDateString();
        
            // 시간 비교
            const selectedHours = parseInt(i.split(':')[0], 10);
            const selectedMinutes = parseInt(i.split(':')[1], 10);


            // 11:59 까지는 오전, 12:00 - 22:00 까지는 오후
            // 오전/오후 구분
            const isAM = selectedHours < 12 || (selectedHours === 12 && selectedMinutes === 0);
            const selectedTimeIsPast = selectedDateTime <= currentTime; // true = 오전, false = 오후

            console.log(selectedTimeIsPast);

            
        
            if (isToday && selectedTimeIsPast || fullTimeList.includes(i)) {
                timeItem.classList.add("disabled");
                timeItem.classList.remove("select");
            }
        
            timeList.append(timeItem);

            if(timeItem.innerText === '11:00' || timeItem.innerText === '00:00'){
                const hr = document.createElement("div");
                hr.style.width = "100%";
                hr.style.margin = "10px 10px";
                timeList.append(hr);
                
                // const timeTitle = document.querySelector("time-title");
                // timeTitle.innerText="";
                // timeTitle.innerText = "오전"
            }
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
                    console.log(time.innerText);

                    // console.log(storeMaxTable);

                    // 클릭한 날짜에 예약된 시간과 클릭 한 시간이 동일할 경우
                    if (selectReservTime == time.innerText) {
                        time.classList.remove("select");
                        return;
                    }

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

document.addEventListener('DOMContentLoaded', function () {

    const dayArr = ['일','월','화','수','목','금','토'];

    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {

        locale: 'kr',
        timeZone: 'UTC',
        initialView: 'dayGridMonth',
        selectable : false, // 드래그 방지
        dateClick : function(info){
            // console.log(info);
            console.log(info.dateStr);
            // console.log(dayArr[info.date.getDay()]);
            
            
            const selectDate = document.querySelector(".select-date");

            const month = info.dateStr.slice(5,7);
            const day = info.dateStr.slice(8, 10);

            // const getDay(className)=>{
            //     switch(true){

            //     }
            // }

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

        // events: [ // 일정 데이터 추가 , DB의 event를 가져오려면 JSON 형식으로 변환해 events에 넣어주면된다.
        //     {
        //         // title: '단체예약 (예약자명: 김예약)',
        //         start: '2024-05-16',
        //         // end: '2024-05-16'
        //     }

        // ],

    });

    calendar.render();
 

    // 화면 로드 시 현재 날짜 출력
    const temp = new Date();
    const currentMonth = temp.getMonth()+1 < 10 ? '0' + (temp.getMonth()+1) : temp.getMonth()+1;
    const now = `${currentMonth}.${temp.getDate()}(${dayArr[temp.getDay()]})`;
    const nowDate = `${temp.getFullYear()}-${currentMonth}-${temp.getDate()}`;
    // console.log(nowDate);
    // console.log(now);
    document.querySelector(".select-date").innerText = now;

                /* 현재날짜 */
    selectTimeFn(nowDate);
});
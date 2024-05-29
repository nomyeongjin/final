let calendar;

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
            // console.log(info.dateStr);
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

            const selectTimeFn = () => {

                fetch("/store/useTime", {
                    method : "POST",
                    headers : {"Content-Type" : "application/json"},
                    body: JSON.stringify({ "storeNo": storeNo })
                })
                .then(resp => resp.json())
                .then(result => {
    
                    const data = result;
                    // console.log(data);
    
                    let openHour = data.OPEN_HOUR;
                    let closeHour = data.CLOSE_HOUR;
                    // console.log("opeenHour : ", openHour, "closeHour : ", closeHour);
    
                    const times = getTimeSplit(openHour, closeHour, 30);
                    const breakTimes = getTimeSplit(data.BREAKTIME_START, data.BREAKTIME_END, 30);
    
                    // console.log(times);
                    // console.log(breakTimes);
    
                    const filteredArray = times.filter(item => !breakTimes.includes(item));
                    // console.log(filteredArray);
    
                    // ----- li 태그 생성 -----
                    const timeList = document.querySelector(".time-list");
                    timeList.innerText = "";
    
                    for (let i of filteredArray) {
    
                        const timeItem = document.createElement("li");
                        timeItem.className = "time-item";
    
                        timeItem.innerText = `${i}`;
                        // console.log(timeItem);
    
                        timeList.append(timeItem);
                    }
    
                    const timeItem = document.querySelectorAll(".time-item");
                    if (timeItem != null) {
                        for (let time of timeItem) {
                            time.addEventListener("click", () => {
    
                                for (let item of timeItem) {
                                    item.classList.remove("select");
                                }
                                time.classList.add("select");
                                checkObj.reservTime = true;
                                return;
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
            selectTimeFn();


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
    selectTimeFn();

    // 화면 로드 시 현재 날짜 출력
    const temp = new Date();
    const currentMonth = temp.getMonth()+1 < 10 ? '0' + (temp.getMonth()+1) : temp.getMonth()+1;
    const now = `${currentMonth}.${temp.getDate()}(${dayArr[temp.getDay()]})`;
    // console.log(now);
    document.querySelector(".select-date").innerText = now;
    
});



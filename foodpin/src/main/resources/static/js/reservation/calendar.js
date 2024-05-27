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
        },

        validRange: {
            start: new Date(),
            end: new Date(new Date().setMonth(new Date().getMonth() + 2))
        }

        // select : (selectInfo) => { 
        //     console.log(selectInfo);
        // },


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
    // console.log(now);
    document.querySelector(".select-date").innerText = now;
});



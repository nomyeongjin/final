var calendar;

document.addEventListener('DOMContentLoaded', function () {

    const dayArr = ['일','월','화','수','목','금','토'];

    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {

        locale: 'kr',
        timeZone: 'UTC',
        initialView: 'dayGridMonth',
        selectable : true, // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
        editable: false,
        dateClick : function(info){
            // console.log(info.dateStr);
            // console.log(dayArr[info.date.getDay()]);
            
            const selectDate = document.querySelector("#selectDate");

            const month = info.dateStr.slice(6,7);
            const day = info.dateStr.slice(8, 10);

            // const getDay(className)=>{
            //     switch(true){

            //     }
            // }

            // const date = month + "." + day + "(" + ")";
            const date = `${month}.${day}(${dayArr[info.date.getDay()]})`;

            // console.log(date);
            selectDate.innerText = date;
        },

        // events: [ // 일정 데이터 추가 , DB의 event를 가져오려면 JSON 형식으로 변환해 events에 넣어주면된다.
        //     {
        //         // title: '단체예약 (예약자명: 김예약)',
        //         start: '2024-05-16',
        //         // end: '2024-05-16'
        //     }
        // ],
        
    });

    calendar.render();

    const temp = new Date();
    const now = `${temp.getMonth()+1}.${temp.getDate()}(${dayArr[temp.getDay()]})`;
    // console.log(now);
    selectDate.innerText = now;
});



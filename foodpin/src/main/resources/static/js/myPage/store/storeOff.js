document.addEventListener('DOMContentLoaded', function () {

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
});

document.addEventListener('DOMContentLoaded', function () {

  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
      
      locale: 'kr',
      timeZone: 'UTC',
      initialView: 'dayGridMonth', // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
      events:[ // 일정 데이터 추가 , DB의 event를 가져오려면 JSON 형식으로 변환해 events에 넣어주면된다.
          {
              title:'단체예약 (예약자명: 김예약)',
              start:'2024-05-16',
              end:'2024-05-16'
          }
      ],
      editable: true // false로 변경 시 draggable 작동 x 
  });
  calendar.render();
});


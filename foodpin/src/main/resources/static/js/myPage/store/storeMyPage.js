/* 다음 주소 API 활용 */
function execDaumPostcode() {
   new daum.Postcode({
     oncomplete: function (data) {
       // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
 
       // 각 주소의 노출 규칙에 따라 주소를 조합한다.
       // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
       var addr = ''; // 주소 변수
      
 
       //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
       if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
         addr = data.roadAddress;
       } else { // 사용자가 지번 주소를 선택했을 경우(J)
         addr = data.jibunAddress;
       }
 
       // 우편번호와 주소 정보를 해당 필드에 넣는다.
       document.getElementById('postcode').value = data.zonecode;
       document.getElementById("address").value = addr;
       // 커서를 상세주소 필드로 이동한다.
       document.getElementById("detailAddress").focus();
     }
   }).open();
 }

 /* 주소 검색 버튼 클릭시 */
 document.querySelector("#searchAddress").addEventListener("click", execDaumPostcode); // <- 함수 이름만 넣어서 코드 내용을 그대로 들어감

/* -------------------------------------- */
/* ----------- 휴무일 변경 --------------- */
/* -------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });
  calendar.render();
});
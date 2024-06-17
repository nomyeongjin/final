/* 노쇼 경고 팝업 */
document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.fa-circle-exclamation');

    icons.forEach(icon => {
        const tooltipText = icon.getAttribute('data-tooltip');
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        icon.parentNode.appendChild(tooltip);
    });
});


/* 예약 취소 */
const cancelBtn = document.querySelectorAll(".cancelReservation");

cancelBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if(!confirm("예약을 취소하시겠습니까?")) {
            e.preventDefault();
            return;
        }
        const reservNo = e.target.dataset.reservNo;
        cancelReservation(reservNo);

        // 알림 보내기 위한 예약시간 형식화
        let reservDate = e.target.dataset.reservDate;

        // 2024. 06. 13 11:00
        const date = new Date(reservDate);

        // 요일을 계산
        const options = { weekday: 'short' };
        const dayOfWeek = date.toLocaleDateString('ko-KR', options);
        
        // 형식화
        const formattedReservDate =
          `${reservDate.slice(6, 8)}.${reservDate.slice(10, 12)}(${dayOfWeek}) ${reservDate.slice(13, 18)}`;
        

        reservDate = formattedReservDate;
        console.log(formattedReservDate); 

        // 알림 전송
        sendNotificationFn("cancelReservation", null, reservNo, reservDate, null);
    });
});
   
function cancelReservation(reservNo) {

    fetch(`/myPage/member/cancelReservation`, {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body : reservNo
    })
    .then(resp => resp.text())
    .then(result => {
        if(Boolean(result)) {
            alert("예약이 취소되었습니다");
            location.reload();
        } else {
            alert("예약 취소에 실패했습니다");
        }
    });
}

// 알림 보내기 위한 데이터

const memberNickname = loginMember.memberNickname;
// const memberNo = loginMember.memberNo;

let reservDate = document.querySelector(".reservationDate").innerText;
const reservTime = document.querySelector(".reservationTime").innerText;

const date = new Date(reservDate);

const options = { weekday: 'short' };
const dayOfWeek = date.toLocaleDateString('ko-KR', options);

// 형식화
const formattedReservDate = `${reservDate.slice(6, 8)}.${reservDate.slice(10, 12)}(${dayOfWeek}) ${reservTime}`;

reservDate = formattedReservDate;
console.log(reservDate);




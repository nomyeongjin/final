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

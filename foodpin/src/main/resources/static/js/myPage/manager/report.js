/* 리뷰 신고 처리중 / 처리완료 화면 변경 */
const reportBtn = document.querySelector("#reportBtn");
const completeReportBtn = document.querySelector("#completeReportBtn");
const reportReviewContainer = document.querySelector(".reportReview-container");
const completeReportContainer = document.querySelector(".completeReport-container");

document.addEventListener('DOMContentLoaded', function() {    

    reportBtn.classList.add('title-btn-checked');
    completeReportBtn.classList.remove('title-btn-checked');

    reportReviewContainer.style.display = "block";
    completeReportContainer.style.display = "none";
    
    reportBtn.addEventListener("click", function() {
        document.querySelectorAll(".sub-title-btn").forEach(btn =>{
            btn.classList.remove('title-btn-checked');
        });
        reportBtn.classList.add('title-btn-checked');
        completeReportContainer.style.display = "none";
        reportReviewContainer.style.display = "block";
    });

    completeReportBtn.addEventListener("click", function() {
        completeReportBtn.classList.add('title-btn-checked');
        reportBtn.classList.remove('title-btn-checked');
        reportReviewContainer.style.display = "none";
        completeReportContainer.style.display = "block";
    });
});


/* 리뷰 신고 처리 */

const deleteReview = document.querySelectorAll(".deleteReview");
const notReport = document.querySelectorAll(".notReport");

// const storeName = document.querySelector(".request-category").innerText;

// let reportDate = document.querySelector(".request-date").innerText;

deleteReview.forEach(btn => {
    btn.addEventListener("click", e => {

        // 2024-06-13
        const reportNo = e.target.dataset.reportNo;
        const storeName = e.target.dataset.requestCategory;
        let reportDate = e.target.dataset.requestDate;
        const year = reportDate.slice(0, 4);
         const month = reportDate.slice(5, 7);
         const day = reportDate.slice(8, 10);

        // Date 객체 생성
        const date = new Date(`${year}-${month}-${day}`);

        // 요일 계산
        const options = { weekday: 'short' };
        const dayOfWeek = date.toLocaleDateString('ko-KR', options);

        // 형식화된 문자열 생성
        const formattedDate = `${month}.${day}(${dayOfWeek})`;
        reportDate = formattedDate

        deleteReport(reportNo);

        // 삭제 처리 알림
        sendNotificationFn("reviewReportDeleteReview", null, reportNo, null, storeName, null, reportDate);
        
    });
});

// 신고 불충분
notReport.forEach(btn => {
    btn.addEventListener("click", e => {
        const reportNo = e.target.dataset.reportNo;
        const storeName = e.target.dataset.requestCategory;
        const reportDate = e.target.dataset.requestDate;
        notReportReview(reportNo);

        // 불충분 알림
        // sendNotificationFn("reviewReportComplete", null, reportNo, null, storeName, null, reportDate);

    });
});

// 신고인정. 리뷰 삭제 처리
function deleteReport(reportNo) {
    fetch(`/myPage/manager/deleteReport/${reportNo}`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({"reportNo" : reportNo})
    })
    .then(resp => resp.json())
    .then(result => {
        if(result.success) {
            alert("신고 리뷰를 삭제 처리하였습니다");
            location.reload();
        } else {
            alert("리뷰 삭체 처리에 실패하였습니다");
        }
    });
}

// 신고 사유 불충분. 신고 상태 해제
function notReportReview(reportNo) {
    fetch(`/myPage/manager/notReportReview/${reportNo}`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({"reportNo" : reportNo})
    })
    .then(resp => resp.json())
    .then(result => {
        if(result.success) {
            alert("신고 상태를 해제하였습니다");
            location.reload();
        } else {
            alert("신고 처리에 실패하였습니다");
        }
    });
}
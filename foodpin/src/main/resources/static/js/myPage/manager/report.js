/* 리뷰 신고 처리중 / 처리완료 화면 변경 */
const reportBtn = document.querySelector("#reportBtn");
const completeReportBtn = document.querySelector("#completeReportBtn");
const reportReviewContainer = document.querySelector(".reportReview-container");
const completeReportContainer = document.querySelector(".completeReport-container");

document.addEventListener('DOMContentLoaded', function() {    

    reportReviewContainer.style.display = "block";
    completeReportContainer.style.display = "none";
    
    reportBtn.addEventListener("click", function() {
        completeReportContainer.style.display = "none";
        reportReviewContainer.style.display = "block";
    });

    completeReportBtn.addEventListener("click", function() {
        reportReviewContainer.style.display = "none";
        completeReportContainer.style.display = "block";
    });
});


/* 리뷰 신고 처리 */
const deleteReview = document.querySelectorAll(".deleteReview");
const notReport = document.querySelectorAll(".notReport");

deleteReview.forEach(btn => {
    btn.addEventListener("click", e => {
        const reportNo = e.target.dataset.reportNo;
        deleteReport(reportNo);
    });
});

notReport.forEach(btn => {
    btn.addEventListener("click", e => {
        const reportNo = e.target.dataset.reportNo;
        notReportReview(reportNo);
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
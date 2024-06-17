/* 입점 승인/거절 */
document.addEventListener('DOMContentLoaded', () => {
    const approval = document.querySelectorAll(".approval");
    const close = document.querySelectorAll(".close");


    approval.forEach(button => {
        button.addEventListener('click', e => {
            const memberNo = e.target.dataset.memberNo;
            approveMember(memberNo);
        });
    });

    close.forEach(button => {
        button.addEventListener('click', e => {
            const memberNo = e.target.dataset.memberNo;
            closeMember(memberNo);
        });
    });
});

// 승인 처리
function approveMember(memberNo) {
    fetch(`/myPage/manager/approveMember/${memberNo}`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({memberNo : memberNo})
    })
    .then(resp => resp.json())
    .then(result => {

        if(!confirm("승인처리 하시겠습니까?")) {
            alert("취소 되었습니다");
            this.preventDefault();
            return;
        }

        if(result.success) {
            alert('승인되었습니다');
            location.reload();
        } else {
            alert('승인에 실패했습니다');
        }
    });
}

// 폐업 처리
function closeMember(memberNo) {
    fetch(`/myPage/manager/closeStore/${memberNo}`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({memberNo : memberNo})
    })
    .then(resp => resp.json())
    .then(result => {

        if(!confirm("정말 폐점처리 하시겠습니까?")) {
            alert("취소 되었습니다");
            this.preventDefault();
            return;
        }

        if(result.success) {
            alert('폐점되었습니다');
            location.reload();
        } else {
            alert('거절에 실패했습니다');
        }
    })
}
/* 정보 정정 신청 처리상태로 */
const completeBtn = document.querySelectorAll(".completeBtn");

completeBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if(!confirm("정정 처리를 완료하시겠습니까?")) {
            e.preventDefault();
            return;
        }
        const requestNo = e.target.dataset.requestNo;
        const storeName = e.target.dataset.requestStoreName;

        completeRequest(requestNo);
        sendNotificationFn("storeReportComplete", null, requestNo, null, storeName, null, null);
    });
});

function completeRequest(requestNo) {
    fetch(`/myPage/manager/managerStoreInfo/${requestNo}`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({requestNo : requestNo})
    })
    .then(resp => resp.json())
    .then(result => {
        if(result.success) {
            alert('정보 정정 처리가 완료되었습니다');
            location.reload();
        } else {
            console.log(requestNo);
            alert('정보 정정 처리에 실패하였습니다');
        }
    });
}


/* 입점 내역 상세 팝업 */
const popup = document.querySelector("#popup");
const openStoreDetail = document.querySelectorAll(".open-storeDetail");
const closePopup = document.querySelector(".close-popup");

openStoreDetail.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const row = link.closest("tr");
        openPopup(row);
        popup.style.display = 'block';
    });
});

function openPopup(row) {
    popup.querySelector(".storeName").innerText = row.getAttribute("data-store-name");
    popup.querySelector(".ceoName").innerText = `대표자 : ${row.getAttribute("data-member-name")}`;
    popup.querySelector(".ceoTel").innerText = `대표자 전화번호 : ${row.getAttribute("data-member-tel")}`;
    popup.querySelector(".ceoEmail").innerText = `대표자 이메일 : ${row.getAttribute("data-member-email")}`;
    popup.querySelector(".storeName2").innerText = `가게 상호명 : ${row.getAttribute("data-store-name")}`;
    popup.querySelector(".storeAddress").innerText = `가게 주소 : ${row.getAttribute("data-store-location")}`;
    popup.querySelector(".storeTel").innerText = `가게 전화번호 : ${row.getAttribute("data-store-tel")}`;
    popup.querySelector(".storeNo").innerText = `사업자 등록증 : ${row.getAttribute("data-store-no")}`;
}

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener("click", e => {
    if(e.target == popup) {
        popup.style.display = 'none';
    }
});


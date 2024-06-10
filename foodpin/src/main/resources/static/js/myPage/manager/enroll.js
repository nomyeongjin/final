/* 입점 승인/거절 */
document.addEventListener('DOMContentLoaded', () => {
    const approval = document.querySelectorAll(".approval");
    const refuse = document.querySelectorAll(".refuse");


    approval.forEach(button => {
        button.addEventListener('click', e => {
            const memberNo = e.target.dataset.memberNo;
            approveMember(memberNo);
        });
    });

    refuse.forEach(button => {
        button.addEventListener('click', e => {
            const memberNo = e.target.dataset.memberNo;
            refuseMember(memberNo);
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
        if(result.success) {
            alert('승인되었습니다');
            location.reload();
        } else {
            alert('승인에 실패했습니다');
        }
    });
}

// 거절 처리
function refuseMember(memberNo) {
    fetch(`/myPage/manager/refuseMember/${memberNo}`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({memberNo : memberNo})
    })
    .then(resp => resp.json())
    .then(result => {

        if(result.success) {
            alert('거절되었습니다');
            location.reload();
        } else {
            alert('거절에 실패했습니다');
        }
    })
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
    popup.querySelector(".storeInfo").innerText = row.getAttribute("data-store-info");
    popup.querySelector(".storeName").innerText = row.getAttribute("data-store-name");
    popup.querySelector(".ceoName").innerText = `대표자 : ${row.getAttribute("data-member-name")}`;
    popup.querySelector(".ceoTel").innerText = `대표자 전화번호 : ${row.getAttribute("data-member-tel")}`;
    popup.querySelector(".ceoEmail").innerText = `대표자 이메일 : ${row.getAttribute("data-member-email")}`;
    popup.querySelector(".storeName2").innerText = `가게 상호명 : ${row.getAttribute("data-store-name")}`;
    popup.querySelector(".storeAddress").innerText = `가게 주소 : ${row.getAttribute("data-store-location")}`;
    popup.querySelector(".storeTel").innerText = `가게 전화번호 : ${row.getAttribute("data-store-tel")}`;
    popup.querySelector(".storeNo").innerText = `사업자 등록증 : ${row.getAttribute("data-store-no")}`;
    popup.querySelector(".approvalBtn").setAttribute("data-member-no", row.getAttribute("data-member-no"));
    popup.querySelector(".refuseBtn").setAttribute("data-member-no", row.getAttribute("data-member-no"));

}

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener("click", e => {
    if(e.target == popup) {
        popup.style.display = 'none';
    }
});
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
        popup.style.display = 'block';
    });
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener("click", e => {
    if(e.target == popup) {
        popup.style.display = 'none';
    }
});
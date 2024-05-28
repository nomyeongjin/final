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
function refuseMember(memberNo) {
    fetch(`/myPage/manager/refuseMember/${memberNo}`, {
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
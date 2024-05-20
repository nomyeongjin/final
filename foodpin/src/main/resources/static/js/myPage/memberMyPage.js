/* 회원 탈퇴 */
const myPageSubmit = document.querySelector(".myPage-submit");
const secession = document.querySelector("#secession");

if(secession != null){
    secession.addEventListener("submit", e => {
        const memberPw = document.querySelector("#memberPw");
        const agree = document.querySelector("#agree");

        if(memberPw.value.trim().length == 0) {
            alert("비밀번호를 입력해 주세요");
            e.preventDefault();
            return;
        }

        if(!agree.checked) {
            alert("탈퇴 사항을 확인해 주세요.");
            e.preventDefault();
            return;
        }

        if(!confirm("정말 탈퇴 하시겠습니까?")) {
            alert("취소 되었습니다");
            e.preventDefault();
            return;
        }
    })
}

/* 회원 정보 / 비밀번호 변경 화면 변경 */
const changePwBtn = document.querySelector("#changePwBtn");
const infoBtn = document.querySelector("#infoBtn");
const changePwContainer = document.querySelector("#changePwContainer")
const infoContainer = document.querySelector("#infoContainer")

document.addEventListener("DOMContentLoaded", function() {    

    infoContainer.style.display = "block";
    changePwContainer.style.display = "none";
    
    infoBtn.addEventListener("click", function() {
        changePwContainer.style.display = "none";
        infoContainer.style.display = "block";
    });

    changePwBtn.addEventListener("click", function() {
        infoContainer.style.display = "none";
        changePwContainer.style.display = "block";
    });
});



/* 회원 비밀번호 변경 */
const memberChangePw = document.querySelector("#memberChangePw");
const memberChangePwBtn = document.querySelector("#member-changePw-submit");

if(memberChangePw != null) {
    memberChangePw.addEventListener("submit", e => {

        const currentPw = document.querySelector("#currnetPw");
        const newPw = document.querySelector("#newPw");
        const newPwConfirm = document.querySelector("#newPwConfirm");

        let str;

        if(currentPw.value.trim().length == 0) str = "현재 비밀번호를 입력해 주세요";
        else if(newPw.value.trim().length == 0) str = "새 비밀번호를 입력해 주세요";
        else if(newPwConfirm.value.trim().length == 0) str = "새 비밀번호의 확인창을 입력해 주세요";

        if(str != undefined) {
            alert(str);
            e.preventDefault();
            return;
        }

        const regExp = /^[a-zA-Z0-9!@#_-]{6,20}$/;

        if(!regExp.test(newPw.value)) {
            alert("새 비밀번호가 유효하지 않습니다");
            e.preventDefault();
            return;
        }

        if(newPw.value != newPwConfirm.value) {
            alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다");
            e.preventDefault();
            return;
        }
    });
}


/* 회원 정보 / 비밀번호 변경 화면 변경 */
const confirmReservation = document.querySelector("#confirmReservation");
const waitReservation = document.querySelector("#waitReservation");

const confirmedContainer = document.querySelector("#reservation-confirmed-container")
const waitContainer = document.querySelector("#reservation-wait-container")

document.addEventListener("DOMContentLoaded", function() {    

    confirmedContainer.style.display = "block";
    waitContainer.style.display = "none";
    
    confirmReservation.addEventListener("click", function() {
        waitContainer.style.display = "none";
        confirmedContainer.style.display = "block";
    });

    waitReservation.addEventListener("click", function() {
        confirmedContainer.style.display = "none";
        waitContainer.style.display = "block";
    });
});
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

if(memberChangePw != null) {
    memberChangePw.addEventListener("submit", e => {

        const currentPw = document.querySelector("#currentPw");
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

const updateInfo = document.querySelector("#updateInfo");

if(updateInfo != null) {
    updateInfo.addEventListener("submit", e => {
        const memberNickname = document.querySelector("#memberNickname");
        const memberTel = document.querySelector("#memberTel");

        let str;

        if(memberNickname.value.trim().length == 0) str = "닉네임을 입력해 주세요";
        else if(memberTel.value.trim().length == 0) str = "전화번호를 입력해 주세요";

        if(str != undefined) {
            alert(str);
            e.preventDefault();
            return;
        }

        // 닉네임, 전번 유효성 추가하세요


    })
}


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
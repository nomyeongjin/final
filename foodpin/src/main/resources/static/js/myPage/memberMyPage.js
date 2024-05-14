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
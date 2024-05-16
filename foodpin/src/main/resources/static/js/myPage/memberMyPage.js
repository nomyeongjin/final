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
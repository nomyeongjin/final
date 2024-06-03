/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const container = document.querySelector(".myPage-content-container"); // 본문 div 영역

const ceoInfoEdit =  document.querySelector("#ceoInfoEdit") // 사장님 정보 변경 메뉴 버튼
const pwEdit =  document.querySelector("#pwEdit") // 비밀번호 변경 메뉴 버튼

const updateBtn = document.querySelector("#updateBtn"); // 정보 수정 메뉴 버튼

const infoUpdateBtn = document.createElement("button"); // 정보 수정 메뉴 버튼
const pwUpdateBtn = document.createElement("button"); // 정보 수정 메뉴 버튼

/* 로드시 포커스 */
document.addEventListener("DOMContentLoaded", () => {

   document.querySelector("#memberEmail").focus();
});

/** 
 * 사장님 정보 변경 폼 제출 (동기식)
 */
updateBtn.addEventListener("click", () => {

   // 유효성 검사 추가 예정
   
});


/**
 * (메뉴) 사장님 정보 변경 화면 전환
 */
ceoInfoEdit.addEventListener("click", () => {
   
   // 기존 회원의 이메일, 전화번호 조회
   fetch("/myPage/store/ceoInfo", {
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify(memberNo)
   })
   .then(resp => resp.json())
   .then(member => {

      container.innerHTML = "";

      const updateFrm = document.createElement("form");
      updateFrm.classList.add("ceo-info-container");
   
      const emailArea = document.createElement("div");
      emailArea.classList.add("ceoInfo-input-area");
   
      const labelEmail = document.createElement("label");
      labelEmail.setAttribute("for", "memberEmail");
      labelEmail.innerText = "이메일";
   
      const inputEmail = document.createElement("input");
      inputEmail.setAttribute("name", "memberEmail");
      inputEmail.value = member.memberEmail;
   
      emailArea.append(labelEmail, inputEmail);
   
      const telArea = document.createElement("div");
      telArea.classList.add("ceoInfo-input-area");
   
      const labelTel = document.createElement("label");
      labelTel.setAttribute("for", "memberTel");
      labelTel.innerText = "전화번호";
   
      const inputlTel = document.createElement("input");
      inputlTel.setAttribute("name", "memberTel");
      inputlTel.value = member.memberTel;
      telArea.append(labelTel, inputlTel);
   
      infoUpdateBtn.classList.add("update-btn");
      infoUpdateBtn.id = infoUpdateBtn;
      infoUpdateBtn.innerText = "정보 수정";
   
      updateFrm.append(emailArea, telArea, infoUpdateBtn);
      container.append(updateFrm);

      inputEmail.focus(); // 이메일란에 초점
   })
});


/**
 * (메뉴) 비밀번호 변경 화면 전환
 */
pwEdit.addEventListener("click", () => {
   
   container.innerHTML = "";

   const updateFrm = document.createElement("form");
   updateFrm.classList.add("ceo-info-container");

   const pwArea = document.createElement("div"); // 기존 비밀번호
   pwArea.classList.add("ceoInfo-input-area");

   const labelPw = document.createElement("label");
   labelPw.setAttribute("for", "memberPw");
   labelPw.innerText = "비밀번호";
   
   const inputPw = document.createElement("input");
   inputPw.setAttribute("name", "memberPw");
   inputPw.setAttribute("type", "password");

   const NewPwArea = document.createElement("div"); // 새 비밀번호
   NewPwArea.classList.add("ceoInfo-input-area");

   const labelNewPw = document.createElement("label");
   labelNewPw.setAttribute("for", "memberNewPw");
   labelNewPw.innerText = "새 비밀번호";
   
   const inputNewPw = document.createElement("input");
   inputNewPw.setAttribute("name", "memberNewPw");
   inputNewPw.setAttribute("type", "password");

   const NewPwCheckArea = document.createElement("div"); // 새 비밀번호 확인
   NewPwCheckArea.classList.add("ceoInfo-input-area");

   const labelNewPwCheck = document.createElement("label");
   labelNewPwCheck.setAttribute("for", "memberNewPwCheck");
   labelNewPwCheck.innerText = "새 비밀번호 확인";
   
   const inputNewPwCheck = document.createElement("input");
   inputNewPwCheck.setAttribute("name", "memberNewPwCheck");
   inputNewPwCheck.setAttribute("type", "password");

   pwArea.append(labelPw, inputPw); 
   NewPwArea.append(labelNewPw, inputNewPw);
   NewPwCheckArea.append(labelNewPwCheck, inputNewPwCheck);

   pwUpdateBtn.classList.add("update-btn"); // 제출 버튼
   pwUpdateBtn.id = pwUpdateBtn;
   pwUpdateBtn.innerText = "비밀번호 변경";

   updateFrm.append(pwArea, NewPwArea, NewPwCheckArea, );
   container.append(updateFrm);

   inputPw.focus(); // 기존비밀번호란에 초점
});

infoUpdateBtn.addEventListener("click", () => {

   const member = {
      "memberNo" : memberNo,
      "memberEmail" : document.querySelector("input[name='memberEmail']").value,
      "memberTel" : document.querySelector("input[name='memberTel']").value
   };

   console.log(member);

   fetch("/myPage/store/ceoInfoUpdateJs", {
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify(member)
   })
   .then(resp => resp.json())
   .then(result => {
      
      console.log(result);

   })

});

pwUpdateBtn.addEventListener("click", () => {

   const pw = {
      "memberNo" : memberNo,
      "memberPw" : document.querySelector("input[name='memberPw']").value,
      "memberNewPw" : document.querySelector("input[name='memberNewPws']").value,
      "memberNewPwCheck" : document.querySelector("input[name='memberNewPwCheck']").value
   }

})

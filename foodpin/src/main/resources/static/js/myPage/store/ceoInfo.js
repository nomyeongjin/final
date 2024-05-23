/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const container = document.querySelector(".myPage-content-container"); // 본문 div 영역

const ceoInfoEdit =  document.querySelector("#ceoInfoEdit") // 사장님 정보 변경 메뉴 버튼
const pwEdit =  document.querySelector("#pwEdit") // 비밀번호 변경 메뉴 버튼

const updateBtn = document.querySelector("#updateBtn"); // 정보 수정 메뉴 버튼

const infoUpdateBtn = document.createElement("button"); // 정보 수정 메뉴 버튼

/** 
 * 사장님 정보 변경 폼 제출 (동기식)
 */
updateBtn.addEventListener("click", () => {

   // 유효성 검사 추가 예정
   
});

console.log(memberNo);

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
   })
});


/**
 * (메뉴) 비밀번호 변경 화면 전환
 */
pwEdit.addEventListener("click", () => {

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

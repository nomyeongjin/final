/* 본문 영역, 수정 버튼 변수 선언 */
const container = document.querySelector(".myPage-content-container"); // 본문 div 영역
const UpdateBtn = document.querySelector("#UpdateBtn"); // 수정 완료 버튼
const EditBtn = document.querySelector("#EditBtn"); // 정보 수정 버튼

/**
 * 정보 수정 버튼 클릭시 보기 화면에서 수정 화면으로 전환
 */
EditBtn.addEventListener("click", () => {

   /* input 변수 선언 */
   const memberEmail = document.querySelector("#memberEmail");
   const storeTel = document.querySelector("#storeTel");
   const memberPw = document.querySelector("#memberPw");

   const newPwArea = document.querySelector("#newPw").parentElement;
   // const newPw = document.querySelector("#newPw");

   const newPwCheckArea = document.querySelector("#newPwCheck").parentElement;
   // const newPwCheck = document.querySelector("#newPwCheck");


   memberEmail.readOnly = false; // input readonly 속성 제거
   storeTel.readOnly = false;

   memberPw.classList.remove('blind'); // input blind 클래스 제거 / 추가
   newPwArea.classList.remove('blind');
   newPwCheckArea.classList.remove('blind');

   UpdateBtn.classList.remove('blind'); // 버튼 blind 클래스 제거 / 추가
   EditBtn.classList.add('blind');

   // 비동기로 데이터 전송 추가 예정!
   // ...
});


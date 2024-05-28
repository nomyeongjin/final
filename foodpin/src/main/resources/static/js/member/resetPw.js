
const checkObj = {
    "memberPw"        : false,
    "memberPwConfirm" : false,
};
  

/* 비밀번호 / 비밀번호 확인 유효성 검사 */
  
  // 1) 비밀번호 관련 요소 얻어오기
  const memberPw = document.querySelector("#memberPw");
  const memberPwConfirm = document.querySelector("#memberPwConfirm");
  const pwMessage = document.querySelector("#pwMessage");
  
  
  // 5) 비밀번호, 비밀번호확인이 같은지 검사하는 함수
  const checkPw = () => {
  
    // 같을 경우
    if(memberPw.value === memberPwConfirm.value){
      pwMessage.innerText = "비밀번호가 일치합니다";
      pwMessage.classList.add("confirm");
      pwMessage.classList.remove("error");
      checkObj.memberPwConfirm = true; // 비밀번호확인 true
      return;
    }
  
    pwMessage.innerText = "비밀번호가 일치하지 않습니다";
    pwMessage.classList.add("error");
    pwMessage.classList.remove("confirm");
    checkObj.memberPwConfirm = false; // 비밀번호확인 false
  }
  
  
  
  // 2) 비밀번호 유효성 검사
  memberPw.addEventListener("input", e => {
  
    // 입력 받은 비밀번호 값
    const inputPw = e.target.value;
  
    // 3) 입력되지 않은 경우
    if(inputPw.trim().length === 0){
      pwMessage.innerText = "영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
      pwMessage.classList.remove("confirm", "error"); // 검은 글씨
      checkObj.memberPw = false; // 비밀번호가 유효하지 않다고 표시
      memberPw.value = ""; // 처음 띄어쓰기 입력 못하게 하기
      return;
    }
  
    // 4) 입력 받은 비밀번호 정규식 검사
    const regExp = /^[a-zA-Z0-9!@#_-]{6,20}$/;
  
    if( !regExp.test(inputPw) ){ // 유효하지 않으면
      pwMessage.innerText = "비밀번호가 유효하지 않습니다";
      pwMessage.classList.add("error");
      pwMessage.classList.remove("confirm");
      checkObj.memberPw = false; 
      return;
    }
  
    // 올바른 경우
    pwMessage.innerText = "올바른 비밀번호 형식입니다";
    pwMessage.classList.add("confirm");
    pwMessage.classList.remove("error");
    checkObj.memberPw = true;
  
    // 7) 비밀번호 입력 시에도 확인이랑 비교하는 코드 추가
    
    // 비밀번호 확인에 값이 작성되어 있을 때
    if(memberPwConfirm.value.length > 0){
      checkPw();
    }
  });
  
  
  
  // 6) 비밀번호 확인 유효성 검사
  // 단, 비밀번호(memberPw)가 유효할 때만 검사 수행
  memberPwConfirm.addEventListener("input", () => {
  
    if(checkObj.memberPw){ // memberPw가 올바른 경우
      checkPw(); // 비교하는 함수 수행
      return;
    }
  
    // memberPw가 유효하지 않은 경우
    // memberPwConfirm 검사 X
    checkObj.memberPwConfirm = false;
  });


/////////////////////////////////////////////////////////////////////



const restPwResultForm = document.querySelector("#restPwResultForm");

// 회원 가입 폼 제출 시
restPwResultForm.addEventListener("submit", e => {

  // checkObj의 저장된 값(value)중 
  // 하나라도 false가 있으면 제출 X

  // for ~ in (객체 전용 향상된 for문)

  for(let key in checkObj){ // checkObj 요소의 key 값을 순서대로 꺼내옴

    if( !checkObj[key] ) { // false인 경우 (유효하지 않음)

      let str; // 출력할 메시지를 저장할 변수

      switch(key){
      case "memberPw": 
      str = "비밀번호가 유효하지 않습니다"; break;
      
      case "memberPwConfirm": 
      str = "비밀번호가 일치하지 않습니다"; break;
          
      }
      
      alert(str); // 경고창 출력

      document.getElementById(key).focus(); // 초점 이동

      e.preventDefault(); // form 태그 기본 이벤트(제출) 막기
      return;
    }
  }

});

/* ***** 회원 가입 유효성 검사 ***** */
  
  // 필수 입력 항목의 유효성 검사 여부를 체크하기위한 객체(체크리스트)
  // - true   == 해당 항목은 유효한 형식으로 작성됨
  // - false  == 해당 항목은 유효하지 않은 형식으로 작성됨
  const checkObj = {
    "memberid"     : false,
    "memberPw"        : false,
    "memberPwConfirm" : false,
    "memberNickname"  : false,
    "memberTel"       : false,
    "authKey"         : false
  };
  
  // ----------------------
  
  /* 이메일 유효성 검사 */
  
  // 1) 이메일 유효성 검사에 사용될 요소 얻어오기
  const memberEmail  = document.querySelector("#memberEmail");
  const emailMessage = document.querySelector("#emailMessage");
  
  // 2) 이메일이 입력(input 이벤트) 될 때 마다 유효성 검사 수행
  memberEmail.addEventListener("input", e => {
  
    // 작성된 이메일 값 얻어오기
    const inputEmail = e.target.value; 
  
    // 3) 입력된 이메일이 없을 경우
    if(inputEmail.trim().length === 0){
  
      emailMessage.innerText = "영어(소문자),숫자로만 2~10글자";
  
      // 메시지에 색상을 추가하는 클래스 모두 제거
      emailMessage.classList.remove('confirm', 'error');
  
      // 이메일 유효성 검사 여부를 false 변경
      checkObj.memberEmail = false;
  
      // 잘못 입력한 띄어쓰기가 있을 경우 없앰
      memberEmail.value = "";
      
      return;
    }
  
  
    // 4) 입력된 이메일이 있을 경우 정규식 검사
    //    (알맞은 형태로 작성 했는가 검사)
    const regExp = /^[a-z\d]{2,10}$/;
  
    // 입력 받은 이메일이 정규식과 일치하지 않는 경우
    // (알맞은 이메일 형태가 아닌 경우)
    if( !regExp.test(inputEmail) ){
      emailMessage.innerText = "알맞은 이메일 형식으로 작성해 주세요.";
      emailMessage.classList.add('error'); // 글자 빨간색으로 변경
      emailMessage.classList.remove('confirm'); // 초록색 제거
      checkObj.memberEmail = false; // 유효하지 않은 이메일임을 기록
      return;
    }
  
  
    // 5) 유효한 이메일 형식인 경우 중복 검사 수행
    // 비동기(ajax)
    fetch("/member/checkEmail?memberEmail=" + inputEmail)
    .then( response => response.text() )
    .then( count => {
      // count : 1이면 중복, 0이면 중복 아님
  
      if(count == 1){ // 중복 O
        emailMessage.innerText = "이미 사용중인 이메일 입니다.";
        emailMessage.classList.add('error');
        emailMessage.classList.remove('confirm');
        checkObj.memberEmail = false; // 중복은 유효하지 않음
        return;
      }
  
      // 중복 X 인 경우
      emailMessage.innerText = "사용 가능한 이메일 입니다";
      emailMessage.classList.add('confirm');
      emailMessage.classList.remove('error');
      checkObj.memberEmail = true; // 유효한 이메일 
    
    })
  
    .catch( e => {
      // fetch() 수행 중 예외 발생 시 처리
      console.log(e); // 발생한 예외(e) 출력
    })
  });
  
  
  // ---------------------------------
  
  
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
  
    // 유효한 경우
    pwMessage.innerText = "유효한 비밀번호 형식입니다";
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
  
    if(checkObj.memberPw){ // memberPw가 유효한 경우
      checkPw(); // 비교하는 함수 수행
      return;
    }
  
    // memberPw가 유효하지 않은 경우
    // memberPwConfirm 검사 X
    checkObj.memberPwConfirm = false;
  });
  
  
  
  // ------------------------------
  
  /* 닉네임 유효성 검사 */
  
  const memberNickname = document.querySelector("#memberNickname");
  const nickMessage = document.querySelector("#nickMessage");
  
  memberNickname.addEventListener("input", e => {
  
    inputNickname = e.target.value;
  
    // 1) 입력 안한 경우
    if(inputNickname.trim().length === 0){
      nickMessage.innerText = "한글,영어,숫자로만 2~10글자";
      nickMessage.classList.remove("confirm", "error");
      checkObj.memberNickname = false;
      memberNickname.value = "";
      return;
    }
  
  
    // 2) 정규식 검사
    const regExp = /^[가-힣\w\d]{2,10}$/;
  
    if( !regExp.test(inputNickname) ){ // 유효 X
      nickMessage.innerText = "유효하지 않은 닉네임 형식입니다.";
      nickMessage.classList.add("error");
      nickMessage.classList.remove("confirm");
      checkObj.memberNickname = false;
      return;
    }
  
    // 3) 중복 검사(유효한 경우)
    fetch("/member/checkNickname?memberNickname=" + inputNickname)
    .then(response => response.text())
    .then(count => {
  
      if(count == 1){ // 중복 O
        nickMessage.innerText = "이미 사용중인 닉네임 입니다.";
        nickMessage.classList.add("error");
        nickMessage.classList.remove("confirm");
        checkObj.memberNickname = false;
        return;
      }
  
      nickMessage.innerText = "사용 가능한 닉네임 입니다.";
      nickMessage.classList.add("confirm");
      nickMessage.classList.remove("error");
      checkObj.memberNickname = true;
  
    })
  
    .catch(e => console.log(e));
    
  });
  
  
  // -----------------------------------------
  
  
  //  휴대폰번호 정규 표현식
  //  /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
  
  /* 전화번호(휴대폰번호) 유효성 검사 */
  const memberTel = document.querySelector("#memberTel");
  const telMessage = document.querySelector("#telMessage");
  
  memberTel.addEventListener("input", e => {
  
    const inputTel = e.target.value;
  
    if(inputTel.trim().length === 0){
      telMessage.innerText = "전화번호를 입력해주세요.(- 제외)";
      telMessage.classList.remove("confirm", "error");
      checkObj.memberTel = false;
      memberTel.value = "";
      return;
    }
  
    const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
  
    if( !regExp.test(inputTel) ){
      telMessage.innerText = "유효하지 않은 전화번호 형식입니다";
      telMessage.classList.add("error");
      telMessage.classList.remove("confirm");
      checkObj.memberTel = false;
      return;
    }
  
    telMessage.innerText = "유효한 전화번호 형식입니다";
    telMessage.classList.add("confirm");
    telMessage.classList.remove("error");
    checkObj.memberTel = true;
  });
  
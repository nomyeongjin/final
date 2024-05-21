/* 다음 주소 API 활용 */
function execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
  
        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수
       
  
        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }
  
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('postcode').value = data.zonecode;
        document.getElementById("address").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("detailAddress").focus();
      

        

        /* 가게 주소 유효성 검사 */
        const postcode = document.querySelector("#postcode")
        const postcodeMessage = document.querySelector("#postcodeMessage")
        const inputPostcode = postcode.value;

        if(inputPostcode.trim().length === 0){
          postcodeMessage.innerText = "우편번호를 입력해주세요. (5글자)";
          postcodeMessage.classList.remove("confirm", "error");
          checkObj.postcode = false;
          postcodeMessage.value = "";
          return;
        }

        const regExp = /^[0-9]{5}$/;;

        if( !regExp.test(inputPostcode) ){
          postcodeMessage.innerText = "숫자 5자리를 입력해주세요.";
          postcodeMessage.classList.add("error");
          postcodeMessage.classList.remove("confirm");
          checkObj.postcode = false;
          return;
        }

        postcodeMessage.innerText = "";
        checkObj.postcode = true;

        const address = document.querySelector("#address")
        const addressMessage = document.querySelector("#addressMessage")


        const inputAddress = address.value;

        if(inputAddress.trim().length === 0){
          addressMessage.innerText = "주소를 입력해주세요.";
          addressMessage.classList.remove("confirm", "error");
          checkObj.address = false;
          addressMessage.value = "";
          return;
        }
      
        addressMessage.innerText = "";
        checkObj.address = true;



      }
    }).open();
  }


  postcode.addEventListener("input",()=>{
    checkObj.postcode = false;
    postcode.focus();

  })
  address.addEventListener("input",()=>{
    checkObj.address = false;
    address.focus();
  })
  


  /* 주소 검색 버튼 클릭 시 */
  document.querySelector("#searchAddress").addEventListener("click", execDaumPostcode);
  
  
///////////////////////////////////////////////////////////////////////////////////////////////


/* ***** 회원 가입 유효성 검사 ***** */
  
  // 필수 입력 항목의 유효성 검사 여부를 체크하기위한 객체(체크리스트)
  // - true   == 해당 항목은 올바른 형식으로 작성됨
  // - false  == 해당 항목은 유효하지 않은 형식으로 작성됨
  const checkObj = {
    "memberId"        : false,
    "memberPw"        : false,
    "memberPwConfirm" : false,
    "memberTel"       : false,
    "authKey"         : false,
    "memberName"      : false,
    "memberEmail"     : false,
    "storeNo"         : false,
    "storeName"       : false,
    "postcode"        : false,
    "address"         : false,
    "storeTel"        : false,
    "openHour"        : false,
    "closeHour"       : false
  };
  

/* 아이디유효성 검사 */
  
const memberId = document.querySelector("#memberId");
const idMessage = document.querySelector("#idMessage");

memberId.addEventListener("input", e => {

  inputId = e.target.value;

  // 1) 입력 안한 경우
  if(inputId.trim().length === 0){
    idMessage.innerText = "영어(소문자),숫자로만 8~20글자 사이로 입력해주세요.";
    idMessage.classList.remove("confirm", "error");
    checkObj.memberId = false;
    memberId.value = "";
    memberId.focus();
    return;
  }


  // 2) 정규식 검사
  const regExp = /^[a-z\d]{8,20}$/;

  if( !regExp.test(inputId) ){ // 유효 X
    idMessage.innerText = "유효하지 않은 아이디 형식입니다.";
    idMessage.classList.add("error");
    idMessage.classList.remove("confirm");
    checkObj.memberId = false;
    memberId.focus();
    return;
  }


  // 3) 중복 검사(올바른 경우)
  fetch("/member/checkId?memberId=" + inputId)
  .then(response => response.text())
  .then(count => {

    if(count == 1){ // 중복 O
        idMessage.innerText = "이미 사용중인 아이디 입니다.";
        idMessage.classList.add("error");
        idMessage.classList.remove("confirm");
      checkObj.memberId = false;
      memberId.focus();
      return;
    }

    idMessage.innerText = "사용 가능한 아이디 입니다.";
    idMessage.classList.add("confirm");
    idMessage.classList.remove("error");
    checkObj.memberId = true;

  })

  .catch(e => console.log(e));
  
});

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
  
      emailMessage.innerText = "메일을 받을 수 있는 이메일을 입력해주세요.";
  
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
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // 입력 받은 이메일이 정규식과 일치하지 않는 경우
    // (알맞은 이메일 형태가 아닌 경우)
    if( !regExp.test(inputEmail) ){
      emailMessage.innerText = "알맞은 이메일 형식으로 작성해 주세요.";
      emailMessage.classList.add('error'); // 글자 빨간색으로 변경
      emailMessage.classList.remove('confirm'); // 초록색 제거
      checkObj.memberEmail = false; // 유효하지 않은 이메일임을 기록
      return;
    }
  
    emailMessage.innerText = "올바른 이메일 형식 입니다.";
    emailMessage.classList.add("confirm");
    emailMessage.classList.remove("error");
    checkObj.memberEmail = true;
  
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
  
  
  
  // ------------------------------
  
  
  
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
  
    telMessage.innerText = "올바른 전화번호 형식입니다";
    telMessage.classList.add("confirm");
    telMessage.classList.remove("error");
    checkObj.memberTel = true;
  });
  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 인증번호 받기 버튼
const sendAuthKeyBtn = document.querySelector("#sendAuthKeyBtn"); 

// 인증번호 입력 input
const authKey = document.querySelector("#authKey");

// 인증번호 입력 후 확인하는 버튼
const checkAuthKeyBtn = document.querySelector("#checkAuthKeyBtn");

// 인증번호 관련 메시지 출력 span
const authKeyMessage = document.querySelector("#authKeyMessage");

let authTimer; // 타이머 역할을 할 setInterval을 저장할 변수

const initMin = 4;  // 타이머 초기 값(분)
const initSec = 59; // 타이머 초기 값(초)
const initTime = "05:00"; 

// 실제 줄어드는 시간을 저장할 변수
let min = initMin;
let sec = initSec;


// 인증번호 받기 버튼 클릭 시
sendAuthKeyBtn.addEventListener("click", () => {

  checkObj.authKey = false;
  document.querySelector("#authKeyMessage").innerText = "";

  // 중복되지 않은 올바른 이메일을 입력한 경우가 아니면
  if ( !checkObj.memberTel ){
    alert("올바른 전화번호 작성 후 클릭해 주세요");
    return;
  }

  // 클릭 시 타이머 숫자 초기화
  min = initMin;
  sec = initSec;

  // 이전 동작중인 인터벌 클리어
  clearInterval(authTimer);

  checkObj.authKey = false; // 인증 유효성 검사 여부 false

  // ***************************************
  // 비동기로 서버에서 문자 보내기

  fetch("/member/sendSMS", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : memberTel.value
  })
  .then(response => response.text())
  .then(result => {
    if(result != null){
      console.log("인증 번호 발송 성공");



    }else{
      console.log("인증 번호 발송 실패");
    }
  })


  // ***************************************

 // 비동기 형식으로 휴대폰 인증번호 보내기
 
  authKeyMessage.innerText = initTime; // 05:00 세팅
  authKeyMessage.classList.remove("confirm", "error"); // 검정 글씨
  

  alert("인증번호가 발송되었습니다.");

  // setInterval(함수, 지연시간(ms))
  // - 지연시간(ms)만큼 시간이 지날 때 마다 함수 수행

  // clearInterval(Interval이 저장된 변수)
  // - 매개변수로 전달 받은 interval을 멈춤

  // 인증 시간 출력(1초 마다 동작)
  authTimer = setInterval( () => {

    authKeyMessage.innerText = `${addZero(min)}:${addZero(sec)}`;

    // 0분 0초인 경우("00:00"초 출력 후)
    if(min == 0 && sec == 0){
      checkObj.authKey = false; // 인증 못함
      clearInterval(authTimer); // interval 멈춤
      authKeyMessage.classList.add("error");
      authKeyMessage.classList.remove("confirm");
      return;
    }

    // 0초인 경우(0초를 출력한 후)
    if(sec == 0){
      sec = 60;
      min--; 
    }

    sec--; // 1초 감소

  }, 1000);

});


// 전달 받은 숫자가 10 미만인 경우(한자리) 앞에 0 붙여서 반환
function addZero(number){
  if( number < 10 ) return  "0" + number;
  else              return number;
}


// 인증하기 버튼을 눌렀을때
checkAuthKeyBtn.addEventListener("click", () => {

  if( min === 0 && sec === 0){ // 타이머가 00:00 인 경우
    alert("인증번호 입력 제한시간을 초과하였습니다.");
    return;
  }

  if(authKey.value.length < 6){ // 인증번호가 제대로 입력 안된 경우
    alert("인증번호를 정확히 입력해 주세요");
    return;
  }

  // 입력 받은 이메일, 인증번호로 객체 생성
  const obj = {
    "telNumber"   : memberTel.value,
    "authKey" : authKey.value
  };

  fetch("/member/checkAuthKey", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(obj) // obj를 JSON 변경
  })
  .then(resp => resp.text())
  .then(result => {

    // ==   : 값만 비교
    // ===  : 값 + 타입 비교

    if(result == 0){
      alert("인증번호가 일치하지 않습니다");
      checkObj.authKey = false;
      return;
    }

    clearInterval(authTimer); // 타이머 멈춤

    authKeyMessage.innerText = "인증 되었습니다";
    authKeyMessage.classList.remove("error");
    authKeyMessage.classList.add("confirm");

    checkObj.authKey = true; // 인증번호 검사여부 true

  })


});
// ---------------------------------------------------------------------------------------

/* 가게 정보 */

// 사업자 등록번호 유효성 검사
  const storeNo = document.querySelector("#storeNo");
  const storeNoMessage = document.querySelector("#storeNoMessage");
  
  storeNo.addEventListener("input", e => {

    const inputStoreNo = e.target.value;
  
    if(inputStoreNo.trim().length === 0){
      storeNoMessage.innerText = "사업자 등록 번호를 입력해주세요.(- 제외)";
      storeNoMessage.classList.remove("confirm", "error");
      checkObj.storeNo = false;
      storeNoMessage.value = "";
      return;
    }
  
    const regExp = /^\d{10}$/;

    if( !regExp.test(inputStoreNo) ){
      storeNoMessage.innerText = "유효하지 않은 사업자 등록 번호 형식입니다";
      storeNoMessage.classList.add("error");
      storeNoMessage.classList.remove("confirm");
      checkObj.storeNo = false;
      return;
    }
  
    storeNoMessage.innerText = "올바른 사업자 등록 번호 형식입니다";
    storeNoMessage.classList.add("confirm");
    storeNoMessage.classList.remove("error");
    checkObj.storeNo = true;
  });
//---------------------------------------------------------------------

/* 상호명 유효성 검사 */
const storeName = document.querySelector("#storeName");
const storeNameMessage = document.querySelector("#storeNameMessage");

storeName.addEventListener("input", e => {


  const inputStoreName = e.target.value;

  if(inputStoreName.trim().length === 0){
    storeNameMessage.innerText = "상호명을 입력해주세요. (30자 이내)";
    storeNameMessage.classList.remove("confirm", "error");
    checkObj.storeName = false;
    storeNameMessage.value = "";
    return;
  }

  const regExp = /^.{1,30}$/;;

  if( !regExp.test(inputStoreName) ){
    storeNameMessage.innerText = "30자 이내로 입력해주세요.";
    storeNameMessage.classList.add("error");
    storeNameMessage.classList.remove("confirm");
    checkObj.storeName = false;
    return;
  }

  storeNameMessage.innerText = "올바른 상호명 형식입니다";
  storeNameMessage.classList.add("confirm");
  storeNameMessage.classList.remove("error");
  checkObj.storeName = true;
});


//----------------------------------------------------------------------

  /* 전화번호 유효성 검사 */
  const storeTel = document.querySelector("#storeTel");
  const storeTelMessage = document.querySelector("#storeTelMessage");
  
  storeTel.addEventListener("input", e => {

    const inputStoreTel = e.target.value;
  
    if(inputStoreTel.trim().length === 0){
      storeTelMessage.innerText = "전화번호를 입력해주세요.(- 제외)";
      storeTelMessage.classList.remove("confirm", "error");
      checkObj.storeTel = false;
      storeTelMessage.value = "";
      return;
    }
  
    const regExp = /^(02\d{7,8}|0\d{2}\d{7,8}|01[016789]\d{7,8})$/;

    if( !regExp.test(inputStoreTel) ){
      storeTelMessage.innerText = "유효하지 않은 전화번호 형식입니다";
      storeTelMessage.classList.add("error");
      storeTelMessage.classList.remove("confirm");
      checkObj.storeTel = false;
      return;
    }
  
    storeTelMessage.innerText = "올바른 전화번호 형식입니다";
    storeTelMessage.classList.add("confirm");
    storeTelMessage.classList.remove("error");
    checkObj.storeTel = true;
  });
  




// ---------------------------------------------------------------------------------------------------------------
const memberName = document.querySelector("#memberName")

const nameMessage = document.querySelector("#nameMessage");
  
memberName.addEventListener("input", e => {

  const inputName = e.target.value;

  if(inputName.trim().length === 0){
    nameMessage.innerText = "이름을 입력해주세요.";
    nameMessage.classList.remove("confirm", "error");
    checkObj.memberName = false;
    nameMessage.value = "";
    return;
  }

  const regExp = /^[가-힣a-zA-Z]{2,20}$/;

  if( !regExp.test(inputName) ){
    nameMessage.innerText = "유효하지 않은 이름 형식입니다";
    nameMessage.classList.add("error");
    nameMessage.classList.remove("confirm");
    checkObj.memberName = false;
    return;
  }

  nameMessage.innerText = "올바른 이름 형식입니다";
  nameMessage.classList.add("confirm");
  nameMessage.classList.remove("error");
  checkObj.memberName = true;
});

// ---------------------------------------------------------------------------------------------------------------
const openHour = document.querySelector("#openHour")

const openHourMessage = document.querySelector("#openHourMessage");
  
openHour.addEventListener("input", e => {

  const inputOpenHour = e.target.value;

  if(inputOpenHour.trim().length === 0){
    openHourMessage.innerText = "가게 오픈 시간을 기입해주세요.";
    openHourMessage.classList.remove("confirm", "error");
    checkObj.openHour = false;
    openHourMessage.value = "";
    return;
  }


  openHourMessage.innerText = "";
  openHourMessage.classList.add("confirm");
  openHourMessage.classList.remove("error");
  checkObj.openHour = true;
});

// ---------------------------------------------------------------------------------------------------------------
const closeHour = document.querySelector("#closeHour")

const closeHourMessage = document.querySelector("#closeHourMessage");
  
closeHour.addEventListener("input", e => {

  const inputCloseHour = e.target.value;

  if(inputCloseHour.trim().length === 0){
    closeHourMessage.innerText = "가게 마감 시간을 기입해주세요.";
    closeHourMessage.classList.remove("confirm", "error");
    checkObj.closeHour = false;
    closeHourMessage.value = "";
    return;
  }


  closeHourMessage.innerText = "";
  closeHourMessage.classList.add("confirm");
  closeHourMessage.classList.remove("error");
  checkObj.closeHour = true;
});


//----------------------------------------------------------------------------------------------------------------


/* 회원 가입 버튼 클릭 시 전체 유효성 검사 여부 확인 */

const signUpForm = document.querySelector("#signUpForm");

// 회원 가입 폼 제출 시
signUpForm.addEventListener("submit", e => {

  // checkObj의 저장된 값(value)중 
  // 하나라도 false가 있으면 제출 X

  // for ~ in (객체 전용 향상된 for문)

  for(let key in checkObj){ // checkObj 요소의 key 값을 순서대로 꺼내옴

    if( !checkObj[key] ) { // false인 경우 (유효하지 않음)

      let str; // 출력할 메시지를 저장할 변수

      switch(key){

      case "memberId": 
      str = "아이디가 유효하지 않습니다"; break;
      
      case "memberPw": 
      str = "비밀번호가 유효하지 않습니다"; break;
      
      case "memberPwConfirm": 
      str = "비밀번호가 일치하지 않습니다"; break;

      case "memberTel": 
      str = "전화번호가 유효하지 않습니다"; break;

      case "authKey" :
      str = "휴대폰 인증이 되지 않았습니다"; break;
      
      case "memberName": 
      str = "이름이 유효하지 않습니다"; break;
      
      case "memberEmail": 
      str = "이메일이 유효하지 않습니다"; break;

      case "storeNo": 
      str = "사업자 등록 번호가 유효하지 않습니다"; break;

      case "storeName": 
      str = "상호명이 유효하지 않습니다"; break;

      case "postcode": 
      str = "우편번호가 유효하지 않습니다"; break;

      case "address": 
      str = "도로명/지번 주소가 유효하지 않습니다"; break;

      case "storeTel": 
      str = "가게 전화번호가 유효하지 않습니다"; break;

      case "openHour": 
      str = "오픈 시간이 유효하지 않습니다"; break;

      case "closeHour": 
      str = "마감 시간이 유효하지 않습니다"; break;
          
      }
      
      alert(str); // 경고창 출력

      document.getElementById(key).focus(); // 초점 이동

      e.preventDefault(); // form 태그 기본 이벤트(제출) 막기
      return;
    }
  }

});

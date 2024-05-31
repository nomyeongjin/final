
const getCookie= key =>{
    const cookies = document.cookie; //"K=V"; "K:V";



    // cookies 문자열을 배열 형태로 변환
    const cookieList = cookies.split("; ") // ["K=V", "K=V"] 배열 모양으로 쪼개짐
                             // .map(el => {return el.split}) // ["K", "V"]
                             .map( el => el.split("=") ); // ["K", "V"]
    
        console.log(cookieList); // -> 2차원 배열이 됨

    // 배열 -> 객체로 변환 (그래야 다루기 쉽다)
    
    const obj = {}; // 비어있는 객체 선언

    for(let i=0; i<cookieList.length; i++){
       const k= cookieList[i][0]; // key 값
       const v= cookieList[i][1];
       obj[k]=v; // 객체에 추가
    }

    //console.log("obj", obj);

    return obj[key]; // 매개 변수로 전달 받은 key와
                     // obj 객체에 저장된 key가 일치하는 요소의 값 반환
}


const loginId = document.querySelector("#loginForm input[name='memberId']")

// 아이디가 loginForm의 후손 중에서 input name이 memberEmail인 요소

// 로그인 안된 상태인 경우에만 수행
if(loginId != null){// 로그인창의 이메일 입력 부분이 있을 때


    // 쿠키 중 key값이 "saveId"인 요소의 value 얻어오기
    const saveId= getCookie("saveId"); // undefined 또는 이메일

    // saveId 값이 있을 경우
    if(saveId != undefined){
        loginId.value = saveId; // 쿠키에서 얻어온 값을 input에 value로 세팅

        document.querySelector("input[name='saveId']").checked = true;
    }

}

const inputPw = document.querySelector("#loginForm input[name='memberPw']");
const pwMessage = document.querySelector("#pwMessage");

inputPw.addEventListener("onkeyup", event => {

    checkCapsLock(event)

})

function checkCapsLock(event)  {
    if (event.getModifierState("CapsLock")) {
      pwMessage.innerText = "Caps Lock이 켜져 있습니다."

    }else {
      pwMessage.innerText = ""
    }
  }

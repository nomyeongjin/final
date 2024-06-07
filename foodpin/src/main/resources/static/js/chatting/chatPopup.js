



// -----------------------------------------------------------------------------------------
/* 팝업 채팅창 */
const toChatting = document.getElementById("toChatting");


 if(toChatting != null){
    toChatting.addEventListener("click", () => {
        if(!notificationLoginCheck){

            alert("로그인 후 이용해주세요.")

        }else{
            showPopup();
        }
    })

 }


/* Get 방식 */
function showPopup() { 
  window.open("/chatting/chatPopup/"+storeNo, "chatting", "채팅창", "width=500px, height=600px, left=100, top=50"); 
}


// 채팅에 사용될 SockJS 객체를 저장할 변수
let chattingSock; 

// 로그인이 되어있을 경우
if( notificationLoginCheck ){

  // "/chattingSock" 주소를 처리하는 WebSocketHandler에 연결
  chattingSock = new SockJS("/chattingSock");
}


/* 채팅 메시지를 보내는 함수 */ 
const sendMessage = () => {

  // 채팅 입력 textarea
  const inputChatting = document.querySelector("#inputChatting");
  const msg = inputChatting.value.trim(); // 입력된 채팅 메시지
  const chattingNo = document.querySelector("#main").getAttribute("data-chattingNo");

  // 로그인이 되어있지 않으면 함수 종료
  if(!notificationLoginCheck) return;

  if(msg.length === 0){ // 채팅 미입력
    alert("채팅을 입력해 주세요");

    return;
  }

  // 웹소켓 핸들러로 전달할 채팅 관련 데이터를 담은 객체 생성
  const chattingObj = {
    "targetNo" : targetNo,    // 메시지를 받을 대상의 회원 번호(웹소켓)
    "messageContent" : msg,         // 전달할 메시지 내용
    "chattingNo" : chattingNo // 채팅방 번호(DB 저장용도)
  }

  // JSON으로 변환하여 웹소켓 핸들러로 전달
  chattingSock.send( JSON.stringify(chattingObj) );

  inputChatting.value = ""; // 보낸 채팅 내용 삭제
}


// -----------------------------------------------------------------------------------------


/* 연결된 웹소켓 객체를 통해 서버로 부터 메시지를 전달 받은 경우 */
if(chattingSock != undefined){

    chattingSock.addEventListener("message", e => {
      console.log(e.data);
  
      // 메소드를 통해 전달받은 JSON을 JS Object로 변환해서 msg 변수에 저장.
      const msg = JSON.parse(e.data); 
      console.log(msg);
  

      const chattingNo = document.querySelector("#main").getAttribute("data-chattingNo");
  
      // 현재 채팅방을 보고있는 경우
      if(chattingNo == msg.chattingNo){
  
  
        const ul = document.querySelector(".display-chatting");
      
        // 메세지 만들어서 출력하기
        //<li>,  <li class="my-chat">
        const li = document.createElement("li");
      
        // 보낸 시간
        const span = document.createElement("span");
        span.classList.add("chatDate");
        span.innerText = msg.sendTime;
      
        // 메세지 내용
        const p = document.createElement("p");
        p.classList.add("chat");
        p.innerHTML = msg.messageContent; // br태그 해석을 위해 innerHTML
      
        // 내가 작성한 메세지인 경우
        if(loginMemberNo == msg.memberNo){ 
          li.classList.add("my-chat");
          
          li.append(span, p);
          
        }else{ // 상대가 작성한 메세지인 경우
          li.classList.add("target-chat");
      
          // 상대 프로필
          const img = document.createElement("img");
          img.setAttribute("src", selectTargetProfile);
          
          const div = document.createElement("div");
      
          // 상대 이름
          const b = document.createElement("b");
          b.innerText = selectTargetName; // 전역변수
      
          const br = document.createElement("br");
      
          div.append(b, br, p, span);
          li.append(img,div);
      
        }
      
        ul.append(li)
        display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로
      }
  
  
    })
  }
  
  
  
  // -----------------------------------------------------------------------------------------
  
  
  
  // -----------------------------------------------------------------------------------------
  
  
  // 채팅 메세지 영역
  const display = document.getElementsByClassName("display-chatting")[0];
  
  
  
  
  // -----------------------------------------------------------------------------------------
  
  
  // 비동기로 메세지 목록을 조회하는 함수
  function selectChattingFn() {

    const chattingNo = document.querySelector("#main").getAttribute("data-chattingNo");
      fetch(`/chatting/selectMessage?chattingNo=${chattingNo}`)
      .then(resp => resp.json())
      .then(messageList => {
  
          // <ul class="display-chatting">
          const ul = document.querySelector(".display-chatting");
  
          // ul.innerHTML = ""; // 이전 내용 지우기
  
          console.log(messageList);

          // 메세지 만들어서 출력하기
          for(let msg of messageList){
              //<li>,  <li class="my-chat">
              const li = document.createElement("li");
  
              // 보낸 시간
              const span = document.createElement("span");
              span.classList.add("chatDate");
              span.innerText = msg.sendTime;
  
              // 메세지 내용
              const p = document.createElement("p");
              p.classList.add("chat");
              p.innerHTML = msg.messageContent; // br태그 해석을 위해 innerHTML
  
              // 내가 작성한 메세지인 경우
              if(loginMemberNo == msg.memberNo){ 
                  li.classList.add("my-chat");
                  
                  li.append(span, p);
                  
              }else{ // 상대가 작성한 메세지인 경우
                  li.classList.add("target-chat");
  
                  // 상대 프로필
                  const img = document.createElement("img");
                  img.setAttribute("src", selectTargetProfile);
                  
                  const div = document.createElement("div");
  
                  // 상대 이름
                  const b = document.createElement("b");
                  b.innerText = selectTargetName; // 전역변수
  
                  const br = document.createElement("br");
  
                  div.append(b, br, p, span);
                  li.append(img,div);
  
              }
  
              ul.append(li);
              display.scrollTop = display.scrollHeight; // 스크롤 제일 밑으로
          }

      })
      .catch(err => console.log(err));
  }
  
  
  // -----------------------------------------------------------------------------------------
  
   
  /* 문서 로딩 완료 후 수행 */
  document.addEventListener("DOMContentLoaded", () => {
  
    

    // 보내기 버튼 클릭 시 메시지 보내기
    const send = document.querySelector("#send")
   
   if(send!=null){ 
    send.addEventListener("click", sendMessage);
  }
  

  const inputChatting = document.querySelector("#inputChatting")

  if(inputChatting!=null){
    // 채팅 입력 후 엔터 입력 시 메시지 보내기
    document.querySelector("#inputChatting").addEventListener("keyup", e => {
      // 입력한 키가 Enter인 경우
      if(e.key == "Enter"){
        if(!e.shiftKey){ /// shift가 눌러지지 않은 경우
                        // == shift + enter 입력 시 제출 X
          sendMessage();
        }
      }
    })
    

  }
  
  })

  

// 채팅방 입장 또는 선택 함수
function chattingEnter(e){

	const targetNo = e.currentTarget.getAttribute("data-id");

	fetch("/chatting/enter?targetNo="+targetNo)
	.then(resp => resp.text())
	.then(chattingNo => {
		console.log(chattingNo);
		
		
		setTimeout(()=>{ 
			// 만약 채팅방 목록 중 이미 존재하는 채팅방이 있으면 클릭해서 입장
			const itemList = document.querySelectorAll(".chatting-item")
			for(let item of itemList) {		
				if(item.getAttribute("chat-no") == chattingNo){
					item.focus();
					item.click();
					addTargetPopupLayer.classList.toggle("popup-layer-close");
					targetInput.value = "";
					resultArea.innerHTML = "";
					return;
				}
			}

		}, 200);

	})
	.catch(err => console.log(err));
}


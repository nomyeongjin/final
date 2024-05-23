// --------- storeDetail에서 예약하기 버튼 클릭 시 화면 전환 
const storereservationbutton = document.querySelector("#storereservationbutton");

if(storereservationbutton != null) {

    storereservationbutton.addEventListener("click", e => {

        if(memberCode !== 1){
            alert("현재 로그인한 정보로 접근할 수 없는 서비스 입니다.");
            e.preventDefault();
            return;
        }
    })  
}

// -------------------------------------------------------------


// 예약 주의 사항
const noticeTitle = document.querySelector(".notice-title"); // button

if(noticeTitle !=null) {    
    noticeTitle.addEventListener("click", () => {
        const noticeInnerDetail = document.querySelector(".notice-inner-detail");

        noticeInnerDetail.classList.toggle("show-box");
    });
}

//---------------------------

/* **************  reservationDetail ************** */

// 예약 시 인원/날짜 체크 함수

// 예약 인원 수 체크
const buttonItem = document.querySelectorAll(".button-item");
if(buttonItem != null) {
    for(let li of buttonItem) {

        li.addEventListener("click", () =>{
            for(let item of buttonItem){item.classList.remove("select");}
            li.classList.add("select");
        });
    };
}

// 예약 날짜 체크
const timeItem = document.querySelectorAll(".time-item");

fetch("/reservation/reservationDetail", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : {}
})
.then(resp => resp.text())
.then()

    if(timeItem != null) {
        for(let li of timeItem){
            li.addEventListener("click", () => {
                for(let item of timeItem){item.classList.remove("select");}
                li.classList.add("select");
            });
        };
    }


// ----------------------------------------------------------------------------------------

// const getCheckTimeItem = () =>{
    
//     const checkItem = document.querySelector(".select");

//     if(checkItem){
//         console.log(checkItem.innerText.trim());
//     }
// }

// ------------------------------------------

// 처음 예약 페이지에서 '다음' 버튼 클릭 시 로그인 여부 확인 
const nextBtn = document.querySelector(".next-btn");
if(nextBtn != null){

    nextBtn.addEventListener("click", e => {
        if(loginMember == null) {
            alert("로그인 후 이용해 주세요");
            e.preventDefault();
            return;
        }

        /* ****** 버튼 클릭 될 때 form 태그 생성 ******  */
        const form = document.createElement("form");
        form.action="/reservation/nextPage";
        form.method="POST";

        // 인원 선택한 값 저장 input
        const input1 = document.createElement("input");
        input1.type="hidden";
        input1.name="reservCount";

        // 달력
        const input2 = document.createElement("input");
        input2.type="hidden";
        input2.name="selectDate";
        input2.className="select-date";

        // 달력에서 선택된 날짜 (아마도..?)
        const selectDate = document.querySelector(".select-date");
        if (selectDate) {
            input2.value = selectDate.innerText || selectDate.value || "";
        } 
        input2.value = ""; // 선택된 날짜가 없을 경우 빈 값으로 설정
        

        // 시간 선택
        const input3 = document.createElement("input");
        input3.type="hidden";
        input3.name="reservTime";

        // form 태그에 input 태그 추가
        if(form){
            form.append(input1, input2, input3);
        }

        // body에 form 태그
        document.body.append(form);

    });
}



/* *** 예약 인원, 날짜 체크 *** */
// const detailObj = {
//     "reservCount": reservCount,

// }

// 30분 간격으로 시간 쪼개기 예시
const startTime = "14:00";
const endTime = "19:00";
const interval = 30;

const getTimeSplit = (startTime, endTime, interval) => {

    const times = []; // 쪼갠 시간 저장 할 빈 배열

    const temp = new Date();
    const currenyDate = `${temp.getFullYear()}-${temp.getMonth()}-${temp.getDate()}`;

    let start = new Date(`${currenyDate} ${startTime}`);
    let end = new Date(`${currenyDate} ${endTime}`);

    // 늦은 오후 부터 새벽까지 영업하는 경우
    if(start.getTime() > end.getTime()){
        end = new Date(`${temp.getFullYear()}-${temp.getMonth()}-${temp.getDate()+1} ${endTime}`);
    }
    
    const intervalMs = interval * 60 * 1000; // interval을 ms로 변환

    for(let time = start; time <= end; time = new Date(time.getTime() + intervalMs)){

        let hours = time.getHours();
        let mins = time.getMinutes();

        hours = (hours < 10 ? "0" : "") + hours;
        mins = (mins < 10 ? "0" : "") + mins;

        times.push(`${hours}:${mins}`);
    }

    // li 태그 얻어오기
    const timeItme = document.querySelectorAll(".time-item");
    
    // li 태그 text 지우고 날짜로 출력하기
    for(let li of timeItem){
        
        li.innerHTML="";

        // for(let detailTime of times){ 
            
            

        //     console.log(detailTime);
        //     // li.innerText=detailTime;
        // }
    }



    console.log(times);
    return;
}
getTimeSplit(startTime, endTime, interval);


/*  ************  reservationCheck ************ */

/* 다음 페이지 클릭 할 때 체크박스 검사 */
const confirmBtn = document.querySelector("#confirmBtn");
confirmBtn.addEventListener("click", e => {

    /* 동의버튼 체크 x */
    const checkAgree = document.querySelector("#checkAgree");

    if(checkAgree){
        if(!checkAgree.checked){
            alert("개인정보 수집 및 제공 동의를 체크해 주세요");
            e.preventDefault();
            return;
        }
    }

});

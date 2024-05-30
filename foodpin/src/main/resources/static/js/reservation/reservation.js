// --------- storeDetail에서 예약하기 버튼 클릭 시 화면 전환 
const storereservationbutton = document.querySelector("#storereservationbutton");

if(storereservationbutton != null) {

    storereservationbutton.addEventListener("click", e => {

        // 로그인한 회원의 memberCode가 1이 아닌 경우
        if(memberCode !== 1 && loginMember != null){
            // alert("현재 로그인한 정보로 접근할 수 없는 서비스 입니다.");
            Swal.fire({
                title: "",
                text: "현재 로그인한 정보로 접근할 수 없는 서비스 입니다.",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "확인"
            })
            e.preventDefault();
            return;
        }
    })  
}

// -------------------------------------------------------------

// 선택 항목 검사용
const checkObj = {"reservTime" : false};

// -------------------------------------------------------------

// 공통 --- 예약 주의 사항
const noticeTitle = document.querySelector(".notice-title"); // button

if(noticeTitle !=null) {    
    noticeTitle.addEventListener("click", () => {
        const noticeInnerDetail = document.querySelector(".notice-inner-detail");

        noticeInnerDetail.classList.toggle("show-box");
    });
}

// -------------------------------------------------------------

/* **************  reservationDetail ************** */

const storeMaxNumber = document.querySelector("#reservCount").dataset.storeMaxNumber;

const temp = 10;

if(storeMaxNumber == 0) {
    for(let i = 1; i<=temp; i++){
        const buttonList = document.querySelector(".button-list");
        
        // li 태그
        const countList = document.createElement("li");
        countList.className="button-item";
        countList.innerText = `${i}명`;
        
        buttonList.append(countList); 

    }
}

if(storeMaxNumber != null) {
    
    for(let i = 1; i<=storeMaxNumber; i++){
        
        /* li 태그 생성하기 */
        
        // ul 태그 
        const buttonList = document.querySelector(".button-list");
        
        // li 태그
        const countList = document.createElement("li");
        countList.className="button-item";
        countList.innerText = `${i}명`;
        
        buttonList.append(countList); // ui>li
        
    }
}

// 예약 인원 수 체크

// 기본으로 0번째 인덱스는 체크 상태에서 시작
const buttonItem = document.querySelectorAll(".button-item");

if(buttonItem != null && buttonItem.length > 0) {
    buttonItem[0].classList.add("select");

    for(let li of buttonItem) {

        li.addEventListener("click", () =>{
            for(let item of buttonItem){
                item.classList.remove("select");
            }
            li.classList.add("select");

            const count = li.innerText;
  
            console.log(count);
            return;
        });
    };
}



// ----------------------------------------------------------------------------------------

// 처음 예약 페이지에서 '다음' 버튼 클릭 시 로그인 여부 확인 
const nextBtn = document.querySelector("#nextCheckBtn");
if(nextBtn != null){

    nextBtn.addEventListener("click", e => {
        e.preventDefault();
        
        if(loginMember == null) {
            // alert("로그인 후 이용해 주세요");
            Swal.fire({
                title: "",
                text: "로그인 후 이용해 주세요",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "확인"
            })
            e.preventDefault();
            return;
        }

        for(let key in checkObj) {

            if(!checkObj[key]){
                // alert("시간을 선택해 주세요.");
                Swal.fire({
                    title: "",
                    text: "시간을 선택해 주세요.",
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "확인"
                })
                e.preventDefault();
                return;
            }
        }

        // 위 검사 모두 통과 시

        /* ****** 버튼 클릭 될 때 form 태그 생성 ******  */
        const form = document.createElement("form");
        form.action=`/store/storeDetail/${storeNo}/reservation/nextPage`; //제출될 주소
        form.method="POST";

        // 인원 선택한 값 저장 input
        const input1 = document.createElement("input");
        const selectCount = document.querySelector(".button-item.select").innerText
        // console.log(selectCount);

        input1.type="hidden";
        input1.name="reservCount";
        input1.value=selectCount;
        // input1.value = count.value;

        // 달력
        const input2 = document.createElement("input");
        const selectDate = document.querySelector(".select-date").innerText;
        console.log(selectDate);

        input2.type="hidden";
        input2.name="reservDate";
        input2.className="select-date";
        input2.value = selectDate;
        
        // console.log("input2" , input2);

        // 시간 선택
        const input3 = document.createElement("input");
        const time = document.querySelector(".time-item.select").innerText;
        
        input3.type="hidden";
        input3.name="reservTime";
        input3.value=time;
        // form 태그에 input 태그 추가
        
        form.append(input1, input2, input3);

        // body에 form 태그
        document.body.append(form);

        form.submit(); // 다음 버튼 클릭 시 form 태그 제출

    });
}

// 30분 간격으로 시간 쪼개기 예시
let startTime;
let endTime;
let interval;

/* 시간 30분 단위로 출력하는 함수 설정 */
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
    // console.log(times);
    return times;
}
getTimeSplit(startTime, endTime, interval);

/*  ************  reservationCheck ************ */

/* 예약자 정보와 실제 방문자 정보가 다를 경우 폼 */
const visitInfoBtn = document.querySelector(".visitInfoBtn");
const visitForm = document.querySelector(".visit-form");
const visitInfoBtnUp = document.querySelector(".visitInfoBtnUp");

if(visitInfoBtn != null) {
    visitInfoBtn.addEventListener("click", () => {
        visitForm.classList.toggle("visit");
    })
}

/* 다음 페이지 클릭 할 때 체크박스 검사 */
const confirmBtn = document.querySelector("#confirmBtn");

if(confirmBtn != null) {

    confirmBtn.addEventListener("click", e => {

        /* 동의버튼 체크 x */
        const checkAgree = document.querySelector("#checkAgree");

        if(checkAgree){
            if(!checkAgree.checked){
                // alert("개인정보 수집 및 제공 동의를 체크해 주세요");
                Swal.fire({
                    title: "",
                    text: "개인정보 수집 및 제공 동의를 체크해 주세요",
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "확인"
                })
                e.preventDefault();
                return;
            }
        }

        /* 예약 확정 하기 전 예약 정보 페이지이기 때문에 별도의 검사 진행XX */

        /* 예약 정보를 담은  form 생성... */

        // form 태그 생성
        const insertForm = document.createElement("form");
        insertForm.action=`/store/storeDetail/${storeNo}/reservation/insertPage`; //제출될 주소
        //`/store/storeDetail/${storeNo}/reservation/nextPage`
        insertForm.method="POST";

        // 예약 날짜
        const input1 = document.createElement("input");

        /* 날짜, 시간 둘 다 사용해야 할 값 */
        const finalDate = document.querySelector(".reserv-date-count").innerText;
        // console.log(finalDate);
        input1.type="hidden";
        input1.name="reservDate";
        
        const datePart = finalDate.slice(0,5); // 00.00 날짜만 가져옴
        console.log(datePart);
        const [month, day] = datePart.split(".").map(Number); // .을 기준으로 month와 day 분리
        const year = new Date().getFullYear(); // 현재 년도를 가져옴
        const dateObj = new Date(year, month-1, day+1);
        const dateString = dateObj.toISOString().split("T")[0];   // ex) 2024-05-23T14:48:00.000Z을
                                                                //"YYYY-MM-DD" 형식으로 저장

        console.log(dateString);

        // 최종적으로 form 태그에 담겨 DB에 저장될 값
        input1.value=dateString;

        // thymeleaf에서 이용할 값 DB 저장 X
        const input2 = document.createElement("input");
        input2.type="hidden";
        input2.name="originalReservDate";
        input2.value = finalDate;


        /* 예약 시간 */
        const input3 = document.createElement("input");
        input3.type="hidden";
        input3.name="reservTime";

        const reservTime = finalDate.slice(9); // 8번째 인덱스 이후부터 잘라냄 (시간만 분리)
        console.log(reservTime);
        input3.value = reservTime;

        // 예약 인원
        const input4 = document.createElement("input");
        const finalCount = document.querySelector(".reserv-date-count").innerText;
        input4.type="hidden";
        input4.name="reservCount";
        // input4.value=finalCount;'
        
        const countPart = finalCount.substr(0,1); // "2명" 에서 "2" 만 추출
        const reservCount = Number(countPart); // 문자를 숫자로 변환
        input4.value=reservCount; // DB 저장용 

        // 요청사항
        const input5 = document.createElement("input");
        const reservRequest = document.querySelector("#reservRequest").value;
        input5.type="hidden";
        input5.name="reservRequest";
        input5.value=reservRequest;

        // 방문자 이름
        const input6 = document.createElement("input");
        const visitName = document.querySelector("#visitName").value;
        input6.type="hidden";
        input6.name="visitName";
        input6.value=visitName;

        // 방문자 전화번호
        const input7 = document.createElement("input");
        const visitTel = document.querySelector("#visitTel").value;
        input7.type="hidden";
        input7.name="visitTel";
        input7.value=visitTel;

        insertForm.append(input1, input2, input3, input4, input5,  input6, input7);
        
        // body에 form 태그
        document.body.append(insertForm);
        
        insertForm.submit(); // 다음 버튼 클릭 시 form 태그 제출

    });
}


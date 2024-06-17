/**************** 가게 찜, 좋아요 개수 ******************/


// 1. #bookmarkCheck 클릭 되었을 때
const bookmarkCheck = document.querySelector("#bookmarkCheck");
bookmarkCheck.addEventListener("click", e=>{

  console.log( "memberNo" , loginMember);
  console.log( "storeNo"  ,storeNo);
  console.log( "bookmark", bookmark);
    // 3. 준비된 3개의 변수를 객체로 저장 -> (Json 변환 예정)
    const obj = {
        "memberNo" : loginMember,
        "storeNo"  : storeNo,
        "bookmark": bookmark
    };

    //4. 좋아요 INSERT / DELETE 비동기 요청
    fetch("/store/like", {

    method  : "POST",
    headers : {"Content-Type" : "application/json"},
    body    : JSON.stringify(obj) // 객체를 Json으로 문자화 

    })

    .then(resp =>resp.text()) // 반환 결과 text(글자) 형태로 변환
    .then(count =>{

        // count == 첫 번째 then의 파싱되어 반환된 값('-1' 또는 게시글 좋아요 수)
        //console.log("result :", result);


        if(count == -1){
            console.log("좋아요 처리 실패");
            return;
        }

        // 5. bookmark 값 0<->1 변환
        // (왜? 클릭 될 때 마다 INSERT/DELETE 동작을 번갈아 가면서 할 수 있음)
        bookmark = bookmark == 0? 1: 0;

        // 6. 하트를 채웠다/비웠다 바꾸기
        
        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("fa-solid");
        


        // 7. 게시글 좋아요 수 수정
        e.target.nextElementSibling.innerText = count;

        bookmarkCheck.classList.add('fa-bounce');

        // 1초 후에 fa-shake 클래스를 제거
        setTimeout(function () {
          bookmarkCheck.classList.remove('fa-bounce');
        }, 500);
       

    });

});

 

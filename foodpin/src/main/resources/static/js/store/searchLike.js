/**************** 가게 찜, 좋아요 개수 ******************/

const addStoeLikeFn = async () => {
    
    let storeNoList = [];
    document.querySelectorAll(".storeNoI").forEach(element => {
        storeNoList.push(element.getAttribute("data-storeNo"));
    });
    
    console.log("storeNo:", storeNoList);
    
    const bookmarkList = [];
    document.querySelectorAll(".bookmarkCheck").forEach(element => {
        bookmarkList.push(element.getAttribute("data-bookmark"));
    });
    
    console.log("bookmark:", bookmarkList);
    
    const bookmarkCheckElements = document.querySelectorAll(".bookmarkCheck");
    
    bookmarkCheckElements.forEach((bookmarkCheck, index) => {
        bookmarkCheck.addEventListener("click", e => {
            const storeNo = storeNoList[index];
            const bookmark = bookmarkList[index];
            
            console.log("memberNo", loginMember);
            console.log("storeNo", storeNo);
            console.log("bookmark", bookmark);
    
            // 준비된 3개의 변수를 객체로 저장 -> (Json 변환 예정)
            const obj = {
                "memberNo": loginMember,
                "storeNo": storeNo,
                "bookmark": bookmark
            };
    
            // 좋아요 INSERT / DELETE 비동기 요청
            fetch("/store/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj) // 객체를 Json으로 문자화
            })
            .then(resp => resp.text()) // 반환 결과 text(글자) 형태로 변환
            .then(count => {
                // count == 첫 번째 then의 파싱되어 반환된 값('-1' 또는 게시글 좋아요 수)
    
                if (count == -1) {
                    console.log("좋아요 처리 실패");
                    return;
                }
    
                // bookmark 값 0<->1 변환
                // (왜? 클릭 될 때 마다 INSERT/DELETE 동작을 번갈아 가면서 할 수 있음)
                const newBookmark = bookmark == 0 ? 1 : 0;
                e.target.setAttribute("data-bookmark", newBookmark);
                bookmarkList[index] = newBookmark;
    
                // 하트를 채웠다/비웠다 바꾸기
                e.target.classList.toggle("fa-regular");
                e.target.classList.toggle("fa-solid");
    
                // 게시글 좋아요 수 수정
                e.target.nextElementSibling.innerText = count;
    
                e.target.classList.add('fa-bounce');
    
                // 1초 후에 fa-shake 클래스를 제거
                setTimeout(function () {
                    e.target.classList.remove('fa-bounce');
                }, 500);
            });
        });
    });

}



document.addEventListener("DOMContentLoaded", () => {
    addStoeLikeFn();
})

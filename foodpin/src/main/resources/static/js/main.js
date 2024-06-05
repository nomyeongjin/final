// 메인 페이지 -> 가게 검색 페이지로 보내는 동작
 const mainCategoryBtns = document.querySelectorAll(".main-category-button button");

    mainCategoryBtns.forEach(function(button) {
        button.addEventListener("click", function() {
            window.location.href = "store/storeSearch/" + catgoryCode;

        });
    });

/* 빠른 로그인 */
// 버튼 얻어오기
const quickLoginBtn = document.querySelectorAll(".main-quick-login");

quickLoginBtn.forEach((item) =>{


   // list로 얻어온 quickLoginBtn 요소 하나씩 꺼내서 이벤트 추가하기
   item.addEventListener("click", e=>{

      const id = item.innerText; // 버튼에 작성된 이메일 얻어오기

      location.href = "/member/quickLogin?memberId=" + id;
   })

   
})



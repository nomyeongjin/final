// 메인 페이지 -> 가게 검색 페이지로 보내는 동작
 const mainCategoryBtns = document.querySelectorAll(".main-category-button button");

    mainCategoryBtns.forEach(function(button) {
        button.addEventListener("click", function() {
            window.location.href = "store/storeSearch";

        });
    });

/* 가게 찜 해제 */
const like = document.querySelectorAll(".like");

like.forEach(btn => {
    btn.addEventListener("click", e => {
        
        if(!confirm("찜을 해제하시겠습니까?")) {
            e.preventDefault();
            return;
        } 
        const storeNo = e.target.dataset.storeNo;
        cancelLike(storeNo);
    });
});
function cancelLike(storeNo) {
    fetch(`/myPage/member/cancelLike`, {
        method : "DELETE",
        headers : {"Content-Type" : "application/json"},
        body : storeNo
    })
    .then(resp => resp.text())
    .then(result => {
        console.log(result);
        if(result) {
            location.reload();
        } else {
            alert("취소에 실패했습니다");
        }
    });
}

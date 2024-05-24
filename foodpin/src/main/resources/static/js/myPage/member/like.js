/* 가게 찜 */
const like = document.querySelector(".like");
like.addEventListener("click", e => {
    const obj = {
        "memberNo" : loginMemberNo,
        "storeNo" : storeNo,
        "likeCheck" : likeCheck
    };

    fetch("/myPage/member/memberLike", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(obj)
    })
    .then(resp => resp.text())
    .then(count => {
        if(count == -1) {
            return;
        }

        likeCheck = likeCheck == 0 ? 1 : 0;

        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("fa-solid");

        
    })
})
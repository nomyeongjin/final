const signupStoreBtn = document.querySelector("#signupStoreBtn");
const signupCommonBtn = document.querySelector("#signupCommonBtn");

signupStoreBtn.addEventListener("click",()=>{
    location.href="/member/signupStore";
})
signupCommonBtn.addEventListener("click",()=>{
    location.href="/member/signupCommon";
})

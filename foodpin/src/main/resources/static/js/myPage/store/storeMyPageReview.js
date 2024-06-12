const replyUpdateBtn = document.querySelectorAll(".replyUpdateBtn");
const replyDeleteBtn = document.querySelectorAll(".replyDeleteBtn");

replyUpdateBtn.forEach((btn) => {
  const parentDiv = btn.closest(".store-reply-box");
  const replyConent = parentDiv.querySelector(".reply-content-bubble");
  const originContent = replyConent.value;

  btn.addEventListener("click", () => {
    
    const replyNo = btn.dataset.replyNo;
    const newContent = replyConent.value.trim();

    if(replyConent.value.trim() == 0){
      alert("답글을 작성해주세요.");
      replyConent.focus();
      return;
    }

    if(newContent == originContent){
      alert("답글을 수정해주세요.");
      replyConent.focus();
      return;
    }

    const obj = {
      "replyNo": replyNo,
      "replyConent": replyConent.value
    }
    
    fetch("/myPage/store/updateReply", {
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(result => {
      console.log(result);

      if(result > 0){
        alert("답글이 수정되었습니다.");
        location.reload();
      }else{
        alert("수정 실패");
      }

    })

    
    
  });

})

replyDeleteBtn.forEach((btn) => {

  btn.addEventListener("click", () => {

    const replyNo = btn.dataset.replyNo;
    console.log(replyNo);

    if(confirm("댓글를 삭제하시겠습니까?")){
      
      fetch("/myPage/store/deleteReply", {
        method : "POST",
        headers : {"content-Type" : "application/json"},
        body: JSON.stringify(replyNo)
      })
      .then(resp => resp.json())
      .then(result => {
        console.log(result);
        if(result > 0){
          alert("댓글이 삭제되었습니다.");
          location.reload();
        }else{
          alert("삭제 실패");
        }
      })
    }else{
      alert("취소 되었습니다.");
      return;
    }


  })


})


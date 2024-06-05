const reviewDeleteBtns = document.querySelectorAll("#reviewDeleteBtn");

reviewDeleteBtns.forEach((btn) => {
  
  btn.addEventListener("click", () => {

    const reviewNo = btn.dataset.reviewNo;
    
    if(confirm("리뷰를 삭제하시겠습니까?")){
      fetch("/review/deleteReview", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(reviewNo)
      })
      .then(resp => resp.json())
      .then(result => {
        
        if(result > 0){
          alert("리뷰가 삭제 되었습니다.");
          location.reload();
        }
  
      });

    }else{
      alert("취소 되었습니다.");
      return;
    }
  });
})
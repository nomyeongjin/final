const reviewDeleteBtns = document.querySelectorAll(".reviewDeleteBtn");

reviewDeleteBtns.forEach((btn) => {
  
  btn.addEventListener("click", () => {

    const reviewNo = btn.dataset.reviewNo;

    fetch("/review/deleteReview", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(reviewNo)
    })
    .then(resp => resp.json())
    .then(result => {
      if (result == 0) {
        Swal.fire({
          icon: "error",
          title: "리뷰 삭제 실패",
          text: "리뷰 삭제가 실패했습니다.",
        });
        return;
      } else {
        Swal.fire({
          title: "리뷰를 삭제 하시겠습니까?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#6E6E6E",
          confirmButtonText: "삭제",
          cancelButtonText: "취소"
        }).then((result) => {
          if (result.isConfirmed) {
            // 삭제 버튼을 눌렀을 때의 동작
            Swal.fire({
              title: "삭제 완료!",
              text: "리뷰가 삭제 되었습니다.",
              icon: "success"
            }).then(() => {
              // 페이지 리로드
              location.reload();
            });
          } else {
            return;
          }
          // 취소 버튼을 눌렀을 때는 아무 작업도 수행하지 않음
        });
      }
    });


  })


})
var totalRatingELement = document.getElementById('totalScoreR');
  var totalRating = Number(totalRatingELement.textContent);

  function averageStar(totalRating) {
    var AvgStar = document.querySelector('.realAvg-star');
     
     AvgStar.style.width = (totalRating*107/5)+'px';
    
   }

 

   averageStar(totalRating);
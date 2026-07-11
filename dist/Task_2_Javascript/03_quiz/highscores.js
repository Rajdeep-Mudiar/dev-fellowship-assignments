const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

if (highScores.length === 0) {
  highScoresList.innerHTML = '<li class="high-score">No scores saved yet.</li>';
} else {
  highScoresList.innerHTML = highScores
    .map((score) => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");
}

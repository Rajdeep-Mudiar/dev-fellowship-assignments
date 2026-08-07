const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const saveScoreForm = document.getElementById("saveScoreForm");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = `Your score: ${mostRecentScore ?? 0}`;

const updateSaveButtonState = () => {
  saveScoreBtn.disabled = !username.value.trim();
};

username.addEventListener("input", updateSaveButtonState);
updateSaveButtonState();

const saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: Number.parseInt(mostRecentScore, 10) || 0,
    name: username.value,
  };
  highScores.push(score);

  highScores.sort((a, b) => b.score - a.score);

  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("./quiz.html");
};

saveScoreForm.addEventListener("submit", saveHighScore);

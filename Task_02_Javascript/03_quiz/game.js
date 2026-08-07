const question = document.getElementById("question");
const choiceContainers = Array.from(
  document.querySelectorAll(".choice-container"),
);
const choiceTexts = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let totalQuestions = 0;

let questions = [];
const fallbackQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

fetch("./questions.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Unable to load questions: ${res.status}`);
    }
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.warn(err);
    questions = fallbackQuestions;
    startGame();
  });
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  totalQuestions = Math.min(MAX_QUESTIONS, availableQuestions.length);
  scoreText.innerText = score;
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= totalQuestions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
  }
  questionCounter++;

  progressText.innerText = `Question ${questionCounter} / ${totalQuestions}`;

  progressBarFull.style.width = `${(questionCounter / totalQuestions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);

  currentQuestion = availableQuestions[questionIndex];

  question.innerText = currentQuestion.question;

  choiceTexts.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choiceContainers.forEach((choiceContainer) => {
  choiceContainer.addEventListener("click", () => {
    if (!acceptingAnswers) {
      return;
    }
    acceptingAnswers = false;
    const selectedChoice = choiceContainer.querySelector(".choice-text");
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    choiceContainer.classList.add(classToApply);

    setTimeout(() => {
      choiceContainer.classList.remove(classToApply);

      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

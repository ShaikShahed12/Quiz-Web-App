//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What does HTML stands for?",
    options: [
      "Hyper Links Markup Language",
      "HyperText Markup Language",
      "HyperTool Mail Language",
      "None of these",
    ],
    correct: "HyperText Markup Language",
  },
  {
    id: "1",
    question: "The correct sequence of HTML tags for starting a webpage is -",
    options: [
      "Head, Title, HTML, body",
      "HTML, Body, Title, Head",
      "HTML, Head, Title, Body",
      "Head, Title, body, HTML",
    ],
    correct: "HTML, Head, Title, Body",
  },
  {
    id: "2",
    question:
      " Which of the following function of Number object returns a string value version of the current number?",
    options: [
      "toString()",
      "toFixed()",
      "toLocaleString()",
      "toLocaleString()",
    ],
    correct: "toString()",
  },
  {
    id: "3",
    question: "CSS stands for -",
    options: [
      "Cascade style sheets",
      "Color and style sheets",
      "Cascading style sheets",
      "None of the above",
    ],
    correct: "Cascading style sheets",
  },
  {
    id: "4",
    question: "The CSS property used to control the element's font-size is -",
    options: ["text-style", "text-size", "font-size", "None of the above"],
    correct: "font-size",
  },
  {
    id: "5",
    question:
      "The CSS property used to specify the transparency of an element is -",
    options: ["opacity", "Color", "Hover", "None of the above"],
    correct: "opacity",
  },
  {
    id: "6",
    question: "___ is widely known as the father of the World Wide Web",
    options: [
      "Tom burners-lee",
      "Tim Berners-Lee",
      "Tom bruce-lee",
      "Tim bruce-lee",
    ],
    correct: "Tim Berners-Lee",
  },
  {
    id: "7",
    question: "URL is an acronym for-",
    options: [
      "Universal research locator",
      "Universal resource locator",
      "Unary research locator",
      "Uniform resource locator",
    ],
    correct: "Uniform resource locator",
  },
  {
    id: "8",
    question:
      "Which of the following is not a back-end programming language commonly used in web development?",
    options: ["PHP", "Ruby", "HTML", "Java"],
    correct: "HTML",
  },
  {
    id: "9",
    question:
      "Which type of web development allows for both front-end and back-end development using a single language?",
    options: [
      "Full-stack development",
      "Multi-language development",
      "Hybrid development",
      "Cross-platform development",
    ],
    correct: "Full-stack development",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

const questions = [
    {
        question: "what is 2 * 2?",
        answers: [
            { text: "3", correct: false },
            { text: "5", correct: false },
            { text: "4", correct: true },
            { text: "6", correct: false },
        ]
    },
    {
        question: "what is 8 / 2?",
        answers: [
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "7", correct: false },
            { text: "2", correct: false },
        ]
    },
    {
        question: "what is 4 * 2?",
        answers: [
            { text: "6", correct: false },
            { text: "10", correct: false },
            { text: "4", correct: false },
            { text: "8", correct: true },
        ]
    },
    {
        question: "what is 10 * 10?",
        answers: [
            { text: "1000", correct: false },
            { text: "200", correct: false },
            { text: "no right answer", correct: false },
            { text: "100", correct: true },
        ]
    },
    {
        question: "what is 4 * 4",
        answers: [
            { text: "8", correct: false },
            { text: "16", correct: true },
            { text: "20", correct: false },
            { text: "24", correct: false },
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next question";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){

            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState() {
    nextButton.style.display="none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){

    const selectedBtn = e.target;
    const iscorrect= selectedBtn.dataset.correct==="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
if(button.dataset.correct==="true"){
    button.classList.add("correct");
}
button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
resetState();
questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
nextButton.innerHTML= "play again";
nextButton.style.display=" block"
}



function handleNextButton(){
currentQuestionIndex++;
if(currentQuestionIndex < questions.length){
    showQuestion();
}else{
    showScore();
}


    
}
nextButton.addEventListener("click",()=>{
if(currentQuestionIndex < questions.length){

    handleNextButton();
}else{
     startQuiz();
}
});


startQuiz();

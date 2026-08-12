// ========================================
// English 9 Vocabulary
// Teacher: Huynh Thanh Nhon
// Search + Flashcards
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // FIND VOCABULARY TABLE
    // ========================================

    const vocabularyTable = document.querySelector("#flashcardSection")
        ? document.querySelector("#flashcardSection").nextElementSibling
        : null;

// ========================================
// LOAD VOCABULARY FROM JSON
// ========================================

const vocabularyBody = document.getElementById("vocabularyBody");

if (vocabularyBody) {

    fetch("Data/Unit 1/vocabulary.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Cannot load vocabulary.json");
            }
            return response.json();
        })
        .then(data => {

            vocabularyBody.innerHTML = "";

            data.forEach(item => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${item.no}</td>
                    <td>
                        <span class="word">${item.word}</span>
                        <span class="pos">(${item.pos})</span>
                    </td>
                    <td>${item.pronunciation}</td>
                    <td>${item.meaning}</td>
                `;

                vocabularyBody.appendChild(row);
            });

        })
        .catch(error => {
            console.error("Vocabulary loading error:", error);
        });
}
    // ========================================
    // VOCABULARY SEARCH
    // ========================================

    const searchInput = document.getElementById("vocabularySearch");

    if (searchInput) {

        const tables = document.querySelectorAll("table");

        let vocabularyTableForSearch = null;

        tables.forEach(function (table) {

            const firstRow = table.querySelector("tr");

            if (firstRow && firstRow.textContent.includes("Word / Phrase")) {
                vocabularyTableForSearch = table;
            }

        });

        if (vocabularyTableForSearch) {

            searchInput.addEventListener("input", function () {

                const keyword = searchInput.value
                    .toLowerCase()
                    .trim();

                const rows =
                    vocabularyTableForSearch.querySelectorAll("tr");

                rows.forEach(function (row, index) {

                    if (index === 0) {
                        row.style.display = "";
                        return;
                    }

                    const rowText =
                        row.textContent.toLowerCase();

                    row.style.display =
                        rowText.includes(keyword) ? "" : "none";
                });
            });
        }
    }


    // ========================================
    // FLASHCARDS
    // ========================================

    const flashcard = document.getElementById("flashcard");
    const flashcardWord = document.getElementById("flashcardWord");
    const flashcardMeaning = document.getElementById("flashcardMeaning");
    const prevCard = document.getElementById("prevCard");
    const nextCard = document.getElementById("nextCard");
    const cardCounter = document.getElementById("cardCounter");


    if (
        !flashcard ||
        !flashcardWord ||
        !flashcardMeaning ||
        !prevCard ||
        !nextCard ||
        !cardCounter
    ) {
        return;
    }


    // ========================================
    // FIND VOCABULARY TABLE
    // ========================================

    const tables = document.querySelectorAll("table");

    let vocabularyTableForCards = null;

    tables.forEach(function (table) {

        const firstRow = table.querySelector("tr");

        if (
            firstRow &&
            firstRow.textContent.includes("Word / Phrase") &&
            firstRow.textContent.includes("Meaning")
        ) {
            vocabularyTableForCards = table;
        }

    });


    if (!vocabularyTableForCards) {
        console.log("Vocabulary table not found.");
        return;
    }


    // ========================================
    // GET VOCABULARY DATA
    // ========================================

    const vocabularyRows =
        vocabularyTableForCards.querySelectorAll("tr");

    const cards = [];


    vocabularyRows.forEach(function (row, index) {

        if (index === 0) {
            return;
        }

        const cells = row.querySelectorAll("td");

        if (cells.length >= 4) {

            cards.push({

                word: cells[1].innerText.trim(),

                pronunciation: cells[2].innerText.trim(),

                meaning: cells[3].innerText.trim()

            });

        }

    });


    if (cards.length === 0) {

        console.log("No vocabulary cards found.");

        return;
    }


    // ========================================
    // FLASHCARD STATE
    // ========================================

    let currentCard = 0;

    let showingMeaning = false;


    // ========================================
    // DISPLAY CARD
    // ========================================

    function showCard() {

        const card = cards[currentCard];

        showingMeaning = false;

        flashcardWord.textContent = card.word;

        flashcardMeaning.textContent =
            "Click the card to reveal the meaning.";

        cardCounter.textContent =
            "Card " +
            (currentCard + 1) +
            " / " +
            cards.length;
    }


    // ========================================
    // CLICK CARD
    // ========================================

    flashcard.addEventListener("click", function () {

        const card = cards[currentCard];

        if (!showingMeaning) {

            flashcardMeaning.innerHTML =
                card.meaning +
                "<br>" +
                "<small>" +
                card.pronunciation +
                "</small>";

            showingMeaning = true;

        } else {

            flashcardMeaning.textContent =
                "Click the card to reveal the meaning.";

            showingMeaning = false;
        }

    });


    // ========================================
    // PREVIOUS
    // ========================================

    prevCard.addEventListener("click", function () {

        currentCard--;

        if (currentCard < 0) {

            currentCard = cards.length - 1;

        }

        showCard();

    });


    // ========================================
    // NEXT
    // ========================================

    nextCard.addEventListener("click", function () {

        currentCard++;

        if (currentCard >= cards.length) {

            currentCard = 0;

        }

        showCard();

    });


    // ========================================
    // START
    // ========================================

    showCard();

});// ========================================
// UNIT 1 QUIZ
// ========================================

const quizQuestions = [

    {
        question: "A skilled ______ makes beautiful traditional products by hand.",
        options: ["artisan", "electrician", "firefighter", "collector"],
        answer: "artisan"
    },

    {
        question: "We should ______ our old traditions for future generations.",
        options: ["preserve", "shorten", "sort", "instruct"],
        answer: "preserve"
    },

    {
        question: "I need to ______ more information about the pottery village.",
        options: ["find out", "come back", "go out", "look around"],
        answer: "find out"
    },

    {
        question: "The children should ______ their grandparents' advice.",
        options: ["look for", "take care of", "get on with", "give advice"],
        answer: "take care of"
    },

    {
        question: "These traditional crafts have been ______ from generation to generation.",
        options: ["handed down", "cut down", "gone out", "found out"],
        answer: "handed down"
    },

    {
        question: "The town is famous for its special ______.",
        options: ["food", "facilities", "property", "function"],
        answer: "food"
    },

    {
        question: "The local people are very ______ and always welcome visitors warmly.",
        options: ["neighbourly", "developing", "original", "productive"],
        answer: "neighbourly"
    },

    {
        question: "The new shopping mall has many modern ______.",
        options: ["facilities", "fragrances", "artisans", "occasions"],
        answer: "facilities"
    },

    {
        question: "Tourism can contribute to the ______ of a local community.",
        options: ["development", "collection", "donation", "enjoyment"],
        answer: "development"
    },

    {
        question: "Many people work ______ to protect traditional handicrafts.",
        options: ["responsibly", "attractive", "voluntary", "proud"],
        answer: "responsibly"
    }

];


// ========================================
// DISPLAY QUIZ
// ========================================

const quizContainer =
    document.getElementById("quizContainer");

const submitQuiz =
    document.getElementById("submitQuiz");

const retryQuiz =
    document.getElementById("retryQuiz");
function validateStudentInfo() {
    const message = document.getElementById("studentInfoMessage");
    const name = studentNameInput ? studentNameInput.value.trim() : "";
    const className = studentClassInput ? studentClassInput.value.trim() : "";

    if (!name) {
        if (message) message.textContent = "Please enter your full name.";
        if (studentNameInput) studentNameInput.focus();
        return false;
    }

    if (!className) {
        if (message) message.textContent = "Please enter your class.";
        if (studentClassInput) studentClassInput.focus();
        return false;
    }

    if (message) message.textContent = "";
    return true;
}

async function sendTrackingData(scoreValue, accuracy) {
    const name = studentNameInput ? studentNameInput.value.trim() : "";
    const className = studentClassInput ? studentClassInput.value.trim() : "";

    const payload = {
        name: name,
        className: className,
        unit: currentUnit,
        score: scoreValue,
        accuracy: accuracy
    };

    try {
        await fetch(trackingUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        });

        return true;
    } catch (error) {
        console.error("Tracking error:", error);
        return false;
    }
}

const currentUnit = 'Unit 1';
const studentNameInput = document.getElementById('studentName');
const studentClassInput = document.getElementById('studentClass');
const trackingUrl = "https://script.google.com/macros/s/AKfycbyRKMNKAiajtKM_pG7GnKW4G8o42tBJE-lPYje3iebaRzrL1s_cjttX2E2J7Z3yZX0A/exec";
const quizResult =
    document.getElementById("quizResult");


function loadQuiz() {

    if (!quizContainer) {
        return;
    }

    quizContainer.innerHTML = "";

    quizQuestions.forEach(function (item, index) {

        const questionDiv =
            document.createElement("div");

        questionDiv.className = "question";

        const questionTitle =
            document.createElement("h3");

        questionTitle.textContent =
            (index + 1) + ". " + item.question;

        questionDiv.appendChild(questionTitle);


        item.options.forEach(function (option) {

            const label =
                document.createElement("label");

            label.className = "option";

            label.innerHTML = `
                <input
                    type="radio"
                    name="question${index}"
                    value="${option}"
                >
                ${option}
            `;

            questionDiv.appendChild(label);

        });


        quizContainer.appendChild(questionDiv);

    });

    quizResult.textContent = "";

    submitQuiz.style.display = "inline-block";

    retryQuiz.style.display = "none";
}


// ========================================
// CHECK ANSWERS
// ========================================

if (submitQuiz) {

    submitQuiz.addEventListener("click", function () {
    if (!validateStudentInfo()) {
        return;
    }
        let score = 0;

        quizQuestions.forEach(function (item, index) {

            const selected =
                document.querySelector(
                    `input[name="question${index}"]:checked`
                );

            const questionDiv =
                quizContainer.children[index];

            if (selected) {

                if (selected.value === item.answer) {

                    score++;

                    questionDiv.style.border =
                        "2px solid #15803d";

                } else {

                    questionDiv.style.border =
                        "2px solid #dc2626";
                }

            } else {

                questionDiv.style.border =
                    "2px solid #dc2626";
            }

        });


        quizResult.textContent =
            "Your score: " +
            score +
            " / " +
            quizQuestions.length;
    const accuracy =
        Math.round((score / quizQuestions.length) * 100);

    sendTrackingData(score, accuracy);

        submitQuiz.style.display = "none";

        retryQuiz.style.display = "inline-block";

    });

}


// ========================================
// TRY AGAIN
// ========================================

if (retryQuiz) {

    retryQuiz.addEventListener("click", function () {

        loadQuiz();

        window.scrollTo({
            top: document.getElementById("quizSection").offsetTop,
            behavior: "smooth"
        });

    });

}


// ========================================
// START QUIZ
// ========================================

loadQuiz();

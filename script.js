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

});
/* =========================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   PĂDURE REALĂ + OM MARE + ANIMALE EMOJI
========================================================= */

"use strict";


/* =========================================================
   CONFIG
========================================================= */

const QUIZ_CONFIG = {

    lives: 3,

    pointsCorrect: 100,

    delayAfterCorrect: 1400,

    delayAfterWrong: 1400,

    walkDuration: 1400

};


/* =========================================================
   IMAGINI PĂDURE
========================================================= */

const IMAGINI_PADURE = [

    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=90",

    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=90",

    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=90",

    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=90"

];


/* =========================================================
   ANIMALE EMOJI
========================================================= */

const ANIMALE = {

    lup: {
        name: "Lup",
        emoji: "🐺"
    },

    vulpe: {
        name: "Vulpe",
        emoji: "🦊"
    },

    urs: {
        name: "Urs",
        emoji: "🐻"
    },

    iepure: {
        name: "Iepure",
        emoji: "🐰"
    },

    caprioara: {
        name: "Căprioară",
        emoji: "🦌"
    },

    "căprioară": {
        name: "Căprioară",
        emoji: "🦌"
    },

    cerb: {
        name: "Cerb",
        emoji: "🦌"
    },

    bufnita: {
        name: "Bufniță",
        emoji: "🦉"
    },

    "bufniță": {
        name: "Bufniță",
        emoji: "🦉"
    },

    mistret: {
        name: "Mistreț",
        emoji: "🐗"
    },

    "mistreț": {
        name: "Mistreț",
        emoji: "🐗"
    },

    veverita: {
        name: "Veveriță",
        emoji: "🐿️"
    },

    "veveriță": {
        name: "Veveriță",
        emoji: "🐿️"
    },

    ursulet: {
        name: "Ursuleț",
        emoji: "🐻"
    },

    "ursuleț": {
        name: "Ursuleț",
        emoji: "🐻"
    }

};


/* =========================================================
   VARIABILE
========================================================= */

let quizuri = [];

let quizSelectat = null;

let intrebari = [];

let intrebareCurenta = 0;

let vieti =
    QUIZ_CONFIG.lives;

let scor = 0;

let raspunsuriCorecte = 0;

let raspunsuriGresite = 0;

let raspunsBlocat = false;

let scenaImagineIndex = 0;


/* =========================================================
   DOM
========================================================= */

function element(id) {

    return document.getElementById(id);

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   ANIMAL
========================================================= */

function obtineAnimal(animal) {

    if (!animal) {

        return ANIMALE.lup;

    }

    const cheie =
        String(animal)
            .trim()
            .toLowerCase();

    return (
        ANIMALE[cheie] ||
        ANIMALE.lup
    );

}


/* =========================================================
   ECRANE
========================================================= */

function arataEcran(idEcran) {

    [
        "quizSelectScreen",
        "quizGameScreen",
        "quizResultScreen"
    ].forEach(id => {

        const ecran =
            element(id);

        if (ecran) {

            ecran.classList.add(
                "ascuns"
            );

        }

    });

    const activ =
        element(idEcran);

    if (activ) {

        activ.classList.remove(
            "ascuns"
        );

    }

}


/* =========================================================
   PRELOAD FUNDALURI
========================================================= */

function preloadImages() {

    IMAGINI_PADURE.forEach(url => {

        const img =
            new Image();

        img.src = url;

    });

}


/* =========================================================
   SCHIMBĂ FUNDALUL
========================================================= */

function schimbaFundalPadure() {

    const forest =
        document.querySelector(
            ".forest"
        );

    if (!forest) {

        return;

    }

    scenaImagineIndex =
        scenaImagineIndex + 1;

    if (
        scenaImagineIndex >=
        IMAGINI_PADURE.length
    ) {

        scenaImagineIndex = 0;

    }

    const url =
        IMAGINI_PADURE[
            scenaImagineIndex
        ];

    forest.style.setProperty(
        "--forest-image",
        `url("${url}")`
    );

    forest.classList.remove(
        "cinematic-change"
    );

    void forest.offsetWidth;

    forest.classList.add(
        "cinematic-change"
    );

}


/* =========================================================
   SETEAZĂ ANIMALUL
========================================================= */

function seteazaAnimalReal(animalData) {

    const animal =
        element("animal");

    const questionAnimal =
        element("questionAnimal");

    if (!animal) {

        return;

    }

    animal.textContent =
        animalData.emoji;

    animal.setAttribute(
        "aria-label",
        animalData.name
    );

    if (questionAnimal) {

        questionAnimal.textContent =
            animalData.emoji;

        questionAnimal.setAttribute(
            "aria-label",
            animalData.name
        );

    }

    const bubble =
        element("animalBubble");

    if (bubble) {

        bubble.textContent =
            `${animalData.emoji} ${animalData.name}: Alege răspunsul corect!`;

    }

}


/* =========================================================
   RESET ANIMAL
========================================================= */

function animeazaAnimal() {

    const animal =
        element("animal");

    if (!animal) {

        return;

    }

    animal.classList.remove(
        "approach"
    );

    void animal.offsetWidth;

    animal.classList.add(
        "approach"
    );

}


/* =========================================================
   PERSONAJ
========================================================= */

function pregatestePersonaj() {

    const player =
        element("player");

    if (!player) {

        return;

    }

    player.style.left =
        "10%";

    player.classList.remove(
        "walking"
    );

}


/* =========================================================
   MIȘCĂ PERSONAJUL
========================================================= */

function miscaPersonaj() {

    const player =
        element("player");

    if (!player) {

        return;

    }

    const pozitii = [

        "10%",

        "24%",

        "38%",

        "52%",

        "66%",

        "78%",

        "88%"

    ];

    const index =
        Math.min(
            intrebareCurenta,
            pozitii.length - 1
        );

    player.style.left =
        pozitii[index];

    player.classList.remove(
        "walking"
    );

    void player.offsetWidth;

    player.classList.add(
        "walking"
    );

    setTimeout(
        () => {

            player.classList.remove(
                "walking"
            );

        },
        QUIZ_CONFIG.walkDuration
    );

}


/* =========================================================
   ÎNCARCĂ QUIZURILE
========================================================= */

async function incarcaQuizuriSite() {

    const container =
        element("listaQuizuri");

    if (!container) {

        return;

    }

    container.innerHTML = `
        <div class="quiz-loading">
            Se încarcă aventurile...
        </div>
    `;


    if (
        typeof supabaseClient ===
            "undefined" ||
        !supabaseClient
    ) {

        container.innerHTML = `
            <div class="quiz-loading error">
                ❌ Supabase nu este încărcat.
                <br><br>
                Verifică init.js.
            </div>
        `;

        return;

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient

                .from("quizuri")

                .select("*")

                .eq(
                    "activ",
                    true
                )

                .order(
                    "created_at",
                    {
                        ascending:
                            false
                    }
                );


        if (error) {

            throw error;

        }


        if (
            !data ||
            data.length === 0
        ) {

            container.innerHTML = `
                <div class="quiz-loading">
                    📚 Nu există quizuri active.
                </div>
            `;

            return;

        }


        quizuri =
            data;


        container.innerHTML =

            data.map(
                quiz => {

                    return `

                        <div class="quiz-card">

                            <div class="quiz-card-icon">
                                🌲
                            </div>

                            <h2>
                                ${escapeHTML(
                                    quiz.titlu
                                )}
                            </h2>

                            ${
                                quiz.categorie
                                    ? `
                                        <div class="quiz-category">
                                            ${escapeHTML(
                                                quiz.categorie
                                            )}
                                        </div>
                                      `
                                    : ""
                            }

                            ${
                                quiz.descriere
                                    ? `
                                        <p>
                                            ${escapeHTML(
                                                quiz.descriere
                                            )}
                                        </p>
                                      `
                                    : ""
                            }

                            <button
                                type="button"
                                class="game-button primary quiz-start-button"
                                data-quiz-id="${escapeHTML(
                                    quiz.id
                                )}"
                            >
                                🎬 Intră în pădure
                            </button>

                        </div>

                    `;

                }
            ).join("");


    } catch (error) {

        console.error(
            "Eroare încărcare quizuri:",
            error
        );

        container.innerHTML = `
            <div class="quiz-loading error">
                ❌ Nu pot încărca quizurile.
                <br><br>
                ${escapeHTML(
                    error.message
                )}
            </div>
        `;

    }

}


/* =========================================================
   PORNEȘTE QUIZ
========================================================= */

async function pornesteQuiz(quizId) {

    const id =
        Number(quizId);


    const quiz =
        quizuri.find(
            q =>
                Number(q.id) === id
        );


    if (!quiz) {

        console.error(
            "Quiz negăsit:",
            id
        );

        return;

    }


    if (
        typeof supabaseClient ===
            "undefined" ||
        !supabaseClient
    ) {

        alert(
            "Supabase nu este disponibil."
        );

        return;

    }


    quizSelectat =
        quiz;


    try {

        const {
            data,
            error
        } =
            await supabaseClient

                .from("intrebari_quiz")

                .select("*")

                .eq(
                    "quiz_id",
                    id
                )

                .order(
                    "ordine",
                    {
                        ascending:
                            true
                    }
                );


        if (error) {

            throw error;

        }


        intrebari =
            data || [];


        if (
            intrebari.length === 0
        ) {

            alert(
                "Acest quiz nu are întrebări."
            );

            return;

        }


        intrebareCurenta = 0;

        vieti =
            QUIZ_CONFIG.lives;

        scor = 0;

        raspunsuriCorecte = 0;

        raspunsuriGresite = 0;

        raspunsBlocat = false;

        scenaImagineIndex = 0;


        arataEcran(
            "quizGameScreen"
        );


        const title =
            element(
                "gameQuizTitle"
            );

        if (title) {

            title.textContent =
                quiz.titlu ||
                "Aventura";

        }


        pregatestePersonaj();

        actualizeazaStatistici();

        afiseazaIntrebarea();


    } catch (error) {

        console.error(
            "Eroare pornire quiz:",
            error
        );

        alert(
            "Nu am putut porni quizul:\n\n" +
            error.message
        );

    }

}


/* =========================================================
   AFIȘEAZĂ ÎNTREBAREA
========================================================= */

function afiseazaIntrebarea() {

    if (
        intrebareCurenta >=
        intrebari.length
    ) {

        afiseazaRezultat();

        return;

    }


    raspunsBlocat =
        false;


    const intrebare =
        intrebari[
            intrebareCurenta
        ];


    const number =
        element(
            "questionNumber"
        );

    if (number) {

        number.textContent =
            intrebareCurenta + 1;

    }


    const total =
        element(
            "questionTotal"
        );

    if (total) {

        total.textContent =
            intrebari.length;

    }


    const questionText =
        element(
            "questionText"
        );

    if (questionText) {

        questionText.textContent =

            intrebare.intrebare ||

            intrebare.question ||

            "Întrebarea nu este disponibilă";

    }


    const animalData =
        obtineAnimal(
            intrebare.animal
        );


    seteazaAnimalReal(
        animalData
    );


    seteazaRaspuns(
        "answerA",
        intrebare.raspuns_a
    );

    seteazaRaspuns(
        "answerB",
        intrebare.raspuns_b
    );

    seteazaRaspuns(
        "answerC",
        intrebare.raspuns_c
    );

    seteazaRaspuns(
        "answerD",
        intrebare.raspuns_d
    );


    const butoane =
        document.querySelectorAll(
            ".answer-button"
        );


    butoane.forEach(
        button => {

            button.disabled =
                false;

            button.classList.remove(
                "correct",
                "wrong",
                "raspuns-corect",
                "raspuns-gresit"
            );

        }
    );


    const message =
        element(
            "questionMessage"
        );


    if (message) {

        message.textContent =
            "";

        message.className =
            "question-message";

    }


    if (
        intrebareCurenta > 0
    ) {

        schimbaFundalPadure();

        miscaPersonaj();

    }


    animeazaAnimal();


    const panel =
        document.querySelector(
            ".question-panel"
        );


    if (panel) {

        panel.classList.remove(
            "question-enter"
        );

        void panel.offsetWidth;

        panel.classList.add(
            "question-enter"
        );

    }

}


/* =========================================================
   SETEAZĂ RĂSPUNS
========================================================= */

function seteazaRaspuns(
    id,
    text
) {

    const button =
        element(id);

    if (!button) {

        return;

    }


    const textElement =
        button.querySelector(
            ".answer-text"
        );

    if (!textElement) {

        return;

    }


    textElement.textContent =

        text === null ||
        text === undefined

            ? ""

            : String(text);


    /*
     * FORȚĂM AFIȘAREA TEXTULUI.
     */

    textElement.style.display =
        "block";

    textElement.style.visibility =
        "visible";

    textElement.style.opacity =
        "1";

    textElement.style.color =
        "#ffffff";

    button.style.display =
        "flex";

    button.style.visibility =
        "visible";

    button.style.opacity =
        "1";

}


/* =========================================================
   PROCESEAZĂ RĂSPUNS
========================================================= */

async function proceseazaRaspuns(
    raspuns
) {

    if (raspunsBlocat) {

        return;

    }


    const intrebare =
        intrebari[
            intrebareCurenta
        ];


    if (!intrebare) {

        return;

    }


    raspunsBlocat =
        true;


    const raspunsDat =
        String(
            raspuns || ""
        )
            .trim()
            .toUpperCase();


    const raspunsCorect =
        String(

            intrebare.raspuns_corect ||

            intrebare.raspunsCorect ||

            ""

        )
            .trim()
            .toUpperCase();


    const butoane =
        document.querySelectorAll(
            ".answer-button"
        );


    butoane.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    const butonAles =
        document.querySelector(
            `.answer-button[data-answer="${raspunsDat}"]`
        );


    const butonCorect =
        document.querySelector(
            `.answer-button[data-answer="${raspunsCorect}"]`
        );


    const message =
        element(
            "questionMessage"
        );


    const bubble =
        element(
            "animalBubble"
        );


    /* =====================================================
       CORECT
    ===================================================== */

    if (
        raspunsDat ===
        raspunsCorect
    ) {

        raspunsuriCorecte++;


        scor +=
            QUIZ_CONFIG.pointsCorrect;


        if (butonAles) {

            butonAles.classList.add(
                "correct",
                "raspuns-corect"
            );

        }


        if (message) {

            message.textContent =
                `🎉 Răspuns corect! +${QUIZ_CONFIG.pointsCorrect} puncte`;

            message.className =
                "question-message success";

        }


        if (bubble) {

            bubble.textContent =
                "🎉 Bravo! Continuăm aventura!";

        }


        const animal =
            element("animal");


        if (animal) {

            animal.classList.remove(
                "happy"
            );

            void animal.offsetWidth;

            animal.classList.add(
                "happy"
            );

        }


        afiseazaSucces();


        actualizeazaStatistici();


        await asteapta(
            QUIZ_CONFIG.delayAfterCorrect
        );


        intrebareCurenta++;


        if (
            intrebareCurenta >=
            intrebari.length
        ) {

            afiseazaRezultat();

        } else {

            afiseazaIntrebarea();

        }


        return;

    }


    /* =====================================================
       GREȘIT
    ===================================================== */

    raspunsuriGresite++;

    vieti--;


    if (butonAles) {

        butonAles.classList.add(
            "wrong",
            "raspuns-gresit"
        );

    }


    if (butonCorect) {

        butonCorect.classList.add(
            "correct",
            "raspuns-corect"
        );

    }


    if (message) {

        message.textContent =
            "❌ Răspuns greșit!";

        message.className =
            "question-message error";

    }


    if (bubble) {

        bubble.textContent =

            vieti > 0

                ? "😯 Ai grijă! Mai încearcă!"

                : "💔 Ai pierdut toate viețile!";

    }


    const forest =
        document.querySelector(
            ".forest"
        );


    if (forest) {

        forest.classList.remove(
            "screen-shake"
        );

        void forest.offsetWidth;

        forest.classList.add(
            "screen-shake"
        );

    }


    afiseazaAtac();


    actualizeazaStatistici();


    await asteapta(
        QUIZ_CONFIG.delayAfterWrong
    );


    if (
        vieti <= 0
    ) {

        afiseazaRezultat();

        return;

    }


    intrebareCurenta++;


    if (
        intrebareCurenta >=
        intrebari.length
    ) {

        afiseazaRezultat();

    } else {

        afiseazaIntrebarea();

    }

}


/* =========================================================
   EFECT SUCCES
========================================================= */

function afiseazaSucces() {

    const effect =
        element(
            "successEffect"
        );

    if (!effect) {

        return;

    }


    effect.classList.remove(
        "active"
    );

    void effect.offsetWidth;

    effect.classList.add(
        "active"
    );


    setTimeout(
        () => {

            effect.classList.remove(
                "active"
            );

        },
        900
    );

}


/* =========================================================
   EFECT ATAC
========================================================= */

function afiseazaAtac() {

    const effect =
        element(
            "attackEffect"
        );

    if (!effect) {

        return;

    }


    effect.classList.remove(
        "active"
    );

    void effect.offsetWidth;

    effect.classList.add(
        "active"
    );


    setTimeout(
        () => {

            effect.classList.remove(
                "active"
            );

        },
        900
    );

}


/* =========================================================
   STATISTICI
========================================================= */

function actualizeazaStatistici() {

    const score =
        element("score");


    if (score) {

        score.textContent =
            scor;

    }


    const lives =
        element("lives");


    if (lives) {

        lives.textContent =

            "❤️".repeat(
                Math.max(
                    0,
                    vieti
                )
            )

            +

            "🖤".repeat(
                Math.max(
                    0,
                    QUIZ_CONFIG.lives -
                    vieti
                )
            );

    }

}


/* =========================================================
   AȘTEAPTĂ
========================================================= */

function asteapta(ms) {

    return new Promise(
        resolve => {

            setTimeout(
                resolve,
                ms
            );

        }
    );

}


/* =========================================================
   REZULTAT
========================================================= */

function afiseazaRezultat() {

    arataEcran(
        "quizResultScreen"
    );


    const finalScore =
        element(
            "finalScore"
        );


    if (finalScore) {

        finalScore.textContent =
            scor;

    }


    const correct =
        element(
            "correctAnswers"
        );


    if (correct) {

        correct.textContent =
            raspunsuriCorecte;

    }


    const wrong =
        element(
            "wrongAnswers"
        );


    if (wrong) {

        wrong.textContent =
            raspunsuriGresite;

    }


    const remaining =
        element(
            "remainingLives"
        );


    if (remaining) {

        remaining.textContent =
            Math.max(
                0,
                vieti
            );

    }


    const title =
        element(
            "resultTitle"
        );


    const subtitle =
        element(
            "resultSubtitle"
        );


    const icon =
        element(
            "resultIcon"
        );


    const message =
        element(
            "resultMessage"
        );


    if (
        vieti > 0 &&
        intrebareCurenta >=
        intrebari.length
    ) {

        if (icon) {

            icon.textContent =
                "🏆";

        }


        if (title) {

            title.textContent =
                "Felicitări!";

        }


        if (subtitle) {

            subtitle.textContent =
                "Ai traversat pădurea!";

        }


        if (message) {

            message.textContent =
                `Ai răspuns corect la ${raspunsuriCorecte} întrebări și ai obținut ${scor} puncte.`;

        }


        return;

    }


    if (icon) {

        icon.textContent =
            "💔";

    }


    if (title) {

        title.textContent =
            "Aventura s-a încheiat";

    }


    if (subtitle) {

        subtitle.textContent =
            "Poți încerca din nou.";

    }


    if (message) {

        message.textContent =
            `Ai obținut ${scor} puncte.`;

    }

}


/* =========================================================
   RESTART
========================================================= */

function restartQuiz() {

    if (!quizSelectat) {

        arataEcran(
            "quizSelectScreen"
        );

        return;

    }


    pornesteQuiz(
        quizSelectat.id
    );

}


/* =========================================================
   ALT QUIZ
========================================================= */

function alegeAltQuiz() {

    quizSelectat = null;

    intrebari = [];

    intrebareCurenta = 0;

    vieti =
        QUIZ_CONFIG.lives;

    scor = 0;

    raspunsuriCorecte = 0;

    raspunsuriGresite = 0;

    raspunsBlocat = false;

    arataEcran(
        "quizSelectScreen"
    );

    incarcaQuizuriSite();

}


/* =========================================================
   EVENIMENTE
========================================================= */

function initializeazaQuiz() {

    preloadImages();


    document.addEventListener(
        "click",
        event => {


            /* =============================================
               RĂSPUNS
            ============================================= */

            const answerButton =
                event.target.closest(
                    ".answer-button"
                );


            if (answerButton) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    answerButton.disabled
                ) {

                    return;

                }


                proceseazaRaspuns(
                    answerButton.dataset.answer
                );


                return;

            }


            /* =============================================
               START QUIZ
            ============================================= */

            const startButton =
                event.target.closest(
                    ".quiz-start-button"
                );


            if (startButton) {

                event.preventDefault();


                pornesteQuiz(
                    startButton.dataset.quizId
                );


                return;

            }


            /* =============================================
               RESTART
            ============================================= */

            const restartButton =
                event.target.closest(
                    "#restartQuizButton"
                );


            if (restartButton) {

                event.preventDefault();

                restartQuiz();

                return;

            }


            /* =============================================
               ALT QUIZ
            ============================================= */

            const chooseButton =
                event.target.closest(
                    "#chooseQuizButton"
                );


            if (chooseButton) {

                event.preventDefault();

                alegeAltQuiz();

            }

        }
    );


    incarcaQuizuriSite();

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeazaQuiz
    );

} else {

    initializeazaQuiz();

}

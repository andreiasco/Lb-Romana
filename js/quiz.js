/* =====================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   VERSIUNE STABILĂ + ANIMAȚII 3D
===================================================== */

"use strict";


/* =====================================================
   CONFIG
===================================================== */

const QUIZ_CONFIG = {
    lives: 3,
    pointsCorrect: 100,
    delayAfterCorrect: 1200,
    delayAfterWrong: 1200,
    walkDuration: 900
};


/* =====================================================
   ANIMALE
===================================================== */

const ANIMALE = {
    lup: "🐺",
    vulpe: "🦊",
    urs: "🐻",
    iepure: "🐰",
    caprioara: "🦌",
    "căprioară": "🦌",
    cerb: "🦌",
    bufnita: "🦉",
    "bufniță": "🦉",
    pisica: "🐱",
    caine: "🐶",
    "câine": "🐶"
};


/* =====================================================
   VARIABILE
===================================================== */

let quizuri = [];
let quizSelectat = null;
let intrebari = [];
let intrebareCurenta = 0;

let vieti = QUIZ_CONFIG.lives;
let scor = 0;

let raspunsuriCorecte = 0;
let raspunsuriGresite = 0;

let raspunsBlocat = false;


/* =====================================================
   HELPER
===================================================== */

function element(id) {
    return document.getElementById(id);
}


function asteapta(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function obtineAnimal(animal) {

    if (!animal) {
        return "🐺";
    }

    const cheie = String(animal)
        .trim()
        .toLowerCase();

    return ANIMALE[cheie] || animal || "🐺";
}


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   ECRANE
===================================================== */

function arataEcran(idEcran) {

    const ecrane = [
        "quizSelectScreen",
        "quizGameScreen",
        "quizResultScreen"
    ];

    ecrane.forEach(id => {

        const ecran = element(id);

        if (ecran) {
            ecran.classList.add("ascuns");
        }

    });

    const activ = element(idEcran);

    if (activ) {
        activ.classList.remove("ascuns");
    }
}


/* =====================================================
   ANIMAȚII 3D
===================================================== */

function activeazaAnimatii3D() {

    if (element("quiz3DStyles")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "quiz3DStyles";

    style.textContent = `

        .forest {
            perspective: 1200px;
            transform-style: preserve-3d;
            overflow: hidden;
        }

        .background-trees {
            transform-style: preserve-3d;
            transform: translateZ(-80px);
        }

        .mountains {
            transform-style: preserve-3d;
            transform: translateZ(-120px);
        }

        .ground {
            transform-style: preserve-3d;
            transform: translateZ(20px);
        }

        .player {
            transform-style: preserve-3d;
            will-change: left, transform;
        }

        .player-character {
            transform-style: preserve-3d;
            display: inline-block;
        }

        .player.walking {
            animation: playerWalk3D .9s ease-in-out;
        }

        @keyframes playerWalk3D {

            0% {
                transform:
                    translateY(0)
                    rotateY(0deg)
                    rotateZ(0deg)
                    scale(1);
            }

            25% {
                transform:
                    translateY(-14px)
                    rotateY(-12deg)
                    rotateZ(-3deg)
                    scale(1.05);
            }

            50% {
                transform:
                    translateY(0)
                    rotateY(12deg)
                    rotateZ(3deg)
                    scale(1.08);
            }

            75% {
                transform:
                    translateY(-10px)
                    rotateY(-8deg)
                    rotateZ(-2deg)
                    scale(1.04);
            }

            100% {
                transform:
                    translateY(0)
                    rotateY(0deg)
                    rotateZ(0deg)
                    scale(1);
            }
        }


        .animal {
            transform-style: preserve-3d;
            display: inline-block;
        }

        .animal.looking {
            animation: animalLook3D .7s ease;
        }

        @keyframes animalLook3D {

            0% {
                transform:
                    translateY(0)
                    rotateY(0deg)
                    scale(1);
            }

            50% {
                transform:
                    translateY(-12px)
                    rotateY(-20deg)
                    scale(1.12);
            }

            100% {
                transform:
                    translateY(0)
                    rotateY(0deg)
                    scale(1);
            }
        }


        .animal.happy {
            animation: animalHappy3D .8s ease;
        }

        @keyframes animalHappy3D {

            0% {
                transform: translateY(0) rotate(0);
            }

            25% {
                transform: translateY(-20px) rotate(-8deg) scale(1.15);
            }

            50% {
                transform: translateY(0) rotate(8deg) scale(1.1);
            }

            75% {
                transform: translateY(-12px) rotate(-5deg) scale(1.08);
            }

            100% {
                transform: translateY(0) rotate(0) scale(1);
            }
        }


        .animal.sad {
            animation: animalSad3D .7s ease;
        }

        @keyframes animalSad3D {

            0% {
                transform: translateY(0) rotate(0);
            }

            30% {
                transform: translateY(8px) rotate(-12deg);
            }

            60% {
                transform: translateY(5px) rotate(12deg);
            }

            100% {
                transform: translateY(0) rotate(0);
            }
        }


        .question-panel {
            transform-style: preserve-3d;
        }

        .question-panel.question-enter {
            animation: questionEnter3D .6s ease;
        }

        @keyframes questionEnter3D {

            from {
                opacity: 0;
                transform:
                    translateY(25px)
                    rotateX(8deg)
                    scale(.96);
            }

            to {
                opacity: 1;
                transform:
                    translateY(0)
                    rotateX(0)
                    scale(1);
            }
        }


        .answer-button {
            transform-style: preserve-3d;
            transition:
                transform .2s ease,
                box-shadow .2s ease;
        }

        .answer-button:hover:not(:disabled) {
            transform:
                translateY(-5px)
                rotateX(4deg)
                scale(1.02);
        }

        .answer-button:active:not(:disabled) {
            transform:
                translateY(1px)
                scale(.98);
        }


        .cinematic-flash {
            position: absolute;
            inset: 0;
            z-index: 100;
            pointer-events: none;
            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.8),
                    transparent 65%
                );
            opacity: 0;
        }

        .cinematic-flash.active {
            animation: flash3D .5s ease;
        }

        @keyframes flash3D {

            0% {
                opacity: 0;
            }

            30% {
                opacity: .7;
            }

            100% {
                opacity: 0;
            }
        }


        .forest.scene-move {
            animation: sceneMove3D 1s ease;
        }

        @keyframes sceneMove3D {

            0% {
                transform:
                    perspective(1200px)
                    rotateX(0)
                    rotateY(0)
                    scale(1);
            }

            35% {
                transform:
                    perspective(1200px)
                    rotateX(2deg)
                    rotateY(-2deg)
                    scale(1.025);
            }

            70% {
                transform:
                    perspective(1200px)
                    rotateX(-1deg)
                    rotateY(2deg)
                    scale(1.04);
            }

            100% {
                transform:
                    perspective(1200px)
                    rotateX(0)
                    rotateY(0)
                    scale(1);
            }
        }


        .forest.shake {
            animation: forestShake .4s ease;
        }

        @keyframes forestShake {

            0%,100% {
                transform: translateX(0);
            }

            20% {
                transform: translateX(-8px);
            }

            40% {
                transform: translateX(8px);
            }

            60% {
                transform: translateX(-5px);
            }

            80% {
                transform: translateX(5px);
            }
        }

    `;

    document.head.appendChild(style);
}


/* =====================================================
   PREGĂTIRE SCENĂ
===================================================== */

function pregatesteScena() {

    activeazaAnimatii3D();

    const forest = document.querySelector(".forest");

    if (!forest) {
        return;
    }

    if (!forest.querySelector(".cinematic-flash")) {

        const flash = document.createElement("div");

        flash.className = "cinematic-flash";

        forest.appendChild(flash);
    }
}


/* =====================================================
   EFECT SCENĂ
===================================================== */

function animeazaScena() {

    const forest = document.querySelector(".forest");

    if (!forest) {
        return;
    }

    forest.classList.remove("scene-move");

    void forest.offsetWidth;

    forest.classList.add("scene-move");

    setTimeout(() => {
        forest.classList.remove("scene-move");
    }, 1100);
}


function flashCinematic() {

    const flash = document.querySelector(".cinematic-flash");

    if (!flash) {
        return;
    }

    flash.classList.remove("active");

    void flash.offsetWidth;

    flash.classList.add("active");
}


function zguduieScena() {

    const forest = document.querySelector(".forest");

    if (!forest) {
        return;
    }

    forest.classList.remove("shake");

    void forest.offsetWidth;

    forest.classList.add("shake");

    setTimeout(() => {
        forest.classList.remove("shake");
    }, 450);
}


/* =====================================================
   PERSONAJ
===================================================== */

function miscaPersonaj() {

    const player = document.querySelector(".player");

    if (!player) {
        return;
    }

    const pozitii = [
        "10%",
        "23%",
        "36%",
        "49%",
        "62%",
        "75%",
        "86%"
    ];

    const index = Math.min(
        intrebareCurenta,
        pozitii.length - 1
    );

    player.classList.remove("walking");

    void player.offsetWidth;

    player.style.left = pozitii[index];

    player.classList.add("walking");

    setTimeout(() => {
        player.classList.remove("walking");
    }, QUIZ_CONFIG.walkDuration);
}


/* =====================================================
   ANIMAL
===================================================== */

function animalPriveste() {

    const animal = element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove("looking");

    void animal.offsetWidth;

    animal.classList.add("looking");

    setTimeout(() => {
        animal.classList.remove("looking");
    }, 800);
}


function animalFericit() {

    const animal = element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove("happy", "sad");

    void animal.offsetWidth;

    animal.classList.add("happy");

    setTimeout(() => {
        animal.classList.remove("happy");
    }, 900);
}


function animalTrist() {

    const animal = element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove("happy", "sad");

    void animal.offsetWidth;

    animal.classList.add("sad");

    setTimeout(() => {
        animal.classList.remove("sad");
    }, 800);
}


/* =====================================================
   STATISTICI
===================================================== */

function actualizeazaStatistici() {

    const score = element("score");

    if (score) {
        score.textContent = scor;
    }


    const lives = element("lives");

    if (lives) {

        lives.textContent =
            "❤️".repeat(Math.max(0, vieti)) +
            "🖤".repeat(
                Math.max(
                    0,
                    QUIZ_CONFIG.lives - vieti
                )
            );
    }
}


/* =====================================================
   SETEAZĂ RĂSPUNS
===================================================== */

function seteazaRaspuns(id, text) {

    const button = element(id);

    if (!button) {
        return;
    }

    const textElement =
        button.querySelector(".answer-text");

    if (textElement) {

        textElement.textContent =
            text || "";

    } else {

        button.textContent =
            text || "";

    }
}


/* =====================================================
   AFIȘEAZĂ ÎNTREBAREA
===================================================== */

function afiseazaIntrebarea() {

    if (intrebareCurenta >= intrebari.length) {

        afiseazaRezultat();

        return;
    }


    raspunsBlocat = false;


    const intrebare =
        intrebari[intrebareCurenta];


    const questionNumber =
        element("questionNumber");

    if (questionNumber) {
        questionNumber.textContent =
            intrebareCurenta + 1;
    }


    const questionTotal =
        element("questionTotal");

    if (questionTotal) {
        questionTotal.textContent =
            intrebari.length;
    }


    const questionText =
        element("questionText");

    if (questionText) {

        questionText.textContent =
            intrebare.intrebare || "";
    }


    const animal =
        obtineAnimal(intrebare.animal);


    const questionAnimal =
        element("questionAnimal");

    if (questionAnimal) {
        questionAnimal.textContent = animal;
    }


    const animalElement =
        element("animal");

    if (animalElement) {
        animalElement.textContent = animal;
    }


    const animalBubble =
        element("animalBubble");

    if (animalBubble) {
        animalBubble.textContent =
            "Alege răspunsul corect!";
    }


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


    document
        .querySelectorAll(".answer-button")
        .forEach(button => {

            button.disabled = false;

            button.classList.remove(
                "correct",
                "wrong",
                "raspuns-corect",
                "raspuns-gresit"
            );
        });


    const message =
        element("questionMessage");

    if (message) {

        message.textContent = "";

        message.className =
            "question-message";
    }


    /* animații */

    if (intrebareCurenta > 0) {

        miscaPersonaj();

        animeazaScena();

        animalPriveste();

        flashCinematic();
    }


    const panel =
        document.querySelector(".question-panel");

    if (panel) {

        panel.classList.remove("question-enter");

        void panel.offsetWidth;

        panel.classList.add("question-enter");
    }
}


/* =====================================================
   RĂSPUNS
===================================================== */

async function proceseazaRaspuns(raspuns) {

    /*
       IMPORTANT:
       Acesta este singurul loc care blochează
       răspunsurile. Nu folosim animatieInCurs.
    */

    if (raspunsBlocat) {
        return;
    }

    raspunsBlocat = true;


    const intrebare =
        intrebari[intrebareCurenta];


    if (!intrebare) {

        raspunsBlocat = false;

        return;
    }


    const corect =
        String(
            intrebare.raspuns_corect || ""
        )
        .trim()
        .toUpperCase();


    const dat =
        String(raspuns)
        .trim()
        .toUpperCase();


    const butoane =
        document.querySelectorAll(
            ".answer-button"
        );


    /*
       Dezactivăm butoanele doar DUPĂ click.
    */

    butoane.forEach(button => {
        button.disabled = true;
    });


    const butonAles =
        document.querySelector(
            `.answer-button[data-answer="${dat}"]`
        );


    const butonCorect =
        document.querySelector(
            `.answer-button[data-answer="${corect}"]`
        );


    const message =
        element("questionMessage");


    const bubble =
        element("animalBubble");


    /* =================================================
       CORECT
    ================================================= */

    if (dat === corect) {

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
                `🎉 Bravo! Răspuns corect! +${QUIZ_CONFIG.pointsCorrect} puncte`;

            message.className =
                "question-message success";
        }


        if (bubble) {

            bubble.textContent =
                "🎉 Bravo! Ai reușit!";
        }


        animalFericit();

        actualizeazaStatistici();


        const success =
            element("successEffect");

        if (success) {

            success.classList.remove("active");

            void success.offsetWidth;

            success.classList.add("active");

            setTimeout(() => {
                success.classList.remove("active");
            }, 900);
        }


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


    /* =================================================
       GREȘIT
    ================================================= */

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
                ? "😯 Ai greșit!"
                : "💔 Ai rămas fără vieți!";
    }


    animalTrist();

    zguduieScena();

    actualizeazaStatistici();


    const attack =
        element("attackEffect");

    if (attack) {

        attack.classList.remove("active");

        void attack.offsetWidth;

        attack.classList.add("active");

        setTimeout(() => {
            attack.classList.remove("active");
        }, 900);
    }


    /* GAME OVER */

    if (vieti <= 0) {

        await asteapta(
            QUIZ_CONFIG.delayAfterWrong
        );

        afiseazaRezultat();

        return;
    }


    await asteapta(
        QUIZ_CONFIG.delayAfterWrong
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
}


/* =====================================================
   ÎNCARCĂ QUIZURI
===================================================== */

async function incarcaQuizuriSite() {

    const container =
        element("listaQuizuri");

    if (!container) {
        return;
    }


    container.innerHTML =
        `<div class="quiz-loading">
            Se încarcă quizurile...
        </div>`;


    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        container.innerHTML =
            `<div class="quiz-loading">
                ❌ Supabase nu este încărcat.
            </div>`;

        return;
    }


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("quizuri")
            .select("*")
            .eq("activ", true)
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {
            throw error;
        }


        if (!data || data.length === 0) {

            container.innerHTML =
                `<div class="quiz-loading">
                    📚 Nu există quizuri active în baza de date.
                    <br><br>
                    Intră în panoul Admin și creează un quiz.
                </div>`;

            return;
        }


        quizuri = data;


        container.innerHTML =
            data.map(quiz => `

                <div class="quiz-card">

                    <div class="quiz-card-icon">
                        🎮
                    </div>

                    <h2>
                        ${escapeHTML(quiz.titlu)}
                    </h2>

                    ${
                        quiz.categorie
                            ? `
                                <div class="quiz-category">
                                    ${escapeHTML(quiz.categorie)}
                                </div>
                            `
                            : ""
                    }

                    ${
                        quiz.descriere
                            ? `
                                <p>
                                    ${escapeHTML(quiz.descriere)}
                                </p>
                            `
                            : ""
                    }

                    <button
                        type="button"
                        class="game-button primary quiz-start-button"
                        data-quiz-id="${escapeHTML(quiz.id)}"
                    >
                        🌲 Pornește aventura
                    </button>

                </div>

            `).join("");


        container
            .querySelectorAll(".quiz-start-button")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(
                                this.dataset.quizId
                            );

                        pornesteQuiz(id);
                    }
                );
            });

    }

    catch (error) {

        console.error(
            "Eroare încărcare quizuri:",
            error
        );


        container.innerHTML =
            `<div class="quiz-loading">
                ❌ Nu pot încărca quizurile.
                <br><br>
                ${escapeHTML(error.message)}
            </div>`;
    }
}


/* =====================================================
   PORNEȘTE QUIZ
===================================================== */

async function pornesteQuiz(quizId) {

    const id =
        Number(quizId);


    const quiz =
        quizuri.find(
            q => Number(q.id) === id
        );


    if (!quiz) {

        console.error(
            "Quizul nu a fost găsit:",
            id
        );

        return;
    }


    quizSelectat = quiz;


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("intrebari_quiz")
            .select("*")
            .eq("quiz_id", id)
            .order(
                "ordine",
                {
                    ascending: true
                }
            );


        if (error) {
            throw error;
        }


        intrebari = data || [];


        if (intrebari.length === 0) {

            alert(
                "Acest quiz nu are întrebări."
            );

            return;
        }


        /* RESET */

        intrebareCurenta = 0;
        vieti = QUIZ_CONFIG.lives;
        scor = 0;

        raspunsuriCorecte = 0;
        raspunsuriGresite = 0;

        raspunsBlocat = false;


        arataEcran(
            "quizGameScreen"
        );


        const title =
            element("gameQuizTitle");

        if (title) {
            title.textContent =
                quiz.titlu || "Aventura";
        }


        pregatesteScena();

        actualizeazaStatistici();

        afiseazaIntrebarea();

    }

    catch (error) {

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


/* =====================================================
   REZULTAT
===================================================== */

function afiseazaRezultat() {

    arataEcran(
        "quizResultScreen"
    );


    const finalScore =
        element("finalScore");

    if (finalScore) {
        finalScore.textContent = scor;
    }


    const correct =
        element("correctAnswers");

    if (correct) {
        correct.textContent =
            raspunsuriCorecte;
    }


    const wrong =
        element("wrongAnswers");

    if (wrong) {
        wrong.textContent =
            raspunsuriGresite;
    }


    const remaining =
        element("remainingLives");

    if (remaining) {
        remaining.textContent =
            Math.max(0, vieti);
    }


    const icon =
        element("resultIcon");

    const title =
        element("resultTitle");

    const subtitle =
        element("resultSubtitle");

    const message =
        element("resultMessage");


    if (
        vieti > 0 &&
        intrebareCurenta >= intrebari.length
    ) {

        if (icon) {
            icon.textContent = "🏆";
        }

        if (title) {
            title.textContent =
                "Felicitări!";
        }

        if (subtitle) {
            subtitle.textContent =
                "Ai terminat aventura prin pădure!";
        }

        if (message) {
            message.textContent =
                `🌲 Ai răspuns corect la ${raspunsuriCorecte} întrebări!`;
        }

        return;
    }


    if (icon) {
        icon.textContent = "💔";
    }

    if (title) {
        title.textContent =
            "Ai rămas fără vieți!";
    }

    if (subtitle) {
        subtitle.textContent =
            "Nu-i nimic, poți încerca din nou.";
    }

    if (message) {
        message.textContent =
            `Ai obținut ${scor} puncte.`;
    }
}


/* =====================================================
   RESTART
===================================================== */

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


/* =====================================================
   ALT QUIZ
===================================================== */

function alegeAltQuiz() {

    quizSelectat = null;

    intrebari = [];

    intrebareCurenta = 0;

    vieti = QUIZ_CONFIG.lives;

    scor = 0;

    raspunsuriCorecte = 0;
    raspunsuriGresite = 0;

    raspunsBlocat = false;


    arataEcran(
        "quizSelectScreen"
    );


    incarcaQuizuriSite();
}


/* =====================================================
   EVENT LISTENERS
===================================================== */

function initializeazaQuiz() {

    activeazaAnimatii3D();


    /*
       FOARTE IMPORTANT:
       Folosim o singură inițializare.
    */

    if (document.body.dataset.quizInitialized === "true") {
        return;
    }

    document.body.dataset.quizInitialized = "true";


    /* =================================================
       BUTOANE RĂSPUNS
    ================================================= */

    document
        .querySelectorAll(".answer-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    event.stopPropagation();

                    proceseazaRaspuns(
                        this.dataset.answer
                    );
                }
            );
        });


    /* =================================================
       RESTART
    ================================================= */

    const restartButton =
        element("restartQuizButton");

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                restartQuiz();
            }
        );
    }


    /* =================================================
       ALT QUIZ
    ================================================= */

    const chooseButton =
        element("chooseQuizButton");

    if (chooseButton) {

        chooseButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                alegeAltQuiz();
            }
        );
    }


    /* =================================================
       QUIZURI
    ================================================= */

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        const container =
            element("listaQuizuri");

        if (container) {

            container.innerHTML =
                `<div class="quiz-loading">
                    ❌ Supabase nu este încărcat.
                    <br>
                    Verifică init.js.
                </div>`;
        }

        return;
    }


    incarcaQuizuriSite();
}


/* =====================================================
   START
===================================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeazaQuiz
    );

} else {

    initializeazaQuiz();
}

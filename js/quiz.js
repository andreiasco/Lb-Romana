/* =====================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE - ANIMAȚII 3D
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
    căprioară: "🦌",
    cerb: "🦌",
    bufnita: "🦉",
    bufniță: "🦉",
    pisica: "🐱",
    caine: "🐶",
    câine: "🐶"
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
   POZIȚII PERSONAJ
===================================================== */

const POZITII_PERSONAJ = [
    "8%",
    "20%",
    "34%",
    "48%",
    "62%",
    "76%",
    "88%"
];

/* =====================================================
   DOM
===================================================== */

function element(id) {
    return document.getElementById(id);
}

/* =====================================================
   ESCAPE HTML
===================================================== */

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
   ANIMAL
===================================================== */

function obtineAnimal(animal) {

    if (!animal) {
        return "🐺";
    }

    const cheie = String(animal)
        .trim()
        .toLowerCase();

    return ANIMALE[cheie] || animal || "🐺";
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
   CSS ANIMAȚII 3D
===================================================== */

function activeazaAnimatii3D() {

    if (document.getElementById("quiz3DStyles")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "quiz3DStyles";

    style.textContent = `

        /* =============================================
           SCENA
        ============================================= */

        .forest {
            perspective: 1200px;
            transform-style: preserve-3d;
            overflow: hidden;
        }

        .forest.scene-move {
            animation: sceneMove 0.9s ease;
        }

        @keyframes sceneMove {

            0% {
                transform:
                    perspective(1200px)
                    rotateX(0deg)
                    rotateY(0deg)
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
                    scale(1.035);
            }

            100% {
                transform:
                    perspective(1200px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1);
            }
        }

        /* =============================================
           PERSONAJ
        ============================================= */

        .player {
            transform-style: preserve-3d;
            will-change: left, transform;
            transition: left 0.9s cubic-bezier(.2,.8,.2,1);
        }

        .player.walking {
            animation: playerWalk 0.9s ease;
        }

        @keyframes playerWalk {

            0% {
                transform:
                    translateY(0)
                    rotateZ(0deg)
                    rotateY(0deg)
                    scale(1);
            }

            20% {
                transform:
                    translateY(-12px)
                    rotateZ(-5deg)
                    rotateY(-10deg)
                    scale(1.04);
            }

            40% {
                transform:
                    translateY(0)
                    rotateZ(5deg)
                    rotateY(10deg)
                    scale(1.07);
            }

            60% {
                transform:
                    translateY(-10px)
                    rotateZ(-4deg)
                    rotateY(-8deg)
                    scale(1.04);
            }

            80% {
                transform:
                    translateY(0)
                    rotateZ(3deg)
                    rotateY(6deg)
                    scale(1.02);
            }

            100% {
                transform:
                    translateY(0)
                    rotateZ(0deg)
                    rotateY(0deg)
                    scale(1);
            }
        }

        .player-character {
            transform-style: preserve-3d;
            filter:
                drop-shadow(0 10px 7px rgba(0,0,0,.25));
        }

        /* =============================================
           ANIMAL
        ============================================= */

        .animal {
            transform-style: preserve-3d;
            transition: transform .3s ease;
        }

        .animal.look {
            animation: animalLook .7s ease;
        }

        @keyframes animalLook {

            0% {
                transform:
                    translateY(0)
                    rotateY(0)
                    scale(1);
            }

            50% {
                transform:
                    translateY(-12px)
                    rotateY(-18deg)
                    scale(1.1);
            }

            100% {
                transform:
                    translateY(0)
                    rotateY(0)
                    scale(1);
            }
        }

        .animal.happy {
            animation: animalHappy .8s ease;
        }

        @keyframes animalHappy {

            0% {
                transform:
                    translateY(0)
                    rotate(0)
                    scale(1);
            }

            25% {
                transform:
                    translateY(-20px)
                    rotate(-8deg)
                    scale(1.18);
            }

            50% {
                transform:
                    translateY(-5px)
                    rotate(8deg)
                    scale(1.12);
            }

            75% {
                transform:
                    translateY(-14px)
                    rotate(-5deg)
                    scale(1.08);
            }

            100% {
                transform:
                    translateY(0)
                    rotate(0)
                    scale(1);
            }
        }

        .animal.sad {
            animation: animalSad .7s ease;
        }

        @keyframes animalSad {

            0% {
                transform:
                    translateY(0)
                    rotate(0);
            }

            30% {
                transform:
                    translateY(8px)
                    rotate(-10deg);
            }

            60% {
                transform:
                    translateY(5px)
                    rotate(10deg);
            }

            100% {
                transform:
                    translateY(0)
                    rotate(0);
            }
        }

        /* =============================================
           ÎNTREBARE
        ============================================= */

        .question-panel {
            transform-style: preserve-3d;
        }

        .question-panel.question-enter {
            animation: questionEnter .6s ease;
        }

        @keyframes questionEnter {

            0% {
                opacity: 0;
                transform:
                    translateY(30px)
                    rotateX(10deg)
                    scale(.96);
            }

            100% {
                opacity: 1;
                transform:
                    translateY(0)
                    rotateX(0)
                    scale(1);
            }
        }

        /* =============================================
           BUTOANE
        ============================================= */

        .answer-button {
            transform-style: preserve-3d;
            transition:
                transform .2s ease,
                box-shadow .2s ease,
                background .2s ease;
        }

        .answer-button:hover:not(:disabled) {
            transform:
                translateY(-5px)
                rotateX(5deg)
                scale(1.02);
        }

        .answer-button:active:not(:disabled) {
            transform:
                translateY(1px)
                scale(.98);
        }

        .answer-button.correct {
            animation: answerCorrect .6s ease;
        }

        @keyframes answerCorrect {

            0% {
                transform: scale(1);
            }

            35% {
                transform:
                    scale(1.08)
                    rotateZ(-2deg);
            }

            70% {
                transform:
                    scale(1.03)
                    rotateZ(2deg);
            }

            100% {
                transform: scale(1);
            }
        }

        .answer-button.wrong {
            animation: answerWrong .5s ease;
        }

        @keyframes answerWrong {

            0%,
            100% {
                transform: translateX(0);
            }

            20% {
                transform: translateX(-10px);
            }

            40% {
                transform: translateX(10px);
            }

            60% {
                transform: translateX(-7px);
            }

            80% {
                transform: translateX(7px);
            }
        }

        /* =============================================
           EFECT SUCCES
        ============================================= */

        .success-effect.active {
            animation: successEffect .9s ease;
        }

        @keyframes successEffect {

            0% {
                opacity: 0;
                transform:
                    translate(-50%, -50%)
                    scale(.3)
                    rotate(-20deg);
            }

            40% {
                opacity: 1;
                transform:
                    translate(-50%, -50%)
                    scale(1.5)
                    rotate(10deg);
            }

            100% {
                opacity: 0;
                transform:
                    translate(-50%, -50%)
                    scale(2)
                    rotate(0);
            }
        }

        /* =============================================
           EFECT ATAC
        ============================================= */

        .attack-effect.active {
            animation: attackEffect .8s ease;
        }

        @keyframes attackEffect {

            0% {
                opacity: 0;
                transform:
                    translate(-50%, -50%)
                    scale(.3);
            }

            30% {
                opacity: 1;
                transform:
                    translate(-50%, -50%)
                    scale(1.4)
                    rotate(-10deg);
            }

            60% {
                transform:
                    translate(-50%, -50%)
                    scale(1.1)
                    rotate(10deg);
            }

            100% {
                opacity: 0;
                transform:
                    translate(-50%, -50%)
                    scale(2);
            }
        }

        /* =============================================
           SHAKE
        ============================================= */

        .forest.shake {
            animation: forestShake .45s ease;
        }

        @keyframes forestShake {

            0%,
            100% {
                transform: translateX(0);
            }

            20% {
                transform: translateX(-8px);
            }

            40% {
                transform: translateX(8px);
            }

            60% {
                transform: translateX(-6px);
            }

            80% {
                transform: translateX(6px);
            }
        }

        /* =============================================
           FLASH
        ============================================= */

        .cinematic-flash {
            position: absolute;
            inset: 0;
            z-index: 200;
            pointer-events: none;

            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.8),
                    rgba(255,255,255,0)
                );

            opacity: 0;
        }

        .cinematic-flash.active {
            animation: cinematicFlash .5s ease;
        }

        @keyframes cinematicFlash {

            0% {
                opacity: 0;
            }

            25% {
                opacity: .6;
            }

            100% {
                opacity: 0;
            }
        }

        /* =============================================
           REDUCERE MIȘCARE
        ============================================= */

        @media (prefers-reduced-motion: reduce) {

            .forest,
            .player,
            .animal,
            .question-panel,
            .answer-button {
                animation: none !important;
                transition: none !important;
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
   ANIMAȚIE SCENĂ
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
    }, 1000);
}

/* =====================================================
   FLASH
===================================================== */

function flashCinematic() {

    const flash =
        document.querySelector(".cinematic-flash");

    if (!flash) {
        return;
    }

    flash.classList.remove("active");

    void flash.offsetWidth;

    flash.classList.add("active");

    setTimeout(() => {
        flash.classList.remove("active");
    }, 550);
}

/* =====================================================
   MIȘCARE PERSONAJ
===================================================== */

function miscaPersonaj(index = intrebareCurenta) {

    const player =
        document.querySelector(".player");

    if (!player) {
        return;
    }

    const pozitie =
        POZITII_PERSONAJ[
            Math.min(
                index,
                POZITII_PERSONAJ.length - 1
            )
        ];

    player.style.left = pozitie;

    player.classList.remove("walking");

    void player.offsetWidth;

    player.classList.add("walking");

    setTimeout(() => {
        player.classList.remove("walking");
    }, QUIZ_CONFIG.walkDuration + 100);
}

/* =====================================================
   ANIMAȚIE ANIMAL
===================================================== */

function animalPrivestePersonaj() {

    const animal = element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove("look");

    void animal.offsetWidth;

    animal.classList.add("look");

    setTimeout(() => {
        animal.classList.remove("look");
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
    }, 850);
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
   PARALLAX
===================================================== */

function activeazaParallax() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {
        return;
    }

    /* evităm adăugarea mai multor listeners */

    if (forest.dataset.parallaxReady === "true") {
        return;
    }

    forest.dataset.parallaxReady = "true";

    forest.addEventListener("mousemove", event => {

        if (window.innerWidth < 700) {
            return;
        }

        if (forest.classList.contains("scene-move")) {
            return;
        }

        const rect =
            forest.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const rotateY =
            (x - 0.5) * 3;

        const rotateX =
            (0.5 - y) * 2;

        forest.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
    });

    forest.addEventListener("mouseleave", () => {

        forest.style.transform = "";

    });
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

    container.innerHTML = `
        <div class="quiz-loading">
            Se încarcă quizurile...
        </div>
    `;

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        container.innerHTML = `
            <div class="quiz-loading">
                ❌ Supabase nu este încărcat.
                <br><br>
                Verifică fișierul init.js.
            </div>
        `;

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

            container.innerHTML = `
                <div class="quiz-loading">
                    📚 Nu există quizuri active
                    în baza de date.
                    <br><br>
                    Intră în panoul Admin
                    și creează un quiz.
                </div>
            `;

            return;
        }

        quizuri = data;

        container.innerHTML = data.map(quiz => {

            return `
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
            `;

        }).join("");

        container
            .querySelectorAll(".quiz-start-button")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id =
                        Number(button.dataset.quizId);

                    pornesteQuiz(id);
                });

            });

    } catch (error) {

        console.error(
            "Eroare încărcare quizuri:",
            error
        );

        container.innerHTML = `
            <div class="quiz-loading">
                ❌ Nu pot încărca quizurile.
                <br><br>
                <strong>
                    ${escapeHTML(error.message)}
                </strong>
            </div>
        `;
    }
}

/* =====================================================
   PORNEȘTE QUIZ
===================================================== */

async function pornesteQuiz(quizId) {

    const id = Number(quizId);

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

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        alert(
            "Supabase nu este disponibil."
        );

        return;
    }

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

        /* ECRAN */

        arataEcran("quizGameScreen");

        const title =
            element("gameQuizTitle");

        if (title) {
            title.textContent =
                quiz.titlu || "Aventura";
        }

        pregatesteScena();

        actualizeazaStatistici();

        /* poziția inițială */

        const player =
            document.querySelector(".player");

        if (player) {
            player.style.left =
                POZITII_PERSONAJ[0];
        }

        afiseazaIntrebarea();

        activeazaParallax();

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

/* =====================================================
   AFIȘEAZĂ ÎNTREBAREA
===================================================== */

function afiseazaIntrebarea() {

    if (
        intrebareCurenta >=
        intrebari.length
    ) {

        afiseazaRezultat();

        return;
    }

    /*
     IMPORTANT:
     aici deblocăm butoanele
    */

    raspunsBlocat = false;

    const intrebare =
        intrebari[intrebareCurenta];

    /* NUMĂR */

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

    /* ÎNTREBARE */

    const questionText =
        element("questionText");

    if (questionText) {
        questionText.textContent =
            intrebare.intrebare || "";
    }

    /* ANIMAL */

    const animal =
        obtineAnimal(intrebare.animal);

    const questionAnimal =
        element("questionAnimal");

    if (questionAnimal) {
        questionAnimal.textContent =
            animal;
    }

    const animalElement =
        element("animal");

    if (animalElement) {
        animalElement.textContent =
            animal;
    }

    /* BULA */

    const animalBubble =
        element("animalBubble");

    if (animalBubble) {
        animalBubble.textContent =
            "Alege răspunsul corect!";
    }

    /* RĂSPUNSURI */

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

    /* RESET BUTOANE */

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

    /* MESAJ */

    const message =
        element("questionMessage");

    if (message) {

        message.textContent = "";

        message.className =
            "question-message";
    }

    /* ANIMAȚIE */

    if (intrebareCurenta > 0) {

        animeazaScena();

        miscaPersonaj(
            intrebareCurenta
        );

        animalPrivestePersonaj();

        flashCinematic();
    }

    /* PANEL */

    const panel =
        document.querySelector(".question-panel");

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

        /*
         Dacă HTML-ul este vechi,
         folosim textul direct.
        */

        button.textContent =
            text || "";
    }
}

/* =====================================================
   PROCESEAZĂ RĂSPUNS
===================================================== */

async function proceseazaRaspuns(raspuns) {

    /*
     NU mai există animatieInCurs.
     Singurul lucru care blochează
     dublul click este raspunsBlocat.
    */

    if (raspunsBlocat) {
        return;
    }

    const intrebare =
        intrebari[intrebareCurenta];

    if (!intrebare) {
        return;
    }

    raspunsBlocat = true;

    const raspunsCorect =
        String(
            intrebare.raspuns_corect || ""
        )
        .trim()
        .toUpperCase();

    const raspunsDat =
        String(raspuns)
            .trim()
            .toUpperCase();

    const butoane =
        document.querySelectorAll(
            ".answer-button"
        );

    /*
     Dezactivăm butoanele
     după click.
    */

    butoane.forEach(button => {
        button.disabled = true;
    });

    const butonAles =
        document.querySelector(
            `.answer-button[data-answer="${raspunsDat}"]`
        );

    const butonCorect =
        document.querySelector(
            `.answer-button[data-answer="${raspunsCorect}"]`
        );

    const message =
        element("questionMessage");

    const animalBubble =
        element("animalBubble");

    /* =================================================
       RĂSPUNS CORECT
    ================================================= */

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
                "🎉 Bravo! Răspuns corect! +" +
                QUIZ_CONFIG.pointsCorrect +
                " puncte";

            message.className =
                "question-message success";
        }

        if (animalBubble) {

            animalBubble.textContent =
                "🎉 Bravo! Ai reușit!";
        }

        animalFericit();

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

            return;
        }

        /*
         Personajul merge
         către următoarea întrebare.
        */

        miscaPersonaj(
            intrebareCurenta
        );

        animeazaScena();

        flashCinematic();

        await asteapta(150);

        afiseazaIntrebarea();

        return;
    }

    /* =================================================
       RĂSPUNS GREȘIT
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

    if (animalBubble) {

        animalBubble.textContent =
            vieti > 0
                ? "😯 Mai încearcă!"
                : "💔 Ai rămas fără vieți!";
    }

    animalTrist();

    afiseazaAtac();

    zguduieScena();

    actualizeazaStatistici();

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

        return;
    }

    /*
     Continuăm aventura.
    */

    miscaPersonaj(
        intrebareCurenta
    );

    animeazaScena();

    await asteapta(150);

    afiseazaIntrebarea();
}

/* =====================================================
   ZGUDUIRE
===================================================== */

function zguduieScena() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {
        return;
    }

    forest.classList.remove("shake");

    void forest.offsetWidth;

    forest.classList.add("shake");

    setTimeout(() => {
        forest.classList.remove("shake");
    }, 500);
}

/* =====================================================
   AȘTEAPTĂ
===================================================== */

function asteapta(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

/* =====================================================
   STATISTICI
===================================================== */

function actualizeazaStatistici() {

    const score =
        element("score");

    if (score) {
        score.textContent = scor;
    }

    const lives =
        element("lives");

    if (lives) {

        const vietiValide =
            Math.max(0, vieti);

        lives.textContent =
            "❤️".repeat(vietiValide) +
            "🖤".repeat(
                Math.max(
                    0,
                    QUIZ_CONFIG.lives -
                    vietiValide
                )
            );
    }
}

/* =====================================================
   SUCCES
===================================================== */

function afiseazaSucces() {

    const effect =
        element("successEffect");

    if (!effect) {
        return;
    }

    effect.classList.remove("active");

    void effect.offsetWidth;

    effect.classList.add("active");

    setTimeout(() => {
        effect.classList.remove("active");
    }, 950);
}

/* =====================================================
   ATAC
===================================================== */

function afiseazaAtac() {

    const effect =
        element("attackEffect");

    if (!effect) {
        return;
    }

    effect.classList.remove("active");

    void effect.offsetWidth;

    effect.classList.add("active");

    setTimeout(() => {
        effect.classList.remove("active");
    }, 950);
}

/* =====================================================
   REZULTAT
===================================================== */

function afiseazaRezultat() {

    arataEcran("quizResultScreen");

    const finalScore =
        element("finalScore");

    if (finalScore) {
        finalScore.textContent =
            scor;
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

    const title =
        element("resultTitle");

    const subtitle =
        element("resultSubtitle");

    const icon =
        element("resultIcon");

    const message =
        element("resultMessage");

    /* VICTORIE */

    if (
        vieti > 0 &&
        intrebareCurenta >=
        intrebari.length
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
                "🌲 Excelent! Ai răspuns corect la " +
                raspunsuriCorecte +
                " întrebări.";
        }

        return;
    }

    /* GAME OVER */

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
            "Ai obținut " +
            scor +
            " puncte.";
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

/* =====================================================
   EVENT LISTENERS
===================================================== */

function initializeazaQuiz() {

    activeazaAnimatii3D();

    /*
     IMPORTANT:
     folosim event delegation.
     Astfel butoanele funcționează
     chiar dacă HTML-ul este încărcat
     sau modificat ulterior.
    */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".answer-button"
                );

            if (!button) {
                return;
            }

            if (button.disabled) {
                return;
            }

            const raspuns =
                button.dataset.answer;

            if (!raspuns) {
                return;
            }

            proceseazaRaspuns(
                raspuns
            );
        }
    );

    /* RESTART */

    const restartButton =
        element(
            "restartQuizButton"
        );

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            restartQuiz
        );
    }

    /* ALT QUIZ */

    const chooseButton =
        element(
            "chooseQuizButton"
        );

    if (chooseButton) {

        chooseButton.addEventListener(
            "click",
            alegeAltQuiz
        );
    }

    /*
     Dacă pagina nu este quiz.html
     și nu există lista de quizuri,
     nu mai facem nimic.
    */

    if (!element("listaQuizuri")) {
        return;
    }

    if (
        typeof supabaseClient ===
        "undefined"
    ) {

        const container =
            element(
                "listaQuizuri"
            );

        if (container) {

            container.innerHTML = `
                <div class="quiz-loading">
                    ❌ Supabase nu este încărcat.
                    <br><br>
                    Verifică init.js.
                </div>
            `;
        }

        return;
    }

    incarcaQuizuriSite();
}

/* =====================================================
   START
===================================================== */

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

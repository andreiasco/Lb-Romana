/* =====================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   🎬 CINEMATIC EDITION
===================================================== */

"use strict";

/* =====================================================
   CONFIG
===================================================== */

const QUIZ_CONFIG = {
    lives: 3,
    pointsCorrect: 100,

    delayAfterCorrect: 1400,
    delayAfterWrong: 1400,

    walkDuration: 900,

    cinematicTransition: 700
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

let cinematicActiv = false;

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

    [
        "quizSelectScreen",
        "quizGameScreen",
        "quizResultScreen"
    ].forEach(id => {

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
   STIL CINEMATIC
===================================================== */

function activeazaAnimatii3D() {

    if (element("quizCinematicStyles")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "quizCinematicStyles";

    style.textContent = `

/* =====================================================
   CAMERA
===================================================== */

.quiz-page {
    overflow-x: hidden;
}

.forest {
    position: relative;
    perspective: 1200px;
    transform-style: preserve-3d;
    transition:
        transform 1s cubic-bezier(.22,.61,.36,1),
        filter .8s ease;
}

/* =====================================================
   CINEMATIC LETTERBOX
===================================================== */

.quiz-page::before,
.quiz-page::after {

    content: "";

    position: fixed;

    left: 0;
    right: 0;

    height: 0;

    background: #000;

    z-index: 9999;

    pointer-events: none;

    transition: height .8s ease;
}

.quiz-page::before {
    top: 0;
}

.quiz-page::after {
    bottom: 0;
}

.quiz-page.cinematic-mode::before,
.quiz-page.cinematic-mode::after {

    height: 34px;
}

/* =====================================================
   SCENĂ
===================================================== */

.forest.scene-cinematic {

    animation:
        cinematicScene 1.5s
        cubic-bezier(.22,.61,.36,1);
}

@keyframes cinematicScene {

    0% {
        transform:
            perspective(1200px)
            scale(1.08)
            translateY(20px);
        filter: brightness(.7);
    }

    45% {
        transform:
            perspective(1200px)
            scale(1.03)
            translateY(0);
        filter: brightness(1.08);
    }

    100% {
        transform:
            perspective(1200px)
            scale(1);
        filter: brightness(1);
    }
}

/* =====================================================
   ZOOM FILMIC
===================================================== */

.forest.camera-zoom {

    animation:
        cameraZoom 1.8s
        cubic-bezier(.16,1,.3,1);
}

@keyframes cameraZoom {

    0% {
        transform:
            perspective(1200px)
            scale(1);
    }

    55% {
        transform:
            perspective(1200px)
            scale(1.045);
    }

    100% {
        transform:
            perspective(1200px)
            scale(1);
    }
}

/* =====================================================
   PERSONAJ
===================================================== */

.player {

    transform-style: preserve-3d;

    transition:
        left .9s cubic-bezier(.22,.61,.36,1);
}

.player.walking {

    animation:
        cinematicWalk .9s
        cubic-bezier(.22,.61,.36,1);
}

@keyframes cinematicWalk {

    0% {
        transform:
            translateY(0)
            translateZ(0)
            rotateY(0)
            scale(1);
    }

    25% {
        transform:
            translateY(-10px)
            translateZ(15px)
            rotateY(-7deg)
            scale(1.05);
    }

    50% {
        transform:
            translateY(0)
            translateZ(25px)
            rotateY(7deg)
            scale(1.08);
    }

    75% {
        transform:
            translateY(-7px)
            translateZ(12px)
            rotateY(-4deg)
            scale(1.04);
    }

    100% {
        transform:
            translateY(0)
            translateZ(0)
            rotateY(0)
            scale(1);
    }
}

/* =====================================================
   ANIMAL
===================================================== */

.animal {

    transform-style: preserve-3d;

    transition:
        filter .4s ease;
}

.animal.looking {

    animation:
        cinematicLook .9s
        ease;
}

@keyframes cinematicLook {

    0% {
        transform:
            rotateY(0)
            scale(1);
    }

    35% {
        transform:
            rotateY(-20deg)
            translateY(-8px)
            scale(1.1);
    }

    65% {
        transform:
            rotateY(12deg)
            translateY(-4px)
            scale(1.06);
    }

    100% {
        transform:
            rotateY(0)
            translateY(0)
            scale(1);
    }
}

/* =====================================================
   ANIMAL FERICIT
===================================================== */

.animal.happy {

    animation:
        animalVictory 1s
        cubic-bezier(.22,.61,.36,1);

    filter:
        drop-shadow(0 0 18px rgba(255,220,70,.9));
}

@keyframes animalVictory {

    0% {
        transform:
            scale(1)
            rotate(0);
    }

    25% {
        transform:
            scale(1.25)
            translateY(-18px)
            rotate(-8deg);
    }

    50% {
        transform:
            scale(1.18)
            translateY(-5px)
            rotate(8deg);
    }

    75% {
        transform:
            scale(1.1)
            translateY(-10px)
            rotate(-4deg);
    }

    100% {
        transform:
            scale(1)
            translateY(0)
            rotate(0);
    }
}

/* =====================================================
   ANIMAL TRIST
===================================================== */

.animal.sad {

    animation:
        animalSad 1s ease;

    filter:
        grayscale(.35)
        brightness(.8);
}

@keyframes animalSad {

    0% {
        transform:
            scale(1);
    }

    30% {
        transform:
            translateY(8px)
            rotate(-10deg)
            scale(.95);
    }

    60% {
        transform:
            translateY(5px)
            rotate(10deg)
            scale(.97);
    }

    100% {
        transform:
            translateY(0)
            rotate(0)
            scale(1);
    }
}

/* =====================================================
   PANOU ÎNTREBARE
===================================================== */

.question-panel {

    transform-style: preserve-3d;

    position: relative;

    overflow: visible;
}

.question-panel.question-enter {

    animation:
        questionCinematicEnter
        .85s
        cubic-bezier(.22,.61,.36,1);
}

@keyframes questionCinematicEnter {

    0% {

        opacity: 0;

        transform:
            translateX(-50%)
            translateY(45px)
            scale(.92)
            rotateX(8deg);

        filter:
            blur(8px);
    }

    55% {

        opacity: 1;

        transform:
            translateX(-50%)
            translateY(-4px)
            scale(1.015)
            rotateX(0);

        filter:
            blur(0);
    }

    100% {

        opacity: 1;

        transform:
            translateX(-50%)
            translateY(0)
            scale(1)
            rotateX(0);
    }
}

/* =====================================================
   RĂSPUNSURI
===================================================== */

.answer-button {

    position: relative;

    overflow: hidden;

    transform-style: preserve-3d;

    transition:
        transform .25s ease,
        box-shadow .25s ease,
        background .25s ease,
        filter .25s ease;
}

.answer-button::after {

    content: "";

    position: absolute;

    top: -100%;
    left: -120%;

    width: 70%;
    height: 300%;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.5),
            transparent
        );

    transform: rotate(25deg);

    transition:
        left .7s ease;

    pointer-events: none;
}

.answer-button:hover:not(:disabled)::after {

    left: 150%;
}

.answer-button:hover:not(:disabled) {

    transform:
        translateY(-5px)
        translateZ(15px)
        scale(1.025);

    box-shadow:
        0 15px 35px rgba(0,0,0,.25);
}

/* =====================================================
   RĂSPUNS CORECT
===================================================== */

.answer-button.correct {

    background:
        linear-gradient(
            135deg,
            #20c878,
            #0c9f58
        ) !important;

    color: #fff !important;

    animation:
        answerCorrect
        .8s
        cubic-bezier(.22,.61,.36,1);

    box-shadow:
        0 0 0 4px rgba(50,220,130,.2),
        0 0 35px rgba(50,220,130,.8);
}

@keyframes answerCorrect {

    0% {
        transform: scale(1);
    }

    30% {
        transform:
            scale(1.08)
            translateZ(15px);
    }

    55% {
        transform:
            scale(.98);
    }

    75% {
        transform:
            scale(1.04);
    }

    100% {
        transform:
            scale(1);
    }
}

/* =====================================================
   RĂSPUNS GREȘIT
===================================================== */

.answer-button.wrong {

    background:
        linear-gradient(
            135deg,
            #ed4545,
            #a91717
        ) !important;

    color: #fff !important;

    animation:
        answerWrong
        .65s
        ease;

    box-shadow:
        0 0 30px rgba(240,40,40,.7);
}

@keyframes answerWrong {

    0%, 100% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-12px);
    }

    40% {
        transform: translateX(12px);
    }

    60% {
        transform: translateX(-8px);
    }

    80% {
        transform: translateX(8px);
    }
}

/* =====================================================
   FLASH CORECT
===================================================== */

.quiz-page.flash-success {

    animation:
        successFlash
        .8s ease;
}

@keyframes successFlash {

    0% {
        filter: brightness(1);
    }

    30% {
        filter:
            brightness(1.5)
            saturate(1.35);
    }

    100% {
        filter: brightness(1);
    }
}

/* =====================================================
   FLASH GREȘIT
===================================================== */

.quiz-page.flash-danger {

    animation:
        dangerFlash
        .55s ease;
}

@keyframes dangerFlash {

    0%, 100% {
        filter: brightness(1);
    }

    25% {
        filter:
            brightness(1.3)
            sepia(.4)
            saturate(1.5);
    }
}

/* =====================================================
   SHAKE CINEMATIC
===================================================== */

.forest.screen-shake {

    animation:
        cinematicShake
        .55s
        ease;
}

@keyframes cinematicShake {

    0%,100% {
        transform: translateX(0);
    }

    15% {
        transform: translateX(-10px) rotateZ(-.5deg);
    }

    30% {
        transform: translateX(10px) rotateZ(.5deg);
    }

    45% {
        transform: translateX(-7px);
    }

    60% {
        transform: translateX(7px);
    }

    75% {
        transform: translateX(-3px);
    }
}

/* =====================================================
   EFECTE
===================================================== */

.success-effect {

    transform: scale(0);

    pointer-events: none;
}

.success-effect.active {

    animation:
        cinematicSuccess
        1s
        ease;
}

@keyframes cinematicSuccess {

    0% {
        opacity: 0;
        transform:
            scale(.2)
            translateY(30px);
    }

    30% {
        opacity: 1;
        transform:
            scale(1.5)
            translateY(0);
    }

    60% {
        opacity: 1;
        transform:
            scale(1.1);
    }

    100% {
        opacity: 0;
        transform:
            scale(2)
            translateY(-25px);
    }
}

.attack-effect {

    transform: scale(0);

    pointer-events: none;
}

.attack-effect.active {

    animation:
        cinematicAttack
        .8s
        ease;
}

@keyframes cinematicAttack {

    0% {
        opacity: 0;
        transform:
            scale(.2)
            rotate(-20deg);
    }

    35% {
        opacity: 1;
        transform:
            scale(1.5)
            rotate(10deg);
    }

    65% {
        opacity: 1;
        transform:
            scale(1.15)
            rotate(-5deg);
    }

    100% {
        opacity: 0;
        transform:
            scale(2)
            rotate(15deg);
    }
}

/* =====================================================
   MESAJ
===================================================== */

.question-message.success {

    animation:
        messageSuccess
        .7s
        ease;
}

.question-message.error {

    animation:
        messageError
        .6s
        ease;
}

@keyframes messageSuccess {

    from {
        opacity: 0;
        transform:
            translateY(15px)
            scale(.9);
    }

    to {
        opacity: 1;
        transform:
            translateY(0)
            scale(1);
    }
}

@keyframes messageError {

    0% {
        opacity: 0;
        transform: scale(.8);
    }

    50% {
        opacity: 1;
        transform: scale(1.08);
    }

    100% {
        transform: scale(1);
    }
}

/* =====================================================
   VICTORIE FINAL
===================================================== */

.result-card.cinematic-result {

    animation:
        resultCinema
        1.1s
        cubic-bezier(.22,.61,.36,1);
}

@keyframes resultCinema {

    0% {

        opacity: 0;

        transform:
            scale(.75)
            translateY(50px);

        filter:
            blur(10px);
    }

    55% {

        opacity: 1;

        transform:
            scale(1.05)
            translateY(-5px);

        filter:
            blur(0);
    }

    100% {

        transform:
            scale(1)
            translateY(0);
    }
}

/* =====================================================
   REDUCED MOTION
===================================================== */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {

        animation-duration: .01ms !important;

        animation-iteration-count: 1 !important;

        transition-duration: .01ms !important;
    }
}

`;

    document.head.appendChild(style);
}

/* =====================================================
   PARALLAX
===================================================== */

function activeazaParallax() {

    const forest =
        document.querySelector(".forest");

    if (
        !forest ||
        forest.dataset.parallaxActiv
    ) {
        return;
    }

    forest.dataset.parallaxActiv =
        "true";

    forest.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 700
            ) {
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
                (x - .5) * 4;

            const rotateX =
                (.5 - y) * 3;

            forest.style.transform =
                `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;
        }
    );

    forest.addEventListener(
        "mouseleave",
        () => {

            forest.style.transform = "";

        }
    );
}

/* =====================================================
   MOD CINEMATIC
===================================================== */

function activeazaModCinematic() {

    const page =
        document.querySelector(".quiz-page");

    if (!page) {
        return;
    }

    page.classList.add(
        "cinematic-mode"
    );

    cinematicActiv = true;
}

/* =====================================================
   SCENĂ CINEMATICĂ
===================================================== */

function animeazaScena() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {
        return;
    }

    forest.classList.remove(
        "scene-cinematic",
        "camera-zoom"
    );

    void forest.offsetWidth;

    forest.classList.add(
        "scene-cinematic"
    );

    setTimeout(() => {

        forest.classList.remove(
            "scene-cinematic"
        );

    }, 1600);
}

/* =====================================================
   CAMERA ZOOM
===================================================== */

function efectCameraZoom() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {
        return;
    }

    forest.classList.remove(
        "camera-zoom"
    );

    void forest.offsetWidth;

    forest.classList.add(
        "camera-zoom"
    );

    setTimeout(() => {

        forest.classList.remove(
            "camera-zoom"
        );

    }, 1900);
}

/* =====================================================
   PERSONAJ
===================================================== */

function miscaPersonaj() {

    const player =
        document.querySelector(".player");

    if (!player) {
        return;
    }

    const pozitii = [
        "12%",
        "24%",
        "38%",
        "52%",
        "66%",
        "78%",
        "86%"
    ];

    const pozitie =
        pozitii[
            Math.min(
                intrebareCurenta,
                pozitii.length - 1
            )
        ];

    player.style.left =
        pozitie;

    player.classList.remove(
        "walking"
    );

    void player.offsetWidth;

    player.classList.add(
        "walking"
    );

    setTimeout(() => {

        player.classList.remove(
            "walking"
        );

    }, QUIZ_CONFIG.walkDuration + 100);
}

/* =====================================================
   ANIMAL - PRIVIRE
===================================================== */

function animalPrivestePersonaj() {

    const animal =
        element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove(
        "looking"
    );

    void animal.offsetWidth;

    animal.classList.add(
        "looking"
    );

    setTimeout(() => {

        animal.classList.remove(
            "looking"
        );

    }, 1000);
}

/* =====================================================
   ANIMAL FERICIT
===================================================== */

function animalFericit() {

    const animal =
        element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove(
        "happy",
        "sad"
    );

    void animal.offsetWidth;

    animal.classList.add(
        "happy"
    );

    setTimeout(() => {

        animal.classList.remove(
            "happy"
        );

    }, 1100);
}

/* =====================================================
   ANIMAL TRIST
===================================================== */

function animalTrist() {

    const animal =
        element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove(
        "happy",
        "sad"
    );

    void animal.offsetWidth;

    animal.classList.add(
        "sad"
    );

    setTimeout(() => {

        animal.classList.remove(
            "sad"
        );

    }, 1000);
}

/* =====================================================
   ÎNCARCĂ QUIZURILE
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

        if (
            !data ||
            data.length === 0
        ) {

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

        container.innerHTML =
            data.map(quiz => `

                <div class="quiz-card">

                    <div class="quiz-card-icon">
                        🎮
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
                        🌲 Pornește aventura
                    </button>

                </div>

            `).join("");

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

/* =====================================================
   PORNEȘTE QUIZ
===================================================== */

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
            "Quizul nu a fost găsit:",
            id
        );

        return;
    }

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        alert(
            "Supabase nu este disponibil."
        );

        return;
    }

    quizSelectat = quiz;

    try {

        const {
            data,
            error
        } =
            await supabaseClient
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

        arataEcran(
            "quizGameScreen"
        );

        activeazaModCinematic();

        const title =
            element(
                "gameQuizTitle"
            );

        if (title) {

            title.textContent =
                quiz.titlu ||
                "Aventura";
        }

        actualizeazaStatistici();

        activeazaAnimatii3D();

        activeazaParallax();

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

    raspunsBlocat = false;

    const intrebare =
        intrebari[
            intrebareCurenta
        ];

    /* ---------------------------------------------
       NUMĂR
    --------------------------------------------- */

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

    /* ---------------------------------------------
       ÎNTREBARE
    --------------------------------------------- */

    const questionText =
        element(
            "questionText"
        );

    if (questionText) {

        questionText.textContent =
            intrebare.intrebare || "";
    }

    /* ---------------------------------------------
       ANIMAL
    --------------------------------------------- */

    const animal =
        obtineAnimal(
            intrebare.animal
        );

    const questionAnimal =
        element(
            "questionAnimal"
        );

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

    const bubble =
        element(
            "animalBubble"
        );

    if (bubble) {

        bubble.textContent =
            "Alege răspunsul corect!";
    }

    /* ---------------------------------------------
       RĂSPUNSURI
    --------------------------------------------- */

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
        .querySelectorAll(
            ".answer-button"
        )
        .forEach(button => {

            button.disabled = false;

            button.classList.remove(
                "correct",
                "wrong",
                "raspuns-corect",
                "raspuns-gresit"
            );
        });

    /* ---------------------------------------------
       MESAJ
    --------------------------------------------- */

    const message =
        element(
            "questionMessage"
        );

    if (message) {

        message.textContent = "";

        message.className =
            "question-message";
    }

    /* ---------------------------------------------
       CINEMATIC
    --------------------------------------------- */

    animeazaScena();

    efectCameraZoom();

    if (
        intrebareCurenta > 0
    ) {

        miscaPersonaj();

        animalPrivestePersonaj();
    }

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

/* =====================================================
   SETEAZĂ RĂSPUNS
===================================================== */

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

    if (textElement) {

        textElement.textContent =
            text || "";
    }
}

/* =====================================================
   FLASH
===================================================== */

function flashPagina(
    tip
) {

    const page =
        document.querySelector(
            ".quiz-page"
        );

    if (!page) {
        return;
    }

    page.classList.remove(
        "flash-success",
        "flash-danger"
    );

    void page.offsetWidth;

    page.classList.add(
        tip
    );

    setTimeout(() => {

        page.classList.remove(
            tip
        );

    }, 900);
}

/* =====================================================
   PROCESEAZĂ RĂSPUNS
===================================================== */

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

    raspunsBlocat = true;

    const raspunsDat =
        String(
            raspuns || ""
        )
            .trim()
            .toUpperCase();

    const raspunsCorect =
        String(
            intrebare.raspuns_corect || ""
        )
            .trim()
            .toUpperCase();

    const butoane =
        document.querySelectorAll(
            ".answer-button"
        );

    butoane.forEach(
        button => {
            button.disabled = true;
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

    /* =================================================
       CORECT
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
                `🎬 BRAVO! Răspuns corect! +${QUIZ_CONFIG.pointsCorrect} puncte`;

            message.className =
                "question-message success";
        }

        if (bubble) {

            bubble.textContent =
                "🎉 Excelent!";
        }

        flashPagina(
            "flash-success"
        );

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
            "💥 Răspuns greșit!";

        message.className =
            "question-message error";
    }

    if (bubble) {

        bubble.textContent =
            vieti > 0
                ? "😯 Mai ai o șansă!"
                : "💔 Ai rămas fără vieți!";
    }

    flashPagina(
        "flash-danger"
    );

    animalTrist();

    afiseazaAtac();

    zguduieScena();

    actualizeazaStatistici();

    await asteapta(
        QUIZ_CONFIG.delayAfterWrong
    );

    if (vieti <= 0) {

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

/* =====================================================
   EFECT SUCCES
===================================================== */

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

    setTimeout(() => {

        effect.classList.remove(
            "active"
        );

    }, 1100);
}

/* =====================================================
   EFECT ATAC
===================================================== */

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

    setTimeout(() => {

        effect.classList.remove(
            "active"
        );

    }, 900);
}

/* =====================================================
   SHAKE
===================================================== */

function zguduieScena() {

    const forest =
        document.querySelector(
            ".forest"
        );

    if (!forest) {
        return;
    }

    forest.classList.remove(
        "screen-shake"
    );

    void forest.offsetWidth;

    forest.classList.add(
        "screen-shake"
    );

    setTimeout(() => {

        forest.classList.remove(
            "screen-shake"
        );

    }, 600);
}

/* =====================================================
   STATISTICI
===================================================== */

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
            ) +
            "🖤".repeat(
                Math.max(
                    0,
                    QUIZ_CONFIG.lives -
                    vieti
                )
            );
    }
}

/* =====================================================
   AȘTEAPTĂ
===================================================== */

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

/* =====================================================
   REZULTAT
===================================================== */

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

    const resultCard =
        document.querySelector(
            ".result-card"
        );

    if (resultCard) {

        resultCard.classList.remove(
            "cinematic-result"
        );

        void resultCard.offsetWidth;

        resultCard.classList.add(
            "cinematic-result"
        );
    }

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
                "Ai terminat aventura prin pădure!";
        }

        if (message) {

            message.textContent =
                `🌲 Excelent! Ai răspuns corect la ${raspunsuriCorecte} întrebări.`;
        }

        return;
    }

    if (icon) {
        icon.textContent =
            "💔";
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

    document.addEventListener(
        "click",
        event => {

            const answerButton =
                event.target.closest(
                    ".answer-button"
                );

            if (answerButton) {

                event.preventDefault();

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

            const restartButton =
                event.target.closest(
                    "#restartQuizButton"
                );

            if (restartButton) {

                event.preventDefault();

                restartQuiz();

                return;
            }

            const chooseButton =
                event.target.closest(
                    "#chooseQuizButton"
                );

            if (chooseButton) {

                event.preventDefault();

                alegeAltQuiz();

                return;
            }

        }
    );

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

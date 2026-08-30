/* =====================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   EXPERIENȚĂ CINEMATOGRAFICĂ 3D
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

    walkDuration: 1600,
    cinematicDuration: 900,

    cameraZoom: true
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
    "câine": "🐶",
    mistret: "🐗",
    "mistreț": "🐗",
    veverita: "🐿️",
    "veveriță": "🐿️"

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

let scenaInitializata = false;


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

    if (
        value === null ||
        value === undefined
    ) {
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

    const cheie =
        String(animal)
            .trim()
            .toLowerCase();

    return (
        ANIMALE[cheie] ||
        animal ||
        "🐺"
    );

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


/* =====================================================
   STIL CINEMATIC
===================================================== */

function activeazaStilCinematic() {

    if (
        element("quizCinematicStyles")
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "quizCinematicStyles";


    style.textContent = `

        /* =============================================
           SCENA
        ============================================= */

        .forest {

            perspective: 1200px;

            transform-style: preserve-3d;

            overflow: hidden;

            transition:
                transform 1.2s ease,
                filter 1s ease;

        }


        .forest.cinematic-enter {

            animation:
                cinematicSceneEnter
                1.5s ease both;

        }


        @keyframes cinematicSceneEnter {

            0% {

                opacity: 0;

                transform:
                    perspective(1200px)
                    scale(1.15)
                    translateY(30px);

                filter:
                    brightness(.45)
                    blur(3px);

            }

            100% {

                opacity: 1;

                transform:
                    perspective(1200px)
                    scale(1)
                    translateY(0);

                filter:
                    brightness(1)
                    blur(0);

            }

        }


        /* =============================================
           CAMERA
        ============================================= */

        .forest.camera-forward {

            animation:
                cameraForward
                1.6s ease;

        }


        @keyframes cameraForward {

            0% {

                transform:
                    perspective(1200px)
                    scale(1);

            }

            50% {

                transform:
                    perspective(1200px)
                    scale(1.07)
                    translateY(-4px);

            }

            100% {

                transform:
                    perspective(1200px)
                    scale(1);

            }

        }


        /* =============================================
           CAMERA STÂNGA / DREAPTA
        ============================================= */

        .forest.camera-left {

            animation:
                cameraLeft
                1.2s ease;

        }


        @keyframes cameraLeft {

            0% {

                transform:
                    perspective(1200px)
                    rotateY(0);

            }

            50% {

                transform:
                    perspective(1200px)
                    rotateY(-3deg)
                    scale(1.025);

            }

            100% {

                transform:
                    perspective(1200px)
                    rotateY(0);

            }

        }


        .forest.camera-right {

            animation:
                cameraRight
                1.2s ease;

        }


        @keyframes cameraRight {

            0% {

                transform:
                    perspective(1200px)
                    rotateY(0);

            }

            50% {

                transform:
                    perspective(1200px)
                    rotateY(3deg)
                    scale(1.025);

            }

            100% {

                transform:
                    perspective(1200px)
                    rotateY(0);

            }

        }


        /* =============================================
           PERSONAJ
        ============================================= */

        .player {

            transition:
                left 1.6s ease;

            transform-style:
                preserve-3d;

        }


        .player.walking {

            animation:
                cinematicWalk
                1.6s ease;

        }


        @keyframes cinematicWalk {

            0% {

                transform:
                    translateY(0)
                    rotateY(0)
                    scale(1);

            }

            20% {

                transform:
                    translateY(-7px)
                    rotateY(-5deg)
                    scale(1.03);

            }

            40% {

                transform:
                    translateY(0)
                    rotateY(5deg)
                    scale(1.05);

            }

            60% {

                transform:
                    translateY(-6px)
                    rotateY(-4deg)
                    scale(1.03);

            }

            80% {

                transform:
                    translateY(0)
                    rotateY(4deg)
                    scale(1.02);

            }

            100% {

                transform:
                    translateY(0)
                    rotateY(0)
                    scale(1);

            }

        }


        /* =============================================
           ANIMAL
        ============================================= */

        .animal {

            transform-style:
                preserve-3d;

            transition:
                transform .7s ease,
                filter .7s ease;

        }


        .animal.aparitie {

            animation:
                animalAppear
                1.2s ease both;

        }


        @keyframes animalAppear {

            0% {

                opacity: 0;

                transform:
                    translateY(30px)
                    scale(.5)
                    rotateY(-20deg);

                filter:
                    blur(5px);

            }

            60% {

                opacity: 1;

                transform:
                    translateY(-8px)
                    scale(1.12)
                    rotateY(8deg);

            }

            100% {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1)
                    rotateY(0);

                filter:
                    blur(0);

            }

        }


        .animal.breathing {

            animation:
                animalBreathing
                3s ease-in-out infinite;

        }


        @keyframes animalBreathing {

            0%,
            100% {

                transform:
                    translateY(0)
                    scale(1);

            }

            50% {

                transform:
                    translateY(-5px)
                    scale(1.035);

            }

        }


        .animal.happy {

            animation:
                animalHappy
                .9s ease;

        }


        @keyframes animalHappy {

            0% {

                transform:
                    scale(1)
                    rotate(0);

            }

            30% {

                transform:
                    translateY(-16px)
                    scale(1.2)
                    rotate(-7deg);

            }

            60% {

                transform:
                    translateY(-5px)
                    scale(1.12)
                    rotate(7deg);

            }

            100% {

                transform:
                    translateY(0)
                    scale(1)
                    rotate(0);

            }

        }


        .animal.sad {

            animation:
                animalSad
                .8s ease;

        }


        @keyframes animalSad {

            0% {

                transform:
                    rotate(0);

            }

            35% {

                transform:
                    translateY(8px)
                    rotate(-8deg);

            }

            65% {

                transform:
                    translateY(5px)
                    rotate(8deg);

            }

            100% {

                transform:
                    translateY(0)
                    rotate(0);

            }

        }


        /* =============================================
           BULĂ
        ============================================= */

        .animal-bubble {

            transition:
                opacity .5s ease,
                transform .5s ease;

        }


        .animal-bubble.cinematic-bubble {

            animation:
                bubbleAppear
                .8s ease both;

        }


        @keyframes bubbleAppear {

            from {

                opacity: 0;

                transform:
                    translateY(10px)
                    scale(.9);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        /* =============================================
           ÎNTREBARE
        ============================================= */

        .question-panel {

            transform-style:
                preserve-3d;

        }


        .question-panel.cinematic-question {

            animation:
                questionCinema
                1s ease both;

        }


        @keyframes questionCinema {

            0% {

                opacity: 0;

                transform:
                    translateY(35px)
                    rotateX(8deg)
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
           RĂSPUNSURI
        ============================================= */

        .answer-button {

            cursor: pointer;

            transform-style:
                preserve-3d;

            transition:
                transform .25s ease,
                box-shadow .25s ease,
                filter .25s ease;

        }


        .answer-button:hover:not(:disabled) {

            transform:
                translateY(-6px)
                translateZ(10px)
                scale(1.025);

            filter:
                brightness(1.08);

        }


        .answer-button.correct {

            animation:
                answerCorrect
                .7s ease;

        }


        @keyframes answerCorrect {

            0% {

                transform:
                    scale(1);

            }

            35% {

                transform:
                    scale(1.07)
                    translateZ(15px);

            }

            100% {

                transform:
                    scale(1);

            }

        }


        .answer-button.wrong {

            animation:
                answerWrong
                .55s ease;

        }


        @keyframes answerWrong {

            0%,
            100% {

                transform:
                    translateX(0);

            }

            20% {

                transform:
                    translateX(-10px);

            }

            40% {

                transform:
                    translateX(10px);

            }

            60% {

                transform:
                    translateX(-7px);

            }

            80% {

                transform:
                    translateX(7px);

            }

        }


        /* =============================================
           EFECT CINEMATIC
        ============================================= */

        .cinematic-vignette {

            position: absolute;

            inset: 0;

            pointer-events: none;

            z-index: 999;

            box-shadow:
                inset 0 0 120px
                rgba(0,0,0,.55);

            opacity: .65;

        }


        .cinematic-flash {

            position: fixed;

            inset: 0;

            background:
                rgba(255,255,255,.5);

            pointer-events: none;

            z-index: 9999;

            opacity: 0;

        }


        .cinematic-flash.active {

            animation:
                cinematicFlash
                .5s ease;

        }


        @keyframes cinematicFlash {

            0% {

                opacity: 0;

            }

            25% {

                opacity: .7;

            }

            100% {

                opacity: 0;

            }

        }


        /* =============================================
           SCUTURARE
        ============================================= */

        .screen-shake {

            animation:
                cinematicShake
                .45s ease;

        }


        @keyframes cinematicShake {

            0%,
            100% {

                transform:
                    translateX(0);

            }

            20% {

                transform:
                    translateX(-8px);

            }

            40% {

                transform:
                    translateX(8px);

            }

            60% {

                transform:
                    translateX(-5px);

            }

            80% {

                transform:
                    translateX(5px);

            }

        }

    `;


    document.head.appendChild(style);


    /* VIGNETĂ */

    const forest =
        document.querySelector(".forest");


    if (
        forest &&
        !forest.querySelector(
            ".cinematic-vignette"
        )
    ) {

        const vignette =
            document.createElement("div");

        vignette.className =
            "cinematic-vignette";

        forest.appendChild(vignette);

    }


    /* FLASH */

    if (
        !element("cinematicFlash")
    ) {

        const flash =
            document.createElement("div");

        flash.id =
            "cinematicFlash";

        flash.className =
            "cinematic-flash";

        document.body.appendChild(
            flash
        );

    }

}


/* =====================================================
   ANIMAȚIE GENERICĂ
===================================================== */

function animeazaElement(
    elementul,
    clasa,
    durata = 1000
) {

    if (!elementul) {
        return;
    }

    elementul.classList.remove(
        clasa
    );

    void elementul.offsetWidth;

    elementul.classList.add(
        clasa
    );

    setTimeout(() => {

        elementul.classList.remove(
            clasa
        );

    }, durata);

}


/* =====================================================
   CAMERA
===================================================== */

function miscaCameraDirectie() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {
        return;
    }


    const directii = [
        "camera-forward",
        "camera-left",
        "camera-right"
    ];


    const directie =
        directii[
            intrebareCurenta %
            directii.length
        ];


    forest.classList.remove(
        ...directii
    );


    void forest.offsetWidth;


    forest.classList.add(
        directie
    );


    setTimeout(() => {

        forest.classList.remove(
            directie
        );

    }, 1700);

}


/* =====================================================
   MIȘCARE PERSONAJ
===================================================== */

function miscaPersonaj() {

    const player =
        document.querySelector(
            ".player"
        );

    if (!player) {
        return;
    }


    const pozitii = [

        "10%",
        "23%",
        "36%",
        "50%",
        "63%",
        "76%",
        "88%"

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


    animeazaElement(
        player,
        "walking",
        QUIZ_CONFIG.walkDuration
    );


    setTimeout(() => {

        miscaCameraDirectie();

    }, 300);

}


/* =====================================================
   ANIMAL APARE
===================================================== */

function afiseazaAnimalCinematic(
    animalText
) {

    const animal =
        element("animal");

    if (!animal) {
        return;
    }


    animal.classList.remove(
        "breathing",
        "aparitie"
    );


    animal.textContent =
        animalText;


    void animal.offsetWidth;


    animal.classList.add(
        "aparitie"
    );


    setTimeout(() => {

        animal.classList.add(
            "breathing"
        );

    }, 1200);

}


/* =====================================================
   ANIMAL PRIVESTE PERSONAJUL
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

    }, 800);

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

    }, 900);

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

    }, 900);

}


/* =====================================================
   BULA ANIMAL
===================================================== */

function seteazaBula(
    text
) {

    const bubble =
        element("animalBubble");

    if (!bubble) {
        return;
    }


    bubble.classList.remove(
        "cinematic-bubble"
    );


    bubble.textContent =
        text || "";


    void bubble.offsetWidth;


    bubble.classList.add(
        "cinematic-bubble"
    );

}


/* =====================================================
   FLASH
===================================================== */

function flashCinematic() {

    const flash =
        element(
            "cinematicFlash"
        );

    if (!flash) {
        return;
    }


    flash.classList.remove(
        "active"
    );


    void flash.offsetWidth;


    flash.classList.add(
        "active"
    );

}


/* =====================================================
   PARALLAX
===================================================== */

function activeazaParallax() {

    const forest =
        document.querySelector(
            ".forest"
        );

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
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height;


            const rotateY =
                (x - .5) * 3;


            const rotateX =
                (.5 - y) * 2;


            forest.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    forest.addEventListener(
        "mouseleave",
        () => {

            forest.style.transform =
                "";

        }
    );

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

                    📚 Nu există quizuri active.

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

async function pornesteQuiz(
    quizId
) {

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


        const title =
            element(
                "gameQuizTitle"
            );


        if (title) {

            title.textContent =
                quiz.titlu ||
                "Aventura";

        }


        activeazaStilCinematic();

        activeazaParallax();

        actualizeazaStatistici();


        const forest =
            document.querySelector(
                ".forest"
            );


        if (forest) {

            animeazaElement(
                forest,
                "cinematic-enter",
                1600
            );

        }


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


    /* NUMĂR */

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


    /* ÎNTREBARE */

    const questionText =
        element(
            "questionText"
        );


    if (questionText) {

        questionText.textContent =
            intrebare.intrebare ||
            "";

    }


    /* ANIMAL */

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


    afiseazaAnimalCinematic(
        animal
    );


    /* BULA */

    seteazaBula(
        "👋 Salut! Te-am așteptat..."
    );


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


    /* BUTOANE */

    document
        .querySelectorAll(
            ".answer-button"
        )
        .forEach(button => {

            button.disabled =
                false;


            button.classList.remove(
                "correct",
                "wrong",
                "raspuns-corect",
                "raspuns-gresit"
            );

        });


    /* MESAJ */

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


    /* CINEMATIC */

    const panel =
        document.querySelector(
            ".question-panel"
        );


    if (panel) {

        panel.classList.remove(
            "cinematic-question"
        );


        void panel.offsetWidth;


        panel.classList.add(
            "cinematic-question"
        );

    }


    /* DEPLASARE */

    if (
        intrebareCurenta > 0
    ) {

        miscaPersonaj();

        setTimeout(() => {

            animalPrivestePersonaj();

            seteazaBula(
                "🦊 Am o întrebare pentru tine..."
            );

        }, 650);

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


    if (!textElement) {
        return;
    }


    textElement.textContent =
        text === null ||
        text === undefined
            ? ""
            : String(text);

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
            intrebare.raspuns_corect ||
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


    /* =============================================
       CORECT
    ============================================= */

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
                `🎉 Bravo! Răspuns corect! +${QUIZ_CONFIG.pointsCorrect} puncte`;

            message.className =
                "question-message success";

        }


        seteazaBula(
            "🎉 Excelent! Ai reușit!"
        );


        animalFericit();

        flashCinematic();

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


    /* =============================================
       GREȘIT
    ============================================= */

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


    seteazaBula(
        vieti > 0
            ? "😯 Nu renunța! Mai avem drum..."
            : "💔 Aventura s-a încheiat..."
    );


    animalTrist();


    zguduieScena();


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


/* =====================================================
   SCUTURARE SCENĂ
===================================================== */

function zguduieScena() {

    const forest =
        document.querySelector(
            ".forest"
        );


    if (!forest) {
        return;
    }


    animeazaElement(
        forest,
        "screen-shake",
        500
    );

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


/* =====================================================
   AȘTEAPTĂ
===================================================== */

function asteapta(
    ms
) {

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
                "Ai traversat pădurea cu succes!";

        }


        if (message) {

            message.textContent =
                `🌲 Ai răspuns corect la ${raspunsuriCorecte} întrebări.`;

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
            "Pădurea te așteaptă pentru o nouă aventură.";

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

    quizSelectat =
        null;

    intrebari =
        [];

    intrebareCurenta =
        0;

    vieti =
        QUIZ_CONFIG.lives;

    scor =
        0;

    raspunsuriCorecte =
        0;

    raspunsuriGresite =
        0;

    raspunsBlocat =
        false;


    arataEcran(
        "quizSelectScreen"
    );


    incarcaQuizuriSite();

}


/* =====================================================
   EVENT LISTENERS
===================================================== */

function initializeazaQuiz() {

    activeazaStilCinematic();

    activeazaParallax();


    /*
       EVENT DELEGATION
       Funcționează și pentru
       elementele generate dinamic.
    */

    document.addEventListener(
        "click",
        event => {

            /* =====================================
               RĂSPUNS
            ===================================== */

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


            /* =====================================
               START QUIZ
            ===================================== */

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


            /* =====================================
               RESTART
            ===================================== */

            const restartButton =
                event.target.closest(
                    "#restartQuizButton"
                );


            if (restartButton) {

                event.preventDefault();

                restartQuiz();

                return;

            }


            /* =====================================
               ALT QUIZ
            ===================================== */

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


/* =====================================================
   START APLICAȚIE
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

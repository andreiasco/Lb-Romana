/* =========================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   VERSIUNE COMPLETĂ
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

    walkDuration: 1000
};

/* =========================================================
   IMAGINI
========================================================= */

const IMAGINI = {

    forest: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=85",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=85",
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=85"
    ],

    character:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85"
};

/* =========================================================
   ANIMALE - EMOTICOANE
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

    arici: {
        name: "Arici",
        emoji: "🦔"
    },

    sarpe: {
        name: "Șarpe",
        emoji: "🐍"
    },

    "șarpe": {
        name: "Șarpe",
        emoji: "🐍"
    },

    broasca: {
        name: "Broască",
        emoji: "🐸"
    },

    "broască": {
        name: "Broască",
        emoji: "🐸"
    }
};

/* =========================================================
   VARIABILE
========================================================= */

let quizuri = [];
let quizSelectat = null;

let intrebari = [];
let intrebareCurenta = 0;

let vieti = QUIZ_CONFIG.lives;
let scor = 0;

let raspunsuriCorecte = 0;
let raspunsuriGresite = 0;

let raspunsBlocat = false;

let scenaImagineIndex = -1;

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
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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

    return ANIMALE[cheie] || ANIMALE.lup;
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

        const ecran = element(id);

        if (ecran) {
            ecran.classList.add("ascuns");
        }

    });

    const activ =
        element(idEcran);

    if (activ) {
        activ.classList.remove("ascuns");
    }
}

/* =========================================================
   PRELOAD
========================================================= */

function preloadImages() {

    IMAGINI.forest.forEach(src => {

        const img =
            new Image();

        img.src = src;

    });

    const character =
        new Image();

    character.src =
        IMAGINI.character;
}

/* =========================================================
   FUNDAL PĂDURE
========================================================= */

function schimbaFundalPadure() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {
        return;
    }

    const imagini =
        IMAGINI.forest;

    scenaImagineIndex =
        (scenaImagineIndex + 1) %
        imagini.length;

    const url =
        imagini[scenaImagineIndex];

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
   SETARE ANIMAL EMOJI
========================================================= */

function seteazaAnimalReal(animalData) {

    const animal =
        element("animal");

    const questionAnimal =
        element("questionAnimal");

    if (!animal) {
        return;
    }

    /*
       Animalul este emoji, nu imagine.
    */

    animal.innerHTML = `
        <div class="emoji-animal">
            ${escapeHTML(animalData.emoji)}
        </div>
    `;

    if (questionAnimal) {

        questionAnimal.innerHTML = `
            <div class="question-animal-emoji">
                ${escapeHTML(animalData.emoji)}
            </div>
        `;

    }

    const bubble =
        element("animalBubble");

    if (bubble) {

        bubble.textContent =
            `${animalData.name}: Alege răspunsul corect!`;

    }
}

/* =========================================================
   PERSONAJ
========================================================= */

function pregatestePersonaj() {

    const player =
        document.querySelector(".player");

    if (!player) {
        return;
    }

    let character =
        player.querySelector(
            ".real-player-image"
        );

    if (!character) {

        const old =
            player.querySelector(
                ".player-character"
            );

        if (old) {
            old.remove();
        }

        character =
            document.createElement("div");

        character.className =
            "real-player-image";

        player.insertBefore(
            character,
            player.firstChild
        );
    }

    /*
       Personaj stilizat:
       cap + trunchi + picioare.
    */

    character.innerHTML = `
        <div class="person-character">

            <div class="person-head">
                👦
            </div>

            <div class="person-body">
                <div class="person-shirt"></div>

                <div class="person-arm person-arm-left"></div>
                <div class="person-arm person-arm-right"></div>
            </div>

            <div class="person-legs">

                <div class="person-leg person-leg-left">
                    <div class="person-shoe"></div>
                </div>

                <div class="person-leg person-leg-right">
                    <div class="person-shoe"></div>
                </div>

            </div>

        </div>
    `;
}

/* =========================================================
   ANIMAȚII CINEMATICE
========================================================= */

function activeazaAnimatii3D() {

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

        /* =================================================
           ANIMAL EMOJI
        ================================================= */

        .emoji-animal {

            width: 100%;
            height: 100%;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size:
                clamp(65px, 9vw, 130px);

            line-height: 1;

            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.16),
                    rgba(0,0,0,.22)
                );

            text-shadow:
                0 12px 25px
                rgba(0,0,0,.55);

            transform:
                translateZ(30px);
        }

        .question-animal-emoji {

            width: 100%;
            height: 100%;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 42px;

            line-height: 1;
        }

        /* =================================================
           ANIMAL
        ================================================= */

        .animal {

            overflow: hidden;

            display: flex;

            align-items: center;
            justify-content: center;

            background:
                rgba(0,0,0,.18);

            border:
                4px solid
                rgba(255,255,255,.8);

            box-shadow:
                0 20px 55px
                rgba(0,0,0,.55);

            transition:
                transform .25s ease;
        }

        .animal.approach {

            animation:
                animalApproach
                1.1s
                cubic-bezier(.2,.8,.2,1);
        }

        @keyframes animalApproach {

            0% {

                transform:
                    translateX(120px)
                    scale(.55);

                opacity: 0;
            }

            60% {

                transform:
                    translateX(-15px)
                    scale(1.12);

                opacity: 1;
            }

            100% {

                transform:
                    translateX(0)
                    scale(1);

                opacity: 1;
            }
        }

        /* =================================================
           PERSONAJ
        ================================================= */

        .player {

            width:
                clamp(110px, 13vw, 170px);

            height:
                clamp(190px, 24vw, 260px);

            z-index: 40;

            transition:
                left 1s
                cubic-bezier(.2,.8,.2,1);

            transform:
                translateX(-50%);
        }

        .real-player-image {

            width: 100%;
            height: 100%;

            display: block;

            background:
                transparent;

            overflow:
                visible;
        }

        .person-character {

            position: relative;

            width: 100%;
            height: 100%;

            display: flex;

            flex-direction:
                column;

            align-items:
                center;

            justify-content:
                flex-start;

            filter:
                drop-shadow(
                    0 15px 18px
                    rgba(0,0,0,.55)
                );
        }

        .person-head {

            width:
                clamp(55px, 6vw, 78px);

            height:
                clamp(55px, 6vw, 78px);

            display: flex;

            align-items:
                center;

            justify-content:
                center;

            font-size:
                clamp(50px, 6vw, 75px);

            line-height: 1;

            z-index: 3;
        }

        .person-body {

            position: relative;

            width:
                clamp(62px, 7vw, 90px);

            height:
                clamp(75px, 9vw, 110px);

            margin-top:
                -2px;

            border-radius:
                28px 28px 15px 15px;

            background:
                linear-gradient(
                    135deg,
                    #2878c8,
                    #14519a
                );

            box-shadow:
                inset 8px 0 12px
                rgba(255,255,255,.12),

                inset -8px 0 12px
                rgba(0,0,0,.22);
        }

        .person-shirt {

            position: absolute;

            left: 50%;
            top: 12px;

            width: 20px;
            height: 20px;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background:
                rgba(255,255,255,.18);
        }

        .person-arm {

            position: absolute;

            top: 12px;

            width:
                clamp(18px, 2vw, 27px);

            height:
                clamp(65px, 8vw, 90px);

            border-radius:
                15px;

            background:
                linear-gradient(
                    180deg,
                    #2878c8,
                    #14519a
                );
        }

        .person-arm-left {

            left:
                -18px;

            transform:
                rotate(13deg);
        }

        .person-arm-right {

            right:
                -18px;

            transform:
                rotate(-13deg);
        }

        .person-legs {

            display: flex;

            gap:
                8px;

            margin-top:
                -2px;

            height:
                clamp(75px, 9vw, 100px);
        }

        .person-leg {

            position: relative;

            width:
                clamp(25px, 3vw, 36px);

            height:
                clamp(75px, 9vw, 100px);

            border-radius:
                0 0 13px 13px;

            background:
                linear-gradient(
                    180deg,
                    #202c3c,
                    #101722
                );
        }

        .person-shoe {

            position: absolute;

            bottom: -8px;

            width:
                clamp(35px, 4vw, 48px);

            height:
                16px;

            border-radius:
                50%;

            background:
                #111;

        }

        .person-leg-left
        .person-shoe {

            left:
                -8px;
        }

        .person-leg-right
        .person-shoe {

            right:
                -8px;
        }

        /* =================================================
           MERGE / WALK
        ================================================= */

        .player.walking
        .person-leg-left {

            animation:
                legWalkLeft
                .45s
                infinite
                alternate;
        }

        .player.walking
        .person-leg-right {

            animation:
                legWalkRight
                .45s
                infinite
                alternate;
        }

        .player.walking
        .person-arm-left {

            animation:
                armWalkLeft
                .45s
                infinite
                alternate;
        }

        .player.walking
        .person-arm-right {

            animation:
                armWalkRight
                .45s
                infinite
                alternate;
        }

        @keyframes legWalkLeft {

            from {
                transform:
                    rotate(12deg);
            }

            to {
                transform:
                    rotate(-12deg);
            }
        }

        @keyframes legWalkRight {

            from {
                transform:
                    rotate(-12deg);
            }

            to {
                transform:
                    rotate(12deg);
            }
        }

        @keyframes armWalkLeft {

            from {
                transform:
                    rotate(18deg);
            }

            to {
                transform:
                    rotate(-18deg);
            }
        }

        @keyframes armWalkRight {

            from {
                transform:
                    rotate(-18deg);
            }

            to {
                transform:
                    rotate(18deg);
            }
        }

        /* =================================================
           PERSONAJ AMEȚIT
        ================================================= */

        .player.dizzy {

            animation:
                playerDizzy
                1.25s
                ease-in-out;
        }

        .player.dizzy
        .person-character {

            animation:
                characterDizzy
                1.25s
                ease-in-out;
        }

        @keyframes playerDizzy {

            0% {
                transform:
                    translateX(-50%)
                    rotate(0deg);
            }

            20% {
                transform:
                    translateX(-50%)
                    rotate(-12deg);
            }

            40% {
                transform:
                    translateX(-50%)
                    rotate(12deg);
            }

            60% {
                transform:
                    translateX(-50%)
                    rotate(-9deg);
            }

            80% {
                transform:
                    translateX(-50%)
                    rotate(8deg);
            }

            100% {
                transform:
                    translateX(-50%)
                    rotate(0deg);
            }
        }

        @keyframes characterDizzy {

            0% {
                filter:
                    blur(0)
                    drop-shadow(
                        0 15px 18px
                        rgba(0,0,0,.55)
                    );
            }

            50% {
                filter:
                    blur(1px)
                    drop-shadow(
                        0 15px 18px
                        rgba(0,0,0,.55)
                    );
            }

            100% {
                filter:
                    blur(0)
                    drop-shadow(
                        0 15px 18px
                        rgba(0,0,0,.55)
                    );
            }
        }

        /* =================================================
           STELUȚE AMEȚEALĂ
        ================================================= */

        .player.dizzy::after {

            content:
                "💫 ✨ 💫";

            position: absolute;

            left: 50%;
            top: -25px;

            transform:
                translateX(-50%);

            width:
                150px;

            text-align:
                center;

            font-size:
                28px;

            animation:
                dizzyStars
                1.25s
                ease-in-out;
        }

        @keyframes dizzyStars {

            0% {
                opacity: 0;
                transform:
                    translateX(-50%)
                    rotate(-20deg)
                    scale(.5);
            }

            30% {
                opacity: 1;
            }

            70% {
                opacity: 1;
            }

            100% {
                opacity: 0;
                transform:
                    translateX(-50%)
                    rotate(20deg)
                    scale(1.15);
            }
        }

        /* =================================================
           LOVITURĂ
        ================================================= */

        .attack-effect {

            left:
                calc(10% + 50px);

            top:
                48%;

            font-size:
                clamp(55px, 8vw, 110px);
        }

        .attack-effect.active {

            animation:
                attackOnPlayer
                .9s
                ease;
        }

        @keyframes attackOnPlayer {

            0% {

                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    translateX(-30px)
                    scale(.35)
                    rotate(-20deg);
            }

            20% {

                opacity: 1;

                transform:
                    translate(-50%, -50%)
                    translateX(10px)
                    scale(1.2)
                    rotate(10deg);
            }

            45% {

                opacity: 1;

                transform:
                    translate(-50%, -50%)
                    translateX(35px)
                    scale(1)
                    rotate(-10deg);
            }

            100% {

                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    translateX(75px)
                    scale(1.5)
                    rotate(20deg);
            }
        }

        /* =================================================
           QUESTION PANEL
        ================================================= */

        .question-panel {

            backdrop-filter:
                blur(14px);

            -webkit-backdrop-filter:
                blur(14px);

            background:
                rgba(10,20,15,.84);

            box-shadow:
                0 25px 70px
                rgba(0,0,0,.5);
        }

        .question-panel.question-enter {

            animation:
                cinematicQuestion
                .65s
                cubic-bezier(.2,.8,.2,1);
        }

        @keyframes cinematicQuestion {

            from {

                opacity: 0;

                transform:
                    translateY(45px)
                    scale(.94);

                filter:
                    blur(8px);
            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

                filter:
                    blur(0);
            }
        }

        /* =================================================
           BUTOANE
        ================================================= */

        .answer-button {

            position: relative;

            overflow: hidden;

            z-index: 101;

            pointer-events:
                auto !important;

            color:
                #ffffff !important;

            background:
                rgba(255,255,255,.12) !important;

            border:
                1px solid
                rgba(255,255,255,.25) !important;

            text-shadow:
                0 1px 3px
                rgba(0,0,0,.8);
        }

        .answer-text {

            position: relative;

            z-index: 5;

            display:
                block !important;

            color:
                #ffffff !important;

            opacity:
                1 !important;

            visibility:
                visible !important;

            font-weight:
                700;

            text-shadow:
                0 2px 4px
                rgba(0,0,0,.8);
        }

        .answer-button:hover:not(:disabled) {

            background:
                rgba(255,255,255,.2) !important;
        }

        .answer-button.correct {

            background:
                linear-gradient(
                    135deg,
                    #087f3a,
                    #25c968
                ) !important;

            color:
                white !important;
        }

        .answer-button.wrong {

            background:
                linear-gradient(
                    135deg,
                    #8e1e1e,
                    #e53935
                ) !important;

            color:
                white !important;
        }

        /* =================================================
           CINEMATIC
        ================================================= */

        .cinematic-change {

            animation:
                cinematicSceneChange
                1.2s
                ease;
        }

        @keyframes cinematicSceneChange {

            0% {
                opacity: .65;

                filter:
                    blur(5px)
                    brightness(.75);

                transform:
                    scale(1.08);
            }

            50% {
                opacity: .9;

                filter:
                    blur(2px)
                    brightness(.9);

                transform:
                    scale(1.04);
            }

            100% {
                opacity: 1;

                filter:
                    blur(0)
                    brightness(1);

                transform:
                    scale(1);
            }
        }

        /* =================================================
           VIGNETTE
        ================================================= */

        .cinematic-vignette {

            position: fixed;

            inset: 0;

            z-index: 9997;

            pointer-events: none;

            box-shadow:
                inset 0 0 160px
                rgba(0,0,0,.65);
        }

        .cinematic-letterbox {

            position: fixed;

            left: 0;
            right: 0;

            height: 4vh;

            background:
                #000;

            z-index: 9999;

            pointer-events: none;
        }

        .cinematic-letterbox.top {
            top: 0;
        }

        .cinematic-letterbox.bottom {
            bottom: 0;
        }

        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 750px) {

            .player {

                width:
                    105px;

                height:
                    175px;
            }

            .person-head {
                font-size:
                    52px;
            }

            .person-body {
                width:
                    62px;

                height:
                    72px;
            }

            .person-leg {
                height:
                    65px;
            }

            .animal {
                width:
                    105px;

                height:
                    105px;
            }

            .emoji-animal {
                font-size:
                    70px;
            }

        }

    `;

    document.head.appendChild(style);
}

/* =========================================================
   CINEMATIC UI
========================================================= */

function activeazaCinematic() {

    if (
        !document.querySelector(
            ".cinematic-vignette"
        )
    ) {

        document.body.insertAdjacentHTML(
            "beforeend",
            `
                <div class="cinematic-letterbox top"></div>
                <div class="cinematic-letterbox bottom"></div>
                <div class="cinematic-vignette"></div>
            `
        );

    }
}

/* =========================================================
   PARALLAX
========================================================= */

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
                (x - .5) * 3;

            const rotateX =
                (.5 - y) * 2;

            forest.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.01)`;

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

        /* =================================================
           RESET COMPLET
        ================================================= */

        intrebareCurenta = 0;

        vieti =
            QUIZ_CONFIG.lives;

        scor = 0;

        raspunsuriCorecte = 0;

        raspunsuriGresite = 0;

        raspunsBlocat = false;

        /* =================================================
           ECRAN
        ================================================= */

        arataEcran(
            "quizGameScreen"
        );

        const title =
            element("gameQuizTitle");

        if (title) {

            title.textContent =
                quiz.titlu ||
                "Aventura";

        }

        /* =================================================
           RESET PERSONAJ
        ================================================= */

        const player =
            document.querySelector(
                ".player"
            );

        if (player) {

            player.classList.remove(
                "walking",
                "dizzy"
            );

            player.style.left =
                "10%";

            player.style.transform =
                "translateX(-50%)";

            void player.offsetWidth;
        }

        /* =================================================
           RESET ANIMAL
        ================================================= */

        const animal =
            element("animal");

        if (animal) {

            animal.classList.remove(
                "approach",
                "happy"
            );

            void animal.offsetWidth;
        }

        /* =================================================
           RESET EFECTE
        ================================================= */

        const attackEffect =
            element("attackEffect");

        if (attackEffect) {
            attackEffect.classList.remove(
                "active"
            );
        }

        const successEffect =
            element("successEffect");

        if (successEffect) {
            successEffect.classList.remove(
                "active"
            );
        }

        /* =================================================
           RESET FUNDAL
        ================================================= */

        scenaImagineIndex =
            -1;

        pregatestePersonaj();

        activeazaCinematic();

        activeazaParallax();

        schimbaFundalPadure();

        actualizeazaStatistici();

        /* =================================================
           PRIMA ÎNTREBARE
        ================================================= */

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

    const animal =
        element("animal");

    if (animal) {

        animal.classList.remove(
            "approach"
        );

        void animal.offsetWidth;

        animal.classList.add(
            "approach"
        );

    }

    /*
       Personajul merge după prima întrebare.
    */

    if (
        intrebareCurenta > 0
    ) {

        schimbaFundalPadure();

        miscaPersonaj();

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

/* =========================================================
   RĂSPUNS
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

    textElement.style.display =
        "block";

    textElement.style.visibility =
        "visible";

    textElement.style.opacity =
        "1";

    button.style.visibility =
        "visible";

    button.style.opacity =
        "1";
}

/* =========================================================
   MIȘCARE PERSONAJ
========================================================= */

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
        "37%",
        "51%",
        "65%",
        "77%",
        "87%"
    ];

    const pozitie =
        pozitii[
            Math.min(
                intrebareCurenta,
                pozitii.length - 1
            )
        ];

    player.classList.remove(
        "dizzy"
    );

    player.style.left =
        pozitie;

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
   RĂSPUNS UTILIZATOR
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
        String(raspuns || "")
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
                "🎉 Foarte bine!";

        }

        const animal =
            element(
                "animal"
            );

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
                ? "😯 Ai grijă!"
                : "💔 Aventura s-a încheiat!";

    }

    /* =====================================================
       LOVITURA PE PERSONAJ
    ===================================================== */

    lovestePersonaj();

    /* =====================================================
       EFECT ECRAN
    ===================================================== */

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
   LOVITURĂ + AMEȚEALĂ
========================================================= */

function lovestePersonaj() {

    const player =
        document.querySelector(
            ".player"
        );

    if (!player) {
        return;
    }

    /*
       Resetăm animația.
    */

    player.classList.remove(
        "dizzy"
    );

    void player.offsetWidth;

    /*
       Personajul este lovit și amețește.
    */

    player.classList.add(
        "dizzy"
    );

    /*
       Scoatem amețeala după animație.
    */

    setTimeout(
        () => {

            player.classList.remove(
                "dizzy"
            );

        },
        1300
    );
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
        element(
            "score"
        );

    if (score) {

        score.textContent =
            scor;

    }

    const lives =
        element(
            "lives"
        );

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

    /*
       QUIZ TERMINAT CU SUCCES
    */

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

    /*
       FĂRĂ VIEȚI
    */

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
            "Personajul a fost lovit prea des. Încearcă din nou!";

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

    scenaImagineIndex =
        -1;

    /* =================================================
       RESET PERSONAJ
    ================================================= */

    const player =
        document.querySelector(
            ".player"
        );

    if (player) {

        player.classList.remove(
            "walking",
            "dizzy"
        );

        player.style.left =
            "10%";

        player.style.transform =
            "translateX(-50%)";

    }

    /* =================================================
       RESET EFECTE
    ================================================= */

    const attackEffect =
        element("attackEffect");

    if (attackEffect) {
        attackEffect.classList.remove(
            "active"
        );
    }

    const successEffect =
        element("successEffect");

    if (successEffect) {
        successEffect.classList.remove(
            "active"
        );
    }

    arataEcran(
        "quizSelectScreen"
    );

    incarcaQuizuriSite();
}

/* =========================================================
   EVENIMENTE
========================================================= */

function initializeazaQuiz() {

    activeazaAnimatii3D();

    activeazaParallax();

    activeazaCinematic();

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

                return;
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

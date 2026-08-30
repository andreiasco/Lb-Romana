/* =========================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   PĂDURE REALĂ + PERSONAJ + ANIMALE EMOJI
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
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=90",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=90",
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=90"
    ]

};

/* =========================================================
   ANIMALE - EMOJI
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

    sarpe: {
        name: "Șarpe",
        emoji: "🐍"
    },

    "șarpe": {
        name: "Șarpe",
        emoji: "🐍"
    },

    pasare: {
        name: "Pasăre",
        emoji: "🐦"
    },

    "pasăre": {
        name: "Pasăre",
        emoji: "🐦"
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

    IMAGINI.forest.forEach(url => {

        const img =
            new Image();

        img.src = url;

    });
}

/* =========================================================
   FUNDAL PĂDURE REALĂ
========================================================= */

function schimbaFundalPadure() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {
        return;
    }

    scenaImagineIndex =
        (scenaImagineIndex + 1) %
        IMAGINI.forest.length;

    const url =
        IMAGINI.forest[
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
   ANIMAL EMOJI
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
     * Animalul este emoji.
     * Nu mai încărcăm imagini de animale.
     */

    animal.innerHTML = `
        <span class="animal-emoji">
            ${escapeHTML(animalData.emoji)}
        </span>
    `;

    animal.setAttribute(
        "aria-label",
        animalData.name
    );

    if (questionAnimal) {

        questionAnimal.innerHTML = `
            <span class="question-animal-emoji">
                ${escapeHTML(animalData.emoji)}
            </span>
        `;

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
   PERSONAJ
   CAP + TRUNCHI + PICIOARE
========================================================= */

function pregatestePersonaj() {

    const player =
        document.querySelector(".player");

    if (!player) {
        return;
    }

    if (
        player.querySelector(
            ".character-body"
        )
    ) {
        return;
    }

    player.innerHTML = `

        <div class="character-body">

            <!-- CAP -->

            <div class="character-head">

                <div class="character-hair"></div>

                <div class="character-face">

                    <span class="eye left"></span>
                    <span class="eye right"></span>

                    <span class="mouth"></span>

                </div>

            </div>


            <!-- TRUNCHI -->

            <div class="character-torso">

                <div class="character-arm left"></div>
                <div class="character-arm right"></div>

            </div>


            <!-- PICIOARE -->

            <div class="character-legs">

                <div class="character-leg left"></div>
                <div class="character-leg right"></div>

            </div>

        </div>


        <!-- UMBRĂ -->

        <div class="player-shadow"></div>

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
           PĂDURE
        ================================================= */

        .forest {

            background-image:
                linear-gradient(
                    rgba(5,18,10,.08),
                    rgba(0,0,0,.35)
                ),
                var(--forest-image);

            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;

            transition:
                background-image .8s ease;
        }


        .cinematic-change {

            animation:
                cinematicSceneChange
                1.2s ease;
        }


        @keyframes cinematicSceneChange {

            0% {

                opacity: .7;

                filter:
                    blur(5px)
                    brightness(.75);

                transform:
                    scale(1.05);
            }

            50% {

                opacity: .9;

                filter:
                    blur(2px)
                    brightness(.9);

                transform:
                    scale(1.025);
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
           ANIMAL EMOJI
        ================================================= */

        .animal {

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            overflow:
                visible;

            background:
                rgba(0,0,0,.20);

            border:
                4px solid
                rgba(255,255,255,.8);

            box-shadow:
                0 20px 55px
                rgba(0,0,0,.55);
        }


        .animal-emoji {

            display:
                block;

            font-size:
                clamp(
                    65px,
                    9vw,
                    135px
                );

            line-height:
                1;

            filter:
                drop-shadow(
                    0 15px 12px
                    rgba(0,0,0,.55)
                );

            transform:
                translateZ(30px);
        }


        .animal.approach {

            animation:
                animalApproach
                1.1s
                cubic-bezier(
                    .2,
                    .8,
                    .2,
                    1
                );
        }


        @keyframes animalApproach {

            0% {

                transform:
                    translateX(120px)
                    scale(.55);

                opacity:
                    0;
            }

            60% {

                transform:
                    translateX(-15px)
                    scale(1.08);

                opacity:
                    1;
            }

            100% {

                transform:
                    translateX(0)
                    scale(1);

                opacity:
                    1;
            }
        }


        /* =================================================
           ANIMAL FERICIT
        ================================================= */

        .animal.happy {

            animation:
                animalHappy
                .7s
                ease;
        }


        @keyframes animalHappy {

            0% {
                transform:
                    scale(1);
            }

            30% {
                transform:
                    scale(1.18)
                    rotate(-5deg);
            }

            60% {
                transform:
                    scale(1.08)
                    rotate(5deg);
            }

            100% {
                transform:
                    scale(1);
            }
        }


        /* =================================================
           PERSONAJ
        ================================================= */

        .player {

            position:
                absolute;

            transition:
                left 1s
                cubic-bezier(
                    .2,
                    .8,
                    .2,
                    1
                );

            z-index:
                40;

            transform-origin:
                center bottom;
        }


        .character-body {

            position:
                relative;

            width:
                clamp(
                    105px,
                    12vw,
                    170px
                );

            height:
                clamp(
                    200px,
                    24vw,
                    290px
                );

            margin:
                0 auto;

            transform:
                translateZ(30px);

            filter:
                drop-shadow(
                    0 20px 20px
                    rgba(0,0,0,.55)
                );
        }


        /* =================================================
           CAP
        ================================================= */

        .character-head {

            position:
                absolute;

            top:
                0;

            left:
                50%;

            width:
                clamp(
                    65px,
                    7vw,
                    100px
                );

            height:
                clamp(
                    65px,
                    7vw,
                    100px
                );

            transform:
                translateX(-50%);

            border-radius:
                50%;

            background:
                #f0b58b;

            border:
                4px solid
                rgba(0,0,0,.18);

            box-shadow:
                inset
                -10px -8px 0
                rgba(0,0,0,.08);
        }


        .character-hair {

            position:
                absolute;

            left:
                -3%;

            top:
                -3%;

            width:
                106%;

            height:
                45%;

            border-radius:
                55% 55% 30% 30%;

            background:
                #3a2419;

            z-index:
                2;
        }


        .character-face {

            position:
                absolute;

            inset:
                30% 15% 10%;

            z-index:
                3;
        }


        .eye {

            position:
                absolute;

            top:
                30%;

            width:
                8px;

            height:
                8px;

            border-radius:
                50%;

            background:
                #171717;
        }


        .eye.left {
            left:
                20%;
        }


        .eye.right {
            right:
                20%;
        }


        .mouth {

            position:
                absolute;

            left:
                50%;

            bottom:
                15%;

            width:
                20px;

            height:
                9px;

            transform:
                translateX(-50%);

            border-bottom:
                3px solid
                #9b3d3d;

            border-radius:
                50%;
        }


        /* =================================================
           TRUNCHI
        ================================================= */

        .character-torso {

            position:
                absolute;

            top:
                31%;

            left:
                50%;

            width:
                clamp(
                    65px,
                    7vw,
                    105px
                );

            height:
                clamp(
                    85px,
                    10vw,
                    130px
                );

            transform:
                translateX(-50%);

            border-radius:
                25px 25px 15px 15px;

            background:
                linear-gradient(
                    135deg,
                    #276f48,
                    #164b31
                );

            border:
                3px solid
                rgba(0,0,0,.2);

            box-shadow:
                inset
                -10px 0 0
                rgba(0,0,0,.1);
        }


        /* =================================================
           BRAȚE
        ================================================= */

        .character-arm {

            position:
                absolute;

            top:
                10%;

            width:
                clamp(
                    18px,
                    2vw,
                    27px
                );

            height:
                80px;

            border-radius:
                15px;

            background:
                #f0b58b;

            transform-origin:
                top center;
        }


        .character-arm.left {

            left:
                -23px;

            transform:
                rotate(12deg);
        }


        .character-arm.right {

            right:
                -23px;

            transform:
                rotate(-12deg);
        }


        /* =================================================
           PICIOARE
        ================================================= */

        .character-legs {

            position:
                absolute;

            top:
                70%;

            left:
                50%;

            width:
                65px;

            height:
                80px;

            transform:
                translateX(-50%);
        }


        .character-leg {

            position:
                absolute;

            top:
                0;

            width:
                24px;

            height:
                70px;

            border-radius:
                12px;

            background:
                #25445f;

            transform-origin:
                top center;
        }


        .character-leg.left {
            left:
                3px;
        }


        .character-leg.right {
            right:
                3px;
        }


        .character-leg::after {

            content:
                "";

            position:
                absolute;

            left:
                -8px;

            bottom:
                -6px;

            width:
                40px;

            height:
                18px;

            border-radius:
                12px 12px 5px 5px;

            background:
                #171717;
        }


        /* =================================================
           UMBRĂ
        ================================================= */

        .player-shadow {

            position:
                absolute;

            left:
                50%;

            bottom:
                -8px;

            width:
                105px;

            height:
                24px;

            transform:
                translateX(-50%);

            border-radius:
                50%;

            background:
                rgba(0,0,0,.58);

            filter:
                blur(7px);

            z-index:
                -1;
        }


        /* =================================================
           MERGE
        ================================================= */

        .player.walking {

            animation:
                cinematicWalk
                1s
                ease;
        }


        .player.walking
        .character-leg.left {

            animation:
                leftLegWalk
                .5s
                ease-in-out
                2;
        }


        .player.walking
        .character-leg.right {

            animation:
                rightLegWalk
                .5s
                ease-in-out
                2;
        }


        .player.walking
        .character-arm.left {

            animation:
                leftArmWalk
                .5s
                ease-in-out
                2;
        }


        .player.walking
        .character-arm.right {

            animation:
                rightArmWalk
                .5s
                ease-in-out
                2;
        }


        @keyframes cinematicWalk {

            0% {

                transform:
                    translateY(0)
                    rotate(0);
            }

            20% {

                transform:
                    translateY(-9px)
                    rotate(-3deg);
            }

            40% {

                transform:
                    translateY(0)
                    rotate(3deg);
            }

            60% {

                transform:
                    translateY(-8px)
                    rotate(-2deg);
            }

            80% {

                transform:
                    translateY(0)
                    rotate(2deg);
            }

            100% {

                transform:
                    translateY(0)
                    rotate(0);
            }
        }


        @keyframes leftLegWalk {

            0% {
                transform:
                    rotate(15deg);
            }

            50% {
                transform:
                    rotate(-15deg);
            }

            100% {
                transform:
                    rotate(15deg);
            }
        }


        @keyframes rightLegWalk {

            0% {
                transform:
                    rotate(-15deg);
            }

            50% {
                transform:
                    rotate(15deg);
            }

            100% {
                transform:
                    rotate(-15deg);
            }
        }


        @keyframes leftArmWalk {

            0% {
                transform:
                    rotate(25deg);
            }

            50% {
                transform:
                    rotate(-25deg);
            }

            100% {
                transform:
                    rotate(25deg);
            }
        }


        @keyframes rightArmWalk {

            0% {
                transform:
                    rotate(-25deg);
            }

            50% {
                transform:
                    rotate(25deg);
            }

            100% {
                transform:
                    rotate(-25deg);
            }
        }


        /* =================================================
           LOVITURĂ PE OM
        ================================================= */

        .player-hit-effect {

            position:
                absolute;

            left:
                50%;

            top:
                12%;

            transform:
                translate(
                    -50%,
                    -50%
                )
                scale(.3);

            z-index:
                300;

            font-size:
                clamp(
                    55px,
                    8vw,
                    100px
                );

            pointer-events:
                none;

            animation:
                playerHit
                .9s
                cubic-bezier(
                    .2,
                    .8,
                    .2,
                    1
                )
                forwards;
        }


        @keyframes playerHit {

            0% {

                opacity:
                    0;

                transform:
                    translate(
                        -50%,
                        -50%
                    )
                    scale(.2)
                    rotate(-20deg);
            }

            20% {

                opacity:
                    1;

                transform:
                    translate(
                        -50%,
                        -50%
                    )
                    scale(1.25)
                    rotate(15deg);
            }

            40% {

                opacity:
                    1;

                transform:
                    translate(
                        -50%,
                        -50%
                    )
                    scale(1)
                    rotate(-10deg);
            }

            70% {

                opacity:
                    .8;

                transform:
                    translate(
                        -50%,
                        -50%
                    )
                    scale(.9)
                    rotate(8deg);
            }

            100% {

                opacity:
                    0;

                transform:
                    translate(
                        -50%,
                        -50%
                    )
                    scale(.7)
                    rotate(0);
            }
        }


        /* =================================================
           AMEȚEALĂ
        ================================================= */

        .player.dizzy {

            animation:
                dizzyPlayer
                1.3s
                ease-in-out;
        }


        @keyframes dizzyPlayer {

            0% {

                transform:
                    translateY(0)
                    rotate(0);
            }

            10% {

                transform:
                    translateY(-8px)
                    rotate(-12deg);
            }

            20% {

                transform:
                    translateY(0)
                    rotate(12deg);
            }

            30% {

                transform:
                    translateY(-6px)
                    rotate(-10deg);
            }

            40% {

                transform:
                    translateY(0)
                    rotate(10deg);
            }

            50% {

                transform:
                    translateY(-5px)
                    rotate(-8deg);
            }

            60% {

                transform:
                    translateY(0)
                    rotate(8deg);
            }

            75% {

                transform:
                    translateY(-3px)
                    rotate(-5deg);
            }

            90% {

                transform:
                    translateY(0)
                    rotate(3deg);
            }

            100% {

                transform:
                    translateY(0)
                    rotate(0);
            }
        }


        /* =================================================
           💫 AMEȚEALĂ ÎN JURUL CAPULUI
        ================================================= */

        .player.dizzy::after {

            content:
                "💫";

            position:
                absolute;

            left:
                50%;

            top:
                -15px;

            transform:
                translateX(-50%);

            font-size:
                48px;

            z-index:
                350;

            animation:
                dizzyStars
                1.3s
                ease-in-out;
        }


        @keyframes dizzyStars {

            0% {

                opacity:
                    0;

                transform:
                    translateX(-50%)
                    rotate(0)
                    scale(.5);
            }

            25% {

                opacity:
                    1;

                transform:
                    translateX(-50%)
                    rotate(-20deg)
                    scale(1);
            }

            50% {

                opacity:
                    1;

                transform:
                    translateX(-50%)
                    rotate(20deg)
                    scale(1.15);
            }

            75% {

                opacity:
                    .8;

                transform:
                    translateX(-50%)
                    rotate(-15deg)
                    scale(1);
            }

            100% {

                opacity:
                    0;

                transform:
                    translateX(-50%)
                    rotate(0)
                    scale(.7);
            }
        }


        /* =================================================
           PANOU
        ================================================= */

        .question-panel {

            backdrop-filter:
                blur(14px);

            -webkit-backdrop-filter:
                blur(14px);

            background:
                rgba(10,20,15,.82);

            box-shadow:
                0 25px 70px
                rgba(0,0,0,.45);
        }


        /* =================================================
           ANIMAL MIC ÎN ÎNTREBARE
        ================================================= */

        .question-animal {

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            overflow:
                visible;
        }


        .question-animal-emoji {

            font-size:
                48px;

            line-height:
                1;

            filter:
                drop-shadow(
                    0 7px 6px
                    rgba(0,0,0,.5)
                );
        }


        /* =================================================
           RĂSPUNSURI
        ================================================= */

        .answers {

            position:
                relative;

            z-index:
                100;
        }


        .answer-button {

            position:
                relative;

            overflow:
                hidden;

            z-index:
                101;

            pointer-events:
                auto !important;

            color:
                #ffffff !important;

            background:
                rgba(
                    255,
                    255,
                    255,
                    .14
                ) !important;

            border:
                2px solid
                rgba(
                    255,
                    255,
                    255,
                    .25
                ) !important;

            text-shadow:
                0 1px 3px
                rgba(0,0,0,.8);
        }


        .answer-button::before {

            content:
                "";

            position:
                absolute;

            inset:
                0;

            background:
                linear-gradient(
                    110deg,
                    transparent 20%,
                    rgba(
                        255,
                        255,
                        255,
                        .22
                    ) 50%,
                    transparent 80%
                );

            transform:
                translateX(-120%);

            transition:
                transform
                .55s ease;

            pointer-events:
                none;
        }


        .answer-button:hover::before {

            transform:
                translateX(120%);
        }


        .answer-letter {

            position:
                relative;

            z-index:
                2;

            color:
                #ffffff !important;

            background:
                rgba(
                    255,
                    255,
                    255,
                    .2
                ) !important;
        }


        .answer-text {

            position:
                relative;

            z-index:
                2;

            display:
                block;

            color:
                #ffffff !important;

            opacity:
                1 !important;

            visibility:
                visible !important;

            line-height:
                1.35;

            word-break:
                break-word;
        }


        .answer-button.correct {

            background:
                linear-gradient(
                    135deg,
                    #16803c,
                    #2ecc71
                ) !important;

            color:
                #ffffff !important;

            border-color:
                #72f59a !important;

            animation:
                correctAnswer
                .5s ease;
        }


        .answer-button.wrong {

            background:
                linear-gradient(
                    135deg,
                    #8e1e1e,
                    #e74c3c
                ) !important;

            color:
                #ffffff !important;

            border-color:
                #ff9187 !important;

            animation:
                wrongAnswer
                .45s ease;
        }


        @keyframes correctAnswer {

            50% {

                transform:
                    scale(1.04);
            }
        }


        @keyframes wrongAnswer {

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


        /* =================================================
           CINEMATIC
        ================================================= */

        .cinematic-letterbox {

            position:
                fixed;

            left:
                0;

            right:
                0;

            height:
                7vh;

            background:
                #000;

            z-index:
                9999;

            pointer-events:
                none;
        }


        .cinematic-letterbox.top {
            top:
                0;
        }


        .cinematic-letterbox.bottom {
            bottom:
                0;
        }


        .cinematic-vignette {

            position:
                fixed;

            inset:
                0;

            z-index:
                9997;

            pointer-events:
                none;

            box-shadow:
                inset
                0 0 160px
                rgba(0,0,0,.65);
        }


        .animal-bubble {

            backdrop-filter:
                blur(8px);

            -webkit-backdrop-filter:
                blur(8px);
        }

    `;

    document.head.appendChild(style);
}

/* =========================================================
   CINEMATIC UI
========================================================= */

function activeazaCinematic() {

    if (
        document.querySelector(
            ".cinematic-vignette"
        )
    ) {
        return;
    }

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="cinematic-letterbox top"></div>
        <div class="cinematic-letterbox bottom"></div>
        <div class="cinematic-vignette"></div>
        `
    );
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
                (x - .5) * 2.5;

            const rotateX =
                (.5 - y) * 1.5;

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

        quizuri = data;

        container.innerHTML =
            data.map(quiz => {

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

            }).join("");

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
            element("gameQuizTitle");

        if (title) {

            title.textContent =
                quiz.titlu ||
                "Aventura";
        }

        pregatestePersonaj();

        activeazaCinematic();

        schimbaFundalPadure();

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

    raspunsBlocat = false;

    const intrebare =
        intrebari[
            intrebareCurenta
        ];

    const number =
        element("questionNumber");

    if (number) {

        number.textContent =
            intrebareCurenta + 1;
    }

    const total =
        element("questionTotal");

    if (total) {

        total.textContent =
            intrebari.length;
    }

    const questionText =
        element("questionText");

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
            "approach",
            "happy"
        );

        void animal.offsetWidth;

        animal.classList.add(
            "approach"
        );
    }

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
   SETARE RĂSPUNS
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
        element("animalBubble");

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
                ? "😯 Ai grijă!"
                : "💔 Aventura s-a încheiat!";
    }

    /*
     * LOVITURA ESTE PE OM
     */

    afiseazaAtac();

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
   EFECT LOVITURĂ PE OM
========================================================= */

function afiseazaAtac() {

    const player =
        document.querySelector(
            ".player"
        );

    if (!player) {
        return;
    }

    /*
     * 💥 apare direct pe personaj
     */

    const effect =
        document.createElement(
            "div"
        );

    effect.className =
        "player-hit-effect";

    effect.textContent =
        "💥";

    player.appendChild(
        effect
    );

    /*
     * omul amețește
     */

    player.classList.remove(
        "dizzy"
    );

    void player.offsetWidth;

    player.classList.add(
        "dizzy"
    );

    /*
     * curățare
     */

    setTimeout(
        () => {

            if (effect) {
                effect.remove();
            }

        },
        900
    );

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
        element("finalScore");

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
        element("resultTitle");

    const subtitle =
        element(
            "resultSubtitle"
        );

    const icon =
        element("resultIcon");

    const message =
        element(
            "resultMessage"
        );

    /*
     * TERMINAT CU SUCCES
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
     * FĂRĂ VIEȚI
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

    activeazaAnimatii3D();

    activeazaParallax();

    preloadImages();

    document.addEventListener(
        "click",
        event => {

            /* RĂSPUNS */

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


            /* PORNIRE QUIZ */

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


            /* RESTART */

            const restartButton =
                event.target.closest(
                    "#restartQuizButton"
                );

            if (restartButton) {

                event.preventDefault();

                restartQuiz();

                return;
            }


            /* ALT QUIZ */

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

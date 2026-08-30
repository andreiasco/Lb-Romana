/* =========================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   - pădure reală
   - personaj mare: cap + trunchi + picioare
   - personajul merge prin pădure
   - animale emoji
   - răspunsurile sunt vizibile
   - lovitura apare pe personaj la răspuns greșit
   - personajul amețește
   - la restart pornește de la început
========================================================= */

"use strict";

/* =========================================================
   CONFIG
========================================================= */

const QUIZ_CONFIG = {
    lives: 3,
    pointsCorrect: 100,
    delayAfterCorrect: 1400,
    delayAfterWrong: 1600,
    walkDuration: 1000
};

/* =========================================================
   IMAGINI PĂDURE
========================================================= */

const IMAGINI = {

    forest: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=85",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=85",
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=85"
    ]

};

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
   FUNDAL PĂDURE
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

    animal.innerHTML = `
        <div class="emoji-animal">
            ${animalData.emoji}
        </div>
    `;

    if (questionAnimal) {

        questionAnimal.innerHTML = `
            <div class="emoji-question-animal">
                ${animalData.emoji}
            </div>
        `;

    }

    const bubble =
        element("animalBubble");

    if (bubble) {

        bubble.textContent =
            `${animalData.name}: Alege răspunsul corect!`;

    }

    adaugaStilAnimalEmoji();
}

/* =========================================================
   STIL ANIMAL
========================================================= */

function adaugaStilAnimalEmoji() {

    if (
        element("emojiAnimalStyles")
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "emojiAnimalStyles";

    style.textContent = `

        .emoji-animal {

            width: 100%;
            height: 100%;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size:
                clamp(65px, 10vw, 140px);

            line-height: 1;

            filter:
                drop-shadow(
                    0 15px 18px
                    rgba(0,0,0,.6)
                );

            user-select: none;
        }

        .emoji-question-animal {

            width: 100%;
            height: 100%;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 45px;

            line-height: 1;
        }

        .animal {

            display: flex !important;

            align-items: center;
            justify-content: center;

            overflow: visible !important;

            background:
                rgba(255,255,255,.08) !important;
        }

    `;

    document.head.appendChild(style);
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

    player.innerHTML = `
        <div class="player-character">

            <div class="player-head">
                🙂 
            </div>

            <div class="player-body">
                👕
            </div>

            <div class="player-legs">

                <div class="player-leg left">
                    👖
                </div>

                <div class="player-leg right">
                    👖
                </div>

            </div>

        </div>

        <div class="player-shadow"></div>

        <div class="hit-effect">
            💥
        </div>

        <div class="dizzy-effect">
            💫
        </div>
    `;

    adaugaStilPersonaj();
}

/* =========================================================
   STIL PERSONAJ
========================================================= */

function adaugaStilPersonaj() {

    if (
        element("playerStyles")
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "playerStyles";

    style.textContent = `

        .player {

            width: 150px;
            height: 230px;

            display: flex;

            align-items: center;
            justify-content: center;

            z-index: 80;

            transition:
                left 1s
                cubic-bezier(.2,.8,.2,1);

            pointer-events: none;
        }

        .player-character {

            position: relative;

            width: 130px;
            height: 215px;

            display: flex;

            flex-direction: column;

            align-items: center;

            transform-origin:
                center bottom;

            filter:
                drop-shadow(
                    0 15px 15px
                    rgba(0,0,0,.55)
                );
        }

        .player-head {

            width: 72px;
            height: 72px;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 58px;

            line-height: 1;

            z-index: 3;
        }

        .player-body {

            width: 85px;
            height: 85px;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 75px;

            line-height: 1;

            margin-top: -2px;

            z-index: 2;
        }

        .player-legs {

            display: flex;

            justify-content: center;

            gap: 8px;

            margin-top: -4px;

            z-index: 1;
        }

        .player-leg {

            font-size: 52px;

            line-height: 1;

            transform-origin:
                center top;
        }

        .player-shadow {

            position: absolute;

            left: 50%;
            bottom: 2px;

            width: 115px;
            height: 25px;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background:
                rgba(0,0,0,.55);

            filter:
                blur(7px);

            z-index: -1;
        }

        .player.walking
        .player-character {

            animation:
                personajMerge
                1s
                ease;
        }

        .player.walking
        .player-leg.left {

            animation:
                legLeft
                .5s
                ease-in-out
                infinite alternate;
        }

        .player.walking
        .player-leg.right {

            animation:
                legRight
                .5s
                ease-in-out
                infinite alternate;
        }

        @keyframes personajMerge {

            0% {
                transform:
                    translateY(0)
                    rotate(0deg);
            }

            25% {
                transform:
                    translateY(-12px)
                    rotate(-3deg);
            }

            50% {
                transform:
                    translateY(0)
                    rotate(3deg);
            }

            75% {
                transform:
                    translateY(-10px)
                    rotate(-2deg);
            }

            100% {
                transform:
                    translateY(0)
                    rotate(0);
            }
        }

        @keyframes legLeft {

            from {
                transform:
                    rotate(-15deg);
            }

            to {
                transform:
                    rotate(15deg);
            }
        }

        @keyframes legRight {

            from {
                transform:
                    rotate(15deg);
            }

            to {
                transform:
                    rotate(-15deg);
            }
        }

        .hit-effect {

            position: absolute;

            left: 50%;
            top: 35%;

            transform:
                translate(-50%,-50%)
                scale(.3);

            opacity: 0;

            font-size: 65px;

            z-index: 20;
        }

        .player.hit
        .hit-effect {

            animation:
                hitPersonaj
                .8s
                ease;
        }

        @keyframes hitPersonaj {

            0% {
                opacity: 0;
                transform:
                    translate(-50%,-50%)
                    scale(.3)
                    rotate(0);
            }

            25% {
                opacity: 1;
                transform:
                    translate(-50%,-50%)
                    scale(1.3)
                    rotate(-15deg);
            }

            50% {
                opacity: 1;
                transform:
                    translate(-50%,-50%)
                    scale(1)
                    rotate(15deg);
            }

            75% {
                opacity: 1;
                transform:
                    translate(-50%,-50%)
                    scale(1.2)
                    rotate(-10deg);
            }

            100% {
                opacity: 0;
                transform:
                    translate(-50%,-50%)
                    scale(1.5)
                    rotate(0);
            }
        }

        .dizzy-effect {

            position: absolute;

            left: 50%;
            top: 3%;

            transform:
                translateX(-50%);

            font-size: 45px;

            opacity: 0;

            z-index: 30;
        }

        .player.dizzy
        .dizzy-effect {

            animation:
                dizzyPersonaj
                1.4s
                ease;
        }

        .player.dizzy
        .player-character {

            animation:
                dizzyBody
                1.4s
                ease;
        }

        @keyframes dizzyPersonaj {

            0% {
                opacity: 0;
                transform:
                    translateX(-50%)
                    rotate(0);
            }

            20% {
                opacity: 1;
            }

            40% {
                transform:
                    translateX(-50%)
                    rotate(-15deg);
            }

            60% {
                transform:
                    translateX(-50%)
                    rotate(15deg);
            }

            80% {
                transform:
                    translateX(-50%)
                    rotate(-10deg);
            }

            100% {
                opacity: 0;
                transform:
                    translateX(-50%)
                    rotate(0);
            }
        }

        @keyframes dizzyBody {

            0% {
                transform:
                    rotate(0)
                    translateX(0);
            }

            20% {
                transform:
                    rotate(-8deg)
                    translateX(-7px);
            }

            40% {
                transform:
                    rotate(8deg)
                    translateX(7px);
            }

            60% {
                transform:
                    rotate(-7deg)
                    translateX(-6px);
            }

            80% {
                transform:
                    rotate(6deg)
                    translateX(5px);
            }

            100% {
                transform:
                    rotate(0)
                    translateX(0);
            }
        }

    `;

    document.head.appendChild(style);
}

/* =========================================================
   ANIMAȚII GENERALE
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

        .cinematic-change {

            animation:
                cinematicSceneChange
                1.2s
                ease;
        }

        @keyframes cinematicSceneChange {

            0% {
                opacity: .6;

                filter:
                    blur(5px)
                    brightness(.7);

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

        .animal.approach {

            animation:
                animalApproach
                1.1s
                cubic-bezier(.2,.8,.2,1);
        }

        @keyframes animalApproach {

            0% {
                transform:
                    translateX(100px)
                    scale(.6);

                opacity: 0;
            }

            60% {
                transform:
                    translateX(-10px)
                    scale(1.1);

                opacity: 1;
            }

            100% {
                transform:
                    translateX(0)
                    scale(1);

                opacity: 1;
            }
        }

        .question-panel.question-enter {

            animation:
                questionEnter
                .6s
                cubic-bezier(.2,.8,.2,1);
        }

        @keyframes questionEnter {

            from {

                opacity: 0;

                transform:
                    translateY(35px)
                    scale(.96);

                filter:
                    blur(5px);
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

        .answer-button {

            position: relative;

            overflow: hidden;

            color: #ffffff !important;

            background:
                rgba(255,255,255,.14)
                !important;

            border:
                2px solid
                rgba(255,255,255,.28)
                !important;

            opacity: 1 !important;

            visibility: visible !important;

            z-index: 500;

            pointer-events: auto !important;
        }

        .answer-button .answer-text {

            display: block !important;

            visibility: visible !important;

            opacity: 1 !important;

            color: #ffffff !important;

            font-size: 17px !important;

            font-weight: 800 !important;

            text-shadow:
                0 2px 5px
                rgba(0,0,0,.8);

            position: relative;

            z-index: 600;
        }

        .answer-letter {

            color: white !important;

            background:
                rgba(255,255,255,.18)
                !important;

            border:
                1px solid
                rgba(255,255,255,.3);
        }

        .answer-button:hover:not(:disabled) {

            background:
                rgba(46,175,93,.35)
                !important;

            transform:
                translateY(-3px);
        }

        .answer-button.correct {

            background:
                linear-gradient(
                    135deg,
                    #08752f,
                    #27ae60
                ) !important;

            border-color:
                #72ff9a !important;
        }

        .answer-button.wrong {

            background:
                linear-gradient(
                    135deg,
                    #8b1616,
                    #e74c3c
                ) !important;

            border-color:
                #ff8888 !important;
        }

        .answer-button:disabled {

            opacity: .9 !important;

            pointer-events: none;
        }

        .screen-shake {

            animation:
                screenShake
                .45s
                ease;
        }

        @keyframes screenShake {

            0%,100% {
                transform:
                    translateX(0);
            }

            20% {
                transform:
                    translateX(-9px);
            }

            40% {
                transform:
                    translateX(9px);
            }

            60% {
                transform:
                    translateX(-6px);
            }

            80% {
                transform:
                    translateX(6px);
            }
        }

    `;

    document.head.appendChild(style);
}

/* =========================================================
   CINEMATIC
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

    const style =
        document.createElement("style");

    style.textContent = `

        .cinematic-letterbox {

            position: fixed;

            left: 0;
            right: 0;

            height: 5vh;

            background: #000;

            z-index: 9999;

            pointer-events: none;
        }

        .cinematic-letterbox.top {
            top: 0;
        }

        .cinematic-letterbox.bottom {
            bottom: 0;
        }

        .cinematic-vignette {

            position: fixed;

            inset: 0;

            z-index: 9997;

            pointer-events: none;

            box-shadow:
                inset 0 0 160px
                rgba(0,0,0,.65);
        }

    `;

    document.head.appendChild(style);
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
                (x - .5) * 2;

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

        /* RESET COMPLET */

        intrebareCurenta = 0;

        vieti =
            QUIZ_CONFIG.lives;

        scor = 0;

        raspunsuriCorecte = 0;

        raspunsuriGresite = 0;

        raspunsBlocat = false;

        /* PERSONAJ DE LA ÎNCEPUT */

        const player =
            document.querySelector(
                ".player"
            );

        if (player) {

            player.style.left =
                "8%";

            player.classList.remove(
                "walking",
                "hit",
                "dizzy"
            );

        }

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

        activeazaAnimatii3D();

        activeazaCinematic();

        actualizeazaStatistici();

        /* PRIMA SCENĂ */

        scenaImagineIndex = -1;

        schimbaFundalPadure();

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

    butoane.forEach(button => {

        button.disabled = false;

        button.hidden = false;

        button.style.display =
            "flex";

        button.style.visibility =
            "visible";

        button.style.opacity =
            "1";

        button.classList.remove(
            "correct",
            "wrong",
            "raspuns-corect",
            "raspuns-gresit"
        );

    });

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

    if (
        intrebareCurenta === 0
    ) {

        const player =
            document.querySelector(
                ".player"
            );

        if (player) {

            player.style.left =
                "8%";

            player.classList.remove(
                "walking"
            );
        }

    } else {

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

    let valoare =
        text === null ||
        text === undefined
            ? ""
            : String(text);

    valoare =
        valoare.trim();

    textElement.textContent =
        valoare;

    /* FORȚĂM AFIȘAREA */

    textElement.style.display =
        "block";

    textElement.style.visibility =
        "visible";

    textElement.style.opacity =
        "1";

    textElement.style.color =
        "#ffffff";

    textElement.style.fontSize =
        "17px";

    textElement.style.fontWeight =
        "800";

    button.style.display =
        "flex";

    button.style.visibility =
        "visible";

    button.style.opacity =
        "1";

    button.hidden =
        false;
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
        "8%",
        "21%",
        "35%",
        "49%",
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
   LOVITURĂ PE PERSONAJ
========================================================= */

function lovestePersonaj() {

    const player =
        document.querySelector(
            ".player"
        );

    if (!player) {
        return;
    }

    player.classList.remove(
        "hit",
        "dizzy"
    );

    void player.offsetWidth;

    player.classList.add(
        "hit"
    );

    setTimeout(
        () => {

            player.classList.remove(
                "hit"
            );

            player.classList.add(
                "dizzy"
            );

        },
        250
    );

    setTimeout(
        () => {

            player.classList.remove(
                "dizzy"
            );

        },
        1700
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

    raspunsBlocat = true;

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
            vieti > 0
                ? "❌ Răspuns greșit! Ai pierdut o viață."
                : "💔 Răspuns greșit! Aventura s-a încheiat.";

        message.className =
            "question-message error";
    }

    if (bubble) {

        bubble.textContent =
            vieti > 0
                ? "😯 Ai grijă!"
                : "💔 Aventura s-a încheiat!";
    }

    /* LOVITURA PE OM */

    lovestePersonaj();

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

        incarcaQuizuriSite();

        return;
    }

    /*
       IMPORTANT:
       pornesteQuiz resetează:
       - întrebarea
       - viețile
       - scorul
       - poziția personajului
       - scena
    */

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

    const player =
        document.querySelector(
            ".player"
        );

    if (player) {

        player.style.left =
            "8%";

        player.classList.remove(
            "walking",
            "hit",
            "dizzy"
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

    preloadImages();

    document.addEventListener(
        "click",
        event => {

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

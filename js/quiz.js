/* =========================================================
   JS/QUIZ.JS
   AVENTURA DIN PĂDURE
   =========================================================
   - pădure reală
   - personaj mare: cap + trunchi + picioare
   - personajul merge prin pădure
   - animale = emoticoane
   - alegere răspuns corect
   - ordine
   - spânzurătoare
   - 3 vieți
   - scor
   - Supabase
========================================================= */

"use strict";

/* =========================================================
   CONFIG
========================================================= */

const QUIZ_CONFIG = {
    lives: 3,
    pointsCorrect: 100,
    pointsOrder: 150,
    pointsHangman: 200,

    delayAfterCorrect: 1300,
    delayAfterWrong: 1300,

    walkDuration: 1100
};


/* =========================================================
   IMAGINI PĂDURE REALĂ
========================================================= */

const IMAGINI = {

    forest: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90"
    ]
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

    ursulet: {
        name: "Ursuleț",
        emoji: "🧸"
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

let raspunsOrdine = [];

let hangmanWord = "";
let hangmanGuessed = [];
let hangmanErrors = 0;


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
   TIP ÎNTREBARE
========================================================= */

function obtineTipIntrebare(intrebare) {

    const tip =
        intrebare.tip ||
        intrebare.tip_intrebare ||
        intrebare.type ||
        intrebare.tipIntrebare ||
        "alegere";

    return String(tip)
        .trim()
        .toLowerCase();
}


function esteTipAlegere(tip) {

    return [
        "alegere",
        "alegere_raspuns",
        "multiple_choice",
        "multiple-choice",
        "choice",
        "grila",
        "normal"
    ].includes(tip);
}


function esteTipOrdine(tip) {

    return [
        "ordine",
        "ordonare",
        "order",
        "aranjare"
    ].includes(tip);
}


function esteTipSpanzuratoare(tip) {

    return [
        "spanzuratoare",
        "spânzurătoare",
        "hangman"
    ].includes(tip);
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

    const activ = element(idEcran);

    if (activ) {
        activ.classList.remove("ascuns");
    }
}


/* =========================================================
   PRELOAD
========================================================= */

function preloadImages() {

    IMAGINI.forest.forEach(url => {

        const img = new Image();

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

    if (animal) {

        animal.innerHTML = `
            <div class="emoji-animal">
                ${animalData.emoji}
            </div>
        `;

        animal.title =
            animalData.name;

    }

    if (questionAnimal) {

        questionAnimal.innerHTML = `
            <div class="question-animal-emoji">
                ${animalData.emoji}
            </div>
        `;

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
========================================================= */

function pregatestePersonaj() {

    const player =
        document.querySelector(".player");

    if (!player) {
        return;
    }

    player.innerHTML = `
        <div class="player-shadow"></div>

        <div class="forest-character">

            <div class="character-head">
                👦
            </div>

            <div class="character-body">
                <div class="character-shirt"></div>
            </div>

            <div class="character-arm character-arm-left"></div>

            <div class="character-arm character-arm-right"></div>

            <div class="character-leg character-leg-left">
                <div class="character-shoe"></div>
            </div>

            <div class="character-leg character-leg-right">
                <div class="character-shoe"></div>
            </div>

        </div>
    `;

    adaugaStilPersonaj();
}


/* =========================================================
   STIL PERSONAJ
========================================================= */

function adaugaStilPersonaj() {

    if (
        element("forestCharacterStyles")
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "forestCharacterStyles";

    style.textContent = `

        .forest-character {
            position: relative;
            width: 95px;
            height: 190px;
            transform-origin: bottom center;
            filter:
                drop-shadow(
                    0 15px 18px
                    rgba(0,0,0,.55)
                );
        }

        .character-head {
            position: absolute;
            top: 0;
            left: 22px;

            width: 58px;
            height: 58px;

            display: grid;
            place-items: center;

            border-radius: 50%;

            background:
                #f0b083;

            border:
                4px solid
                #3b2418;

            font-size: 40px;

            z-index: 5;

            overflow: hidden;
        }

        .character-body {
            position: absolute;

            top: 54px;
            left: 25px;

            width: 50px;
            height: 75px;

            border-radius:
                18px 18px 12px 12px;

            background:
                linear-gradient(
                    135deg,
                    #2878d0,
                    #12519b
                );

            border:
                3px solid
                #183b62;

            z-index: 4;
        }

        .character-shirt {
            position: absolute;
            left: 8px;
            right: 8px;
            bottom: 8px;

            height: 20px;

            border-radius: 8px;

            background:
                rgba(255,255,255,.18);
        }

        .character-arm {
            position: absolute;

            top: 63px;

            width: 17px;
            height: 68px;

            border-radius: 12px;

            background:
                #2878d0;

            border:
                3px solid
                #183b62;

            z-index: 3;

            transform-origin: top center;
        }

        .character-arm-left {
            left: 12px;
            transform: rotate(12deg);
        }

        .character-arm-right {
            right: 12px;
            transform: rotate(-12deg);
        }

        .character-leg {
            position: absolute;

            top: 120px;

            width: 20px;
            height: 62px;

            border-radius:
                5px 5px 10px 10px;

            background:
                #28333d;

            border:
                3px solid
                #172027;

            z-index: 2;

            transform-origin: top center;
        }

        .character-leg-left {
            left: 25px;
        }

        .character-leg-right {
            right: 25px;
        }

        .character-shoe {
            position: absolute;

            bottom: -7px;

            width: 32px;
            height: 13px;

            border-radius: 10px;

            background:
                #171717;

            border:
                2px solid
                #080808;
        }

        .character-leg-left .character-shoe {
            left: -10px;
        }

        .character-leg-right .character-shoe {
            right: -10px;
        }

        .player.walking .character-leg-left {
            animation:
                legLeftWalk
                .55s
                infinite alternate
                ease-in-out;
        }

        .player.walking .character-leg-right {
            animation:
                legRightWalk
                .55s
                infinite alternate
                ease-in-out;
        }

        .player.walking .character-arm-left {
            animation:
                armLeftWalk
                .55s
                infinite alternate
                ease-in-out;
        }

        .player.walking .character-arm-right {
            animation:
                armRightWalk
                .55s
                infinite alternate
                ease-in-out;
        }

        @keyframes legLeftWalk {
            from {
                transform: rotate(15deg);
            }

            to {
                transform: rotate(-18deg);
            }
        }

        @keyframes legRightWalk {
            from {
                transform: rotate(-18deg);
            }

            to {
                transform: rotate(15deg);
            }
        }

        @keyframes armLeftWalk {
            from {
                transform: rotate(-20deg);
            }

            to {
                transform: rotate(20deg);
            }
        }

        @keyframes armRightWalk {
            from {
                transform: rotate(20deg);
            }

            to {
                transform: rotate(-20deg);
            }
        }

        .player.walking .forest-character {
            animation:
                bodyWalk
                .55s
                infinite alternate
                ease-in-out;
        }

        @keyframes bodyWalk {

            from {
                transform:
                    translateY(0)
                    rotate(-2deg);
            }

            to {
                transform:
                    translateY(-8px)
                    rotate(2deg);
            }

        }

        .emoji-animal {

            width: 100%;
            height: 100%;

            display: grid;
            place-items: center;

            font-size:
                clamp(75px, 11vw, 155px);

            line-height: 1;

            filter:
                drop-shadow(
                    0 18px 20px
                    rgba(0,0,0,.55)
                );

            user-select: none;
        }

        .question-animal-emoji {

            width: 100%;
            height: 100%;

            display: grid;
            place-items: center;

            font-size: 43px;
        }

        .animal.approach {

            animation:
                animalApproach
                1s
                cubic-bezier(.2,.8,.2,1);
        }

        @keyframes animalApproach {

            0% {
                opacity: 0;
                transform:
                    translateX(100px)
                    scale(.5);
            }

            60% {
                opacity: 1;
                transform:
                    translateX(-12px)
                    scale(1.08);
            }

            100% {
                opacity: 1;
                transform:
                    translateX(0)
                    scale(1);
            }

        }

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

            40% {
                transform:
                    scale(1.18)
                    rotate(-6deg);
            }

            70% {
                transform:
                    scale(1.18)
                    rotate(6deg);
            }

            100% {
                transform:
                    scale(1)
                    rotate(0);
            }

        }

        .hangman-area,
        .order-area {

            width: 100%;
            margin: 20px auto;

            text-align: center;
        }

        .hangman-word {

            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            gap: 8px;

            margin:
                20px 0;
        }

        .hangman-letter {

            width: 38px;
            height: 48px;

            display: grid;
            place-items: center;

            border-bottom:
                3px solid white;

            font-size: 26px;
            font-weight: 900;
        }

        .hangman-keyboard {

            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            gap: 7px;
        }

        .hangman-key {

            width: 42px;
            height: 42px;

            border: 0;
            border-radius: 10px;

            background:
                rgba(255,255,255,.12);

            color: white;

            font-weight: 900;

            cursor: pointer;
        }

        .hangman-key:hover {
            background:
                rgba(255,255,255,.25);
        }

        .hangman-key:disabled {
            opacity: .4;
            cursor: default;
        }

        .order-list {

            display: flex;
            flex-direction: column;

            gap: 10px;

            max-width: 650px;

            margin: auto;
        }

        .order-item {

            padding: 15px;

            border-radius: 13px;

            background:
                rgba(255,255,255,.1);

            border:
                1px solid
                rgba(255,255,255,.15);

            cursor: pointer;

            font-weight: 800;
        }

        .order-item.selected {

            background:
                rgba(46,175,93,.45);

            border-color:
                #55e889;
        }

        .order-submit {

            margin-top: 15px;
        }

        @media (max-width: 600px) {

            .forest-character {
                transform:
                    scale(.85);
                transform-origin:
                    bottom center;
            }

            .emoji-animal {
                font-size: 75px;
            }

        }

    `;

    document.head.appendChild(style);
}


/* =========================================================
   CINEMATIC
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

        .forest {
            background-image:
                linear-gradient(
                    rgba(5,18,10,.08),
                    rgba(0,0,0,.35)
                ),
                var(--forest-image);
        }

        .cinematic-change {
            animation:
                cinematicSceneChange
                1.1s ease;
        }

        @keyframes cinematicSceneChange {

            0% {
                filter:
                    brightness(.65)
                    blur(3px);
                transform:
                    scale(1.04);
            }

            100% {
                filter:
                    brightness(1)
                    blur(0);
                transform:
                    scale(1);
            }

        }

        .answer-text {
            color: #ffffff !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
        }

        .answer-button {
            color: #ffffff !important;
            pointer-events: auto !important;
            z-index: 500;
        }

        .answer-button .answer-letter {
            color: white !important;
        }

        .question-panel {
            position: relative;
            z-index: 400;
        }

        .answers {
            position: relative;
            z-index: 500;
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

            forest.style.transform = "";

        }
    );
}


/* =========================================================
   ÎNCARCĂ QUIZURI
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

        raspunsOrdine = [];

        hangmanWord = "";
        hangmanGuessed = [];
        hangmanErrors = 0;

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
            intrebare.text ||
            "Întrebarea nu este disponibilă";
    }

    const animalData =
        obtineAnimal(
            intrebare.animal
        );

    seteazaAnimalReal(
        animalData
    );

    const tip =
        obtineTipIntrebare(
            intrebare
        );

    const answers =
        document.querySelector(
            ".answers"
        );

    if (answers) {

        answers.style.display =
            "grid";

    }

    if (esteTipOrdine(tip)) {

        afiseazaIntrebareOrdine(
            intrebare
        );

    } else if (
        esteTipSpanzuratoare(tip)
    ) {

        afiseazaIntrebareSpanzuratoare(
            intrebare
        );

    } else {

        afiseazaIntrebareAlegere(
            intrebare
        );

    }

    if (
        intrebareCurenta > 0
    ) {

        schimbaFundalPadure();

        miscaPersonaj();

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
   ALEGERE RĂSPUNS
========================================================= */

function afiseazaIntrebareAlegere(
    intrebare
) {

    const answers =
        document.querySelector(
            ".answers"
        );

    if (!answers) {
        return;
    }

    answers.style.display =
        "grid";

    answers.innerHTML = `
        ${creeazaButonRaspuns(
            "A",
            intrebare.raspuns_a
        )}

        ${creeazaButonRaspuns(
            "B",
            intrebare.raspuns_b
        )}

        ${creeazaButonRaspuns(
            "C",
            intrebare.raspuns_c
        )}

        ${creeazaButonRaspuns(
            "D",
            intrebare.raspuns_d
        )}
    `;

    raspunsOrdine = [];

    const message =
        element(
            "questionMessage"
        );

    if (message) {

        message.textContent = "";

        message.className =
            "question-message";
    }
}


function creeazaButonRaspuns(
    litera,
    text
) {

    return `
        <button
            type="button"
            class="answer-button answer-${litera.toLowerCase()}"
            data-answer="${litera}"
        >

            <span
                class="answer-letter"
            >
                ${litera}
            </span>

            <span
                class="answer-text"
            >
                ${escapeHTML(
                    text === null ||
                    text === undefined
                        ? ""
                        : text
                )}
            </span>

        </button>
    `;
}


/* =========================================================
   ORDINE
========================================================= */

function afiseazaIntrebareOrdine(
    intrebare
) {

    const answers =
        document.querySelector(
            ".answers"
        );

    if (!answers) {
        return;
    }

    answers.style.display =
        "block";

    let valori = [];

    if (
        Array.isArray(
            intrebare.optiuni
        )
    ) {

        valori =
            intrebare.optiuni;

    } else if (
        Array.isArray(
            intrebare.elemente
        )
    ) {

        valori =
            intrebare.elemente;

    } else {

        const json =
            intrebare.optiuni_json ||
            intrebare.elemente_json;

        if (json) {

            try {

                valori =
                    typeof json === "string"
                        ? JSON.parse(json)
                        : json;

            } catch (e) {

                console.error(
                    "Opțiuni ordine invalide",
                    e
                );

            }
        }
    }

    if (
        valori.length === 0
    ) {

        valori = [
            intrebare.raspuns_a,
            intrebare.raspuns_b,
            intrebare.raspuns_c,
            intrebare.raspuns_d
        ].filter(Boolean);
    }

    valori =
        valori.map(
            (valoare, index) => {

                if (
                    typeof valoare ===
                    "object"
                ) {

                    return (
                        valoare.text ||
                        valoare.textul ||
                        valoare.valoare ||
                        ""
                    );

                }

                return String(valoare);
            }
        )
        .filter(Boolean);

    valori =
        amestecaArray(
            [...valori]
        );

    raspunsOrdine = [];

    answers.innerHTML = `

        <div class="order-area">

            <p>
                🔢 Alege elementele în ordinea corectă.
            </p>

            <div class="order-list">

                ${valori.map(
                    (valoare, index) => {

                        return `
                            <div
                                class="order-item"
                                data-order-index="${index}"
                            >
                                ${escapeHTML(
                                    valoare
                                )}
                            </div>
                        `;

                    }
                ).join("")}

            </div>

            <button
                type="button"
                class="game-button primary order-submit"
                id="orderSubmitButton"
            >
                ✅ Verifică ordinea
            </button>

        </div>
    `;

    document
        .querySelectorAll(
            ".order-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    if (
                        raspunsBlocat
                    ) {
                        return;
                    }

                    const index =
                        Number(
                            item.dataset.orderIndex
                        );

                    if (
                        item.classList.contains(
                            "selected"
                        )
                    ) {

                        item.classList.remove(
                            "selected"
                        );

                        raspunsOrdine =
                            raspunsOrdine.filter(
                                value =>
                                    value !== index
                            );

                        return;
                    }

                    item.classList.add(
                        "selected"
                    );

                    raspunsOrdine.push(
                        index
                    );

                }
            );

        });

    const submit =
        element(
            "orderSubmitButton"
        );

    if (submit) {

        submit.addEventListener(
            "click",
            () => {

                proceseazaOrdine(
                    intrebare,
                    valori
                );

            }
        );

    }
}


/* =========================================================
   VERIFICĂ ORDINE
========================================================= */

async function proceseazaOrdine(
    intrebare,
    valori
) {

    if (raspunsBlocat) {
        return;
    }

    raspunsBlocat = true;

    const ordineCorecta =
        obtineOrdineCorecta(
            intrebare,
            valori
        );

    const selectie =
        raspunsOrdine.map(
            index =>
                valori[index]
        );

    const corect =
        JSON.stringify(
            selectie
        ) ===
        JSON.stringify(
            ordineCorecta
        );

    if (corect) {

        raspunsuriCorecte++;

        scor +=
            QUIZ_CONFIG.pointsOrder;

        afiseazaMesaj(
            `🎉 Perfect! +${QUIZ_CONFIG.pointsOrder} puncte`,
            true
        );

        afiseazaSucces();

        actualizeazaStatistici();

        await asteapta(
            QUIZ_CONFIG.delayAfterCorrect
        );

        urmatoareaIntrebare();

        return;
    }

    raspunsuriGresite++;

    vieti--;

    afiseazaMesaj(
        "❌ Ordinea nu este corectă.",
        false
    );

    afiseazaAtac();

    actualizeazaStatistici();

    await asteapta(
        QUIZ_CONFIG.delayAfterWrong
    );

    if (vieti <= 0) {

        afiseazaRezultat();

        return;
    }

    raspunsBlocat = false;
}


/* =========================================================
   ORDINE CORECTĂ
========================================================= */

function obtineOrdineCorecta(
    intrebare,
    valoriAfisate
) {

    let ordine =
        intrebare.ordine_corecta ||
        intrebare.ordineCorecta ||
        intrebare.correct_order ||
        intrebare.ordine;

    if (
        Array.isArray(ordine)
    ) {

        return ordine.map(
            item => {

                if (
                    typeof item ===
                    "object"
                ) {

                    return (
                        item.text ||
                        item.valoare ||
                        ""
                    );
                }

                return String(item);
            }
        );
    }

    if (
        typeof ordine === "string"
    ) {

        try {

            const parsed =
                JSON.parse(ordine);

            if (
                Array.isArray(parsed)
            ) {

                return parsed.map(
                    item =>
                        String(item)
                );
            }

        } catch (e) {

            return ordine
                .split("|")
                .map(
                    item =>
                        item.trim()
                )
                .filter(Boolean);

        }
    }

    /*
       Dacă nu există o coloană separată
       pentru ordine, presupunem că A/B/C/D
       sunt în ordinea corectă.
    */

    return [
        intrebare.raspuns_a,
        intrebare.raspuns_b,
        intrebare.raspuns_c,
        intrebare.raspuns_d
    ]
    .filter(Boolean)
    .map(
        item =>
            String(item)
    );
}


/* =========================================================
   SPÂNZURĂTOARE
========================================================= */

function afiseazaIntrebareSpanzuratoare(
    intrebare
) {

    const answers =
        document.querySelector(
            ".answers"
        );

    if (!answers) {
        return;
    }

    answers.style.display =
        "block";

    let cuvant =
        intrebare.cuvant ||
        intrebare.cuvant_corect ||
        intrebare.raspuns_corect ||
        intrebare.raspunsCorect ||
        intrebare.raspuns_a ||
        "";

    /*
       Dacă răspunsul corect este doar o literă,
       încercăm să luăm cuvântul din alt câmp.
    */

    if (
        String(cuvant).length <= 1
    ) {

        cuvant =
            intrebare.word ||
            intrebare.cuvantul ||
            intrebare.raspuns ||
            intrebare.raspuns_a ||
            "";

    }

    hangmanWord =
        normalizeazaText(
            cuvant
        );

    hangmanGuessed = [];

    hangmanErrors = 0;

    if (!hangmanWord) {

        answers.innerHTML = `
            <div class="quiz-loading error">
                ❌ Nu există un cuvânt pentru spânzurătoare.
            </div>
        `;

        return;
    }

    construiesteSpanzuratoare();
}


/* =========================================================
   CONSTRUIEȘTE SPÂNZURĂTOARE
========================================================= */

function construiesteSpanzuratoare() {

    const answers =
        document.querySelector(
            ".answers"
        );

    if (!answers) {
        return;
    }

    const litere =
        "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ";

    const afisare =
        hangmanWord
            .split("")
            .map(
                litera => {

                    if (
                        litera === " "
                    ) {
                        return `
                            <span
                                class="hangman-letter"
                                style="
                                    border-bottom:0;
                                    width:18px;
                                "
                            >
                            </span>
                        `;
                    }

                    return `
                        <span
                            class="hangman-letter"
                        >
                            ${
                                hangmanGuessed.includes(
                                    litera
                                )
                                    ? litera
                                    : ""
                            }
                        </span>
                    `;
                }
            )
            .join("");

    answers.innerHTML = `

        <div class="hangman-area">

            <div
                class="hangman-word"
            >
                ${afisare}
            </div>

            <p>
                ❌ Greșeli:
                <strong>
                    ${hangmanErrors}
                </strong>
                / 6
            </p>

            <div
                class="hangman-keyboard"
            >

                ${litere
                    .split("")
                    .map(
                        litera => {

                            const disabled =
                                hangmanGuessed.includes(
                                    litera
                                );

                            return `
                                <button
                                    type="button"
                                    class="hangman-key"
                                    data-letter="${litera}"
                                    ${disabled ? "disabled" : ""}
                                >
                                    ${litera}
                                </button>
                            `;

                        }
                    )
                    .join("")}

            </div>

        </div>
    `;

    document
        .querySelectorAll(
            ".hangman-key"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    verificaLiteraSpanzuratoare(
                        button.dataset.letter
                    );

                }
            );

        });
}


/* =========================================================
   LITERĂ SPÂNZURĂTOARE
========================================================= */

async function verificaLiteraSpanzuratoare(
    litera
) {

    if (raspunsBlocat) {
        return;
    }

    const l =
        normalizeazaText(
            litera
        );

    if (
        hangmanGuessed.includes(l)
    ) {
        return;
    }

    hangmanGuessed.push(l);

    if (
        hangmanWord.includes(l)
    ) {

        construiesteSpanzuratoare();

        const terminat =
            hangmanWord
                .split("")
                .every(
                    caracter => {

                        return (
                            caracter === " " ||
                            hangmanGuessed.includes(
                                caracter
                            )
                        );

                    }
                );

        if (terminat) {

            raspunsBlocat = true;

            raspunsuriCorecte++;

            scor +=
                QUIZ_CONFIG.pointsHangman;

            afiseazaMesaj(
                `🎉 Ai găsit cuvântul! +${QUIZ_CONFIG.pointsHangman} puncte`,
                true
            );

            afiseazaSucces();

            actualizeazaStatistici();

            await asteapta(
                QUIZ_CONFIG.delayAfterCorrect
            );

            urmatoareaIntrebare();
        }

        return;
    }

    hangmanErrors++;

    vieti--;

    construiesteSpanzuratoare();

    afiseazaAtac();

    actualizeazaStatistici();

    if (
        hangmanErrors >= 6 ||
        vieti <= 0
    ) {

        raspunsBlocat = true;

        raspunsuriGresite++;

        await asteapta(
            QUIZ_CONFIG.delayAfterWrong
        );

        afiseazaRezultat();
    }
}


/* =========================================================
   NORMALIZEAZĂ TEXT
========================================================= */

function normalizeazaText(text) {

    return String(
        text || ""
    )
    .trim()
    .toUpperCase();
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
        "9%",
        "21%",
        "34%",
        "48%",
        "62%",
        "75%",
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
   RĂSPUNS NORMAL
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

    const tip =
        obtineTipIntrebare(
            intrebare
        );

    if (
        esteTipOrdine(tip) ||
        esteTipSpanzuratoare(tip)
    ) {
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
            intrebare.correct_answer ||
            intrebare.raspuns ||
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

        afiseazaMesaj(
            `🎉 Răspuns corect! +${QUIZ_CONFIG.pointsCorrect} puncte`,
            true
        );

        if (butonCorect) {

            butonCorect.classList.add(
                "correct"
            );

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

        const bubble =
            element(
                "animalBubble"
            );

        if (bubble) {

            bubble.textContent =
                "🎉 Foarte bine!";

        }

        afiseazaSucces();

        actualizeazaStatistici();

        await asteapta(
            QUIZ_CONFIG.delayAfterCorrect
        );

        urmatoareaIntrebare();

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

    afiseazaMesaj(
        "❌ Răspuns greșit!",
        false
    );

    const bubble =
        element(
            "animalBubble"
        );

    if (bubble) {

        bubble.textContent =
            vieti > 0
                ? "😯 Ai grijă!"
                : "💔 Aventura s-a încheiat!";

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

    if (vieti <= 0) {

        afiseazaRezultat();

        return;
    }

    urmatoareaIntrebare();
}


/* =========================================================
   URMĂTOAREA ÎNTREBARE
========================================================= */

function urmatoareaIntrebare() {

    intrebareCurenta++;

    if (
        intrebareCurenta >=
        intrebari.length
    ) {

        afiseazaRezultat();

        return;
    }

    afiseazaIntrebarea();
}


/* =========================================================
   MESAJ
========================================================= */

function afiseazaMesaj(
    text,
    succes
) {

    const message =
        element(
            "questionMessage"
        );

    if (!message) {
        return;
    }

    message.textContent =
        text;

    message.className =
        succes
            ? "question-message success"
            : "question-message error";
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
   AMESTECARE
========================================================= */

function amestecaArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];
    }

    return array;
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
            "Ai rămas fără vieți. Poți încerca din nou.";

    }

    if (message) {

        message.textContent =
            `Ai obținut ${scor} puncte și ai răspuns corect la ${raspunsuriCorecte} întrebări.`;

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

    raspunsOrdine = [];

    hangmanWord = "";

    hangmanGuessed = [];

    hangmanErrors = 0;

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

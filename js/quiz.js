/* =========================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   CINEMATIC REALISTIC VERSION
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
   IMAGINI INTERNET
========================================================= */

const IMAGINI = {

    forest: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=85",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=85",
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=85"
    ],

    wolf:
        "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=900&q=90",

    fox:
        "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=900&q=90",

    bear:
        "https://images.unsplash.com/photo-1568162603664-fcd658421851?auto=format&fit=crop&w=900&q=90",

    deer:
        "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=90",

    rabbit:
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=90",

    owl:
        "https://images.unsplash.com/photo-1553264701-d138db4fd5d0?auto=format&fit=crop&w=900&q=90",

    character:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85"
};

/* =========================================================
   ANIMALE
========================================================= */

const ANIMALE = {

    lup: {
        name: "Lup",
        image: IMAGINI.wolf
    },

    vulpe: {
        name: "Vulpe",
        image: IMAGINI.fox
    },

    urs: {
        name: "Urs",
        image: IMAGINI.bear
    },

    iepure: {
        name: "Iepure",
        image: IMAGINI.rabbit
    },

    caprioara: {
        name: "Căprioară",
        image: IMAGINI.deer
    },

    "căprioară": {
        name: "Căprioară",
        image: IMAGINI.deer
    },

    cerb: {
        name: "Cerb",
        image: IMAGINI.deer
    },

    bufnita: {
        name: "Bufniță",
        image: IMAGINI.owl
    },

    "bufniță": {
        name: "Bufniță",
        image: IMAGINI.owl
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
   PRELOAD IMAGINI
========================================================= */

function preloadImages() {

    Object.values(IMAGINI).forEach(src => {

        if (Array.isArray(src)) {

            src.forEach(url => {

                const img =
                    new Image();

                img.src = url;

            });

        } else {

            const img =
                new Image();

            img.src = src;

        }

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
   SETARE ANIMAL REAL
========================================================= */

function seteazaAnimalReal(animalData) {

    const animal =
        element("animal");

    const questionAnimal =
        element("questionAnimal");

    if (!animal) {
        return;
    }

    animal.innerHTML = "";

    const img =
        document.createElement("img");

    img.src =
        animalData.image;

    img.alt =
        animalData.name;

    img.className =
        "real-animal-image";

    img.onerror = () => {

        animal.innerHTML =
            `<div class="animal-fallback">
                🐺
            </div>`;

    };

    animal.appendChild(img);

    if (questionAnimal) {

        questionAnimal.innerHTML =
            `<img
                src="${escapeHTML(animalData.image)}"
                alt="${escapeHTML(animalData.name)}"
            >`;

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

    if (
        player.querySelector(
            ".real-player-image"
        )
    ) {
        return;
    }

    const old =
        player.querySelector(
            ".player-character"
        );

    if (old) {
        old.remove();
    }

    const img =
        document.createElement("img");

    img.className =
        "real-player-image";

    img.src =
        IMAGINI.character;

    img.alt =
        "Personaj";

    img.onerror = () => {

        img.style.display =
            "none";

        player.insertAdjacentHTML(
            "afterbegin",
            `<div class="player-fallback">
                🧙
            </div>`
        );

    };

    player.insertBefore(
        img,
        player.firstChild
    );
}

/* =========================================================
   ANIMAȚII
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
                    rgba(5,18,10,.12),
                    rgba(0,0,0,.38)
                ),
                var(--forest-image);
        }

        .cinematic-change {
            animation:
                cinematicSceneChange
                1.2s ease;
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

        .real-animal-image {

            width: 100%;
            height: 100%;

            object-fit: cover;

            border-radius: 50%;

            display: block;

            box-shadow:
                0 20px 45px
                rgba(0,0,0,.45);

            transform:
                translateZ(20px);
        }

        .animal {

            overflow: hidden;

            border-radius: 50%;

            background:
                rgba(0,0,0,.18);

            border:
                4px solid
                rgba(255,255,255,.75);

            box-shadow:
                0 15px 50px
                rgba(0,0,0,.5);
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
                    scale(.65);
                opacity: 0;
            }

            60% {
                transform:
                    translateX(-15px)
                    scale(1.08);
                opacity: 1;
            }

            100% {
                transform:
                    translateX(0)
                    scale(1);
                opacity: 1;
            }
        }

        .player {

            transition:
                left 1s
                cubic-bezier(.2,.8,.2,1);

            z-index: 30;
        }

        .real-player-image {

            width:
                clamp(70px, 9vw, 125px);

            height:
                clamp(100px, 14vw, 175px);

            object-fit: cover;

            object-position:
                center top;

            border-radius:
                45% 45% 20% 20%;

            filter:
                drop-shadow(
                    0 15px 15px
                    rgba(0,0,0,.5)
                );
        }

        .player.walking {

            animation:
                cinematicWalk
                1s
                ease;
        }

        @keyframes cinematicWalk {

            0% {
                transform:
                    translateY(0)
                    rotate(0);
            }

            20% {
                transform:
                    translateY(-8px)
                    rotate(-3deg);
            }

            40% {
                transform:
                    translateY(0)
                    rotate(3deg);
            }

            60% {
                transform:
                    translateY(-7px)
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

        .question-panel {

            backdrop-filter:
                blur(14px);

            -webkit-backdrop-filter:
                blur(14px);

            background:
                rgba(10,20,15,.78);

            box-shadow:
                0 25px 70px
                rgba(0,0,0,.45);
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
                    translateX(-50%)
                    translateY(45px)
                    scale(.94);

                filter:
                    blur(8px);
            }

            to {

                opacity: 1;

                transform:
                    translateX(-50%)
                    translateY(0)
                    scale(1);

                filter:
                    blur(0);
            }
        }

        .answer-button {

            position: relative;

            overflow: hidden;

            cursor: pointer;

            touch-action: manipulation;

            -webkit-tap-highlight-color:
                transparent;
        }

        .answer-button::before {

            content: "";

            position: absolute;

            inset: 0;

            background:
                linear-gradient(
                    110deg,
                    transparent 20%,
                    rgba(255,255,255,.22) 50%,
                    transparent 80%
                );

            transform:
                translateX(-120%);

            transition:
                transform .55s ease;

            pointer-events: none;
        }

        .answer-button:hover::before {

            transform:
                translateX(120%);
        }

        .answer-button.correct {

            background:
                linear-gradient(
                    135deg,
                    #16803c,
                    #2ecc71
                ) !important;

            color: white !important;

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

            color: white !important;

            animation:
                wrongAnswer
                .45s ease;
        }

        @keyframes correctAnswer {

            50% {
                transform:
                    scale(1.04)
                    translateZ(15px);
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

        .cinematic-letterbox {

            position: fixed;

            left: 0;
            right: 0;

            height: 7vh;

            background:
                #000;

            z-index: 9999;

            pointer-events: none;

            transition:
                transform .5s ease;
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

        .animal-bubble {

            backdrop-filter:
                blur(8px);

            -webkit-backdrop-filter:
                blur(8px);
        }

        .answer-text {

            position: relative;

            z-index: 2;

            color: inherit !important;

            opacity: 1 !important;

            visibility: visible !important;
        }

        .answers {

            position: relative;

            z-index: 100;
        }

        .answer-button {

            z-index: 101;

            pointer-events: auto !important;
        }

        .answer-button:disabled {

            pointer-events: none;
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
            "approach"
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
        "inline-block";

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

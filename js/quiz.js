/* =========================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   REAL FOREST / HUMAN CHARACTER / ANIMALS
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

    walkDuration: 1300

};


/* =========================================================
   IMAGINI REALE
========================================================= */

const IMAGINI = {

    forest: [

        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=90",

        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=90",

        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2400&q=90",

        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=90"

    ],

    wolf:
        "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=1000&q=90",

    fox:
        "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1000&q=90",

    bear:
        "https://images.unsplash.com/photo-1568162603664-fcd658421851?auto=format&fit=crop&w=1000&q=90",

    deer:
        "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=90",

    rabbit:
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1000&q=90",

    owl:
        "https://images.unsplash.com/photo-1553264701-d138db4fd5d0?auto=format&fit=crop&w=1000&q=90"

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
    },

    owl: {
        name: "Bufniță",
        image: IMAGINI.owl
    },

    deer: {
        name: "Căprioară",
        image: IMAGINI.deer
    },

    wolf: {
        name: "Lup",
        image: IMAGINI.wolf
    },

    fox: {
        name: "Vulpe",
        image: IMAGINI.fox
    },

    bear: {
        name: "Urs",
        image: IMAGINI.bear
    },

    rabbit: {
        name: "Iepure",
        image: IMAGINI.rabbit
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
   PRELOAD
========================================================= */

function preloadImages() {

    Object.values(IMAGINI)
        .forEach(src => {

            if (Array.isArray(src)) {

                src.forEach(url => {

                    const img =
                        new Image();

                    img.src =
                        url;

                });

            } else {

                const img =
                    new Image();

                img.src =
                    src;

            }

        });

}


/* =========================================================
   FUNDAL
========================================================= */

function schimbaFundalPadure() {

    const forest =
        document.querySelector(
            ".forest"
        );

    if (!forest) {
        return;
    }

    const imagini =
        IMAGINI.forest;

    scenaImagineIndex =

        (
            scenaImagineIndex + 1
        ) %

        imagini.length;

    const url =
        imagini[
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
   SETARE ANIMAL
========================================================= */

function seteazaAnimalReal(
    animalData
) {

    const animal =
        element("animal");

    const questionAnimal =
        element("questionAnimal");

    const animalName =
        element("animalName");

    const questionAnimalName =
        element(
            "questionAnimalName"
        );

    if (!animal) {
        return;
    }


    const container =
        animal.querySelector(
            ".animal-image-container"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    const img =
        document.createElement(
            "img"
        );

    img.src =
        animalData.image;

    img.alt =
        animalData.name;


    img.loading =
        "eager";


    img.onerror = () => {

        container.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:grid;
                place-items:center;
                font-size:60px;
                background:#18251b;
            ">
                🐺
            </div>
        `;

    };


    container.appendChild(
        img
    );


    if (questionAnimal) {

        questionAnimal.innerHTML = `

            <img
                src="${escapeHTML(
                    animalData.image
                )}"
                alt="${escapeHTML(
                    animalData.name
                )}"
            >

        `;

    }


    if (animalName) {

        animalName.textContent =
            animalData.name;

    }


    if (questionAnimalName) {

        questionAnimalName.textContent =
            animalData.name;

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
        element("player");

    if (!player) {
        return;
    }

    player.style.left =
        "10%";

}


/* =========================================================
   ANIMAȚII CINEMATICE
========================================================= */

function activeazaAnimatiiCinematice() {

    if (
        element(
            "quizCinematicStyles"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );

    style.id =
        "quizCinematicStyles";


    style.textContent = `

        .cinematic-change {

            animation:
                cinematicSceneChange
                1.1s
                ease;

        }

        @keyframes cinematicSceneChange {

            0% {

                opacity: .55;

                filter:
                    blur(4px)
                    brightness(.7);

                transform:
                    scale(1.04);

            }

            55% {

                opacity: .9;

                filter:
                    blur(1px)
                    brightness(.9);

                transform:
                    scale(1.015);

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


        .question-enter {

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

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   PARALLAX
========================================================= */

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
                window.innerWidth < 800
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

                        <div
                            class="quiz-card"
                        >

                            <div
                                class="quiz-card-icon"
                            >
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
                                        <div
                                            class="quiz-category"
                                        >
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

            <div
                class="quiz-loading error"
            >

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

async function pornesteQuiz(
    quizId
) {

    const id =
        Number(quizId);


    const quiz =
        quizuri.find(
            q =>
                Number(q.id) ===
                id
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

                .from(
                    "intrebari_quiz"
                )

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
            intrebari.length ===
            0
        ) {

            alert(
                "Acest quiz nu are întrebări."
            );

            return;

        }


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

        activeazaAnimatiiCinematice();

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


    /* animal */

    const animalData =
        obtineAnimal(
            intrebare.animal
        );


    seteazaAnimalReal(
        animalData
    );


    /* răspunsuri */

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


    /* animal */

    const animal =
        element(
            "animal"
        );


    if (animal) {

        animal.classList.remove(
            "approach"
        );

        void animal.offsetWidth;

        animal.classList.add(
            "approach"
        );

    }


    /* schimbăm pădurea */

    schimbaFundalPadure();


    /* personaj */

    miscaPersonaj();


    /* panou */

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
   PERSONAJUL MERGE PRIN PĂDURE
========================================================= */

function miscaPersonaj() {

    const player =
        element(
            "player"
        );


    if (!player) {
        return;
    }


    const pozitii = [

        "10%",

        "22%",

        "36%",

        "50%",

        "64%",

        "76%",

        "88%"

    ];


    const index =
        Math.min(
            intrebareCurenta,
            pozitii.length - 1
        );


    const pozitie =
        pozitii[index];


    player.classList.remove(
        "walking"
    );


    void player.offsetWidth;


    player.classList.add(
        "walking"
    );


    player.style.left =
        pozitie;


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
            "❌ Răspuns greșit!";

        message.className =
            "question-message error";

    }


    if (bubble) {

        bubble.textContent =

            vieti > 0

                ? "😯 Ai grijă! Încearcă să fii atent."

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


    /* =====================================================
       VICTORIE
    ===================================================== */

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


    /* =====================================================
       GAME OVER
    ===================================================== */

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
            "Ai rămas fără vieți.";

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


/* =========================================================
   EVENIMENTE
========================================================= */

function initializeazaQuiz() {

    activeazaAnimatiiCinematice();

    activeazaParallax();

    preloadImages();


    document.addEventListener(
        "click",
        event => {


            /* răspuns */

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


            /* start quiz */

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


            /* restart */

            const restartButton =
                event.target.closest(
                    "#restartQuizButton"
                );


            if (restartButton) {

                event.preventDefault();

                restartQuiz();

                return;

            }


            /* alt quiz */

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

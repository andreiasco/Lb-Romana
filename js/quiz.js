/* =====================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE - VERSIUNE ANIMATĂ 3D
===================================================== */

"use strict";


/* =====================================================
   CONFIGURARE
===================================================== */

const QUIZ_CONFIG = {

    lives: 3,

    pointsCorrect: 100,

    delayAfterCorrect: 1500,

    delayAfterWrong: 1500,

    walkDuration: 1000

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

let animatieInCurs = false;


/* =====================================================
   POZIȚII PERSONAJ
===================================================== */

const POZITII_PERSONAJ = [

    "12%",

    "24%",

    "38%",

    "52%",

    "66%",

    "78%",

    "86%"

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
   STILURI 3D INJECTATE
===================================================== */

function activeazaAnimatii3D() {

    if (document.getElementById("quiz3DStyles")) {

        return;

    }

    const style = document.createElement("style");

    style.id = "quiz3DStyles";

    style.textContent = `

        .forest {

            perspective: 1000px;

            transform-style: preserve-3d;

            transition:
                transform 1s cubic-bezier(.2,.8,.2,1),
                filter .6s ease;

        }


        .forest.three-d-move {

            animation:
                scene3DMove 1.2s ease;

        }


        @keyframes scene3DMove {

            0% {

                transform:
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1);

            }

            30% {

                transform:
                    perspective(1000px)
                    rotateX(2deg)
                    rotateY(-1deg)
                    scale(1.025);

            }

            60% {

                transform:
                    perspective(1000px)
                    rotateX(-1deg)
                    rotateY(1deg)
                    scale(1.035);

            }

            100% {

                transform:
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1);

            }

        }


        .player {

            transform-style: preserve-3d;

            will-change:
                left,
                transform;

        }


        .player.walking {

            animation:
                playerTravel 1s
                cubic-bezier(.2,.8,.2,1);

        }


        @keyframes playerTravel {

            0% {

                transform:
                    translateY(0)
                    rotateY(0deg)
                    scale(1);

            }

            20% {

                transform:
                    translateY(-10px)
                    rotateY(-10deg)
                    scale(1.03);

            }

            45% {

                transform:
                    translateY(0)
                    rotateY(8deg)
                    scale(1.05);

            }

            70% {

                transform:
                    translateY(-8px)
                    rotateY(-6deg)
                    scale(1.03);

            }

            100% {

                transform:
                    translateY(0)
                    rotateY(0deg)
                    scale(1);

            }

        }


        .player-character {

            transform-style:
                preserve-3d;

            backface-visibility:
                hidden;

        }


        .animal {

            transform-style:
                preserve-3d;

            will-change:
                transform;

        }


        .animal.looking {

            animation:
                animalLook .8s ease;

        }


        @keyframes animalLook {

            0% {

                transform:
                    translateY(0)
                    rotateY(0deg)
                    scale(1);

            }

            50% {

                transform:
                    translateY(-10px)
                    rotateY(-18deg)
                    scale(1.08);

            }

            100% {

                transform:
                    translateY(0)
                    rotateY(0deg)
                    scale(1);

            }

        }


        .animal.happy {

            animation:
                animalHappy .9s ease;

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
                    translateY(-18px)
                    rotate(-8deg)
                    scale(1.15);

            }

            50% {

                transform:
                    translateY(-5px)
                    rotate(8deg)
                    scale(1.1);

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

            animation:
                animalSad .8s ease;

        }


        @keyframes animalSad {

            0% {

                transform:
                    translateY(0)
                    rotate(0);

            }

            40% {

                transform:
                    translateY(8px)
                    rotate(-12deg);

            }

            70% {

                transform:
                    translateY(4px)
                    rotate(12deg);

            }

            100% {

                transform:
                    translateY(0)
                    rotate(0);

            }

        }


        .forest-background {

            transform-style:
                preserve-3d;

        }


        .mountains {

            transform:
                translateX(-50%)
                translateZ(-80px)
                scale(1.1);

            transform-style:
                preserve-3d;

        }


        .background-trees {

            transform:
                translateZ(-30px);

            transform-style:
                preserve-3d;

        }


        .ground {

            transform:
                translateZ(10px);

        }


        .path {

            transform-style:
                preserve-3d;

        }


        .cloud {

            will-change:
                transform;

        }


        .sun {

            transform-style:
                preserve-3d;

        }


        .question-panel {

            transform-style:
                preserve-3d;

            transition:
                transform .5s ease,
                box-shadow .5s ease;

        }


        .question-panel.question-enter {

            animation:
                questionEnter .7s
                cubic-bezier(.2,.8,.2,1);

        }


        @keyframes questionEnter {

            0% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(25px)
                    rotateX(8deg)
                    scale(.96);

            }

            100% {

                opacity: 1;

                transform:
                    translateX(-50%)
                    translateY(0)
                    rotateX(0)
                    scale(1);

            }

        }


        .answer-button {

            transform-style:
                preserve-3d;

        }


        .answer-button:hover:not(:disabled) {

            transform:
                translateY(-5px)
                rotateX(2deg)
                scale(1.015);

        }


        .cinematic-flash {

            position:
                absolute;

            inset: 0;

            z-index: 100;

            pointer-events: none;

            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.9),
                    rgba(255,255,255,0)
                );

            opacity: 0;

        }


        .cinematic-flash.active {

            animation:
                cinematicFlash .55s ease;

        }


        @keyframes cinematicFlash {

            0% {

                opacity: 0;

            }

            25% {

                opacity: .8;

            }

            100% {

                opacity: 0;

            }

        }


        .screen-shake {

            animation:
                screenShake .45s ease;

        }


        @keyframes screenShake {

            0%,
            100% {

                transform:
                    translateX(0);

            }

            20% {

                transform:
                    translateX(-7px);

            }

            40% {

                transform:
                    translateX(7px);

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
   EFECT 3D
===================================================== */

function pregatesteScena3D() {

    activeazaAnimatii3D();

    const forest = document.querySelector(".forest");

    if (!forest) {

        return;

    }

    if (
        !forest.querySelector(".cinematic-flash")
    ) {

        const flash =
            document.createElement("div");

        flash.className =
            "cinematic-flash";

        forest.appendChild(flash);

    }

}


/* =====================================================
   FLASH CINEMATIC
===================================================== */

function flashCinematic() {

    const flash =
        document.querySelector(
            ".cinematic-flash"
        );

    if (!flash) {

        return;

    }

    flash.classList.remove("active");

    void flash.offsetWidth;

    flash.classList.add("active");

}


/* =====================================================
   MIȘCARE SCENĂ
===================================================== */

function animeazaScena() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {

        return;

    }

    forest.classList.remove(
        "three-d-move"
    );

    void forest.offsetWidth;

    forest.classList.add(
        "three-d-move"
    );

    setTimeout(() => {

        forest.classList.remove(
            "three-d-move"
        );

    }, 1300);

}


/* =====================================================
   MIȘCARE PERSONAJ
===================================================== */

function miscaPersonaj() {

    const player =
        document.querySelector(".player");

    if (!player) {

        return;

    }

    const pozitie =
        POZITII_PERSONAJ[
            Math.min(
                intrebareCurenta,
                POZITII_PERSONAJ.length - 1
            )
        ];

    player.classList.remove(
        "walking"
    );

    void player.offsetWidth;

    player.style.left = pozitie;

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
   ANIMAȚIE ANIMAL
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

    }, 900);

}


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

    }, 1000);

}


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
   PARALLAX MOUSE
===================================================== */

function activeazaParallax() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {

        return;

    }

    forest.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 700) {

                return;

            }

            const rect =
                forest.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width;

            const y =
                (event.clientY - rect.top)
                / rect.height;

            const rotateY =
                (x - .5) * 3;

            const rotateX =
                (.5 - y) * 2;

            forest.style.transform =
                `perspective(1000px)
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
        typeof supabaseClient ===
        "undefined" ||
        !supabaseClient
    ) {

        container.innerHTML = `

            <div
                class="quiz-loading"
                style="color:#c62828;"
            >

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


        container.innerHTML = data

            .map(quiz => `

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
                        class="
                            game-button
                            primary
                            quiz-start-button
                        "
                        data-quiz-id="${
                            escapeHTML(
                                quiz.id
                            )
                        }"
                    >

                        🌲 Pornește aventura

                    </button>

                </div>

            `)
            .join("");


        container
            .querySelectorAll(
                ".quiz-start-button"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.quizId
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

        container.innerHTML = `

            <div
                class="quiz-loading"
                style="color:#c62828;"
            >

                ❌ Nu pot încărca quizurile.

                <br><br>

                <strong>
                    ${escapeHTML(
                        error.message
                    )}
                </strong>

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


    quizSelectat =
        quiz;


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


    try {

        const {
            data,
            error
        } = await supabaseClient

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


        /* RESET */

        intrebareCurenta = 0;

        vieti =
            QUIZ_CONFIG.lives;

        scor = 0;

        raspunsuriCorecte = 0;

        raspunsuriGresite = 0;

        raspunsBlocat = false;

        animatieInCurs = false;


        /* ECRAN JOC */

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


        pregatesteScena3D();

        actualizeazaStatistici();

        afiseazaIntrebarea();

        activeazaParallax();

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

    animatieInCurs = false;


    const intrebare =
        intrebari[
            intrebareCurenta
        ];


    const numar =
        intrebareCurenta + 1;


    const total =
        intrebari.length;


    /* =================================================
       NUMĂR
    ================================================= */

    const questionNumber =
        element(
            "questionNumber"
        );

    if (questionNumber) {

        questionNumber.textContent =
            numar;

    }


    const questionTotal =
        element(
            "questionTotal"
        );

    if (questionTotal) {

        questionTotal.textContent =
            total;

    }


    /* =================================================
       ÎNTREBARE
    ================================================= */

    const questionText =
        element(
            "questionText"
        );

    if (questionText) {

        questionText.textContent =
            intrebare.intrebare || "";

    }


    /* =================================================
       ANIMAL
    ================================================= */

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


    /* =================================================
       BULA
    ================================================= */

    const animalBubble =
        element(
            "animalBubble"
        );

    if (animalBubble) {

        animalBubble.textContent =
            "Alege răspunsul corect!";

    }


    /* =================================================
       RĂSPUNSURI
       IMPORTANT:
       NU mai folosim button.textContent
    ================================================= */

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


    /* =================================================
       RESET BUTOANE
    ================================================= */

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


    /* =================================================
       MESAJ
    ================================================= */

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


    /* =================================================
       ANIMAȚIE
    ================================================= */

    if (intrebareCurenta > 0) {

        animeazaScena();

        miscaPersonaj();

        animalPrivestePersonaj();

        flashCinematic();

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

    else {

        /*
         fallback dacă HTML-ul
         nu are .answer-text
        */

        button.appendChild(
            document.createTextNode(
                text || ""
            )
        );

    }

}


/* =====================================================
   RĂSPUNS
===================================================== */

async function proceseazaRaspuns(
    raspuns
) {

    if (raspunsBlocat) {

        return;

    }


    if (animatieInCurs) {

        return;

    }


    raspunsBlocat = true;

    animatieInCurs = true;


    const intrebare =
        intrebari[
            intrebareCurenta
        ];


    if (!intrebare) {

        raspunsBlocat = false;

        animatieInCurs = false;

        return;

    }


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
        element(
            "questionMessage"
        );


    const animalBubble =
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
            450
        );


        /*
         Personajul pornește
         spre următoarea zonă
        */

        if (
            intrebareCurenta <
            intrebari.length - 1
        ) {

            miscaPersonaj();

            animeazaScena();

            flashCinematic();

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

        }

        else {

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


    /* =================================================
       GAME OVER
    ================================================= */

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

    }

    else {

        /*
         Chiar și după un răspuns
         greșit, aventura continuă.
        */

        miscaPersonaj();

        animeazaScena();

        await asteapta(
            350
        );

        afiseazaIntrebarea();

    }

}


/* =====================================================
   ZGUDUIRE SCENĂ
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

    }, 500);

}


/* =====================================================
   AȘTEAPTĂ
===================================================== */

function asteapta(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
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

        const vietiValide =
            Math.max(
                0,
                vieti
            );


        lives.textContent =

            "❤️".repeat(
                vietiValide
            )

            +

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

    }, 900);

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


    /* VICTORIE */

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
                "🌲 Excelent! Ai răspuns corect la " +
                raspunsuriCorecte +
                " întrebări.";

        }

        return;

    }


    /* GAME OVER */

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

    animatieInCurs = false;


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


    /* RĂSPUNSURI */

    const butoane =
        document.querySelectorAll(
            ".answer-button"
        );


    butoane.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                proceseazaRaspuns(
                    button.dataset.answer
                );

            }
        );

    });


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


    /* QUIZURI */

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

                <div
                    class="quiz-loading"
                    style="color:#c62828;"
                >

                    ❌ Supabase nu este încărcat.

                    <br>

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

}

else {

    initializeazaQuiz();

}

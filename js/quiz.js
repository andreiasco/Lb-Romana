/* =====================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE - VERSIUNE CORECTATĂ
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
   ANIMAȚII
===================================================== */

function activeazaAnimatii3D() {

    if (element("quiz3DStyles")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "quiz3DStyles";

    style.textContent = `

        .answer-button {
            pointer-events: auto !important;
            cursor: pointer !important;
            position: relative !important;
            z-index: 100 !important;
        }

        .answer-button .answer-text {
            display: inline-block !important;
            visibility: visible !important;
            opacity: 1 !important;
            color: inherit !important;
            position: relative !important;
            z-index: 101 !important;
        }

        #questionText {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }

        .answers {
            position: relative !important;
            z-index: 100 !important;
        }

        .question-panel {
            position: relative !important;
            z-index: 50 !important;
        }

        .player.walking {
            animation: playerWalk3D .9s ease;
        }

        @keyframes playerWalk3D {

            0% {
                transform:
                    translateY(0)
                    rotateY(0)
                    scale(1);
            }

            25% {
                transform:
                    translateY(-12px)
                    rotateY(-8deg)
                    scale(1.05);
            }

            50% {
                transform:
                    translateY(0)
                    rotateY(8deg)
                    scale(1.08);
            }

            75% {
                transform:
                    translateY(-8px)
                    rotateY(-5deg)
                    scale(1.04);
            }

            100% {
                transform:
                    translateY(0)
                    rotateY(0)
                    scale(1);
            }
        }

        .animal.happy {
            animation: animalHappy3D .8s ease;
        }

        @keyframes animalHappy3D {

            0% {
                transform:
                    translateY(0)
                    rotate(0)
                    scale(1);
            }

            30% {
                transform:
                    translateY(-15px)
                    rotate(-8deg)
                    scale(1.15);
            }

            60% {
                transform:
                    translateY(-5px)
                    rotate(8deg)
                    scale(1.1);
            }

            100% {
                transform:
                    translateY(0)
                    rotate(0)
                    scale(1);
            }
        }

        .animal.sad {
            animation: animalSad3D .7s ease;
        }

        @keyframes animalSad3D {

            0% {
                transform:
                    translateY(0)
                    rotate(0);
            }

            40% {
                transform:
                    translateY(7px)
                    rotate(-10deg);
            }

            70% {
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

        .forest.scene-move {
            animation: sceneMove3D 1s ease;
        }

        @keyframes sceneMove3D {

            0% {
                transform:
                    perspective(1000px)
                    rotateX(0)
                    rotateY(0)
                    scale(1);
            }

            40% {
                transform:
                    perspective(1000px)
                    rotateX(2deg)
                    rotateY(-2deg)
                    scale(1.025);
            }

            70% {
                transform:
                    perspective(1000px)
                    rotateX(-1deg)
                    rotateY(2deg)
                    scale(1.035);
            }

            100% {
                transform:
                    perspective(1000px)
                    rotateX(0)
                    rotateY(0)
                    scale(1);
            }
        }

        .question-panel.question-enter {
            animation: questionEnter3D .6s ease;
        }

        @keyframes questionEnter3D {

            from {
                opacity: 0;
                transform:
                    translateY(25px)
                    rotateX(8deg)
                    scale(.96);
            }

            to {
                opacity: 1;
                transform:
                    translateY(0)
                    rotateX(0)
                    scale(1);
            }
        }

        .screen-shake {
            animation: shake3D .4s ease;
        }

        @keyframes shake3D {

            0%, 100% {
                transform: translateX(0);
            }

            20% {
                transform: translateX(-8px);
            }

            40% {
                transform: translateX(8px);
            }

            60% {
                transform: translateX(-5px);
            }

            80% {
                transform: translateX(5px);
            }
        }

    `;

    document.head.appendChild(style);
}

/* =====================================================
   ANIMAȚIE SCENĂ
===================================================== */

function animeazaScena() {

    const forest =
        document.querySelector(".forest");

    if (!forest) {
        return;
    }

    forest.classList.remove("scene-move");

    void forest.offsetWidth;

    forest.classList.add("scene-move");

    setTimeout(() => {
        forest.classList.remove("scene-move");
    }, 1100);
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

    player.style.left = pozitie;

    player.classList.remove("walking");

    void player.offsetWidth;

    player.classList.add("walking");

    setTimeout(() => {
        player.classList.remove("walking");
    }, QUIZ_CONFIG.walkDuration + 100);
}

/* =====================================================
   ANIMAL
===================================================== */

function animalPrivestePersonaj() {

    const animal = element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove("looking");

    void animal.offsetWidth;

    animal.classList.add("looking");

    setTimeout(() => {
        animal.classList.remove("looking");
    }, 800);
}

function animalFericit() {

    const animal = element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove(
        "happy",
        "sad"
    );

    void animal.offsetWidth;

    animal.classList.add("happy");

    setTimeout(() => {
        animal.classList.remove("happy");
    }, 900);
}

function animalTrist() {

    const animal = element("animal");

    if (!animal) {
        return;
    }

    animal.classList.remove(
        "happy",
        "sad"
    );

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

    if (
        !forest ||
        forest.dataset.parallaxActiv
    ) {
        return;
    }

    forest.dataset.parallaxActiv = "true";

    forest.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 700) {
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
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
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

    const client =
        window.supabaseClient ||
        (
            typeof supabaseClient !== "undefined"
                ? supabaseClient
                : null
        );

    if (!client) {

        container.innerHTML = `
            <div class="quiz-loading error">
                ❌ Supabase nu este încărcat.
            </div>
        `;

        return;
    }

    try {

        const {
            data,
            error
        } =
            await client
                .from("quizuri")
                .select("*")
                .eq("activ", true)
                .order("created_at", {
                    ascending: false
                });

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {

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
                        ${escapeHTML(quiz.titlu)}
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
                ${escapeHTML(error.message)}
            </div>
        `;
    }
}

/* =====================================================
   PORNEȘTE QUIZ
===================================================== */

async function pornesteQuiz(quizId) {

    const id = quizId;

    const quiz =
        quizuri.find(
            q => String(q.id) === String(id)
        );

    if (!quiz) {

        console.error(
            "Quizul nu a fost găsit:",
            quizId,
            quizuri
        );

        return;
    }

    const client =
        window.supabaseClient ||
        (
            typeof supabaseClient !== "undefined"
                ? supabaseClient
                : null
        );

    if (!client) {

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
            await client
                .from("intrebari_quiz")
                .select("*")
                .eq("quiz_id", id)
                .order("ordine", {
                    ascending: true
                });

        if (error) {
            throw error;
        }

        console.log(
            "Întrebări primite din Supabase:",
            data
        );

        intrebari = data || [];

        if (intrebari.length === 0) {

            alert(
                "Acest quiz nu are întrebări."
            );

            return;
        }

        intrebareCurenta = 0;
        vieti = QUIZ_CONFIG.lives;
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
                quiz.titlu || "Aventura";
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
   GĂSEȘTE TEXTUL ÎNTREBĂRII
===================================================== */

function obtineTextIntrebare(intrebare) {

    return (
        intrebare.intrebare ??
        intrebare.question ??
        intrebare.intrebare_text ??
        intrebare.text ??
        intrebare.text_intrebare ??
        ""
    );
}

/* =====================================================
   GĂSEȘTE RĂSPUNSURILE
===================================================== */

function obtineRaspuns(intrebare, litera) {

    const variante = {

        A: [
            "raspuns_a",
            "raspunsA",
            "answer_a",
            "answerA",
            "varianta_a",
            "variantaA",
            "a"
        ],

        B: [
            "raspuns_b",
            "raspunsB",
            "answer_b",
            "answerB",
            "varianta_b",
            "variantaB",
            "b"
        ],

        C: [
            "raspuns_c",
            "raspunsC",
            "answer_c",
            "answerC",
            "varianta_c",
            "variantaC",
            "c"
        ],

        D: [
            "raspuns_d",
            "raspunsD",
            "answer_d",
            "answerD",
            "varianta_d",
            "variantaD",
            "d"
        ]

    };

    const chei =
        variante[litera] || [];

    for (const cheie of chei) {

        if (
            intrebare[cheie] !== null &&
            intrebare[cheie] !== undefined
        ) {
            return intrebare[cheie];
        }
    }

    return "";
}

/* =====================================================
   RĂSPUNS CORECT
===================================================== */

function obtineRaspunsCorect(intrebare) {

    return (
        intrebare.raspuns_corect ??
        intrebare.raspunsCorect ??
        intrebare.answer_correct ??
        intrebare.answerCorrect ??
        intrebare.corect ??
        intrebare.correct_answer ??
        ""
    );
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
        intrebari[intrebareCurenta];

    console.log(
        "Întrebarea curentă:",
        intrebare
    );

    /* ---------------------------------------------
       NUMĂR
    --------------------------------------------- */

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

    /* ---------------------------------------------
       TEXT ÎNTREBARE
    --------------------------------------------- */

    const textIntrebare =
        obtineTextIntrebare(
            intrebare
        );

    const questionText =
        element("questionText");

    if (questionText) {

        questionText.textContent =
            textIntrebare || "Întrebarea nu are text.";

        questionText.style.display =
            "block";

        questionText.style.visibility =
            "visible";

        questionText.style.opacity =
            "1";
    }

    /* ---------------------------------------------
       ANIMAL
    --------------------------------------------- */

    const animal =
        obtineAnimal(
            intrebare.animal
        );

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

    const bubble =
        element("animalBubble");

    if (bubble) {
        bubble.textContent =
            "Alege răspunsul corect!";
    }

    /* ---------------------------------------------
       RĂSPUNSURI
    --------------------------------------------- */

    seteazaRaspuns(
        "answerA",
        obtineRaspuns(intrebare, "A")
    );

    seteazaRaspuns(
        "answerB",
        obtineRaspuns(intrebare, "B")
    );

    seteazaRaspuns(
        "answerC",
        obtineRaspuns(intrebare, "C")
    );

    seteazaRaspuns(
        "answerD",
        obtineRaspuns(intrebare, "D")
    );

    /* ---------------------------------------------
       RESET BUTOANE
    --------------------------------------------- */

    document
        .querySelectorAll(".answer-button")
        .forEach(button => {

            button.disabled = false;

            button.style.pointerEvents =
                "auto";

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

    /* ---------------------------------------------
       MESAJ
    --------------------------------------------- */

    const message =
        element("questionMessage");

    if (message) {

        message.textContent = "";

        message.className =
            "question-message";
    }

    /* ---------------------------------------------
       ANIMAȚII
    --------------------------------------------- */

    if (intrebareCurenta > 0) {

        animeazaScena();
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

function seteazaRaspuns(id, text) {

    const button =
        element(id);

    if (!button) {
        console.error(
            "Buton inexistent:",
            id
        );

        return;
    }

    const textElement =
        button.querySelector(
            ".answer-text"
        );

    if (textElement) {

        textElement.textContent =
            text !== null &&
            text !== undefined
                ? String(text)
                : "";

        textElement.style.display =
            "inline-block";

        textElement.style.visibility =
            "visible";

        textElement.style.opacity =
            "1";
    } else {

        /*
         * Fallback:
         * dacă span-ul lipsește, punem
         * textul direct în buton.
         */

        button.textContent =
            String(text || "");
    }

    button.dataset.answer =
        button.dataset.answer ||
        id.replace("answer", "");

    button.disabled = false;

    button.style.pointerEvents =
        "auto";
}

/* =====================================================
   PROCESEAZĂ RĂSPUNS
===================================================== */

async function proceseazaRaspuns(raspuns) {

    if (raspunsBlocat) {
        return;
    }

    const intrebare =
        intrebari[intrebareCurenta];

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
            obtineRaspunsCorect(
                intrebare
            )
        )
            .trim()
            .toUpperCase();

    console.log(
        "Răspuns:",
        raspunsDat,
        "Corect:",
        raspunsCorect
    );

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
        element("questionMessage");

    const bubble =
        element("animalBubble");

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
                `🎉 Bravo! Răspuns corect! +${QUIZ_CONFIG.pointsCorrect} puncte`;

            message.className =
                "question-message success";
        }

        if (bubble) {
            bubble.textContent =
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
            "❌ Răspuns greșit!";

        message.className =
            "question-message error";
    }

    if (bubble) {

        bubble.textContent =
            vieti > 0
                ? "😯 Mai încearcă!"
                : "💔 Ai rămas fără vieți!";
    }

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
   EFECTE
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
    }, 900);
}

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
    }, 900);
}

function zguduieScena() {

    const forest =
        document.querySelector(".forest");

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
                Math.max(0, vieti)
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
                `🌲 Excelent! Ai răspuns corect la ${raspunsuriCorecte} întrebări.`;
        }

        return;
    }

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
    vieti = QUIZ_CONFIG.lives;
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
     * UN SINGUR event listener.
     * Folosim delegation pentru ca
     * butoanele sunt dinamice.
     */

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
                    answerButton.disabled ||
                    raspunsBlocat
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
                event.stopPropagation();

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

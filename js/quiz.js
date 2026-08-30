/* =====================================================
   QUIZ - AVENTURA DIN PĂDURE
===================================================== */

"use strict";


/* =====================================================
   CONFIGURARE
===================================================== */

const QUIZ_CONFIG = {

    lives: 3,

    pointsCorrect: 100,

    delayAfterCorrect: 1100,

    delayAfterWrong: 1500

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

    cerb: "🦌"

};


/* =====================================================
   VARIABILE JOC
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
   UTILITĂȚI DOM
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

    const cheie =
        String(animal)
            .trim()
            .toLowerCase();

    return ANIMALE[cheie] || animal || "🐺";

}


/* =====================================================
   ECRANE
===================================================== */

function arataEcran(idEcran) {

    const selectScreen =
        element("quizSelectScreen");

    const gameScreen =
        element("quizGameScreen");

    const resultScreen =
        element("quizResultScreen");


    if (selectScreen) {

        selectScreen.classList.add("ascuns");

    }

    if (gameScreen) {

        gameScreen.classList.add("ascuns");

    }

    if (resultScreen) {

        resultScreen.classList.add("ascuns");

    }


    const ecran =
        element(idEcran);

    if (ecran) {

        ecran.classList.remove("ascuns");

    }

}


/* =====================================================
   ÎNCARCĂ QUIZURILE
===================================================== */

async function incarcaQuizuriSite() {

    const container =
        document.getElementById("listaQuizuri");

    if (!container) {
        console.error("NU EXISTĂ #listaQuizuri");
        return;
    }

    container.innerHTML = `
        <div class="quiz-loading">
            ⏳ Se verifică baza de date...
        </div>
    `;

    console.log("1. quiz.js a pornit");

    console.log(
        "2. supabaseClient =",
        typeof supabaseClient
    );

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        container.innerHTML = `
            <div class="quiz-loading" style="color:#c62828;">
                ❌ Supabase nu este încărcat.
                <br>
                Verifică init.js.
            </div>
        `;

        console.error(
            "supabaseClient NU EXISTĂ"
        );

        return;
    }

    try {

        console.log(
            "3. Se caută quizurile în tabelul quizuri..."
        );

        const {
            data,
            error
        } = await supabaseClient
            .from("quizuri")
            .select("*")
            .eq("activ", true)
            .order("created_at", {
                ascending: false
            });

        console.log(
            "4. Rezultat Supabase:",
            data,
            error
        );

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {

            container.innerHTML = `
                <div class="quiz-loading">
                    📚 Nu există quizuri active în baza de date.
                    <br><br>
                    Intră în panoul Admin și creează un quiz.
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
                        class="game-button primary"
                        onclick="pornesteQuiz(${quiz.id})"
                    >
                        🌲 Pornește aventura
                    </button>

                </div>

            `).join("");

        console.log(
            "5. Quizurile au fost afișate!"
        );

    } catch (error) {

        console.error(
            "EROARE QUIZURI:",
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
            quizId
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


        if (intrebari.length === 0) {

            alert(
                "Acest quiz nu are încă întrebări."
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
                quiz.titlu || "Aventura";

        }


        actualizeazaStatistici();

        afiseazaIntrebarea();


    } catch (error) {

        console.error(
            "Eroare încărcare întrebări:",
            error
        );


        alert(
            "Nu am putut încărca întrebările: " +
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


    const numar =
        intrebareCurenta + 1;


    const total =
        intrebari.length;


    /* ---------------------------------------------
       NUMĂR ÎNTREBARE
    --------------------------------------------- */

    const questionNumber =
        element("questionNumber");

    if (questionNumber) {

        questionNumber.textContent =
            numar;

    }


    const questionTotal =
        element("questionTotal");

    if (questionTotal) {

        questionTotal.textContent =
            total;

    }


    /* ---------------------------------------------
       TEXT ÎNTREBARE
    --------------------------------------------- */

    const questionText =
        element("questionText");

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


    /* ---------------------------------------------
       BULA ANIMAL
    --------------------------------------------- */

    const animalBubble =
        element("animalBubble");

    if (animalBubble) {

        animalBubble.textContent =
            "Alege răspunsul corect!";

    }


    /* ---------------------------------------------
       RĂSPUNSURI
    --------------------------------------------- */

    const answerA =
        element("answerA");

    const answerB =
        element("answerB");

    const answerC =
        element("answerC");

    const answerD =
        element("answerD");


    if (answerA) {

        answerA.textContent =
            intrebare.raspuns_a || "";

    }

    if (answerB) {

        answerB.textContent =
            intrebare.raspuns_b || "";

    }

    if (answerC) {

        answerC.textContent =
            intrebare.raspuns_c || "";

    }

    if (answerD) {

        answerD.textContent =
            intrebare.raspuns_d || "";

    }


    /* ---------------------------------------------
       RESET BUTOANE
    --------------------------------------------- */

    const butoane =
        document.querySelectorAll(
            ".answer-button"
        );


    butoane.forEach(
        buton => {

            buton.disabled = false;

            buton.classList.remove(
                "correct",
                "wrong",
                "raspuns-corect",
                "raspuns-gresit"
            );

        }
    );


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
       SCROLL
    --------------------------------------------- */

    const questionPanel =
        document.querySelector(
            ".question-panel"
        );


    if (
        questionPanel &&
        intrebareCurenta > 0
    ) {

        questionPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

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


    raspunsBlocat = true;


    const intrebare =
        intrebari[
            intrebareCurenta
        ];


    if (!intrebare) {

        raspunsBlocat = false;

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


    butoane.forEach(
        buton => {

            buton.disabled = true;

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


    const animalBubble =
        element("animalBubble");


    /* =================================================
       RĂSPUNS CORECT
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
                "🎉 Bravo! Ai răspuns corect!";

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


    /* =================================================
       RĂSPUNS GREȘIT
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
            "😯 Mai ai o șansă!";

    }


    afiseazaAtac();


    actualizeazaStatistici();


    /* ---------------------------------------------
       GAME OVER
    --------------------------------------------- */

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

    } else {

        afiseazaIntrebarea();

    }

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
            ) +
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
        element("successEffect");


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
        700
    );

}


/* =====================================================
   EFECT ATAC
===================================================== */

function afiseazaAtac() {

    const effect =
        element("attackEffect");


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
        700
    );

}


/* =====================================================
   REZULTAT FINAL
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
            Math.max(
                0,
                vieti
            );

    }


    const title =
        element("resultTitle");

    const subtitle =
        element("resultSubtitle");

    const icon =
        element("resultIcon");

    const message =
        element("resultMessage");


    /* ---------------------------------------------
       VICTORIE
    --------------------------------------------- */

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

    }


    /* ---------------------------------------------
       GAME OVER
    --------------------------------------------- */

    else {

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
   ALEGE ALT QUIZ
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

    /* ---------------------------------------------
       BUTOANE RĂSPUNSURI
    --------------------------------------------- */

    const butoane =
        document.querySelectorAll(
            ".answer-button"
        );


    butoane.forEach(
        buton => {

            buton.addEventListener(
                "click",
                () => {

                    const raspuns =
                        buton.dataset.answer;

                    proceseazaRaspuns(
                        raspuns
                    );

                }
            );

        }
    );


    /* ---------------------------------------------
       RESTART
    --------------------------------------------- */

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


    /* ---------------------------------------------
       ALEGERE ALT QUIZ
    --------------------------------------------- */

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


    /* ---------------------------------------------
       ÎNCARCĂ QUIZURILE
    --------------------------------------------- */

    if (
        typeof supabaseClient ===
        "undefined"
    ) {

        console.error(
            "supabaseClient nu există. Verifică init.js."
        );


        const container =
            element("listaQuizuri");


        if (container) {

            container.innerHTML = `

                <div
                    class="quiz-loading"
                    style="color:#c62828;"
                >
                    Supabase nu este încărcat.
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

} else {

    initializeazaQuiz();

}

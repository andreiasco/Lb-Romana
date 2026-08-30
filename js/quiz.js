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
   STARE JOC
===================================================== */

let quizuri = [];
let quizCurent = null;
let intrebari = [];

let intrebareaCurenta = 0;
let vieti = QUIZ_CONFIG.lives;
let scor = 0;
let raspunsuriCorecte = 0;
let raspunsuriGresite = 0;
let raspunsDat = false;

/* =====================================================
   ELEMENTE HTML
===================================================== */

const $ = (id) => document.getElementById(id);

/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    if (text === null || text === undefined) {
        return "";
    }

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =====================================================
   AFIȘARE ECRAN
===================================================== */

function arataEcran(id) {

    document
        .querySelectorAll(".quiz-screen")
        .forEach(screen => {
            screen.classList.add("ascuns");
        });

    const screen = $(id);

    if (screen) {
        screen.classList.remove("ascuns");
    }
}

/* =====================================================
   ÎNCARCĂ QUIZURILE
===================================================== */

async function incarcaQuizuriSite() {

    const container = $("listaQuizuri");

    if (!container) {
        console.error(
            "Elementul #listaQuizuri nu există."
        );
        return;
    }

    container.innerHTML = `
        <div class="quiz-loading">
            Se încarcă quizurile...
        </div>
    `;

    try {

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

        if (error) {
            throw error;
        }

        quizuri = data || [];

        if (quizuri.length === 0) {

            container.innerHTML = `
                <div class="quiz-loading">
                    Nu există încă quizuri active.
                </div>
            `;

            return;
        }

        container.innerHTML = quizuri
            .map(quiz => {

                return `
                    <button
                        type="button"
                        class="quiz-card"
                        onclick="pornesteQuiz(${quiz.id})"
                    >

                        <span class="quiz-card-icon">
                            🎮
                        </span>

                        <span class="quiz-card-content">

                            <strong>
                                ${escapeHTML(quiz.titlu)}
                            </strong>

                            ${
                                quiz.categorie
                                    ? `
                                        <small>
                                            ${escapeHTML(
                                                quiz.categorie
                                            )}
                                        </small>
                                    `
                                    : ""
                            }

                            ${
                                quiz.descriere
                                    ? `
                                        <span>
                                            ${escapeHTML(
                                                quiz.descriere
                                            )}
                                        </span>
                                    `
                                    : ""
                            }

                        </span>

                        <span class="quiz-card-arrow">
                            ➜
                        </span>

                    </button>
                `;

            })
            .join("");

    } catch (error) {

        console.error(
            "Eroare încărcare quizuri:",
            error
        );

        container.innerHTML = `
            <div class="quiz-loading"
                 style="color:#c62828">

                Nu am putut încărca quizurile.

                <br>

                <small>
                    ${escapeHTML(error.message)}
                </small>

            </div>
        `;
    }
}

/* =====================================================
   PORNEȘTE QUIZ
===================================================== */

async function pornesteQuiz(quizId) {

    try {

        quizCurent = quizuri.find(
            quiz => Number(quiz.id) === Number(quizId)
        );

        if (!quizCurent) {

            const {
                data,
                error
            } = await supabaseClient
                .from("quizuri")
                .select("*")
                .eq("id", quizId)
                .single();

            if (error) {
                throw error;
            }

            quizCurent = data;
        }

        const {
            data,
            error
        } = await supabaseClient
            .from("intrebari_quiz")
            .select("*")
            .eq("quiz_id", quizCurent.id)
            .order("ordine", {
                ascending: true
            });

        if (error) {
            throw error;
        }

        intrebari = data || [];

        if (intrebari.length === 0) {

            alert(
                "Acest quiz nu are încă întrebări."
            );

            return;
        }

        /* RESET JOC */

        intrebareaCurenta = 0;
        vieti = QUIZ_CONFIG.lives;
        scor = 0;
        raspunsuriCorecte = 0;
        raspunsuriGresite = 0;
        raspunsDat = false;

        /* TITLU */

        if ($("gameQuizTitle")) {

            $("gameQuizTitle").textContent =
                quizCurent.titlu;
        }

        /* SCOR */

        actualizeazaScor();

        /* VIEȚI */

        actualizeazaVieti();

        /* NUMĂR ÎNTREBĂRI */

        if ($("questionTotal")) {

            $("questionTotal").textContent =
                intrebari.length;
        }

        arataEcran("quizGameScreen");

        afiseazaIntrebarea();

    } catch (error) {

        console.error(
            "Eroare pornire quiz:",
            error
        );

        alert(
            "Nu am putut porni quizul: " +
            error.message
        );
    }
}

/* =====================================================
   AFIȘEAZĂ ÎNTREBAREA
===================================================== */

function afiseazaIntrebarea() {

    if (
        intrebareaCurenta >= intrebari.length
    ) {

        terminaQuiz();
        return;
    }

    const intrebare =
        intrebari[intrebareaCurenta];

    raspunsDat = false;

    /* NUMĂR */

    if ($("questionNumber")) {

        $("questionNumber").textContent =
            intrebareaCurenta + 1;
    }

    /* TEXT */

    if ($("questionText")) {

        $("questionText").textContent =
            intrebare.intrebare || "";
    }

    /* RĂSPUNSURI */

    if ($("answerA")) {

        $("answerA").textContent =
            intrebare.raspuns_a || "";
    }

    if ($("answerB")) {

        $("answerB").textContent =
            intrebare.raspuns_b || "";
    }

    if ($("answerC")) {

        $("answerC").textContent =
            intrebare.raspuns_c || "";
    }

    if ($("answerD")) {

        $("answerD").textContent =
            intrebare.raspuns_d || "";
    }

    /* ANIMAL */

    const animal =
        ANIMALE[intrebare.animal] ||
        intrebare.animal ||
        "🐺";

    if ($("animal")) {

        $("animal").textContent =
            animal;
    }

    if ($("questionAnimal")) {

        $("questionAnimal").textContent =
            animal;
    }

    /* BULA */

    if ($("animalBubble")) {

        $("animalBubble").textContent =
            "Răspunde corect!";
    }

    /* IMAGINE ANIMAL */

    actualizeazaImagineAnimal(
        intrebare.imagine_animal,
        animal
    );

    /* MESAJ */

    if ($("questionMessage")) {

        $("questionMessage").textContent = "";
        $("questionMessage").className =
            "question-message";
    }

    /* BUTOANE */

    document
        .querySelectorAll(".answer-button")
        .forEach(button => {

            button.disabled = false;

            button.classList.remove(
                "correct",
                "wrong",
                "selected"
            );
        });
}

/* =====================================================
   IMAGINE ANIMAL
===================================================== */

function actualizeazaImagineAnimal(
    url,
    emoji
) {

    const animalElement =
        $("animal");

    if (!animalElement) {
        return;
    }

    if (url) {

        animalElement.innerHTML = `
            <img
                src="${escapeHTML(url)}"
                alt="Animal"
                style="
                    width:100%;
                    height:100%;
                    object-fit:contain;
                    border-radius:20px;
                "
            >
        `;

    } else {

        animalElement.textContent =
            emoji;
    }
}

/* =====================================================
   RĂSPUNS
===================================================== */

async function verificaRaspuns(
    raspuns
) {

    if (raspunsDat) {
        return;
    }

    if (
        !intrebari[intrebareaCurenta]
    ) {
        return;
    }

    raspunsDat = true;

    const intrebare =
        intrebari[intrebareaCurenta];

    const raspunsCorect =
        String(
            intrebare.raspuns_corect
        )
        .trim()
        .toUpperCase();

    const raspunsUtilizator =
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

    const butonSelectat =
        document.querySelector(
            `.answer-button[data-answer="${raspunsUtilizator}"]`
        );

    if (
        raspunsUtilizator === raspunsCorect
    ) {

        raspunsuriCorecte++;

        scor += QUIZ_CONFIG.pointsCorrect;

        if (butonSelectat) {

            butonSelectat.classList.add(
                "correct"
            );
        }

        afiseazaMesaj(
            "🎉 Corect! Bravo!",
            "success"
        );

        afiseazaSucces();

        actualizeazaScor();

        await asteapta(
            QUIZ_CONFIG.delayAfterCorrect
        );

        intrebareaCurenta++;

        afiseazaIntrebarea();

    } else {

        raspunsuriGresite++;

        vieti--;

        if (butonSelectat) {

            butonSelectat.classList.add(
                "wrong"
            );
        }

        const butonCorect =
            document.querySelector(
                `.answer-button[data-answer="${raspunsCorect}"]`
            );

        if (butonCorect) {

            butonCorect.classList.add(
                "correct"
            );
        }

        afiseazaMesaj(
            `❌ Greșit! Răspunsul corect este ${raspunsCorect}.`,
            "error"
        );

        afiseazaAtac();

        actualizeazaVieti();

        await asteapta(
            QUIZ_CONFIG.delayAfterWrong
        );

        if (vieti <= 0) {

            terminaQuiz();

        } else {

            intrebareaCurenta++;

            afiseazaIntrebarea();
        }
    }
}

/* =====================================================
   MESAJ
===================================================== */

function afiseazaMesaj(
    mesaj,
    tip
) {

    const element =
        $("questionMessage");

    if (!element) {
        return;
    }

    element.textContent =
        mesaj;

    element.className =
        `question-message ${tip}`;
}

/* =====================================================
   SCOR
===================================================== */

function actualizeazaScor() {

    if ($("score")) {

        $("score").textContent =
            scor;
    }
}

/* =====================================================
   VIEȚI
===================================================== */

function actualizeazaVieti() {

    if (!$("lives")) {
        return;
    }

    const inimi =
        "❤️".repeat(Math.max(0, vieti));

    const goale =
        "🖤".repeat(
            Math.max(
                0,
                QUIZ_CONFIG.lives - vieti
            )
        );

    $("lives").textContent =
        inimi + goale;
}

/* =====================================================
   EFECT CORECT
===================================================== */

function afiseazaSucces() {

    const element =
        $("successEffect");

    if (!element) {
        return;
    }

    element.classList.remove("show");

    void element.offsetWidth;

    element.classList.add("show");

    setTimeout(() => {

        element.classList.remove("show");

    }, 1000);
}

/* =====================================================
   EFECT GREȘIT
===================================================== */

function afiseazaAtac() {

    const element =
        $("attackEffect");

    if (!element) {
        return;
    }

    element.classList.remove("show");

    void element.offsetWidth;

    element.classList.add("show");

    setTimeout(() => {

        element.classList.remove("show");

    }, 1000);
}

/* =====================================================
   FINAL QUIZ
===================================================== */

function terminaQuiz() {

    arataEcran("quizResultScreen");

    if ($("finalScore")) {

        $("finalScore").textContent =
            scor;
    }

    if ($("correctAnswers")) {

        $("correctAnswers").textContent =
            raspunsuriCorecte;
    }

    if ($("wrongAnswers")) {

        $("wrongAnswers").textContent =
            raspunsuriGresite;
    }

    if ($("remainingLives")) {

        $("remainingLives").textContent =
            vieti;
    }

    const castigat =
        vieti > 0 &&
        intrebareaCurenta >= intrebari.length;

    if (castigat) {

        if ($("resultIcon")) {

            $("resultIcon").textContent =
                "🏆";
        }

        if ($("resultTitle")) {

            $("resultTitle").textContent =
                "Felicitări!";
        }

        if ($("resultSubtitle")) {

            $("resultSubtitle").textContent =
                "Ai terminat aventura din pădure!";
        }

        if ($("resultMessage")) {

            $("resultMessage").textContent =
                `Ai răspuns corect la ${raspunsuriCorecte} din ${intrebari.length} întrebări.`;
        }

    } else {

        if ($("resultIcon")) {

            $("resultIcon").textContent =
                "💔";
        }

        if ($("resultTitle")) {

            $("resultTitle").textContent =
                "Aventura s-a încheiat";
        }

        if ($("resultSubtitle")) {

            $("resultSubtitle").textContent =
                "Ai rămas fără vieți.";
        }

        if ($("resultMessage")) {

            $("resultMessage").textContent =
                `Ai obținut ${scor} puncte.`;
        }
    }
}

/* =====================================================
   AȘTEAPTĂ
===================================================== */

function asteapta(ms) {

    return new Promise(resolve => {

        setTimeout(
            resolve,
            ms
        );
    });
}

/* =====================================================
   RESTART
===================================================== */

function restartQuiz() {

    if (!quizCurent) {
        return;
    }

    pornesteQuiz(
        quizCurent.id
    );
}

/* =====================================================
   ALEGE ALT QUIZ
===================================================== */

function alegeAltQuiz() {

    quizCurent = null;
    intrebari = [];
    intrebareaCurenta = 0;
    vieti = QUIZ_CONFIG.lives;
    scor = 0;
    raspunsuriCorecte = 0;
    raspunsuriGresite = 0;

    arataEcran(
        "quizSelectScreen"
    );

    incarcaQuizuriSite();
}

/* =====================================================
   EVENIMENTE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* BUTOANE RĂSPUNS */

        document
            .querySelectorAll(".answer-button")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        verificaRaspuns(
                            button.dataset.answer
                        );

                    }
                );

            });


        /* RESTART */

        const restartButton =
            $("restartQuizButton");

        if (restartButton) {

            restartButton.addEventListener(
                "click",
                restartQuiz
            );
        }


        /* ALEGE ALT QUIZ */

        const chooseButton =
            $("chooseQuizButton");

        if (chooseButton) {

            chooseButton.addEventListener(
                "click",
                alegeAltQuiz
            );
        }


        /* ÎNCARCĂ QUIZURILE */

        incarcaQuizuriSite();

    }
);

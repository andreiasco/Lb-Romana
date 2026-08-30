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
   STAREA JOCULUI
===================================================== */

let quizuriDisponibile = [];

let quizSelectat = null;

let intrebariQuiz = [];

let intrebareCurenta = 0;

let vieti = QUIZ_CONFIG.lives;

let scor = 0;

let raspunsuriCorecte = 0;

let raspunsuriGresite = 0;

let raspunsProcesat = false;


/* =====================================================
   ELEMENTE HTML
===================================================== */

function element(id) {

    return document.getElementById(id);

}


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
   PORNIRE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initQuiz();

    }
);


/* =====================================================
   INIT QUIZ
===================================================== */

async function initQuiz() {

    try {

        afiseazaSelectieQuiz();

        await incarcaQuizuriSite();

        configureazaButoaneRaspuns();

        configureazaButoaneRezultat();

    } catch (error) {

        console.error(
            "Eroare inițializare quiz:",
            error
        );

        afiseazaEroare(
            "Nu am putut încărca aventura."
        );

    }

}


/* =====================================================
   ÎNCARCĂ QUIZURILE DIN SUPABASE
===================================================== */

async function incarcaQuizuriSite() {

    const container =
        element("listaQuizuri");


    if (!container) {

        console.error(
            "Elementul listaQuizuri nu există."
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
            data: quizuri,
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
                        ascending: false
                    }
                );


        if (error) {

            throw error;

        }


        quizuriDisponibile =
            quizuri || [];


        if (
            quizuriDisponibile.length === 0
        ) {

            container.innerHTML = `
                <div class="quiz-loading">
                    Nu există încă quizuri active.
                </div>
            `;

            return;

        }


        container.innerHTML =
            quizuriDisponibile
                .map(
                    quiz =>
                        creeazaCardQuiz(quiz)
                )
                .join("");


    } catch (error) {

        console.error(
            "Eroare încărcare quizuri:",
            error
        );


        container.innerHTML = `
            <div class="quiz-loading" style="color:#c62828;">
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
   CARD QUIZ
===================================================== */

function creeazaCardQuiz(quiz) {

    const id =
        Number(quiz.id);


    const titlu =
        escapeHTML(
            quiz.titlu ||
            "Quiz fără titlu"
        );


    const categorie =
        escapeHTML(
            quiz.categorie ||
            "Aventură"
        );


    const descriere =
        escapeHTML(
            quiz.descriere ||
            "Pornește într-o nouă aventură!"
        );


    return `

        <button
            type="button"
            class="quiz-card"
            onclick="pornesteQuiz(${id})"
        >

            <div class="quiz-card-icon">
                🌲
            </div>

            <div class="quiz-card-content">

                <h3>
                    ${titlu}
                </h3>

                <div class="quiz-card-category">
                    ${categorie}
                </div>

                <p>
                    ${descriere}
                </p>

                <span class="quiz-card-button">
                    🎮 Începe aventura
                </span>

            </div>

        </button>

    `;

}


/* =====================================================
   PORNEȘTE QUIZ
===================================================== */

async function pornesteQuiz(quizId) {

    quizSelectat =
        quizuriDisponibile.find(
            quiz =>
                Number(quiz.id) ===
                Number(quizId)
        );


    if (!quizSelectat) {

        console.error(
            "Quizul nu a fost găsit:",
            quizId
        );

        return;

    }


    const lista =
        element("listaQuizuri");


    if (lista) {

        lista.innerHTML = `
            <div class="quiz-loading">
                Se încarcă aventura...
            </div>
        `;

    }


    try {

        const {
            data: intrebari,
            error
        } =
            await supabaseClient
                .from("intrebari_quiz")
                .select("*")
                .eq(
                    "quiz_id",
                    quizSelectat.id
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


        intrebariQuiz =
            intrebari || [];


        if (
            intrebariQuiz.length === 0
        ) {

            alert(
                "Acest quiz nu are încă întrebări."
            );

            await incarcaQuizuriSite();

            return;

        }


        reseteazaJoc();


        afiseazaEcranJoc();


        afiseazaIntrebare();


    } catch (error) {

        console.error(
            "Eroare încărcare întrebări:",
            error
        );


        alert(
            "Nu am putut încărca întrebările: " +
            error.message
        );


        await incarcaQuizuriSite();

    }

}


/* =====================================================
   RESETEAZĂ JOC
===================================================== */

function reseteazaJoc() {

    intrebareCurenta = 0;

    vieti = QUIZ_CONFIG.lives;

    scor = 0;

    raspunsuriCorecte = 0;

    raspunsuriGresite = 0;

    raspunsProcesat = false;


    actualizeazaViata();

    actualizeazaScor();

}


/* =====================================================
   ECRAN SELECȚIE
===================================================== */

function afiseazaSelectieQuiz() {

    const selectScreen =
        element("quizSelectScreen");

    const gameScreen =
        element("quizGameScreen");

    const resultScreen =
        element("quizResultScreen");


    if (selectScreen) {

        selectScreen.classList.remove(
            "ascuns"
        );

    }


    if (gameScreen) {

        gameScreen.classList.add(
            "ascuns"
        );

    }


    if (resultScreen) {

        resultScreen.classList.add(
            "ascuns"
        );

    }

}


/* =====================================================
   ECRAN JOC
===================================================== */

function afiseazaEcranJoc() {

    const selectScreen =
        element("quizSelectScreen");

    const gameScreen =
        element("quizGameScreen");

    const resultScreen =
        element("quizResultScreen");


    if (selectScreen) {

        selectScreen.classList.add(
            "ascuns"
        );

    }


    if (gameScreen) {

        gameScreen.classList.remove(
            "ascuns"
        );

    }


    if (resultScreen) {

        resultScreen.classList.add(
            "ascuns"
        );

    }


    const titlu =
        element("gameQuizTitle");


    if (titlu) {

        titlu.textContent =
            quizSelectat?.titlu ||
            "Aventura";

    }


    const total =
        element("questionTotal");


    if (total) {

        total.textContent =
            intrebariQuiz.length;

    }

}


/* =====================================================
   AFIȘEAZĂ ÎNTREBAREA
===================================================== */

function afiseazaIntrebare() {

    if (
        intrebareCurenta >=
        intrebariQuiz.length
    ) {

        terminaQuiz();

        return;

    }


    raspunsProcesat = false;


    const intrebare =
        intrebariQuiz[
            intrebareCurenta
        ];


    const numar =
        element("questionNumber");


    const total =
        element("questionTotal");


    const text =
        element("questionText");


    const answerA =
        element("answerA");


    const answerB =
        element("answerB");


    const answerC =
        element("answerC");


    const answerD =
        element("answerD");


    const animal =
        obtineAnimal(
            intrebare.animal
        );


    const questionAnimal =
        element("questionAnimal");


    const animalElement =
        element("animal");


    const animalBubble =
        element("animalBubble");


    if (numar) {

        numar.textContent =
            intrebareCurenta + 1;

    }


    if (total) {

        total.textContent =
            intrebariQuiz.length;

    }


    if (text) {

        text.textContent =
            intrebare.intrebare || "";

    }


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


    if (questionAnimal) {

        questionAnimal.textContent =
            animal;

    }


    if (animalElement) {

        animalElement.textContent =
            animal;

    }


    if (animalBubble) {

        animalBubble.textContent =
            mesajAnimal(
                intrebare.animal
            );

    }


    afiseazaImagineAnimal(
        intrebare
    );


    reseteazaButoaneRaspuns();


    afiseazaMesaj(
        ""
    );


    actualizeazaViata();

    actualizeazaScor();

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


    return ANIMALE[cheie] ||
        animal ||
        "🐺";

}


/* =====================================================
   MESAJ ANIMAL
===================================================== */

function mesajAnimal(animal) {

    const cheie =
        String(
            animal || ""
        )
        .trim()
        .toLowerCase();


    const mesaje = {

        lup:
            "Hai să vedem dacă poți răspunde!",

        vulpe:
            "Fii atent! Vulpea te provoacă!",

        urs:
            "Ursul așteaptă răspunsul tău!",

        iepure:
            "Iepurașul te încurajează!",

        caprioara:
            "Căprioara te conduce prin pădure!",

        cerb:
            "Cerbul te provoacă la un nou pas!"

    };


    return (
        mesaje[cheie] ||
        "Sunt gata! Răspunde corect!"
    );

}


/* =====================================================
   IMAGINE ANIMAL
===================================================== */

function afiseazaImagineAnimal(
    intrebare
) {

    const animalElement =
        element("animal");


    if (!animalElement) {

        return;

    }


    const imagine =
        intrebare.imagine_animal;


    if (!imagine) {

        animalElement.textContent =
            obtineAnimal(
                intrebare.animal
            );

        animalElement.style.backgroundImage =
            "none";

        animalElement.classList.remove(
            "animal-cu-imagine"
        );

        return;

    }


    animalElement.textContent = "";


    animalElement.style.backgroundImage =
        `url("${String(imagine)
            .replace(/"/g, '\\"')}")`;


    animalElement.style.backgroundSize =
        "cover";


    animalElement.style.backgroundPosition =
        "center";


    animalElement.style.backgroundRepeat =
        "no-repeat";


    animalElement.classList.add(
        "animal-cu-imagine"
    );

}


/* =====================================================
   BUTOANE RĂSPUNS
===================================================== */

function configureazaButoaneRaspuns() {

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const raspuns =
                        this.dataset.answer;

                    verificaRaspuns(
                        raspuns,
                        this
                    );

                }
            );

        }
    );

}


/* =====================================================
   VERIFICĂ RĂSPUNS
===================================================== */

function verificaRaspuns(
    raspuns,
    button
) {

    if (raspunsProcesat) {

        return;

    }


    const intrebare =
        intrebariQuiz[
            intrebareCurenta
        ];


    if (!intrebare) {

        return;

    }


    raspunsProcesat = true;


    dezactiveazaButoane();


    const raspunsCorect =
        String(
            intrebare.raspuns_corect || ""
        )
        .trim()
        .toUpperCase();


    const raspunsDat =
        String(
            raspuns || ""
        )
        .trim()
        .toUpperCase();


    if (
        raspunsDat ===
        raspunsCorect
    ) {

        raspunsCorectat(
            button
        );

    } else {

        raspunsGresit(
            button,
            raspunsCorect
        );

    }

}


/* =====================================================
   RĂSPUNS CORECT
===================================================== */

function raspunsCorectat(
    button
) {

    raspunsuriCorecte++;


    scor +=
        QUIZ_CONFIG.pointsCorrect;


    if (button) {

        button.classList.add(
            "correct"
        );

    }


    afiseazaMesaj(
        "🎉 Corect! Foarte bine!",
        "success"
    );


    pornesteEfectSucces();


    actualizeazaScor();


    setTimeout(
        function () {

            intrebareCurenta++;

            afiseazaIntrebare();

        },
        QUIZ_CONFIG.delayAfterCorrect
    );

}


/* =====================================================
   RĂSPUNS GREȘIT
===================================================== */

function raspunsGresit(
    button,
    raspunsCorect
) {

    raspunsuriGresite++;


    vieti--;


    if (button) {

        button.classList.add(
            "wrong"
        );

    }


    marcheazaRaspunsCorect(
        raspunsCorect
    );


    afiseazaMesaj(
        "❌ Greșit! Ai pierdut o viață.",
        "error"
    );


    pornesteEfectAtac();


    actualizeazaViata();


    if (vieti <= 0) {

        setTimeout(
            function () {

                terminaQuiz(
                    true
                );

            },
            QUIZ_CONFIG.delayAfterWrong
        );

        return;

    }


    setTimeout(
        function () {

            intrebareCurenta++;

            afiseazaIntrebare();

        },
        QUIZ_CONFIG.delayAfterWrong
    );

}


/* =====================================================
   MARCHEAZĂ RĂSPUNSUL CORECT
===================================================== */

function marcheazaRaspunsCorect(
    raspunsCorect
) {

    const selector =
        `.answer-button[data-answer="${raspunsCorect}"]`;


    const button =
        document.querySelector(
            selector
        );


    if (button) {

        button.classList.add(
            "correct"
        );

    }

}


/* =====================================================
   DEZACTIVEAZĂ BUTOANE
===================================================== */

function dezactiveazaButoane() {

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );

}


/* =====================================================
   REACTIVEAZĂ BUTOANE
===================================================== */

function reseteazaButoaneRaspuns() {

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        button => {

            button.disabled =
                false;


            button.classList.remove(
                "correct"
            );


            button.classList.remove(
                "wrong"
            );

        }
    );

}


/* =====================================================
   VIEȚI
===================================================== */

function actualizeazaViata() {

    const livesElement =
        element("lives");


    if (!livesElement) {

        return;

    }


    const vietiPline =
        "❤️".repeat(
            Math.max(
                0,
                vieti
            )
        );


    const vietiGoale =
        "🖤".repeat(
            Math.max(
                0,
                QUIZ_CONFIG.lives -
                vieti
            )
        );


    livesElement.textContent =
        vietiPline +
        vietiGoale;

}


/* =====================================================
   SCOR
===================================================== */

function actualizeazaScor() {

    const scoreElement =
        element("score");


    if (scoreElement) {

        scoreElement.textContent =
            scor;

    }

}


/* =====================================================
   MESAJ ÎNTREBARE
===================================================== */

function afiseazaMesaj(
    mesaj,
    tip = ""
) {

    const message =
        element("questionMessage");


    if (!message) {

        return;

    }


    message.textContent =
        mesaj || "";


    message.className =
        "question-message";


    if (tip) {

        message.classList.add(
            tip
        );

    }

}


/* =====================================================
   EFECT SUCCES
===================================================== */

function pornesteEfectSucces() {

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
        function () {

            effect.classList.remove(
                "active"
            );

        },
        900
    );

}


/* =====================================================
   EFECT ATAC
===================================================== */

function pornesteEfectAtac() {

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
        function () {

            effect.classList.remove(
                "active"
            );

        },
        900
    );

}


/* =====================================================
   TERMINĂ QUIZ
===================================================== */

function terminaQuiz(
    faraVieti = false
) {

    const gameScreen =
        element("quizGameScreen");

    const resultScreen =
        element("quizResultScreen");


    if (gameScreen) {

        gameScreen.classList.add(
            "ascuns"
        );

    }


    if (resultScreen) {

        resultScreen.classList.remove(
            "ascuns"
        );

    }


    const finalScore =
        element("finalScore");


    const correct =
        element("correctAnswers");


    const wrong =
        element("wrongAnswers");


    const remaining =
        element("remainingLives");


    const title =
        element("resultTitle");


    const subtitle =
        element("resultSubtitle");


    const icon =
        element("resultIcon");


    const message =
        element("resultMessage");


    if (finalScore) {

        finalScore.textContent =
            scor;

    }


    if (correct) {

        correct.textContent =
            raspunsuriCorecte;

    }


    if (wrong) {

        wrong.textContent =
            raspunsuriGresite;

    }


    if (remaining) {

        remaining.textContent =
            Math.max(
                0,
                vieti
            );

    }


    if (faraVieti) {

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
                "Nu renunța! Poți încerca din nou.";

        }

        return;

    }


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
            "Ai terminat aventura din pădure!";

    }


    if (message) {

        if (
            raspunsuriCorecte ===
            intrebariQuiz.length
        ) {

            message.textContent =
                "🌟 Perfect! Ai răspuns corect la toate întrebările!";

        } else if (
            raspunsuriCorecte >
            raspunsuriGresite
        ) {

            message.textContent =
                "🌲 Bravo! Ai trecut cu bine prin pădure!";

        } else {

            message.textContent =
                "🐾 Ai terminat aventura! Mai încearcă o dată pentru un scor mai bun.";

        }

    }

}


/* =====================================================
   REIA QUIZUL
===================================================== */

function configureazaButoaneRezultat() {

    const restart =
        element("restartQuizButton");


    const choose =
        element("chooseQuizButton");


    if (restart) {

        restart.addEventListener(
            "click",
            function () {

                if (
                    quizSelectat &&
                    quizSelectat.id
                ) {

                    pornesteQuiz(
                        quizSelectat.id
                    );

                }

            }
        );

    }


    if (choose) {

        choose.addEventListener(
            "click",
            function () {

                quizSelectat =
                    null;

                intrebariQuiz =
                    [];

                reseteazaJoc();

                afiseazaSelectieQuiz();

                incarcaQuizuriSite();

            }
        );

    }

}


/* =====================================================
   EROARE GENERALĂ
===================================================== */

function afiseazaEroare(
    mesaj
) {

    const container =
        element("listaQuizuri");


    if (!container) {

        return;

    }


    container.innerHTML = `
        <div
            class="quiz-loading"
            style="color:#c62828;"
        >
            ❌ ${escapeHTML(mesaj)}
        </div>
    `;

}


/* =====================================================
   EXPORT GLOBAL
   Pentru onclick din HTML
===================================================== */

window.pornesteQuiz =
    pornesteQuiz;

window.incarcaQuizuriSite =
    incarcaQuizuriSite;

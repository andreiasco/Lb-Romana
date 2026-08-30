/* =========================================================
   QUIZ.JS
   AVENTURA DIN PĂDURE
   REALISTIC FOREST + FULL BODY WALKING CHARACTER
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

    walkDuration: 1400

};


/* =========================================================
   IMAGINI
========================================================= */

const IMAGINI = {

    forest: [

        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90"

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
        "https://images.unsplash.com/photo-1553264701-d138db4fd5d0?auto=format&fit=crop&w=900&q=90"

};


/* =========================================================
   ANIMALE
========================================================= */

const ANIMALE = {

    lup: {

        name:
            "Lup",

        image:
            IMAGINI.wolf

    },

    vulpe: {

        name:
            "Vulpe",

        image:
            IMAGINI.fox

    },

    urs: {

        name:
            "Urs",

        image:
            IMAGINI.bear

    },

    iepure: {

        name:
            "Iepure",

        image:
            IMAGINI.rabbit

    },

    caprioara: {

        name:
            "Căprioară",

        image:
            IMAGINI.deer

    },

    "căprioară": {

        name:
            "Căprioară",

        image:
            IMAGINI.deer

    },

    cerb: {

        name:
            "Cerb",

        image:
            IMAGINI.deer

    },

    bufnita: {

        name:
            "Bufniță",

        image:
            IMAGINI.owl

    },

    "bufniță": {

        name:
            "Bufniță",

        image:
            IMAGINI.owl

    }

};


/* =========================================================
   LOCAȚII
========================================================= */

const LOCATII_PADURE = [

    "La intrarea în pădure",

    "Pe poteca dintre copaci",

    "În luminiș",

    "Lângă pârâu",

    "În mijlocul pădurii",

    "Lângă copacii bătrâni",

    "La marginea luminișului",

    "În adâncul pădurii"

];


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

            if (
                Array.isArray(src)
            ) {

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


    if (
        imagini.length === 0
    ) {

        return;

    }


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


    if (!animal) {

        return;

    }


    animal.innerHTML =
        "";


    const img =
        document.createElement(
            "img"
        );


    img.src =
        animalData.image;


    img.alt =
        animalData.name;


    img.className =
        "real-animal-image";


    img.loading =
        "eager";


    img.onerror = () => {

        animal.innerHTML =

            `
            <div
                style="
                    width:100%;
                    height:100%;
                    display:grid;
                    place-items:center;
                    font-size:60px;
                    background:#24352a;
                "
            >
                🐺
            </div>
            `;

    };


    animal.appendChild(
        img
    );


    if (questionAnimal) {

        questionAnimal.innerHTML =

            `
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


    const bubble =
        element("animalBubble");


    if (bubble) {

        bubble.textContent =

            `${animalData.name}: Alege răspunsul corect!`;

    }

}


/* =========================================================
   ANIMAȚII CSS DIN JS
========================================================= */

function activeazaAnimatii() {

    if (
        element(
            "quizDynamicStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "quizDynamicStyles";


    style.textContent = `

        .forest.cinematic-change {

            animation:
                cinematicSceneChange
                1.2s ease;
        }

        @keyframes cinematicSceneChange {

            0% {

                opacity: .55;

                filter:
                    blur(5px)
                    brightness(.7);

                transform:
                    scale(1.05);
            }

            50% {

                opacity: .85;

                filter:
                    blur(2px)
                    brightness(.88);

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
                window.innerWidth < 700
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

                `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.01)
                `;

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
   ÎNCARCĂ QUIZURI
========================================================= */

async function incarcaQuizuriSite() {

    const container =
        element(
            "listaQuizuri"
        );


    if (!container) {

        return;

    }


    container.innerHTML =

        `
        <div class="quiz-loading">
            Se încarcă aventurile...
        </div>
        `;


    if (

        typeof supabaseClient ===
            "undefined" ||

        !supabaseClient

    ) {

        container.innerHTML =

            `
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

            container.innerHTML =

                `
                <div class="quiz-loading">

                    📚 Nu există quizuri active.

                </div>
                `;

            return;

        }


        quizuri =
            data;


        container.innerHTML =

            data

                .map(quiz => {

                    return `

                        <div class="quiz-card">

                            <div
                                class="quiz-card-icon"
                            >

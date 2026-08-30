// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL =
    "https://eagjavifluwolqeuctzk.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_QSG9OFrCANpRxA-moQCQgQ_mtkx-hWX";

const BUCKET = "Pdf";
const IMAGINI_BUCKET = "Imagini";


// ======================================================
// CLIENT SUPABASE
// ======================================================

window.supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// Alias pentru toate fișierele JS
const supabaseClient =
    window.supabaseClient;


// ======================================================
// PAGINI
// ======================================================

function afiseazaPagina(
    hash = window.location.hash
) {

    const ancora =
        hash.replace("#", "") || "acasa";

    const pagini = {

        acasa: "pagina-acasa",

        "despre-noi":
            "pagina-acasa",

        functionalitati:
            "pagina-acasa",

        "how-to":
            "pagina-acasa",

        limba:
            "pagina-limba",

        literatura:
            "pagina-literatura",

        poezie:
            "pagina-literatura",

        proza:
            "pagina-literatura",

        teatru:
            "pagina-literatura",

        quiz:
            "pagina-quiz",

        revista:
            "pagina-revista"

    };


    const paginaId =
        pagini[ancora] ||
        "pagina-acasa";


    const esteRutaPrincipala =
        [
            "acasa",
            "limba",
            "literatura",
            "quiz",
            "revista"
        ].includes(ancora);


    document
        .querySelectorAll(".pagina")
        .forEach(
            pagina =>
                pagina.classList.toggle(
                    "activ",
                    pagina.id === paginaId
                )
        );


    const element =
        document.getElementById(
            ancora
        );


    if (
        element &&
        !esteRutaPrincipala
    ) {

        window.requestAnimationFrame(
            () =>
                element.scrollIntoView({
                    behavior:
                        "smooth"
                })
        );

    } else {

        window.scrollTo(
            0,
            0
        );

    }

}


// ======================================================
// EVENIMENTE
// ======================================================

window.addEventListener(
    "hashchange",
    () =>
        afiseazaPagina()
);


afiseazaPagina();


// ======================================================
// FUNCȚII SITE
// ======================================================

incarcaAutori();

verificaSesiunea();


// ======================================================
// CĂUTARE
// ======================================================

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            cautaSite(
                this.value
            );

        }
    );

}


document.addEventListener(
    "click",
    function (event) {

        const container =
            document.querySelector(
                ".search-container"
            );

        const results =
            document.getElementById(
                "searchResults"
            );


        if (
            container &&
            results &&
            !container.contains(
                event.target
            )
        ) {

            results.classList.remove(
                "activ"
            );

        }

    }
);


// ======================================================
// DEBUG
// ======================================================

console.log(
    "Site inițializat."
);

console.log(
    "Supabase inițializat:",
    !!window.supabaseClient
);

console.log(
    "Bucket PDF privat:",
    BUCKET
);

console.log(
    "Bucket imagini public:",
    IMAGINI_BUCKET
);

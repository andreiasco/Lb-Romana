console.log("SITE.JS SE ÎNCARCĂ");

// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL =
    "https://eagjavifluwolqeuctzk.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_QSG9OFrCANpRxA-moQCQgQ_mtkx-hWX";

const BUCKET = "Pdf";
const IMAGINI_BUCKET = "Imagini";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ======================================================
// CONTAINER
// ======================================================

const site =
    document.getElementById("site");

const estePaginaAdmin =
    window.location.pathname.endsWith("admin.html");


// ======================================================
// HTML + CSS   
// ======================================================

site.innerHTML = `




<nav>

    <div class="nav-links">
        <a href="${estePaginaAdmin ? "index.html" : ""}#acasa">Acasă</a>
        <a href="${estePaginaAdmin ? "index.html" : ""}#limba">Limba română</a>
        <a href="${estePaginaAdmin ? "index.html" : ""}#literatura">Literatura română</a>
        <a href="${estePaginaAdmin ? "index.html" : ""}#quiz">Quiz-uri</a>
        <a href="${estePaginaAdmin ? "index.html" : ""}#revista">Revista</a>
        <a id="adminLink" class="ascuns" href="admin.html">Panou admin</a>
    </div>
    
 <button id="searchToggle" class="search-toggle">
        🔍 Search
    </button>

    <div class="search-container ascuns">

        <input
            type="search"
            id="searchInput"
            class="search-input"
            placeholder="Caută autori, opere, poezii..."
            autocomplete="off">

        <div id="searchResults" class="search-results"></div>

    </div>

    <details class="account-menu">
        <summary>⚙️ Cont</summary>

        <div class="account-actions">
        <span id="authStatus" class="auth-status">Signed out</span>

        <button onclick="afiseazaLogin()">
            🔐 Logare / Register
        </button>

        <button id="logoutButton" class="ascuns" onclick="logoutUtilizator()">
            🚪 Deconectare
        </button>

        <button class="theme-btn" onclick="schimbaTema()">
            🌙 Mod întunecat
        </button>
        </div>
    </details>

</nav>


<main>

<div id="pagina-acasa" class="pagina activ">

<header class="hero" id="acasa">

    <div>

        <h1>
            Limba și Literatura Română
        </h1>

        <p>
            Descoperă lumea cuvintelor,
            a literaturii și a marilor scriitori români.
        </p>

        <a href="#limba" class="buton">
            Începe călătoria 📖
        </a>

    </div>

</header>


<section id="despre-noi">

    <h2 class="titlu">Cine suntem noi?</h2>

    <p class="subtitlu">
        Un spațiu de învățare pentru limba și literatura română.
    </p>

    <div class="intro-grid">

        <div class="intro-box">
            <h3>Învățare într-un singur loc</h3>
            <p>
                Adunăm explicații, autori, opere și activități
                interactive pentru ca învățarea să fie mai clară și mai ușor de urmărit.
            </p>
        </div>

        <div class="intro-box">
            <h3>Conținut pentru fiecare ritm</h3>
            <p>
                Poți reveni oricând la noțiunile de bază, poți explora literatura
                română și îți poți verifica cunoștințele prin quiz-uri.
            </p>
        </div>

        <div class="intro-box">
            <h3>Construim împreună</h3>
            <p>
                Site-ul este pregătit să crească odată cu nevoile comunității,
                prin funcționalități dedicate elevilor și profesorilor.
            </p>
        </div>

    </div>

</section>


<section id="functionalitati">

    <h2 class="titlu">Ce poți face pe site?</h2>

    <p class="subtitlu">
        Conținutul se va adapta tipului de cont cu care te conectezi.
    </p>

    <div class="status-cont">Momentan navighezi ca vizitator nelogat</div>

    <div class="roluri-grid">

        <div class="rol-card profesor">
            <span class="rol-eticheta">Cont profesor</span>
            <h3>Predai și organizezi</h3>
            <p>
                Aici va fi locul pentru instrumentele dedicate profesorilor.
            </p>
            <details>
                <summary>Vezi funcționalitățile pregătite</summary>
                <p>
                    Spațiu rezervat pentru adăugarea și gestionarea materialelor,
                    activități pentru clasă și alte instrumente didactice.
                </p>
            </details>
        </div>

        <div class="rol-card elev">
            <span class="rol-eticheta">Cont elev</span>
            <h3>Înveți și exersezi</h3>
            <p>
                Aici va fi locul pentru instrumentele care te ajută să progresezi.
            </p>
            <details>
                <summary>Vezi funcționalitățile pregătite</summary>
                <p>
                    Spațiu rezervat pentru exerciții, progres personal,
                    teme și activități recomandate de profesor.
                </p>
            </details>
        </div>

        <div class="rol-card">
            <span class="rol-eticheta">Fără cont</span>
            <h3>Descoperi liber</h3>
            <p>
                Poți explora resursele publice și poți începe să înveți imediat.
            </p>
            <details>
                <summary>Vezi ce este disponibil</summary>
                <p>
                    Ai acces la secțiunile publice despre limbă, literatură,
                    autori, opere și quiz-uri.
                </p>
            </details>
        </div>

    </div>

</section>


<section id="how-to">

    <h2 class="titlu">How to</h2>

    <p class="subtitlu">
        Pași simpli pentru a folosi resursele disponibile.
    </p>

    <div class="howto-grid">

        <div class="howto-card">
            <h3>1. Explorează</h3>
            <p>
                Folosește meniul pentru a ajunge rapid la domeniul care te interesează.
            </p>
            <details>
                <summary>Cum încep?</summary>
                <p>
                    Apasă „Începe călătoria” sau alege direct o secțiune din meniul de sus.
                </p>
            </details>
        </div>

        <div class="howto-card">
            <h3>2. Citește și învață</h3>
            <p>
                Consultă explicațiile, autorii și operele din fiecare categorie.
            </p>
            <details>
                <summary>Unde găsesc resursele?</summary>
                <p>
                    Alege „Limba română” pentru noțiuni de limbă sau „Literatura română”
                    pentru poezie, proză și teatru.
                </p>
            </details>
        </div>

        <div class="howto-card">
            <h3>3. Verifică-ți cunoștințele</h3>
            <p>
                Folosește activitățile interactive pentru recapitulare și exersare.
            </p>
            <details>
                <summary>Cum accesez quiz-urile?</summary>
                <p>
                    Deschide secțiunea „Quiz-uri” și alege activitatea potrivită.
                </p>
            </details>
        </div>

    </div>

</section>

</div>


<div id="pagina-limba" class="pagina">


<section id="limba">

    <h2 class="titlu">
        Limba română
    </h2>

    <p class="subtitlu">
        Descoperă principalele domenii ale limbii române.
    </p>

    <div class="cards">

        <div class="card">
            <div class="icon">🔤</div>
            <h3>Gramatică</h3>
            <p>
                Descoperă regulile după care sunt
                construite cuvintele și propozițiile.
            </p>
        </div>

        <div class="card">
            <div class="icon">📚</div>
            <h3>Vocabular</h3>
            <p>
                Vocabularul cuprinde totalitatea
                cuvintelor unei limbi.
            </p>
        </div>

        <div class="card">
            <div class="icon">✍️</div>
            <h3>Ortografie</h3>
            <p>
                Învață să scrii corect și să respecți
                regulile limbii române.
            </p>
        </div>

    </div>

</section>

</div>


<div id="pagina-literatura" class="pagina">


<section id="literatura">

    <h2 class="titlu">
        Literatura română
    </h2>

    <p class="subtitlu">
        Poezie, proză și teatru.
    </p>

    <div class="cards">

        <a class="card literatura-box" href="#poezie">
            <div class="icon">🌙</div>
            <h3>Poezia</h3>
            <p>
                Poezia exprimă sentimente și idei
                printr-un limbaj artistic.
            </p>
        </a>

        <a class="card literatura-box" href="#proza">
            <div class="icon">📖</div>
            <h3>Proza</h3>
            <p>
                Romanul, nuvela, povestirea și basmul
                sunt forme importante ale prozei.
            </p>
        </a>

        <a class="card literatura-box" href="#teatru">
            <div class="icon">🎭</div>
            <h3>Teatrul</h3>
            <p>
                Textele dramatice sunt construite
                în jurul personajelor și dialogului.
            </p>
        </a>

    </div>

</section>


<section>

    <div class="citat">

        <p>
            „Nu există altă avere mai prețioasă
            decât limba unui popor.”
        </p>

        <strong>
            — Nicolae Iorga
        </strong>

    </div>

</section>

<section id="poezie">

    <h2 class="titlu">
        Poezie 📜
    </h2>

    <p class="subtitlu">
        Autori și opere de poezie.
    </p>

    <div
        class="cards"
        id="poezieCards">
    </div>

</section>


<section id="proza">

    <h2 class="titlu">
        Proză 📖
    </h2>

    <p class="subtitlu">
        Autori și opere de proză.
    </p>

    <div
        class="cards"
        id="prozaCards">
    </div>

</section>


<section id="teatru">

    <h2 class="titlu">
        Teatru 🎭
    </h2>

    <p class="subtitlu">
        Autori și opere de teatru.
    </p>

    <div
        class="cards"
        id="teatruCards">
    </div>

</section>

</div>



<div class="quizuri-create">

    <h3>🌲 Quizuri interactive</h3>

    <p>
        Alege un quiz și pornește aventura prin pădure.
    </p>

    <div id="listaQuizuriSite">
        <p>Se încarcă quizurile...</p>
    </div>

</div>


<div id="pagina-revista" class="pagina">

<section id="revista">

    <h2 class="titlu">Revista</h2>

    <p class="subtitlu">
        O secțiune nouă pentru articole și conținut editorial.
    </p>

    <div class="card" style="text-align:center;">
        <div class="icon">📰</div>
        <h3>În curând</h3>
        <p>
            Revista este în pregătire. Aici va fi adăugată o funcționalitate nouă.
        </p>
    </div>

</section>

</div>

</main>


<section
    id="adminPanel"
    class="admin-panel ascuns">


    <div class="admin-header">

        <div>

            <h2>
                🔐 Panou administrator
            </h2>

            <p id="adminUser">
                Administrator conectat
            </p>

        </div>

        <button
            class="admin-btn logout-btn"
            onclick="logoutAdmin()">

            🚪 Deconectare

        </button>

    </div>


    <div class="admin-box">

        <h3>
            👤 Adaugă autor
        </h3>

        <input
            type="text"
            id="autorInitiale"
            placeholder="Inițiale">

        <input
            type="text"
            id="autorNume"
            placeholder="Numele autorului">

        <label for="autorCategorie">
            Gen literar
        </label>

        <select id="autorCategorie">
            <option value="">Selectează genul literar</option>
            <option value="poezie">Poezie</option>
            <option value="proza">Proză</option>
            <option value="teatru">Teatru</option>
        </select>

        <label>
            🖼️ Imagine autor
        </label>

        <input
            type="file"
            id="autorPoza"
            accept="image/*">

        <textarea
            id="autorDescriere"
            placeholder="Descrierea autorului"
            rows="4"></textarea>

        <button
            class="admin-btn"
            onclick="adaugaAutor()">

            ➕ Adaugă autor

        </button>

        <div
            id="autorStatus"
            class="admin-status">
        </div>

    </div>


    <div
        class="admin-box"
        style="margin-top:20px;">

        <h3>
            📚 Adaugă operă
        </h3>

        <label>
            Autor:
        </label>

        <select id="operaAutor">

            <option value="">
                Selectează autorul
            </option>

        </select>

        <input
            type="text"
            id="operaTitlu"
            placeholder="Titlul operei">

        <label>
            📖 Rezumat PDF
        </label>

        <input
            type="file"
            id="operaRezumat"
            accept="application/pdf">

        <label>
            💡 Valori morale PDF
        </label>

        <input
            type="file"
            id="operaValoriMorale"
            accept="application/pdf">

        <label>
            👤 Personaje si semnificatii PDF
        </label>

        <input
            type="file"
            id="operaCaracterizare"
            accept="application/pdf">

        <label>
            📄 Rezumat Word pentru descărcare
        </label>

        <input
            type="file"
            id="operaRezumatWord"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">

        <label>
            🎬 Link extern film
        </label>

        <input
            type="url"
            id="operaLinkFilm"
            placeholder="https://...">

        <label>
            🎧 Link extern audiobook
        </label>

        <input
            type="url"
            id="operaLinkAudiobook"
            placeholder="https://...">

        <label>
            📝 Link extern test de lectură
        </label>

        <input
            type="url"
            id="operaLinkTestLectura"
            placeholder="https://...">

        <label>
            📸 Imagine personaje pentru Instagram
        </label>

        <input
            type="file"
            id="operaPersonajeInstagram"
            accept="image/*">

        <button
            class="admin-btn"
            onclick="adaugaOpera()">

            ➕ Adaugă operă

        </button>

        <div
            id="operaStatus"
            class="admin-status">
        </div>

    </div>


    <div
        class="admin-box"
        style="margin-top:20px;">

        <h3>
            👥 Autori existenți
        </h3>

        <button
            class="admin-btn"
            onclick="incarcaAutoriAdmin()">

            🔄 Reîmprospătează

        </button>

        <div id="listaAutoriAdmin"></div>

    </div>


    <div
        class="admin-box"
        style="margin-top:20px;">

        <h3>
            📚 Opere existente
        </h3>

        <button
            class="admin-btn"
            onclick="incarcaOpereAdmin()">

            🔄 Reîmprospătează

        </button>

        <div id="listaOpereAdmin"></div>

    </div>


    <div
        class="admin-box"
        style="margin-top:20px;">

        <h3>
            📁 PDF-uri din bucket
        </h3>

        <button
            class="admin-btn"
            onclick="incarcaListaPDF()">

            🔄 Reîmprospătează lista

        </button>

        <div
            id="listaPDF"
            class="lista-pdf">
        </div>

    </div>

</section>


<div
    id="loginModal"
    class="login-modal ascuns">

    <div class="login-box">

        <button
            class="inchide-login"
            onclick="inchideLogin()">

            ✕

        </button>

        <h2>🔐 Contul tău</h2>

        <div class="auth-tabs">
            <button id="loginTab" class="auth-tab activ" onclick="schimbaAuthForm('login')">Logare</button>
            <button id="registerTab" class="auth-tab" onclick="schimbaAuthForm('register')">Register</button>
        </div>

        <div id="loginForm" class="auth-form">
            <p>Intră în contul tău.</p>
            <input type="email" id="loginEmail" placeholder="Email">
            <input type="password" id="loginPassword" placeholder="Parolă">
            <button class="login-btn" onclick="loginUtilizator()">🔐 Logare</button>
            <button class="login-btn reset-btn" type="button" onclick="reseteazaParola()">🔑 Am uitat parola</button>
        </div>

        <div id="registerForm" class="auth-form ascuns">
            <p>Creează un cont de profesor sau elev.</p>
            <input type="email" id="registerEmail" placeholder="Email">
            <input type="password" id="registerPassword" placeholder="Parolă (minimum 6 caractere)">
            <select id="registerRole">
                <option value="elev">Elev</option>
                <option value="profesor">Profesor</option>
            </select>
            <button class="login-btn" onclick="inregistreazaUtilizator()">📝 Creează cont</button>
        </div>

        <p id="loginMesaj"></p>

    </div>

</div>


<footer>

    <h2>
        Limba și Literatura Română 📖
    </h2>

    <p>
        Un proiect dedicat frumuseții limbii române.
    </p>

    <p>
        © 2026
    </p>

</footer>

`;

// ======================================================
// BUTON SEARCH
// ======================================================

const searchToggle =
    document.getElementById("searchToggle");

const searchContainer =
    document.querySelector(".search-container");


searchToggle.addEventListener("click", function () {

    searchContainer.classList.toggle("ascuns");

    if (!searchContainer.classList.contains("ascuns")) {

        searchInput.focus();

    }

});


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;
}

function golesteCampuri(...iduri) {

    iduri.forEach(id => {

        const element = document.getElementById(id);

        if (element) {
            element.value = "";
        }

    });
}

// ======================================================
// CĂUTARE
// ======================================================

let dateCautare = [];


function pregatesteDateCautare(autori, opere) {

    dateCautare = [];

    (autori || []).forEach(autor => {

        dateCautare.push({
            tip: "Autor",
            titlu: autor.nume || "",
            descriere: autor.descriere || "",
            categorie: autor.categorie || "",
            autorId: autor.id
        });

    });


    (opere || []).forEach(opera => {

        const autor = (autori || []).find(
            a =>
                String(a.id) ===
                String(opera.autor_id)
        );

        dateCautare.push({
            tip: "Operă",
            titlu: opera.titlu || "",
            descriere: autor
                ? autor.nume
                : "",
            categorie: autor
                ? autor.categorie
                : "",
            autorId: opera.autor_id,
            operaId: opera.id
        });

    });

}


function cautaSite(text) {

    const results =
        document.getElementById(
            "searchResults"
        );

    if (!results) {
        return;
    }


    const cautare =
        text
            .trim()
            .toLowerCase();


    if (!cautare) {

        results.innerHTML = "";
        results.classList.remove("activ");

        return;

    }


    const rezultate =
        dateCautare.filter(item => {

            const continut = [

                item.tip,
                item.titlu,
                item.descriere,
                item.categorie

            ]
                .join(" ")
                .toLowerCase();

            return continut.includes(cautare);

        });


    if (rezultate.length === 0) {

        results.innerHTML = `
            <div class="search-no-results">
                🔍 Nu am găsit rezultate pentru
                „${escapeHTML(text)}”.
            </div>
        `;

        results.classList.add("activ");

        return;

    }


    results.innerHTML =
        rezultate
            .slice(0, 20)
            .map(item => `

                <div
                    class="search-result"
                    onclick="deschideRezultatCautare(
                        '${item.tip}',
                        '${item.autorId}',
                        '${item.operaId || ""}'
                    )">

                    <strong>
                        ${escapeHTML(item.titlu)}
                    </strong>

                    <small>
                        ${escapeHTML(item.tip)}
                        ${item.categorie
                    ? " • " +
                    escapeHTML(item.categorie)
                    : ""}
                        ${item.tip === "Operă" &&
                    item.descriere
                    ? " • " +
                    escapeHTML(item.descriere)
                    : ""}
                    </small>

                </div>

            `)
            .join("");


    results.classList.add("activ");

}


async function deschideRezultatCautare(
    tip,
    autorId,
    operaId
) {

    const input =
        document.getElementById(
            "searchInput"
        );

    const results =
        document.getElementById(
            "searchResults"
        );


    if (input) {
        input.value = "";
    }

    if (results) {
        results.classList.remove("activ");
        results.innerHTML = "";
    }


    if (tip === "Autor") {

        const { data: autor } =
            await supabaseClient
                .from("autori")
                .select("categorie")
                .eq("id", autorId)
                .single();


        if (!autor) {
            return;
        }


        const categorie =
            String(
                autor.categorie || ""
            )
                .trim()
                .toLowerCase();


        const sectiuni = {
            poezie: "poezie",
            proza: "proza",
            teatru: "teatru"
        };


        const ancora =
            sectiuni[categorie];


        if (ancora) {

            window.location.hash =
                ancora;

        }

        return;

    }


    if (tip === "Operă") {

        const { data: opera } =
            await supabaseClient
                .from("opere")
                .select("autor_id")
                .eq("id", operaId)
                .single();


        if (!opera) {
            return;
        }


        const { data: autor } =
            await supabaseClient
                .from("autori")
                .select("categorie")
                .eq("id", opera.autor_id)
                .single();


        if (!autor) {
            return;
        }


        const categorie =
            String(
                autor.categorie || ""
            )
                .trim()
                .toLowerCase();


        if (
            ["poezie", "proza", "teatru"]
                .includes(categorie)
        ) {

            window.location.hash =
                categorie;

        }

    }

}


// ======================================================
// OBȚINE CALEA DIN URL
// ======================================================

function obtineCaleStorage(url) {

    if (!url) {
        return null;
    }

    try {

        const marker =
            "/storage/v1/object/";

        const index =
            url.indexOf(marker);

        if (index === -1) {

            return null;

        }


        const dupaMarker =
            url.substring(
                index + marker.length
            );


        const pozitii =
            dupaMarker.indexOf("/");


        if (pozitii === -1) {

            return null;

        }


        const cale =
            dupaMarker.substring(
                pozitii + 1
            );


        return decodeURIComponent(cale);

    } catch (error) {

        console.error(
            "Eroare extragere cale:",
            error
        );

        return null;
    }
}


// ======================================================
// ÎNCARCĂ AUTORII PE SITE
// ======================================================

async function incarcaAutori() {

    const containere = {
        poezie: document.getElementById("poezieCards"),
        proza: document.getElementById("prozaCards"),
        teatru: document.getElementById("teatruCards")
    };


    if (!containere.poezie || !containere.proza || !containere.teatru) {
        return;
    }


    Object.values(containere).forEach(container => {
        container.innerHTML =
            "<p style='text-align:center'>Se încarcă autorii...</p>";
    });


    try {

        const {
            data: autori,
            error: eroareAutori
        } =
            await supabaseClient
                .from("autori")
                .select("*")
                .order("nume", {
                    ascending: true
                });


        if (eroareAutori) {

            console.error(
                eroareAutori
            );

            Object.values(containere).forEach(container => {
                container.innerHTML =
                    "<p style='color:#c62828;text-align:center'>" +
                    "Nu am putut încărca autorii." +
                    "</p>";
            });

            return;
        }


        const {
            data: opere,
            error: eroareOpere
        } =
            await supabaseClient
                .from("opere")
                .select("*")
                .order("titlu", {
                    ascending: true
                });


        if (eroareOpere) {

            console.error(
                eroareOpere
            );

            Object.values(containere).forEach(container => {
                container.innerHTML =
                    "<p style='color:#c62828;text-align:center'>" +
                    "Nu am putut încărca operele." +
                    "</p>";
            });

            return;
        }

        pregatesteDateCautare(
            autori,
            opere
        );

        const carduri = {
            poezie: [],
            proza: [],
            teatru: []
        };


        for (
            const autor of autori || []
        ) {

            const opereAutor =
                (opere || []).filter(
                    opera =>
                        String(opera.autor_id) ===
                        String(autor.id)
                );


            const opereHTML = [];


            for (
                const opera of opereAutor
            ) {

                const areRezumat =
                    !!opera.pdf;

                const areValori =
                    !!opera.pdf_valori_morale;

                const areCaracterizare =
                    !!opera.pdf_caracterizare;

                const areRezumatWord =
                    !!opera.rezumat_word;

                const areLinkFilm =
                    !!opera.link_film;

                const areLinkAudiobook =
                    !!opera.link_audiobook;

                const areLinkTestLectura =
                    !!opera.link_test_lectura;

                const areImaginePersonaje =
                    !!opera.personaje_instagram;


                if (
                    !areRezumat &&
                    !areValori &&
                    !areCaracterizare &&
                    !areRezumatWord &&
                    !areLinkFilm &&
                    !areLinkAudiobook &&
                    !areLinkTestLectura &&
                    !areImaginePersonaje
                ) {

                    continue;

                }


                let butoane = "";


                if (areRezumat) {

                    butoane += `

                        <button
                            class="opera-btn"
                            type="button"
                            onclick='deschidePDF(${JSON.stringify(opera.pdf)})'>

                            📕 Rezumat

                        </button>

                    `;

                }


                if (areValori) {

                    butoane += `

                        <button
                            class="opera-btn"
                            type="button"
                            onclick='deschidePDF(${JSON.stringify(opera.pdf_valori_morale)})'>

                            ❤️ Valori morale

                        </button>

                    `;

                }


                if (areCaracterizare) {

                    butoane += `

                        <button
                            class="opera-btn"
                            type="button"
                            onclick='deschidePDF(${JSON.stringify(opera.pdf_caracterizare)})'>

                            👤 Personaje si semnificatii

                        </button>

                    `;

                }

                if (areRezumatWord) {

                    butoane += `

                        <button
                            class="opera-btn"
                            type="button"
                            onclick='descarcaRezumatWord(${JSON.stringify(opera.rezumat_word)})'>

                            📄 Descarcă rezumat Word

                        </button>

                    `;

                }

                if (areLinkFilm) {
                    butoane += `
                        <a class="opera-link" href="${escapeHTML(opera.link_film)}" target="_blank" rel="noopener noreferrer">🎬 Film</a>
                    `;
                }

                if (areLinkAudiobook) {
                    butoane += `
                        <a class="opera-link" href="${escapeHTML(opera.link_audiobook)}" target="_blank" rel="noopener noreferrer">🎧 Audiobook</a>
                    `;
                }

                if (areLinkTestLectura) {
                    butoane += `
                        <a class="opera-link" href="${escapeHTML(opera.link_test_lectura)}" target="_blank" rel="noopener noreferrer">📝 Test de lectură</a>
                    `;
                }

                const personajeInstagramHTML = areImaginePersonaje
                    ? `
                        <div class="personaje-instagram">
                            <img src="${escapeHTML(opera.personaje_instagram)}" alt="Personajele din ${escapeHTML(opera.titlu)}" loading="lazy">
                        </div>
                    `
                    : "";


                opereHTML.push(`

                    <div class="opera">

                        ${personajeInstagramHTML}

                        <h4>
                            📖 ${escapeHTML(opera.titlu)}
                        </h4>

                        <div class="opera-list">

                            ${butoane}

                        </div>

                    </div>

                `);

            }


            if (
                opereHTML.length === 0
            ) {

                continue;

            }


            const pozaHTML =
                autor.poza
                    ? `

                    <img
                        src="${escapeHTML(autor.poza)}"
                        alt="${escapeHTML(autor.nume)}"
                        loading="lazy"
                        onerror="this.style.display='none';">

                    `
                    : "";


            const categorie =
                String(autor.categorie || "")
                    .trim()
                    .toLowerCase();

            if (!carduri[categorie]) {
                continue;
            }


            carduri[categorie].push(`

                <div class="card autor">

                    <div class="portret">

                        ${pozaHTML}

                    </div>

                    <h3>
                        ${escapeHTML(autor.nume)}
                    </h3>

                    <p>
                        ${escapeHTML(autor.descriere)}
                    </p>

                    <div class="opera-list">

                        ${opereHTML.join("")}

                    </div>

                </div>

            `);

        }


        Object.entries(containere).forEach(([categorie, container]) => {
            container.innerHTML =
                carduri[categorie].length > 0
                    ? carduri[categorie].join("")
                    : "<p style='text-align:center'>" +
                    "Momentan nu există materiale disponibile." +
                    "</p>";
        });


    } catch (error) {

        console.error(
            "Eroare încărcare autori:",
            error
        );

        Object.values(containere).forEach(container => {
            container.innerHTML =
                "<p style='color:#c62828;text-align:center'>" +
                "A apărut o eroare." +
                "</p>";
        });

    }
}




// ======================================================
// DESCHIDE PDF PRIVAT CU URL SEMNAT
// ======================================================

async function deschidePDF(pdfUrl) {

    if (!pdfUrl) {

        alert(
            "PDF-ul nu există."
        );

        return;
    }

    try {

        const cale =
            obtineCalePDF(pdfUrl);


        console.log(
            "Referință PDF:",
            pdfUrl
        );

        console.log(
            "Cale PDF în Storage:",
            cale
        );


        if (!cale) {

            alert(
                "Nu am putut identifica fișierul PDF."
            );

            return;
        }


        const {
            data,
            error
        } =
            await supabaseClient
                .storage
                .from(BUCKET)
                .createSignedUrl(
                    cale,
                    60 * 60
                );


        if (error) {

            console.error(
                "Eroare URL semnat:",
                error
            );

            alert(
                "Nu am putut deschide PDF-ul: " +
                error.message
            );

            return;
        }


        if (
            !data ||
            !data.signedUrl
        ) {

            console.error(
                "Nu există signedUrl:",
                data
            );

            alert(
                "Supabase nu a returnat URL-ul PDF-ului."
            );

            return;
        }


        console.log(
            "URL PDF semnat:",
            data.signedUrl
        );


        window.open(
            data.signedUrl,
            "_blank"
        );


    } catch (error) {

        console.error(
            "Eroare deschidere PDF:",
            error
        );

        alert(
            "A apărut o eroare la deschiderea PDF-ului: " +
            error.message
        );

    }

}

async function obtineURLSemnat(valoare, optiuni = {}) {

    const cale = obtineCalePDF(valoare);

    if (!cale) {
        throw new Error("Nu am putut identifica fișierul din Storage.");
    }

    const { data, error } =
        await supabaseClient
            .storage
            .from(BUCKET)
            .createSignedUrl(cale, 60 * 60, optiuni);

    if (error) {
        throw error;
    }

    if (!data || !data.signedUrl) {
        throw new Error("Supabase nu a returnat URL-ul semnat.");
    }

    return data.signedUrl;
}

async function descarcaRezumatWord(wordUrl) {

    if (!wordUrl) {
        alert("Rezumatul Word nu există.");
        return;
    }

    try {

        const urlSemnat =
            await obtineURLSemnat(wordUrl, { download: true });

        const link = document.createElement("a");
        link.href = urlSemnat;
        link.download = "rezumat.docx";
        document.body.appendChild(link);
        link.click();
        link.remove();

    } catch (error) {
        console.error("Eroare descărcare rezumat Word:", error);
        alert("Nu am putut descărca rezumatul Word.");
    }
}


// ======================================================

// ======================================================
// QUIZURI CREATE DE ADMIN
// ======================================================

async function incarcaQuizuriSite() {

    console.log("🔥 INCARCA QUIZURI PORNITĂ");

    const container =
        document.getElementById("listaQuizuriSite");

    console.log("📦 CONTAINER:", container);

    console.log(
        "🔌 SUPABASE:",
        typeof supabaseClient
    );

    if (!container) {
        console.warn("Nu există #listaQuizuriSite");
        return;
    }

    if (typeof supabaseClient === "undefined") {

        console.error(
            "supabaseClient NU este definit!"
        );

        container.innerHTML = `
            <p class="quiz-eroare">
                Conexiunea cu baza de date nu este disponibilă.
            </p>
        `;

        return;
    }

    container.innerHTML = `
        <p>🌲 Se încarcă aventurile...</p>
    `;

    try {

        const {
            data: quizuri,
            error
        } = await supabaseClient
            .from("quizuri")
            .select("*")
            .eq("activ", true)
            .order("created_at", {
                ascending: false
            });

        console.log(
            "QUIZURI GĂSITE:",
            quizuri
        );

        console.log(
            "EROARE QUIZURI:",
            error
        );

        if (error) {

            console.error(
                "Eroare încărcare quizuri:",
                error
            );

            container.innerHTML = `
                <p class="quiz-eroare">
                    Nu am putut încărca quizurile.
                </p>
            `;

            return;
        }

        if (!quizuri || quizuri.length === 0) {

            container.innerHTML = `
                <div class="quiz-fara-rezultate">

                    <div style="font-size: 50px;">
                        🌲
                    </div>

                    <h3>
                        Nu există încă quizuri
                    </h3>

                    <p>
                        Administratorul nu a publicat încă niciun quiz.
                    </p>

                </div>
            `;

            return;
        }

        container.innerHTML = quizuri.map(
            quiz => {

                return `
                    <div class="quiz-aventura-card">

                        <div class="quiz-aventura-icon">
                            🌲🐺
                        </div>

                        <div class="quiz-aventura-info">

                            <h3>
                                ${escapeHTML(
                                    quiz.titlu ||
                                    "Quiz fără titlu"
                                )}
                            </h3>

                            ${
                                quiz.categorie
                                    ? `
                                        <span class="quiz-categorie">
                                            ${escapeHTML(
                                                quiz.categorie
                                            )}
                                        </span>
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

                        </div>

                        <button
                            class="quiz-start-btn"
                            type="button"
                            onclick="pornesteQuiz(${quiz.id})">

                            🌲 Începe aventura

                        </button>

                    </div>
                `;

            }
        ).join("");

        console.log(
            "QUIZURILE AU FOST AFIȘATE:",
            quizuri.length
        );

    } catch (error) {

        console.error(
            "Eroare quizuri:",
            error
        );

        container.innerHTML = `
            <p class="quiz-eroare">
                A apărut o eroare la încărcarea quizurilor.
            </p>
        `;
    }
}

// ======================================================
// PORNIRE QUIZ
// ======================================================
async function pornesteQuiz(quizId) {

    console.log("AM APĂSAT ÎNCEPE AVENTURA");
    console.log("quizId:", quizId);

    try {

        const {
            data: quiz,
            error: eroareQuiz
        } = await supabaseClient
            .from("quizuri")
            .select("*")
            .eq("id", quizId)
            .eq("activ", true)
            .single();

        console.log("QUIZ GĂSIT:", quiz);
        console.log("EROARE QUIZ:", eroareQuiz);

        if (eroareQuiz || !quiz) {

            console.error(
                "Nu am găsit quizul:",
                eroareQuiz
            );

            alert(
                "Nu am putut încărca acest quiz."
            );

            return;
        }

        const {
            data: intrebari,
            error: eroareIntrebari
        } = await supabaseClient
            .from("intrebari_quiz")
            .select("*")
            .eq("quiz_id", quizId)
            .order("ordine", {
                ascending: true
            });

        console.log(
            "ÎNTREBĂRI GĂSITE:",
            intrebari
        );

        console.log(
            "EROARE ÎNTREBĂRI:",
            eroareIntrebari
        );

        if (eroareIntrebari) {

            console.error(
                eroareIntrebari
            );

            alert(
                "Nu am putut încărca întrebările."
            );

            return;
        }

        if (!intrebari || intrebari.length === 0) {

            alert(
                "Acest quiz nu are încă întrebări."
            );

            return;
        }

        console.log(
            "PORNESC JOCUL:",
            quiz.titlu
        );

        pornesteJocQuiz(
            quiz,
            intrebari
        );

    } catch (error) {

        console.error(
            "Eroare pornire quiz:",
            error
        );

        alert(
            "A apărut o eroare la pornirea quizului."
        );
    }
}

 
       

// ======================================================
// JOC QUIZ - PĂDURE
// ======================================================

let jocQuiz = {
    quiz: null,
    intrebari: [],
    index: 0,
    vieti: 3,
    scor: 0
};


function pornesteJocQuiz(
    quiz,
    intrebari
) {
    
console.log("AM INTRAT ÎN pornesteJocQuiz");
console.log("quiz:", quiz);
console.log("intrebari:", intrebari);

    
    jocQuiz = {
        quiz: quiz,
        intrebari: intrebari,
        index: 0,
        vieti: 3,
        scor: 0
    };


    const quizSection =
        document.getElementById("quiz");

    if (!quizSection) {
        return;
    }


    quizSection.innerHTML = `

        <div class="quiz-joc">

            <div class="quiz-joc-header">

                <button
                    class="quiz-back-btn"
                    onclick="opresteQuiz()">

                    ← Înapoi la quizuri

                </button>

                <div class="quiz-joc-title">

                    🌲
                    ${escapeHTML(quiz.titlu)}
                    🌲

                </div>

            </div>


            <div class="padure-joc">

                <div class="copac copac-1">🌲</div>
                <div class="copac copac-2">🌲</div>
                <div class="copac copac-3">🌲</div>
                <div class="copac copac-4">🌲</div>
                <div class="copac copac-5">🌲</div>

                <div id="animalJoc"
                     class="animal-joc">
                    🐺
                </div>

                <div id="omJoc"
                     class="om-joc">
                    🧍
                </div>

                <div class="drum-joc"></div>

            </div>


            <div class="quiz-info">

                <div id="vietiJoc">
                    ❤️ ❤️ ❤️
                </div>

                <div id="progresJoc">
                    Întrebarea 1 / ${intrebari.length}
                </div>

                <div id="scorJoc">
                    ⭐ Scor: 0
                </div>

            </div>


            <div id="intrebareJoc"></div>

        </div>

    `;


    afiseazaIntrebareaQuiz();
}

function afiseazaIntrebareaQuiz() {

    console.log("AFISEZ INTREBAREA:", jocQuiz.index);

    const intrebare = jocQuiz.intrebari[jocQuiz.index];

    if (!intrebare) {
        console.log("Nu mai sunt întrebări.");
        finalizeazaQuiz();
        return;
    }

    const container = document.getElementById("intrebareJoc");

    if (!container) {
        console.error("Nu există elementul #intrebareJoc");
        return;
    }

    actualizeazaInformatiiJoc();

    const variante = [
        {
            litera: "A",
            text: intrebare.raspuns_a || ""
        },
        {
            litera: "B",
            text: intrebare.raspuns_b || ""
        },
        {
            litera: "C",
            text: intrebare.raspuns_c || ""
        },
        {
            litera: "D",
            text: intrebare.raspuns_d || ""
        }
    ];

    let animal = "🐺";

    if (intrebare.animal === "vulpe") {
        animal = "🦊";
    } else if (intrebare.animal === "urs") {
        animal = "🐻";
    } else if (intrebare.animal === "cerb") {
        animal = "🦌";
    } else if (intrebare.animal === "iepure") {
        animal = "🐰";
    } else if (intrebare.animal === "mistret") {
        animal = "🐗";
    } else if (intrebare.animal === "bufnita") {
        animal = "🦉";
    }

    container.innerHTML = `

        <div class="intrebare-card">

            <div class="animal-intrebare">
                ${animal}
            </div>

            <h2>
                ${intrebare.intrebare || "Întrebarea nu există"}
            </h2>

            <div class="raspunsuri-joc">

                ${variante.map(v => `

                    <button
                        type="button"
                        class="raspuns-joc raspuns-${v.litera}"
                        onclick="verificaRaspuns('${v.litera}')">

                        <span class="litera">
                            ${v.litera}
                        </span>

                        <span>
                            ${v.text}
                        </span>

                    </button>

                `).join("")}

            </div>

        </div>

    `;

    console.log("ÎNTREBAREA A FOST AFIȘATĂ");
}


function verificaRaspuns(raspuns) {

    const intrebare =
        jocQuiz.intrebari[jocQuiz.index];

    const butoane =
        document.querySelectorAll(
            ".raspuns-joc"
        );


    butoane.forEach(buton => {
        buton.disabled = true;
    });


    const corect =
        String(
            intrebare.raspuns_corect
        ).toUpperCase();


    const butonAles =
        document.querySelector(
            `.raspuns-${raspuns}`
        );


    if (raspuns === corect) {

        if (butonAles) {
            butonAles.classList.add(
                "raspuns-corect"
            );
        }


        jocQuiz.scor += 10;


        animeazaCorect();


        setTimeout(() => {

            jocQuiz.index++;

            afiseazaIntrebareaQuiz();

        }, 1200);


    } else {

        if (butonAles) {
            butonAles.classList.add(
                "raspuns-gresit"
            );
        }


        jocQuiz.vieti--;


        animeazaLovitura();


        setTimeout(() => {

            if (jocQuiz.vieti <= 0) {

                finalizeazaQuiz();

                return;
            }


            jocQuiz.index++;

            afiseazaIntrebareaQuiz();

        }, 1500);

    }

}
function actualizeazaInformatiiJoc() {

    const vieti =
        document.getElementById(
            "vietiJoc"
        );

    const progres =
        document.getElementById(
            "progresJoc"
        );

    const scor =
        document.getElementById(
            "scorJoc"
        );


    if (vieti) {

        vieti.innerHTML =
            "❤️".repeat(jocQuiz.vieti) +
            " 🖤".repeat(
                3 - jocQuiz.vieti
            );

    }


    if (progres) {

        progres.textContent =
            `Întrebarea ${jocQuiz.index + 1} / ${jocQuiz.intrebari.length}`;

    }


    if (scor) {

        scor.textContent =
            `⭐ Scor: ${jocQuiz.scor}`;

    }

}
function animeazaCorect() {

    const om =
        document.getElementById(
            "omJoc"
        );

    if (!om) {
        return;
    }


    om.classList.remove(
        "om-corect"
    );


    void om.offsetWidth;


    om.classList.add(
        "om-corect"
    );

}
function animeazaLovitura() {

    const om =
        document.getElementById(
            "omJoc"
        );

    const animal =
        document.getElementById(
            "animalJoc"
        );


    if (om) {

        om.classList.remove(
            "om-lovit"
        );

        void om.offsetWidth;

        om.classList.add(
            "om-lovit"
        );

    }


    if (animal) {

        animal.classList.remove(
            "animal-atac"
        );

        void animal.offsetWidth;

        animal.classList.add(
            "animal-atac"
        );

    }

}
function finalizeazaQuiz() {

    const quizSection =
        document.getElementById(
            "quiz"
        );


    if (!quizSection) {
        return;
    }


    const total =
        jocQuiz.intrebari.length;

    const raspunse =
        Math.min(
            jocQuiz.index + 1,
            total
        );


    let mesaj = "";

    if (jocQuiz.vieti <= 0) {

        mesaj =
            "Ai rămas fără vieți. Mai încearcă o dată!";

    } else {

        mesaj =
            "Felicitări! Ai terminat aventura!";

    }


    const procent =
        total > 0
            ? Math.round(
                (jocQuiz.scor /
                    (total * 10)) * 100
            )
            : 0;


    quizSection.innerHTML = `

        <div class="quiz-final">

            <div class="final-padure">
                🌲 🌲 🧍 🌲 🌲
            </div>

            <h2>
                ${jocQuiz.vieti > 0
                    ? "🎉 Felicitări!"
                    : "💔 Joc terminat"}
            </h2>

            <p>
                ${mesaj}
            </p>


            <div class="scor-final">

                <div>
                    ⭐
                </div>

                <strong>
                    ${jocQuiz.scor}
                </strong>

                <span>
                    puncte
                </span>

            </div>


            <div class="rezultat-final">

                ❤️ Vieți rămase:
                ${jocQuiz.vieti}

                <br>

                📊 Rezultat:
                ${procent}%

            </div>


            <div class="final-butoane">

                <button
                    class="quiz-start-btn"
                    onclick="repornesteQuiz()">

                    🔄 Joacă din nou

                </button>

                <button
                    class="quiz-back-btn"
                    onclick="opresteQuiz()">

                    🌲 Alte quizuri

                </button>

            </div>

        </div>

    `;
}
function repornesteQuiz() {

    if (!jocQuiz.quiz) {
        return;
    }

    pornesteJocQuiz(
        jocQuiz.quiz,
        jocQuiz.intrebari
    );

}

function opresteQuiz() {

    const quizSection =
        document.getElementById("quiz");

    if (!quizSection) {
        return;
    }

    window.location.hash = "quiz";

    quizSection.innerHTML = `

        <div class="quizuri-create">

            <h2 class="titlu">
                Quiz-uri 🎮
            </h2>

            <p class="subtitlu">
                Alege aventura pe care vrei să o începi.
            </p>

            <h3>
                🌲 Quizuri interactive
            </h3>

            <p>
                Alege un quiz și pornește aventura prin pădure.
            </p>

            <div id="listaQuizuriSite">
                <p>Se încarcă quizurile...</p>
            </div>

        </div>

    `;

 incarcaQuizuriSite();
}


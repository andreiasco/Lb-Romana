console.log("SCRIPT.JS SE ÎNCARCĂ");

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


// ======================================================
// HTML + CSS   
// ======================================================

site.innerHTML = `

<style>

* {
    box-sizing: border-box;
    scroll-behavior: smooth;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #faf6ef;
    color: #292329;
    transition: .3s;
}


/* ======================================================
   MENIU
====================================================== */

nav {
    position: sticky;
    top: 0;
    z-index: 1000;

    background: #35152a;

    padding: 15px;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 15px;
    flex-wrap: wrap;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

nav a:hover {
    color: #f4b6d0;
}

nav button {
    border: none;
    background: #7b2450;
    color: white;

    padding: 10px 15px;

    border-radius: 20px;

    cursor: pointer;
    font-weight: bold;
}

nav button:hover {
    background: #a8446c;
}


/* ======================================================
   HERO
====================================================== */

.hero {
    min-height: 550px;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

    color: white;

    padding: 30px;

    background:
        linear-gradient(
            rgba(53,21,42,.8),
            rgba(123,36,80,.8)
        ),
        radial-gradient(
            circle,
            #c76c91,
            #35152a
        );
}

.hero h1 {
    font-size: clamp(40px, 7vw, 75px);
    margin-bottom: 20px;
}

.hero p {
    font-size: 21px;
    line-height: 1.6;
}

.buton {
    display: inline-block;

    margin-top: 25px;

    padding: 14px 25px;

    background: white;
    color: #7b2450;

    border-radius: 25px;

    text-decoration: none;
    font-weight: bold;
}


/* ======================================================
   SECTIUNI
====================================================== */

section {
    max-width: 1100px;
    margin: 70px auto;
    padding: 20px;
}

.titlu {
    text-align: center;
    color: #7b2450;
    font-size: 38px;
}

.subtitlu {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
}


/* ======================================================
   CARDURI
====================================================== */

.cards {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(240px, 1fr));

    gap: 25px;
}

.card {
    background: white;

    padding: 30px;

    border-radius: 18px;

    box-shadow:
        0 7px 25px rgba(0,0,0,.08);

    border-top: 5px solid #7b2450;

    transition: .3s;
}

.card:hover {
    transform: translateY(-7px);
}

.literatura-box {
    color: inherit;
    text-decoration: none;
}

.card h3 {
    color: #7b2450;
}

.card p {
    line-height: 1.7;
    color: #555;
}

.icon {
    font-size: 45px;
}


/* ======================================================
   AUTORI
====================================================== */

.autor {
    text-align: center;
}

.portret {
    width: 120px;
    height: 120px;

    margin: 0 auto 20px;

    border-radius: 50%;

    overflow: hidden;

    background: #7b2450;
}

.portret img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    display: block;
}

.opera {
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid #eee;
}

.opera-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-top: 15px;
}

.opera-btn {
    padding: 10px 15px;

    background: #f4dce7;
    color: #7b2450;

    border: 2px solid #7b2450;

    border-radius: 8px;

    cursor: pointer;

    font-weight: bold;
}

.opera-btn:hover {
    background: #7b2450;
    color: white;
}


/* ======================================================
   CITAT
====================================================== */

.citat {
    max-width: 900px;
    margin: auto;

    padding: 45px;

    background:
        linear-gradient(
            135deg,
            #7b2450,
            #a8446c
        );

    color: white;

    border-radius: 25px;

    text-align: center;
}

.citat p {
    font-size: 25px;
    font-style: italic;
    line-height: 1.6;
}


/* ======================================================
   QUIZ
====================================================== */

.quiz-selectie {
    display: flex;
    justify-content: center;

    gap: 20px;

    margin: 30px 0 50px;

    flex-wrap: wrap;
}

.quiz-tab {
    border: none;

    padding: 15px 30px;

    border-radius: 30px;

    color: white;

    font-size: 17px;
    font-weight: bold;

    cursor: pointer;
}

.quiz-tab.kahoot {
    background: #46178f;
}

.quiz-tab.wordwall {
    background: #96008c;
}

.quiz-tab.activ {
    box-shadow:
        0 5px 20px rgba(0,0,0,.3);

    transform: scale(1.05);
}

.quizuri {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(450px, 1fr));

    gap: 30px;
}

.quiz-card,
.kahoot-card {
    background: white;

    padding: 25px;

    border-radius: 20px;

    text-align: center;

    box-shadow:
        0 7px 25px rgba(0,0,0,.08);
}

.quiz-card {
    border-top: 5px solid #008c95;
}

.kahoot-card {
    border-top: 5px solid #46178f;
}

.quiz-card h3 {
    color: #008c95;
}

.kahoot-card h3 {
    color: #46178f;
}

.quiz-card iframe {
    width: 100%;
    height: 380px;

    border: none;
    border-radius: 12px;
}

.kahoot-link {
    display: inline-block;

    background: #46178f;
    color: white;

    padding: 14px 25px;

    border-radius: 25px;

    text-decoration: none;
    font-weight: bold;
}

.ascuns {
    display: none !important;
}


/* ======================================================
   LOGIN
====================================================== */

.login-modal {
    position: fixed;

    inset: 0;

    z-index: 9999;

    display: flex;

    align-items: center;
    justify-content: center;

    background: rgba(0,0,0,.75);
}

.login-modal.ascuns {
    display: none;
}

.login-box {
    position: relative;

    width: min(90%, 420px);

    padding: 35px;

    background: white;

    border-radius: 20px;

    box-shadow:
        0 15px 50px rgba(0,0,0,.4);

    text-align: center;
}

.login-box h2 {
    color: #7b2450;
}

.login-box input {
    width: 100%;

    padding: 13px;

    margin: 7px 0;

    border: 2px solid #ddd;

    border-radius: 10px;

    font-size: 16px;
}

.login-btn {
    width: 100%;

    margin-top: 10px;

    padding: 13px;

    border: none;

    border-radius: 10px;

    background: #7b2450;

    color: white;

    font-weight: bold;

    cursor: pointer;
}

.login-btn:hover {
    background: #a8446c;
}

.reset-btn {
    background: #555;
}

.reset-btn:hover {
    background: #333;
}

.inchide-login {
    position: absolute;

    right: 15px;
    top: 10px;

    border: none;

    background: none;

    font-size: 22px;

    cursor: pointer;
}

#loginMesaj {
    min-height: 20px;
    font-weight: bold;
}


/* ======================================================
   ADMIN
====================================================== */

.admin-panel {
    max-width: 1100px;

    margin: 40px auto;

    padding: 25px;

    background: #f4dce7;

    border: 3px solid #7b2450;

    border-radius: 20px;

    box-shadow:
        0 10px 35px rgba(0,0,0,.15);
}

.admin-panel.ascuns {
    display: none;
}

.admin-header {
    display: flex;

    justify-content: space-between;
    align-items: center;

    gap: 20px;

    flex-wrap: wrap;
}

.admin-header h2 {
    color: #7b2450;
}

.admin-box {
    background: white;

    padding: 25px;

    border-radius: 15px;

    box-shadow:
        0 5px 20px rgba(0,0,0,.08);
}

.admin-box h3 {
    color: #7b2450;
}

.admin-box input,
.admin-box textarea,
.admin-box select {
    width: 100%;

    padding: 12px;

    margin: 7px 0 12px;

    border: 2px solid #ddd;

    border-radius: 10px;

    font-size: 16px;
}

.admin-box textarea {
    resize: vertical;
}

.admin-box label {
    display: block;

    margin-top: 12px;
    margin-bottom: 5px;

    font-weight: bold;
    color: #7b2450;
}

.admin-autor,
.admin-opera {
    padding: 15px;
    margin-top: 15px;

    background: #f8eef3;

    border-radius: 10px;

    border-left: 5px solid #7b2450;
}

.pdf-exista {
    color: #2e7d32;
    font-weight: bold;
}

.pdf-lipsa {
    color: #c62828;
}

.admin-btn {
    margin-top: 12px;

    border: none;

    padding: 12px 20px;

    border-radius: 10px;

    background: #7b2450;

    color: white;

    font-weight: bold;

    cursor: pointer;
}

.admin-btn:hover {
    background: #a8446c;
}

.logout-btn,
.sterge-opera-btn {
    background: #c62828;
}

.admin-status {
    margin-top: 15px;

    font-weight: bold;

    min-height: 20px;
}

.lista-pdf {
    margin-top: 20px;
}

.pdf-item {
    display: flex;

    justify-content: space-between;
    align-items: center;

    gap: 10px;

    padding: 10px;

    margin-bottom: 8px;

    background: #f8eef3;

    border-radius: 8px;
}

.sterge-btn {
    border: none;

    background: #c62828;

    color: white;

    padding: 7px 10px;

    border-radius: 7px;

    cursor: pointer;
}


/* ======================================================
   FOOTER
====================================================== */

footer {
    background: #35152a;

    color: white;

    text-align: center;

    padding: 35px;
}


/* ======================================================
   DARK MODE
====================================================== */

body.dark {
    background: #181318;
    color: white;
}

body.dark .card,
body.dark .quiz-card,
body.dark .kahoot-card,
body.dark .login-box,
body.dark .admin-box {
    background: #271f27;
}

body.dark .card p,
body.dark .quiz-card p,
body.dark .kahoot-card p {
    color: #ddd;
}

body.dark .subtitlu {
    color: #bbb;
}

body.dark .admin-panel {
    background: #35152a;
}

body.dark .admin-autor,
body.dark .admin-opera,
body.dark .pdf-item {
    background: #181318;
}


/* ======================================================
   RESPONSIVE
====================================================== */

@media(max-width:700px) {

    .quizuri {
        grid-template-columns: 1fr;
    }

    .hero {
        min-height: 500px;
    }

    .hero h1 {
        font-size: 42px;
    }

    .hero p {
        font-size: 18px;
    }

    section {
        margin: 40px auto;
    }

    .pdf-item {
        flex-direction: column;
        align-items: stretch;
    }
}

</style>


<nav>

    <a href="#acasa">Acasă</a>
    <a href="#limba">Limba română</a>
    <a href="#literatura">Literatura</a>
    <a href="#poezie">Poezie</a>
    <a href="#proza">Proză</a>
    <a href="#teatru">Teatru</a>
    <a href="#materiale">Materiale</a>
    <a href="#quiz">Quiz-uri</a>

    <button onclick="schimbaTema()">
        🌙 Mod întunecat
    </button>

    <button onclick="afiseazaLogin()">
        🔐 Logare admin
    </button>

</nav>


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


<section id="materiale">

    <h2 class="titlu">
        Materiale 📚
    </h2>

    <p class="subtitlu">
        Materiale pentru studiul limbii și literaturii române.
    </p>

    <div class="cards">

        <div class="card">
            <div class="icon">📖</div>
            <h3>Mihai Eminescu</h3>
            <p>
                Informații despre viața și opera
                marelui poet român.
            </p>
        </div>

        <div class="card">
            <div class="icon">✍️</div>
            <h3>Gramatică</h3>
            <p>
                Noțiuni despre părțile de vorbire,
                propoziție și frază.
            </p>
        </div>

        <div class="card">
            <div class="icon">📚</div>
            <h3>Genuri literare</h3>
            <p>
                Genul epic, liric și dramatic.
            </p>
        </div>

    </div>

</section>


<section id="quiz">

    <h2 class="titlu">
        Quiz-uri 🎮
    </h2>

    <p class="subtitlu">
        Alege platforma pe care vrei să exersezi.
    </p>

    <div class="quiz-selectie">

        <button
            class="quiz-tab kahoot activ"
            onclick="arataQuiz('kahoot')">

            🎯 Kahoot

        </button>

        <button
            class="quiz-tab wordwall"
            onclick="arataQuiz('wordwall')">

            🧩 Wordwall

        </button>

    </div>


    <div id="kahoot" class="quizuri">

        <div class="kahoot-card">

            <h3>
                📝 Aplicarea regulilor în contexte noi
            </h3>

            <p>
                Exersează aplicarea regulilor de limbă română.
            </p>

            <a
                class="kahoot-link"
                href="https://play.kahoot.it/v2/?quizId=071aa0d4-21d3-426f-a7a3-4c8ab375d61b&hostId=abe4ceb9-8934-4647-a7f8-ee81f1f1ac7c"
                target="_blank"
                rel="noopener noreferrer">

                🎯 Deschide Kahoot

            </a>

        </div>


        <div class="kahoot-card">

            <h3>
                📚 Romanian Vocabulary in Context
            </h3>

            <p>
                Exersează vocabularul românesc.
            </p>

            <a
                class="kahoot-link"
                href="https://play.kahoot.it/v2/?quizId=bf406337-3185-409c-92c7-22471cf41e38&hostId=abe4ceb9-8934-4647-a7f8-ee81f1f1ac7c"
                target="_blank"
                rel="noopener noreferrer">

                🎯 Deschide Kahoot

            </a>

        </div>

    </div>


    <div
        id="wordwall"
        class="quizuri ascuns">

        <div class="quiz-card">

            <h3>
                🔤 Conjuncții de coordonare
            </h3>

            <iframe
                src="https://www.wordwall.net/resource/71605201/limba-rom%C3%A2n%C4%83/conjunc%C8%9Bii-coordonare"
                allowfullscreen>
            </iframe>

        </div>


        <div class="quiz-card">

            <h3>
                ✍️ Recapitulare – Verbul
            </h3>

            <iframe
                src="https://www.wordwall.net/resource/71415598/limba-rom%C3%A2n%C4%83/recapitulare-vi-viii-verbul"
                allowfullscreen>
            </iframe>

        </div>

    </div>

</section>


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

        <h2>
            🔐 Logare administrator
        </h2>

        <p>
            Introdu datele contului de administrator.
        </p>

        <input
            type="email"
            id="loginEmail"
            placeholder="Email">

        <input
            type="password"
            id="loginPassword"
            placeholder="Parolă">

        <button
            class="login-btn"
            onclick="loginAdmin()">

            🔐 Intră în panou

        </button>

        <button
            class="login-btn reset-btn"
            type="button"
            onclick="reseteazaParola()">

            🔑 Am uitat parola

        </button>

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
// ESCAPE HTML
// ======================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;
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


                if (
                    !areRezumat &&
                    !areValori &&
                    !areCaracterizare
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


                opereHTML.push(`

                    <div class="opera">

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


// ======================================================
// ADAUGĂ AUTOR + IMAGINE
// ======================================================

async function adaugaAutor() {

    const initiale =
        document
            .getElementById("autorInitiale")
            .value
            .trim();


    const nume =
        document
            .getElementById("autorNume")
            .value
            .trim();


    const categorie =
        document
            .getElementById("autorCategorie")
            .value;


    const pozaInput =
        document.getElementById(
            "autorPoza"
        );


    const poza =
        pozaInput.files[0];


    const descriere =
        document
            .getElementById("autorDescriere")
            .value
            .trim();


    const status =
        document.getElementById(
            "autorStatus"
        );


    if (!initiale || !nume) {

        status.textContent =
            "Completează inițialele și numele autorului.";

        status.style.color =
            "#c62828";

        return;

    }


    if (!categorie) {

        status.textContent =
            "Selectează genul literar al autorului.";

        status.style.color =
            "#c62828";

        return;

    }


    if (!poza) {

        status.textContent =
            "Selectează imaginea autorului.";

        status.style.color =
            "#c62828";

        return;

    }


    if (
        !poza.type.startsWith(
            "image/"
        )
    ) {

        status.textContent =
            "Fișierul selectat nu este o imagine.";

        status.style.color =
            "#c62828";

        return;

    }


    const user =
        await utilizatorAutentificat();


    if (!user) {

        status.textContent =
            "Trebuie să fii autentificat.";

        status.style.color =
            "#c62828";

        return;

    }


    try {

        status.textContent =
            "Se încarcă imaginea...";

        status.style.color =
            "#7b2450";


        const extensie =
            poza.name
                .split(".")
                .pop()
                .toLowerCase();


        const numeCurat =
            nume
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )
                .replace(
                    /[^a-zA-Z0-9]/g,
                    "_"
                )
                .toLowerCase();


        const caleImagine =
            `autori/${Date.now()}_${numeCurat}.${extensie}`;


        const {
            error: uploadError
        } =
            await supabaseClient
                .storage
                .from(IMAGINI_BUCKET)
                .upload(
                    caleImagine,
                    poza,
                    {
                        contentType:
                            poza.type,

                        upsert:
                            false
                    }
                );


        if (uploadError) {

            throw uploadError;

        }


        const {
            data: publicUrlData
        } =
            supabaseClient
                .storage
                .from(IMAGINI_BUCKET)
                .getPublicUrl(
                    caleImagine
                );


        const urlImagine =
            publicUrlData.publicUrl;


        status.textContent =
            "Se salvează autorul...";


        const {
            error: autorError
        } =
            await supabaseClient
                .from("autori")
                .insert([
                    {
                        initiale:
                            initiale,

                        nume:
                            nume,

                        categorie:
                            categorie,

                        poza:
                            urlImagine,

                        descriere:
                            descriere
                    }
                ]);


        if (autorError) {

            await supabaseClient
                .storage
                .from(IMAGINI_BUCKET)
                .remove([
                    caleImagine
                ]);


            throw autorError;

        }


        status.textContent =
            "Autorul a fost adăugat cu succes!";

        status.style.color =
            "#2e7d32";


        document
            .getElementById(
                "autorInitiale"
            )
            .value = "";


        document
            .getElementById(
                "autorNume"
            )
            .value = "";


        document
            .getElementById(
                "autorCategorie"
            )
            .value = "";


        document
            .getElementById(
                "autorPoza"
            )
            .value = "";


        document
            .getElementById(
                "autorDescriere"
            )
            .value = "";


        await incarcaAutoriAdmin();
        await incarcaListaAutoriSelect();
        await incarcaAutori();


    } catch (error) {

        console.error(
            "Eroare adăugare autor:",
            error
        );

        status.textContent =
            "A apărut o eroare: " +
            error.message;

        status.style.color =
            "#c62828";

    }
}


// ======================================================
// ÎNCARCĂ AUTORII ÎN SELECT
// ======================================================

async function incarcaListaAutoriSelect() {

    const select =
        document.getElementById(
            "operaAutor"
        );


    if (!select) {
        return;
    }


    const {
        data: autori,
        error
    } =
        await supabaseClient
            .from("autori")
            .select(
                "id, initiale, nume"
            )
            .order(
                "nume",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            error
        );

        return;

    }


    select.innerHTML = `

        <option value="">
            Selectează autorul
        </option>

    `;


    (autori || []).forEach(
        autor => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                autor.id;


            option.textContent =
                `${autor.initiale || ""} - ${autor.nume || ""}`;


            select.appendChild(
                option
            );

        }
    );

}


// ======================================================
// ADAUGĂ OPERĂ
// ======================================================

async function adaugaOpera() {

    const autorId =
        document
            .getElementById("operaAutor")
            .value;


    const titlu =
        document
            .getElementById("operaTitlu")
            .value
            .trim();


    const rezumat =
        document
            .getElementById("operaRezumat")
            .files[0];


    const valoriMorale =
        document
            .getElementById("operaValoriMorale")
            .files[0];


    const caracterizare =
        document
            .getElementById("operaCaracterizare")
            .files[0];


    const status =
        document.getElementById(
            "operaStatus"
        );


    if (!autorId) {

        status.textContent =
            "Selectează autorul.";

        status.style.color =
            "#c62828";

        return;

    }


    if (!titlu) {

        status.textContent =
            "Introdu titlul operei.";

        status.style.color =
            "#c62828";

        return;

    }


    if (
        !rezumat &&
        !valoriMorale &&
        !caracterizare
    ) {

        status.textContent =
            "Selectează cel puțin un PDF.";

        status.style.color =
            "#c62828";

        return;

    }


    const user =
        await utilizatorAutentificat();


    if (!user) {

        status.textContent =
            "Trebuie să fii autentificat.";

        status.style.color =
            "#c62828";

        return;

    }


    const fisiereIncarcate = [];


    try {

        async function incarcaFisier(
            fisier,
            prefix
        ) {

            if (!fisier) {

                return null;

            }


            if (
                fisier.type !==
                "application/pdf" &&
                !fisier.name
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {

                throw new Error(
                    `"${fisier.name}" nu este PDF.`
                );

            }


            const numeCurat =
                fisier.name
                    .normalize("NFD")
                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
                    )
                    .replace(
                        /[^a-zA-Z0-9._-]/g,
                        "_"
                    );


            const cale =
                `${autorId}/${Date.now()}_${prefix}_${numeCurat}`;


            const {
                error
            } =
                await supabaseClient
                    .storage
                    .from(BUCKET)
                    .upload(
                        cale,
                        fisier,
                        {
                            contentType:
                                "application/pdf",

                            upsert:
                                false
                        }
                    );


            if (error) {

                throw error;

            }


            fisiereIncarcate.push(
                cale
            );


            return cale;

        }


        status.textContent =
            "Se încarcă PDF-urile...";

        status.style.color =
            "#7b2450";


        const caleRezumat =
            await incarcaFisier(
                rezumat,
                "rezumat"
            );


        const caleValori =
            await incarcaFisier(
                valoriMorale,
                "valori_morale"
            );


        const caleCaracterizare =
            await incarcaFisier(
                caracterizare,
                "caracterizare"
            );


        // Salvăm URL-uri interne compatibile cu
        // deschiderea prin URL semnat.
        const pdf =
            caleRezumat
                ? `storage://${BUCKET}/${caleRezumat}`
                : null;


        const pdfValoriMorale =
            caleValori
                ? `storage://${BUCKET}/${caleValori}`
                : null;


        const pdfCaracterizare =
            caleCaracterizare
                ? `storage://${BUCKET}/${caleCaracterizare}`
                : null;


        const {
            error
        } =
            await supabaseClient
                .from("opere")
                .insert([
                    {
                        autor_id:
                            Number(autorId),

                        titlu:
                            titlu,

                        pdf:
                            pdf,

                        pdf_valori_morale:
                            pdfValoriMorale,

                        pdf_caracterizare:
                            pdfCaracterizare
                    }
                ]);


        if (error) {

            throw error;

        }


        status.textContent =
            "Opera a fost adăugată cu succes!";

        status.style.color =
            "#2e7d32";


        document
            .getElementById(
                "operaAutor"
            )
            .value = "";


        document
            .getElementById(
                "operaTitlu"
            )
            .value = "";


        document
            .getElementById(
                "operaRezumat"
            )
            .value = "";


        document
            .getElementById(
                "operaValoriMorale"
            )
            .value = "";


        document
            .getElementById(
                "operaCaracterizare"
            )
            .value = "";


        await incarcaOpereAdmin();
        await incarcaListaPDF();
        await incarcaAutori();


    } catch (error) {

        console.error(
            "Eroare adăugare operă:",
            error
        );


        if (
            fisiereIncarcate.length > 0
        ) {

            await supabaseClient
                .storage
                .from(BUCKET)
                .remove(
                    fisiereIncarcate
                );

        }


        status.textContent =
            "A apărut o eroare: " +
            error.message;

        status.style.color =
            "#c62828";

    }
}


// ======================================================
// CONVERTEȘTE REFERINȚA PDF ÎN CALE STORAGE
// ======================================================

function obtineCalePDF(valoare) {

    if (!valoare) {

        return null;

    }


    // ==================================================
    // FORMATUL FOLOSIT LA ÎNCĂRCARE
    //
    // storage://Pdf/123/fisier.pdf
    // ==================================================

    const prefix =
        `storage://${BUCKET}/`;


    if (
        valoare.startsWith(prefix)
    ) {

        return decodeURIComponent(
            valoare.substring(
                prefix.length
            )
        );

    }


    // ==================================================
    // DACĂ ÎN BAZA DE DATE EXISTĂ UN URL SUPABASE
    // ==================================================

    if (
        valoare.includes(
            "/storage/v1/object/"
        )
    ) {

        return obtineCaleStorage(
            valoare
        );

    }


    // ==================================================
    // DACĂ VALOAREA ESTE DEJA O CALE STORAGE
    //
    // ex:
    // 123/rezumat_document.pdf
    // ==================================================

    if (
        !valoare.startsWith("http://") &&
        !valoare.startsWith("https://")
    ) {

        return valoare;

    }


    return null;

}


// ======================================================
// LISTĂ AUTORI ADMIN
// ======================================================

async function incarcaAutoriAdmin() {

    const container =
        document.getElementById(
            "listaAutoriAdmin"
        );


    if (!container) {
        return;
    }


    const {
        data: autori,
        error
    } =
        await supabaseClient
            .from("autori")
            .select("*")
            .order(
                "nume",
                {
                    ascending: true
                }
            );


    if (error) {

        container.innerHTML =
            `<p style="color:#c62828">
                ${escapeHTML(error.message)}
            </p>`;

        return;

    }


    if (
        !autori ||
        autori.length === 0
    ) {

        container.innerHTML =
            "<p>Nu există autori.</p>";

        return;

    }


    container.innerHTML =
        autori.map(
            autor => `

                <div class="admin-autor">

                    <strong>
                        ${escapeHTML(
                autor.initiale
            )}
                        -
                        ${escapeHTML(
                autor.nume
            )}
                    </strong>

                    <p>
                        Gen literar:
                        <b>${escapeHTML(
                autor.categorie || "Neclasificat"
            )}</b>
                    </p>

                    <p>
                        ${escapeHTML(
                autor.descriere
            )}
                    </p>

                    <label>
                        Descriere autor:
                    </label>

                    <textarea
                        id="autorDescriereEdit-${autor.id}"
                        rows="4">${escapeHTML(
                autor.descriere
            )}</textarea>

                    <button
                        class="admin-btn"
                        type="button"
                        onclick="actualizeazaDescriereAutor(${autor.id})">

                        💾 Salvează descrierea

                    </button>

                    <div
                        id="autorStatus-${autor.id}"
                        class="admin-status">
                    </div>

                    <small>
                        ID: ${autor.id}
                    </small>

                </div>

            `
        ).join("");

}


// ======================================================
// ACTUALIZEAZĂ DESCRIEREA AUTORULUI
// ======================================================

async function actualizeazaDescriereAutor(autorId) {

    const descriereInput =
        document.getElementById(
            `autorDescriereEdit-${autorId}`
        );

    const status =
        document.getElementById(
            `autorStatus-${autorId}`
        );


    if (!descriereInput || !status) {
        return;
    }


    const user =
        await utilizatorAutentificat();


    if (!user) {

        status.textContent =
            "Trebuie să fii autentificat ca administrator.";

        status.style.color =
            "#c62828";

        return;

    }


    status.textContent =
        "Se salvează descrierea...";

    status.style.color =
        "#7b2450";


    try {

        const {
            error
        } =
            await supabaseClient
                .from("autori")
                .update({
                    descriere:
                        descriereInput.value.trim()
                })
                .eq(
                    "id",
                    autorId
                );


        if (error) {
            throw error;
        }


        status.textContent =
            "Descrierea a fost actualizată.";

        status.style.color =
            "#2e7d32";


        await incarcaAutori();

    } catch (error) {

        console.error(
            "Eroare actualizare descriere autor:",
            error
        );

        status.textContent =
            "Nu am putut actualiza descrierea: " +
            error.message;

        status.style.color =
            "#c62828";

    }
}


// ======================================================
// LISTĂ OPERE ADMIN
// ======================================================

async function incarcaOpereAdmin() {

    const container =
        document.getElementById(
            "listaOpereAdmin"
        );


    if (!container) {
        return;
    }


    try {

        const {
            data: opere,
            error: eroareOpere
        } =
            await supabaseClient
                .from("opere")
                .select("*")
                .order(
                    "titlu",
                    {
                        ascending: true
                    }
                );


        if (eroareOpere) {

            throw eroareOpere;

        }


        const {
            data: autori,
            error: eroareAutori
        } =
            await supabaseClient
                .from("autori")
                .select(
                    "id, initiale, nume"
                );


        if (eroareAutori) {

            throw eroareAutori;

        }


        if (
            !opere ||
            opere.length === 0
        ) {

            container.innerHTML =
                "<p>Nu există opere.</p>";

            return;

        }


        container.innerHTML =
            opere.map(
                opera => {

                    const autor =
                        (autori || []).find(
                            a =>
                                String(a.id) ===
                                String(
                                    opera.autor_id
                                )
                        );


                    return `

                        <div class="admin-opera">

                            <strong>
                                📖 ${escapeHTML(
                        opera.titlu
                    )}
                            </strong>

                            <p>

                                Autor:

                                <b>
                                    ${escapeHTML(
                        autor
                            ? autor.nume
                            : "Necunoscut"
                    )}
                                </b>

                            </p>

                            <p>

                                Rezumat:
                                ${opera.pdf
                            ? "✔ Există"
                            : "✖ Lipsește"
                        }

                                <br>

                                Valori morale:
                                ${opera.pdf_valori_morale
                            ? "✔ Există"
                            : "✖ Lipsește"
                        }

                                <br>

                                Caracterizare:
                                ${opera.pdf_caracterizare
                            ? "✔ Există"
                            : "✖ Lipsește"
                        }

                            </p>

                            <button
                                class="admin-btn sterge-opera-btn"
                                type="button"
                                onclick="stergeOpera(${opera.id})">

                                🗑️ Șterge opera

                            </button>

                        </div>

                    `;

                }
            )
                .join("");


    } catch (error) {

        console.error(
            error
        );

        container.innerHTML =
            `<p style="color:#c62828">
                ${escapeHTML(error.message)}
            </p>`;

    }
}


// ======================================================
// ȘTERGE OPERĂ + PDF-URI
// ======================================================

async function stergeOpera(operaId) {

    const confirmare =
        confirm(
            "Sigur vrei să ștergi această operă și toate PDF-urile ei?"
        );


    if (!confirmare) {
        return;
    }


    const user =
        await utilizatorAutentificat();


    if (!user) {

        alert(
            "Trebuie să fii autentificat."
        );

        return;

    }


    try {

        const {
            data: opera,
            error: eroareOpera
        } =
            await supabaseClient
                .from("opere")
                .select("*")
                .eq(
                    "id",
                    operaId
                )
                .single();


        if (eroareOpera) {

            throw eroareOpera;

        }


        const fisiere = [
            obtineCalePDF(
                opera.pdf
            ),
            obtineCalePDF(
                opera.pdf_valori_morale
            ),
            obtineCalePDF(
                opera.pdf_caracterizare
            )
        ]
            .filter(Boolean);


        const {
            error: deleteDbError
        } =
            await supabaseClient
                .from("opere")
                .delete()
                .eq(
                    "id",
                    operaId
                );


        if (deleteDbError) {

            throw deleteDbError;

        }


        if (
            fisiere.length > 0
        ) {

            const {
                error: deleteStorageError
            } =
                await supabaseClient
                    .storage
                    .from(BUCKET)
                    .remove(
                        fisiere
                    );


            if (deleteStorageError) {

                console.error(
                    "Opera a fost ștearsă din DB, dar PDF-urile nu:",
                    deleteStorageError
                );

            }

        }


        alert(
            "Opera a fost ștearsă cu succes."
        );


        await incarcaOpereAdmin();
        await incarcaListaPDF();
        await incarcaAutori();


    } catch (error) {

        console.error(
            "Eroare ștergere operă:",
            error
        );

        alert(
            "Nu am putut șterge opera: " +
            error.message
        );

    }
}


// ======================================================
// LISTĂ PDF
// ======================================================

async function incarcaListaPDF() {

    const container =
        document.getElementById(
            "listaPDF"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "<p>Se încarcă...</p>";


    try {

        const fisiere =
            await listeazaToatePDFurile(
                ""
            );


        if (
            fisiere.length === 0
        ) {

            container.innerHTML =
                "<p>Nu există PDF-uri.</p>";

            return;

        }


        container.innerHTML =
            fisiere.map(
                fisier => `

                    <div class="pdf-item">

                        <span>
                            📕 ${escapeHTML(
                    fisier
                )}
                        </span>

                    </div>

                `
            )
                .join("");


    } catch (error) {

        console.error(
            error
        );

        container.innerHTML =
            "<p style='color:#c62828'>" +
            "Nu am putut încărca lista PDF-urilor." +
            "</p>";

    }
}


// ======================================================
// LISTARE RECURSIVĂ PDF-URI
// ======================================================

async function listeazaToatePDFurile(
    folder
) {

    const {
        data,
        error
    } =
        await supabaseClient
            .storage
            .from(BUCKET)
            .list(
                folder,
                {
                    limit: 1000
                }
            );


    if (error) {

        throw error;

    }


    let rezultat = [];


    for (
        const item of data || []
    ) {

        const cale =
            folder
                ? `${folder}/${item.name}`
                : item.name;


        if (
            item.metadata
        ) {

            if (
                item.name
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {

                rezultat.push(
                    cale
                );

            }

        } else {

            const subfolder =
                await listeazaToatePDFurile(
                    cale
                );


            rezultat =
                rezultat.concat(
                    subfolder
                );

        }

    }


    return rezultat;
}


// ======================================================
// DARK MODE
// ======================================================

function schimbaTema() {

    document.body.classList.toggle(
        "dark"
    );

}


// ======================================================
// QUIZ
// ======================================================

function arataQuiz(tip) {

    const kahoot =
        document.getElementById(
            "kahoot"
        );


    const wordwall =
        document.getElementById(
            "wordwall"
        );


    const butoane =
        document.querySelectorAll(
            ".quiz-tab"
        );


    if (tip === "kahoot") {

        kahoot.classList.remove(
            "ascuns"
        );

        wordwall.classList.add(
            "ascuns"
        );

        butoane[0].classList.add(
            "activ"
        );

        butoane[1].classList.remove(
            "activ"
        );

    } else {

        kahoot.classList.add(
            "ascuns"
        );

        wordwall.classList.remove(
            "ascuns"
        );

        butoane[0].classList.remove(
            "activ"
        );

        butoane[1].classList.add(
            "activ"
        );

    }
}


// ======================================================
// LOGIN MODAL
// ======================================================

function afiseazaLogin() {

    document
        .getElementById(
            "loginModal"
        )
        .classList.remove(
            "ascuns"
        );


    document
        .getElementById(
            "loginEmail"
        )
        .focus();

}


function inchideLogin() {

    document
        .getElementById(
            "loginModal"
        )
        .classList.add(
            "ascuns"
        );


    document
        .getElementById(
            "loginMesaj"
        )
        .textContent = "";

}


// ======================================================
// LOGIN ADMIN
// ======================================================

async function loginAdmin() {

    const email =
        document
            .getElementById(
                "loginEmail"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "loginPassword"
            )
            .value;


    const mesaj =
        document.getElementById(
            "loginMesaj"
        );


    if (
        !email ||
        !password
    ) {

        mesaj.textContent =
            "Completează emailul și parola.";

        mesaj.style.color =
            "#c62828";

        return;

    }


    mesaj.textContent =
        "Se verifică datele...";

    mesaj.style.color =
        "#7b2450";


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .signInWithPassword({
                    email:
                        email,

                    password:
                        password
                });


        if (error) {

            throw error;

        }


        if (
            !data ||
            !data.user
        ) {

            throw new Error(
                "Autentificarea nu a reușit."
            );

        }


        inchideLogin();

        afiseazaAdmin(
            data.user
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        mesaj.textContent =
            "Email sau parolă incorectă.";

        mesaj.style.color =
            "#c62828";

    }
}


// ======================================================
// RESETARE PAROLĂ
// ======================================================

async function reseteazaParola() {

    const email =
        document
            .getElementById(
                "loginEmail"
            )
            .value
            .trim();


    const mesaj =
        document.getElementById(
            "loginMesaj"
        );


    if (!email) {

        mesaj.textContent =
            "Introdu emailul pentru resetarea parolei.";

        mesaj.style.color =
            "#c62828";

        return;

    }


    mesaj.textContent =
        "Se trimite emailul de resetare...";

    mesaj.style.color =
        "#7b2450";


    try {

        const {
            error
        } =
            await supabaseClient.auth
                .resetPasswordForEmail(
                    email,
                    {
                        redirectTo:
                            window.location.origin +
                            "/reset-password.html"
                    }
                );


        if (error) {

            throw error;

        }


        mesaj.textContent =
            "Emailul de resetare a fost trimis. Verifică Inbox și Spam.";

        mesaj.style.color =
            "#2e7d32";


    } catch (error) {

        console.error(
            "Eroare resetare parolă:",
            error
        );

        mesaj.textContent =
            "Nu am putut trimite emailul: " +
            error.message;

        mesaj.style.color =
            "#c62828";

    }
}


// ======================================================
// AFIȘEAZĂ ADMIN
// ======================================================

function afiseazaAdmin(user) {

    const panel =
        document.getElementById(
            "adminPanel"
        );


    const adminUser =
        document.getElementById(
            "adminUser"
        );


    if (
        !panel ||
        !adminUser
    ) {

        return;

    }


    panel.classList.remove(
        "ascuns"
    );


    adminUser.textContent =
        "Conectat ca: " +
        user.email;


    incarcaListaPDF();
    incarcaAutoriAdmin();
    incarcaOpereAdmin();
    incarcaListaAutoriSelect();

}


// ======================================================
// LOGOUT
// ======================================================

async function logoutAdmin() {

    try {

        const {
            error
        } =
            await supabaseClient.auth
                .signOut();


        if (error) {

            throw error;

        }


        document
            .getElementById(
                "adminPanel"
            )
            .classList.add(
                "ascuns"
            );


    } catch (error) {

        console.error(
            error
        );

        alert(
            "Nu am putut realiza deconectarea."
        );

    }
}


// ======================================================
// UTILIZATOR AUTENTIFICAT
// ======================================================

async function utilizatorAutentificat() {

    const {
        data,
        error
    } =
        await supabaseClient.auth
            .getSession();


    if (error) {

        console.error(
            error
        );

        return null;

    }


    if (
        !data ||
        !data.session
    ) {

        return null;

    }


    return data.session.user;
}


// ======================================================
// VERIFICĂ SESIUNEA
// ======================================================

async function verificaSesiunea() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();


        if (error) {

            throw error;

        }


        if (
            data &&
            data.session
        ) {

            afiseazaAdmin(
                data.session.user
            );

        }


    } catch (error) {

        console.error(
            "Session error:",
            error
        );

    }
}


// ======================================================
// AUTH STATE
// ======================================================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        console.log(
            "Auth:",
            event
        );


        if (session) {

            afiseazaAdmin(
                session.user
            );

        } else {

            const panel =
                document.getElementById(
                    "adminPanel"
                );


            if (panel) {

                panel.classList.add(
                    "ascuns"
                );

            }

        }

    }
);


// ======================================================
// TASTE LOGIN
// ======================================================

document.addEventListener(
    "keydown",
    function (event) {

        const modal =
            document.getElementById(
                "loginModal"
            );


        if (
            event.key === "Enter" &&
            modal &&
            !modal.classList.contains(
                "ascuns"
            )
        ) {

            loginAdmin();

        }


        if (
            event.key === "Escape" &&
            modal &&
            !modal.classList.contains(
                "ascuns"
            )
        ) {

            inchideLogin();

        }

    }
);


// ======================================================
// INITIALIZARE
// ======================================================

incarcaAutori();

verificaSesiunea();

console.log(
    "Site inițializat."
);

console.log(
    "Bucket PDF privat:",
    BUCKET
);

console.log(
    "Bucket imagini public:",
    IMAGINI_BUCKET
);

// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL = "https://eagjavifluwolqeuctzk.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_QSG9OFrCANpRxA-moQCQgQ_mtkx-hWX";

const BUCKET = "Pdf";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ======================================================
// CONTAINER
// ======================================================

const site = document.getElementById("site");


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
   LOGIN MODAL
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
   ADMIN PANEL
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

.admin-box input[type="file"] {
    width: 100%;

    padding: 12px;

    background: #faf6ef;

    border: 2px solid #ddd;

    border-radius: 10px;
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

.logout-btn {
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

.pdf-item span {
    overflow: hidden;
    text-overflow: ellipsis;
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


<!-- ======================================================
     MENIU
====================================================== -->

<nav>

    <a href="#acasa">Acasă</a>

    <a href="#limba">Limba română</a>

    <a href="#literatura">Literatura</a>

    <a href="#autori">Autori</a>

    <a href="#materiale">Materiale</a>

    <a href="#quiz">Quiz-uri</a>

    <button onclick="schimbaTema()">
        🌙 Mod întunecat
    </button>

    <button onclick="afiseazaLogin()">
        🔐 Logare admin
    </button>

</nav>


<!-- ======================================================
     HERO
====================================================== -->

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


<!-- ======================================================
     LIMBA
====================================================== -->

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


<!-- ======================================================
     LITERATURA
====================================================== -->

<section id="literatura">

    <h2 class="titlu">
        Literatura română
    </h2>

    <p class="subtitlu">
        Poezie, proză și teatru.
    </p>

    <div class="cards">

        <div class="card">
            <div class="icon">🌙</div>

            <h3>Poezia</h3>

            <p>
                Poezia exprimă sentimente și idei
                printr-un limbaj artistic.
            </p>
        </div>

        <div class="card">
            <div class="icon">📖</div>

            <h3>Proza</h3>

            <p>
                Romanul, nuvela, povestirea și basmul
                sunt forme importante ale prozei.
            </p>
        </div>

        <div class="card">
            <div class="icon">🎭</div>

            <h3>Teatrul</h3>

            <p>
                Textele dramatice sunt construite
                în jurul personajelor și dialogului.
            </p>
        </div>

    </div>

</section>


<!-- ======================================================
     CITAT
====================================================== -->

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


<!-- ======================================================
     AUTORI
====================================================== -->

<section id="autori">

    <h2 class="titlu">
        Autori 📚
    </h2>

    <p class="subtitlu">
        Descoperă autori importanți și operele lor.
    </p>

    <div
        class="cards"
        id="autorCards">
    </div>

</section>


<!-- ======================================================
     MATERIALE
====================================================== -->

<section id="materiale">

    <h2 class="titlu">
        Materiale 📚
    </h2>

    <p class="subtitlu">
        Materiale pentru studiul limbii și literaturii române.
    </p>

    <div class="cards">

        <div class="card">

            <div class="icon">
                📖
            </div>

            <h3>
                Mihai Eminescu
            </h3>

            <p>
                Informații despre viața și opera
                marelui poet român.
            </p>

        </div>

        <div class="card">

            <div class="icon">
                ✍️
            </div>

            <h3>
                Gramatică
            </h3>

            <p>
                Noțiuni despre părțile de vorbire,
                propoziție și frază.
            </p>

        </div>

        <div class="card">

            <div class="icon">
                📚
            </div>

            <h3>
                Genuri literare
            </h3>

            <p>
                Genul epic, liric și dramatic.
            </p>

        </div>

    </div>

</section>


<!-- ======================================================
     QUIZ
====================================================== -->

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
                Exersează aplicarea regulilor de limbă
                română în contexte diferite.
            </p>

            <a
                class="kahoot-link"
                href="https://create.kahoot.it/details/aplicarea-regulilor-in-contexte-noi/071aa0d4-21d3-426f-a7a3-4c8ab375d61b"
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
                href="https://create.kahoot.it/details/romanian-vocabulary-in-context/bf406337-3185-409c-92c7-22471cf41e38"
                target="_blank"
                rel="noopener noreferrer">

                🎯 Deschide Kahoot

            </a>

        </div>


        <div class="kahoot-card">

            <h3>
                ✍️ Recapitulare dirijată a noțiunilor de gramatică
            </h3>

            <p>
                Recapitulează principalele noțiuni
                de gramatică.
            </p>

            <a
                class="kahoot-link"
                href="https://create.kahoot.it/details/recapitulare-dirijata-a-notiunilor-de-gramatica/7b20be02-2691-42a9-a08d-19a0996ebd78"
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

            <p>
                Exersează conjuncțiile coordonatoare.
            </p>

            <iframe
                src="https://www.wordwall.net/embed/8ca4366782f647bb8997ad76da9f57e6?themeId=1&templateId=38&fontStackId=0"
                allowfullscreen>
            </iframe>

        </div>


        <div class="quiz-card">

            <h3>
                ✍️ Recapitulare – Verbul
            </h3>

            <p>
                Recapitulează noțiunile despre verb.
            </p>

            <iframe
                src="https://www.wordwall.net/embed/129ab020eea7468dae4c5c3a09adb830?themeId=44&templateId=73&fontStackId=0"
                allowfullscreen>
            </iframe>

        </div>


        <div class="quiz-card">

            <h3>
                👤 Pronumele – clasa a VII-a
            </h3>

            <p>
                Verifică-ți cunoștințele despre pronume.
            </p>

            <iframe
                src="https://www.wordwall.net/embed/b6f4bdcdcb8544d084e1fb9f22d584a4?themeId=43&templateId=3&fontStackId=0"
                allowfullscreen>
            </iframe>

        </div>


        <div class="quiz-card">

            <h3>
                🧠 Categorii semantice
            </h3>

            <p>
                Exersează categoriile semantice.
            </p>

            <iframe
                src="https://www.wordwall.net/embed/de00f4bb22f8435682302895b9885e0c?themeId=1&templateId=38&fontStackId=0"
                allowfullscreen>
            </iframe>

        </div>


        <div class="quiz-card">

            <h3>
                📖 Textul literar
            </h3>

            <p>
                Verifică-ți cunoștințele despre textul literar.
            </p>

            <iframe
                src="https://www.wordwall.net/embed/63ab2ec884864766bd01500290c4fff1?themeId=1&templateId=5&fontStackId=0"
                allowfullscreen>
            </iframe>

        </div>

    </div>

</section>


<!-- ======================================================
     ADMIN PANEL
====================================================== -->

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
            📤 Încarcă PDF
        </h3>

        <input
            type="file"
            id="pdfInput"
            accept="application/pdf">

        <button
            class="admin-btn"
            onclick="uploadPDF()">

            📤 Upload PDF

        </button>

        <div
            id="uploadStatus"
            class="admin-status">
        </div>

    </div>


    <div class="admin-box" style="margin-top:20px;">

        <h3>
            📚 PDF-uri din bucket
        </h3>

        <button
            class="admin-btn"
            onclick="incarcaListaPDF()">

            🔄 Reîmprospătează lista

        </button>

        <div
            id="listaPDF"
            class="lista-pdf">

            <p>
                Apasă „Reîmprospătează lista”.
            </p>

        </div>

    </div>

</section>


<!-- ======================================================
     LOGIN
====================================================== -->

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

        <p id="loginMesaj"></p>

    </div>

</div>


<!-- ======================================================
     FOOTER
====================================================== -->

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
// AUTORI
// ======================================================

const autori = [

    {
        nume: "Mihail Sadoveanu",
        poza: "Imagini/Sadoveanu.jpeg",
        descriere:
            "Prozator român cunoscut pentru operele sale inspirate din istorie, natură și lumea tradițională românească.",
        operele: [
            {
                titlu: "Baltagul",
                pdf: "Baltagul rezumat.pdf"
            },
            {
                titlu: "Dumbrava Minunată",
                pdf: "Dumbrava minunată rezumat.pdf"
            }
        ]
    },

    {
        nume: "Roald Dahl",
        poza: "Imagini/Roaldh.jpeg",
        descriere:
            "Scriitor britanic cunoscut mai ales pentru cărțile sale pentru copii, pline de imaginație, umor și aventură.",
        operele: [
            {
                titlu: "Matilda",
                pdf: "Matilda rezumat.pdf"
            }
        ]
    },

    {
        nume: "Michael Ende",
        poza: "Imagini/Michael.jpeg",
        descriere:
            "Scriitor german cunoscut pentru literatura fantastică și pentru poveștile sale pline de imaginație.",
        operele: [
            {
                titlu: "Povestea fără sfârșit",
                pdf: "Povestea fără sfârșit rezumat.pdf"
            }
        ]
    },

    {
        nume: "George Călinescu",
        poza: "Imagini/Calinescu.jpeg",
        descriere:
            "Critic literar, istoric literar, romancier și academician român, una dintre marile personalități ale culturii române.",
        operele: [
            {
                titlu: "Enigma Otiliei",
                pdf: "Enigma Otiliei rezumat.pdf"
            }
        ]
    },

    {
        nume: "Liviu Rebreanu",
        poza: "Imagini/Rebreanu.jpeg",
        descriere:
            "Prozator român important, cunoscut pentru romanele sale realiste.",
        operele: [
            {
                titlu: "Ion",
                pdf: "Ion rezumat.pdf"
            }
        ]
    },

    {
        nume: "Mircea Eliade",
        poza: "Imagini/Eliade.jpeg",
        descriere:
            "Scriitor, istoric al religiilor și filozof român, cunoscut pentru literatura sa fantastică.",
        operele: [
            {
                titlu: "La țigănci",
                pdf: "La țigănci rezumat.pdf"
            }
        ]
    },

    {
        nume: "Ioan Slavici",
        poza: "Imagini/Slavici.jpeg",
        descriere:
            "Prozator român important, cunoscut pentru operele sale inspirate din viața satului.",
        operele: [
            {
                titlu: "Moara cu noroc",
                pdf: "Moara cu noroc rezumat.pdf"
            }
        ]
    },

    {
        nume: "I.L. Caragiale",
        poza: "Imagini/Caragiale.jpeg",
        descriere:
            "Dramaturg și prozator român, cunoscut pentru comediile și satira sa.",
        operele: [
            {
                titlu: "O scrisoare pierdută",
                pdf: "O scrisoare pierdută rezumat.pdf"
            }
        ]
    },

    {
        nume: "Camil Petrescu",
        poza: "Imagini/Camil.jpeg",
        descriere:
            "Romancier, dramaturg și poet român, reprezentant important al modernismului.",
        operele: [
            {
                titlu: "Ultima noapte de dragoste, întâia noapte de război",
                pdf: "Ultima noapte de dragoste rezumat.pdf"
            }
        ]
    }

];


// ======================================================
// GENEREAZĂ AUTORI
// ======================================================

function genereazaAutori() {

    const container =
        document.getElementById("autorCards");

    if (!container) return;

    container.innerHTML =
        autori.map(autor => `

            <div class="card autor">

                <div class="portret">

                    <img
                        src="${autor.poza}"
                        alt="${autor.nume}"
                        loading="lazy"
                        onerror="this.style.display='none';">

                </div>

                <h3>
                    ${autor.nume}
                </h3>

                <p>
                    ${autor.descriere}
                </p>

                <div class="opera-list">

                    ${autor.operele.map(opera => `

                        <button
                            class="opera-btn"
                            type="button"
                            onclick="deschidePDF(${JSON.stringify(opera.pdf)})">

                            📕 „${opera.titlu}”

                        </button>

                    `).join("")}

                </div>

            </div>

        `).join("");
}


// ======================================================
// DESCHIDE PDF
// ======================================================

async function deschidePDF(numeFisier) {

    try {

        const { data, error } =
            await supabase
                .storage
                .from(BUCKET)
                .createSignedUrl(
                    numeFisier,
                    300
                );

        if (error) {

            console.error(error);

            alert(
                "Nu am putut deschide PDF-ul. Verifică numele fișierului din Supabase."
            );

            return;
        }

        if (!data || !data.signedUrl) {

            alert(
                "Nu s-a putut genera linkul PDF."
            );

            return;
        }

        window.open(
            data.signedUrl,
            "_blank",
            "noopener,noreferrer"
        );

    } catch (error) {

        console.error(error);

        alert(
            "A apărut o eroare la deschiderea PDF-ului."
        );
    }
}


// ======================================================
// DARK MODE
// ======================================================

function schimbaTema() {

    document.body.classList.toggle("dark");

}


// ======================================================
// QUIZ
// ======================================================

function arataQuiz(tip) {

    const kahoot =
        document.getElementById("kahoot");

    const wordwall =
        document.getElementById("wordwall");

    const butoane =
        document.querySelectorAll(".quiz-tab");

    if (tip === "kahoot") {

        kahoot.classList.remove("ascuns");
        wordwall.classList.add("ascuns");

        butoane[0].classList.add("activ");
        butoane[1].classList.remove("activ");

    } else {

        kahoot.classList.add("ascuns");
        wordwall.classList.remove("ascuns");

        butoane[0].classList.remove("activ");
        butoane[1].classList.add("activ");

    }
}


// ======================================================
// LOGIN MODAL
// ======================================================

function afiseazaLogin() {

    const modal =
        document.getElementById("loginModal");

    modal.classList.remove("ascuns");

    document.getElementById("loginEmail").focus();
}


function inchideLogin() {

    document
        .getElementById("loginModal")
        .classList.add("ascuns");

    document.getElementById("loginMesaj").textContent = "";
}


// ======================================================
// LOGIN ADMIN SUPABASE
// ======================================================

async function loginAdmin() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const mesaj =
        document.getElementById("loginMesaj");

    if (!email || !password) {

        mesaj.textContent =
            "Completează emailul și parola.";

        mesaj.style.color = "#c62828";

        return;
    }

    mesaj.textContent =
        "Se verifică datele...";

    mesaj.style.color = "#7b2450";

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password
        });

    if (error) {

        console.error(error);

        mesaj.textContent =
            "Email sau parolă incorectă.";

        mesaj.style.color = "#c62828";

        return;
    }

    console.log(
        "Administrator conectat:",
        data.user.email
    );

    inchideLogin();

    afiseazaAdmin(data.user);
}


// ======================================================
// AFIȘEAZĂ PANOU ADMIN
// ======================================================

function afiseazaAdmin(user) {

    const panel =
        document.getElementById("adminPanel");

    const adminUser =
        document.getElementById("adminUser");

    panel.classList.remove("ascuns");

    adminUser.textContent =
        "Conectat ca: " + user.email;

    incarcaListaPDF();

    panel.scrollIntoView({
        behavior: "smooth"
    });
}


// ======================================================
// LOGOUT
// ======================================================

async function logoutAdmin() {

    await supabase.auth.signOut();

    document
        .getElementById("adminPanel")
        .classList.add("ascuns");

    alert(
        "Ai fost deconectat."
    );
}


// ======================================================
// UPLOAD PDF
// ======================================================

async function uploadPDF() {

    const input =
        document.getElementById("pdfInput");

    const status =
        document.getElementById("uploadStatus");

    const file =
        input.files[0];

    if (!file) {

        status.textContent =
            "Selectează mai întâi un PDF.";

        status.style.color =
            "#c62828";

        return;
    }

    if (file.type !== "application/pdf") {

        status.textContent =
            "Poți încărca doar fișiere PDF.";

        status.style.color =
            "#c62828";

        return;
    }

    status.textContent =
        "Se încarcă PDF-ul...";

    status.style.color =
        "#7b2450";


    const { data: sessionData } =
        await supabase.auth.getSession();

    if (!sessionData.session) {

        status.textContent =
            "Sesiunea de administrator a expirat.";

        status.style.color =
            "#c62828";

        return;
    }


    const filePath =
        file.name;


    const { error } =
        await supabase
            .storage
            .from(BUCKET)
            .upload(
                filePath,
                file,
                {
                    contentType: "application/pdf",
                    upsert: true
                }
            );


    if (error) {

        console.error(error);

        status.textContent =
            "Upload eșuat: " + error.message;

        status.style.color =
            "#c62828";

        return;
    }


    status.textContent =
        "PDF încărcat cu succes!";

    status.style.color =
        "#2e7d32";

    input.value = "";

    incarcaListaPDF();
}


// ======================================================
// LISTĂ PDF
// ======================================================

async function incarcaListaPDF() {

    const container =
        document.getElementById("listaPDF");

    if (!container) return;

    container.innerHTML =
        "<p>Se încarcă...</p>";


    const { data, error } =
        await supabase
            .storage
            .from(BUCKET)
            .list("", {
                limit: 100,
                offset: 0,
                sortBy: {
                    column: "name",
                    order: "asc"
                }
            });


    if (error) {

        console.error(error);

        container.innerHTML =
            "<p style='color:#c62828'>Nu am putut încărca lista PDF-urilor.</p>";

        return;
    }


    const pdfuri =
        (data || []).filter(
            fisier =>
                fisier.name
                    .toLowerCase()
                    .endsWith(".pdf")
        );


    if (pdfuri.length === 0) {

        container.innerHTML =
            "<p>Nu există PDF-uri în bucket.</p>";

        return;
    }


    container.innerHTML =
        pdfuri.map(fisier => `

            <div class="pdf-item">

                <span>
                    📕 ${fisier.name}
                </span>

                <button
                    class="sterge-btn"
                    onclick="stergePDF(${JSON.stringify(fisier.name)})">

                    🗑️ Șterge

                </button>

            </div>

        `).join("");
}


// ======================================================
// ȘTERGE PDF
// ======================================================

async function stergePDF(numeFisier) {

    const confirmare =
        confirm(
            'Sigur vrei să ștergi "' +
            numeFisier +
            '"?'
        );

    if (!confirmare) return;


    const { error } =
        await supabase
            .storage
            .from(BUCKET)
            .remove([
                numeFisier
            ]);


    if (error) {

        console.error(error);

        alert(
            "Nu am putut șterge PDF-ul."
        );

        return;
    }


    alert(
        "PDF șters cu succes."
    );

    incarcaListaPDF();
}


// ======================================================
// VERIFICĂ SESIUNEA LA PORNIRE
// ======================================================

async function verificaSesiunea() {

    const { data } =
        await supabase.auth.getSession();

    if (data.session) {

        afiseazaAdmin(
            data.session.user
        );

    }
}


// ======================================================
// DETECTEAZĂ LOGIN / LOGOUT
// ======================================================

supabase.auth.onAuthStateChange(
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

            document
                .getElementById("adminPanel")
                .classList.add("ascuns");
        }
    }
);


// ======================================================
// INITIALIZARE
// ======================================================

genereazaAutori();

verificaSesiunea();

console.log(
    "Site inițializat."
);

console.log(
    "Bucket PDF:",
    BUCKET
);
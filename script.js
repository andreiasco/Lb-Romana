const site = document.getElementById("site");

site.innerHTML = `

<style>

* {
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #faf6ef;
    color: #292329;
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
    gap: 20px;
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
}

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

.autor {
    text-align: center;
}

.portret {
    width: 100px;
    height: 100px;

    margin: auto;
    margin-bottom: 20px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #7b2450;
    color: white;

    font-size: 30px;
    font-weight: bold;
}

.opera {
    margin-top: 15px;

    padding: 10px;

    background: #f4dce7;
    color: #7b2450;

    border-radius: 10px;
}

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
}

/* =========================
   BUTOANE QUIZ for test
========================= */

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

    transition: .3s;
}

.quiz-tab:hover {
    transform: scale(1.05);
}

.kahoot {
    background: #46178f;
}

.wordwall {
    background: #96008c;
}

.activ {
    box-shadow:
        0 5px 20px rgba(0,0,0,.3);

    transform: scale(1.05);
}

/* =========================
   QUIZURI
========================= */

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

.kahoot-link:hover {
    background: #5f25b2;
}

.ascuns {
    display: none;
}

/* =========================
   DARK MODE
========================= */

body.dark {
    background: #181318;
    color: white;
}

body.dark .card,
body.dark .quiz-card,
body.dark .kahoot-card {
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

footer {
    background: #35152a;
    color: white;

    text-align: center;

    padding: 35px;
}

@media(max-width:700px) {

    .quizuri {
        grid-template-columns: 1fr;
    }

    .hero {
        min-height: 500px;
    }

}

</style>


<!-- =========================
     MENIU
========================= -->

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

</nav>


<!-- =========================
     ACASA
========================= -->

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


<!-- =========================
     LIMBA ROMANA
========================= -->

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


<!-- =========================
     LITERATURA
========================= -->

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


<!-- =========================
     CITAT
========================= -->

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


<!-- =========================
     AUTORI
========================= -->

<section id="autori">

    <h2 class="titlu">
        TataBranch 📚
    </h2>

    <p class="subtitlu">
        Descoperă autori importanți și operele lor.
    </p>

    <div class="cards">

        <!-- 1. MIHAIL SADOVEANU -->

        <div class="card autor">

            <div class="portret">
                MS
            </div>

            <h3>
                Mihail Sadoveanu
            </h3>

            <p>
                Prozator român cunoscut pentru operele sale
                inspirate din istorie, natură și lumea
                tradițională românească.
            </p>

            <div class="opera">
                📕 „Baltagul”
            </div>

        </div>


        <!-- 2. ROALD DAHL -->

        <div class="card autor">

            <div class="portret">
                RD
            </div>

            <h3>
                Roald Dahl
            </h3>

            <p>
                Scriitor britanic cunoscut mai ales pentru
                cărțile sale pentru copii, pline de imaginație,
                umor și aventură.
            </p>

            <div class="opera">
                📕 „Matilda”
            </div>

        </div>


        <!-- 3. MICHAEL ENDE -->

        <div class="card autor">

            <div class="portret">
                ME
            </div>

            <h3>
                Michael Ende
            </h3>

            <p>
                Scriitor german cunoscut pentru literatura
                fantastică și pentru poveștile sale pline
                de imaginație.
            </p>

            <div class="opera">
                📕 „Povestea fără sfârșit”
            </div>

        </div>


        <!-- 4. GEORGE CĂLINESCU -->

        <div class="card autor">

            <div class="portret">
                GC
            </div>

            <h3>
                George Călinescu
            </h3>

            <p>
                Critic literar, istoric literar, romancier
                și academician român, una dintre marile
                personalități ale culturii române.
            </p>

            <div class="opera">
                📕 „Enigma Otiliei”
            </div>

        </div>


        <!-- 5. LIVIU REBREANU -->

        <div class="card autor">

            <div class="portret">
                LR
            </div>

            <h3>
                Liviu Rebreanu
            </h3>

            <p>
                Prozator român important, cunoscut pentru
                romanele sale realiste și pentru prezentarea
                societății românești.
            </p>

            <div class="opera">
                📕 „Ion”
            </div>

        </div>


        <!-- 6. MIRCEA ELIADE -->

        <div class="card autor">

            <div class="portret">
                ME
            </div>

            <h3>
                Mircea Eliade
            </h3>

            <p>
                Scriitor, istoric al religiilor și filozof
                român, cunoscut pentru literatura sa
                fantastică și pentru studiile despre religie.
            </p>

            <div class="opera">
                📕 „La țigănci”
            </div>

        </div>


        <!-- 7. IOAN SLAVICI -->

        <div class="card autor">

            <div class="portret">
                IS
            </div>

            <h3>
                Ioan Slavici
            </h3>

            <p>
                Prozator român important, cunoscut pentru
                operele sale inspirate din viața satului
                și pentru analiza personajelor.
            </p>

            <div class="opera">
                📕 „Moara cu noroc”
            </div>

        </div>


        <!-- 8. I.L. CARAGIALE -->

        <div class="card autor">

            <div class="portret">
                IC
            </div>

            <h3>
                I.L. Caragiale
            </h3>

            <p>
                Dramaturg și prozator român, cunoscut pentru
                comediile și satira sa asupra societății.
            </p>

            <div class="opera">
                📕 „O scrisoare pierdută”
            </div>

        </div>


        <!-- 9. CAMIL PETRESCU -->

        <div class="card autor">

            <div class="portret">
                CP
            </div>

            <h3>
                Camil Petrescu
            </h3>

            <p>
                Romancier, dramaturg și poet român,
                reprezentant important al modernismului
                în literatura română.
            </p>

            <div class="opera">
                📕 „Ultima noapte de dragoste,
                întâia noapte de război”
            </div>

        </div>

    </div>

</section>

<!-- =========================
     MATERIALE
========================= -->

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

            <h3>
                Mihai Eminescu
            </h3>

            <p>
                Informații despre viața și opera
                marelui poet român.
            </p>

        </div>


        <div class="card">

            <div class="icon">✍️</div>

            <h3>
                Gramatică
            </h3>

            <p>
                Noțiuni despre părțile de vorbire,
                propoziție și frază.
            </p>

        </div>


        <div class="card">

            <div class="icon">📚</div>

            <h3>
                Genuri literare
            </h3>

            <p>
                Genul epic, liric și dramatic.
            </p>

        </div>

    </div>

</section>


<!-- =========================
     QUIZURI
========================= -->

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


    <!-- =========================
         KAHOOT
    ========================= -->

    <div
        id="kahoot"
        class="quizuri">


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
                target="_blank">

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
                target="_blank">

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
                target="_blank">

                🎯 Deschide Kahoot

            </a>

        </div>

    </div>


    <!-- =========================
         WORDWALL
    ========================= -->

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


<!-- =========================
     FOOTER
========================= -->

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


/* =================================
   SCHIMBARE KAHOOT / WORDWALL
================================= */

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

    }


    if (tip === "wordwall") {

        kahoot.classList.add("ascuns");

        wordwall.classList.remove("ascuns");

        butoane[0].classList.remove("activ");

        butoane[1].classList.add("activ");

    }

}


/* =================================
   MOD ÎNTUNECAT
================================= */

function schimbaTema() {

    document.body.classList.toggle("dark");

}

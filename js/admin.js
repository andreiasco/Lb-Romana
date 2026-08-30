// =====================================================
// QUIZ ADMIN
// =====================================================

let quizSelectatId = null;


// =====================================================
// CREEAZĂ QUIZ
// =====================================================

async function creeazaQuiz() {

    const titlu =
        document
            .getElementById("quizTitlu")
            .value
            .trim();

    const categorie =
        document
            .getElementById("quizCategorie")
            .value
            .trim();

    const descriere =
        document
            .getElementById("quizDescriere")
            .value
            .trim();

    const status =
        document.getElementById(
            "quizCreareStatus"
        );


    if (!titlu) {

        status.textContent =
            "Introdu titlul quizului.";

        status.style.color =
            "#c62828";

        return;
    }


    const user =
        await utilizatorAutentificat();


    if (!user) {

        status.textContent =
            "Trebuie să fii administrator.";

        status.style.color =
            "#c62828";

        return;
    }


    try {

        status.textContent =
            "Se creează quizul...";

        status.style.color =
            "#7b2450";


        const {
            data,
            error
        } =
            await window.supabaseClient
                .from("quizuri")
                .insert([
                    {
                        titlu:
                            titlu,

                        categorie:
                            categorie || null,

                        descriere:
                            descriere || null,

                        activ:
                            true
                    }
                ])
                .select()
                .single();


        if (error) {
            throw error;
        }


        quizSelectatId =
            data.id;


        status.textContent =
            "Quizul a fost creat cu succes!";

        status.style.color =
            "#2e7d32";


        document
            .getElementById("quizTitlu")
            .value = "";

        document
            .getElementById("quizCategorie")
            .value = "";

        document
            .getElementById("quizDescriere")
            .value = "";


        document
            .getElementById("quizEditor")
            .style.display = "block";


        document
            .getElementById("quizEditorTitlu")
            .innerHTML =
                `<strong>
                    🎮 ${escapeHTML(data.titlu)}
                </strong>`;


        await incarcaQuizuriAdmin();

        await incarcaIntrebariQuizAdmin();

    } catch (error) {

        console.error(
            "Eroare creare quiz:",
            error
        );


        status.textContent =
            "Nu am putut crea quizul: " +
            error.message;

        status.style.color =
            "#c62828";
    }
}

// =====================================================
// ADAUGĂ ÎNTREBARE QUIZ
// =====================================================

async function adaugaIntrebareQuiz() {

    if (!quizSelectatId) {

        alert(
            "Mai întâi selectează sau creează un quiz."
        );

        return;
    }


    const intrebare =
        document
            .getElementById("quizIntrebare")
            .value
            .trim();

    const raspunsA =
        document
            .getElementById("quizRaspunsA")
            .value
            .trim();

    const raspunsB =
        document
            .getElementById("quizRaspunsB")
            .value
            .trim();

    const raspunsC =
        document
            .getElementById("quizRaspunsC")
            .value
            .trim();

    const raspunsD =
        document
            .getElementById("quizRaspunsD")
            .value
            .trim();

    const raspunsCorect =
        document
            .getElementById("quizRaspunsCorect")
            .value;

    const animal =
        document
            .getElementById("quizAnimal")
            .value;

    const imagineInput =
        document.getElementById(
            "quizImagineAnimal"
        );

    const imagine =
        imagineInput.files[0];

    const ordine =
        Number(
            document
                .getElementById("quizOrdine")
                .value
        );


    const status =
        document.getElementById(
            "intrebareQuizStatus"
        );


    // =================================================
    // VALIDARE
    // =================================================

    if (!intrebare) {

        status.textContent =
            "Scrie întrebarea.";

        status.style.color =
            "#c62828";

        return;
    }


    if (
        !raspunsA ||
        !raspunsB ||
        !raspunsC ||
        !raspunsD
    ) {

        status.textContent =
            "Completează toate cele patru variante.";

        status.style.color =
            "#c62828";

        return;
    }


    if (!raspunsCorect) {

        status.textContent =
            "Selectează răspunsul corect.";

        status.style.color =
            "#c62828";

        return;
    }


    if (
        !Number.isInteger(ordine) ||
        ordine < 1
    ) {

        status.textContent =
            "Ordinea trebuie să fie un număr pozitiv.";

        status.style.color =
            "#c62828";

        return;
    }


    if (
        imagine &&
        !imagine.type.startsWith("image/")
    ) {

        status.textContent =
            "Imaginea selectată nu este validă.";

        status.style.color =
            "#c62828";

        return;
    }


    const user =
        await utilizatorAutentificat();


    if (!user) {

        status.textContent =
            "Trebuie să fii administrator.";

        status.style.color =
            "#c62828";

        return;
    }


    let caleImagine = null;


    try {

        status.textContent =
            "Se adaugă întrebarea...";

        status.style.color =
            "#7b2450";


        // =================================================
        // UPLOAD IMAGINE ANIMAL
        // =================================================

        if (imagine) {

            const extensie =
                imagine.name
                    .split(".")
                    .pop()
                    .toLowerCase();


            const numeImagine =
                `${Date.now()}_${quizSelectatId}_${ordine}.${extensie}`;


            caleImagine =
                `quiz_animale/${numeImagine}`;


            const {
                error: uploadError
            } =
                await window.supabaseClient
                    .storage
                    .from(IMAGINI_BUCKET)
                    .upload(
                        caleImagine,
                        imagine,
                        {
                            contentType:
                                imagine.type,

                            upsert:
                                false
                        }
                    );


            if (uploadError) {
                throw uploadError;
            }
        }


        // =================================================
        // URL IMAGINE
        // =================================================

        let imagineUrl = null;


        if (caleImagine) {

            const {
                data
            } =
                window.supabaseClient
                    .storage
                    .from(IMAGINI_BUCKET)
                    .getPublicUrl(
                        caleImagine
                    );


            imagineUrl =
                data.publicUrl;
        }


        // =================================================
        // INSERT ÎNTREBARE
        // =================================================

        const {
            error
        } =
            await window.supabaseClient
                .from("intrebari_quiz")
                .insert([
                    {
                        quiz_id:
                            quizSelectatId,

                        intrebare:
                            intrebare,

                        raspuns_a:
                            raspunsA,

                        raspuns_b:
                            raspunsB,

                        raspuns_c:
                            raspunsC,

                        raspuns_d:
                            raspunsD,

                        raspuns_corect:
                            raspunsCorect,

                        animal:
                            animal,

                        imagine_animal:
                            imagineUrl,

                        ordine:
                            ordine
                    }
                ]);


        if (error) {

            if (caleImagine) {

                await window.supabaseClient
                    .storage
                    .from(IMAGINI_BUCKET)
                    .remove([
                        caleImagine
                    ]);
            }

            throw error;
        }


        // =================================================
        // RESET FORMULAR
        // =================================================

        document
            .getElementById("quizIntrebare")
            .value = "";

        document
            .getElementById("quizRaspunsA")
            .value = "";

        document
            .getElementById("quizRaspunsB")
            .value = "";

        document
            .getElementById("quizRaspunsC")
            .value = "";

        document
            .getElementById("quizRaspunsD")
            .value = "";

        document
            .getElementById("quizRaspunsCorect")
            .value = "";

        document
            .getElementById("quizImagineAnimal")
            .value = "";


        document
            .getElementById("quizOrdine")
            .value =
                ordine + 1;


        status.textContent =
            "Întrebarea a fost adăugată!";

        status.style.color =
            "#2e7d32";


        await incarcaIntrebariQuizAdmin();

    } catch (error) {

        console.error(
            "Eroare adăugare întrebare:",
            error
        );


        status.textContent =
            "Nu am putut adăuga întrebarea: " +
            error.message;

        status.style.color =
            "#c62828";
    }
}

// =====================================================
// ÎNCARCĂ QUIZURILE ADMIN
// =====================================================

async function incarcaQuizuriAdmin() {

    const container =
        document.getElementById(
            "listaQuizuriAdmin"
        );


    if (!container) {
        return;
    }


    const {
        data: quizuri,
        error
    } =
        await window.supabaseClient
            .from("quizuri")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Eroare quizuri:",
            error
        );

        container.innerHTML =
            `<p style="color:#c62828">
                ${escapeHTML(error.message)}
            </p>`;

        return;
    }


    if (
        !quizuri ||
        quizuri.length === 0
    ) {

        container.innerHTML =
            "<p>Nu există quizuri.</p>";

        return;
    }


    container.innerHTML =
        quizuri.map(
            quiz => `

                <div class="admin-quiz-item">

                    <h4>
                        🎮
                        ${escapeHTML(
                            quiz.titlu
                        )}
                    </h4>

                    <p>
                        Categoria:
                        <b>
                            ${escapeHTML(
                                quiz.categorie ||
                                "Fără categorie"
                            )}
                        </b>
                    </p>

                    <p>
                        ${escapeHTML(
                            quiz.descriere ||
                            ""
                        )}
                    </p>

                    <p>
                        Status:
                        ${
                            quiz.activ
                                ? "🟢 Activ"
                                : "🔴 Inactiv"
                        }
                    </p>

                    <button
                        class="admin-btn"
                        type="button"
                        onclick="selecteazaQuiz(
                            ${quiz.id}
                        )">

                        ✏️ Editează quizul

                    </button>

                    <button
                        class="admin-btn"
                        type="button"
                        onclick="schimbaActivQuiz(
                            ${quiz.id},
                            ${quiz.activ}
                        )">

                        ${
                            quiz.activ
                                ? "🔴 Dezactivează"
                                : "🟢 Activează"
                        }

                    </button>

                    <button
                        class="admin-btn sterge-opera-btn"
                        type="button"
                        onclick="stergeQuiz(
                            ${quiz.id}
                        )">

                        🗑️ Șterge

                    </button>

                </div>

            `
        ).join("");
}
// =====================================================
// SELECTEAZĂ QUIZ
// =====================================================

async function selecteazaQuiz(
    quizId
) {

    quizSelectatId =
        Number(quizId);


    const {
        data: quiz,
        error
    } =
        await window.supabaseClient
            .from("quizuri")
            .select("*")
            .eq(
                "id",
                quizSelectatId
            )
            .single();


    if (error) {

        console.error(error);

        return;
    }


    const editor =
        document.getElementById(
            "quizEditor"
        );


    const titlu =
        document.getElementById(
            "quizEditorTitlu"
        );


    editor.style.display =
        "block";


    titlu.innerHTML =
        `<strong>
            🎮 ${escapeHTML(quiz.titlu)}
        </strong>`;


    await incarcaIntrebariQuizAdmin();


    editor.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
// =====================================================
// ÎNCARCĂ ÎNTREBĂRILE QUIZULUI
// =====================================================

async function incarcaIntrebariQuizAdmin() {

    const container =
        document.getElementById(
            "listaIntrebariQuizAdmin"
        );


    if (!container) {
        return;
    }


    if (!quizSelectatId) {

        container.innerHTML =
            "<p>Selectează un quiz.</p>";

        return;
    }


    const {
        data: intrebari,
        error
    } =
        await window.supabaseClient
            .from("intrebari_quiz")
            .select("*")
            .eq(
                "quiz_id",
                quizSelectatId
            )
            .order(
                "ordine",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(error);

        container.innerHTML =
            `<p style="color:#c62828">
                ${escapeHTML(error.message)}
            </p>`;

        return;
    }


    if (
        !intrebari ||
        intrebari.length === 0
    ) {

        container.innerHTML =
            "<p>Quizul nu are încă întrebări.</p>";

        return;
    }


    container.innerHTML =
        intrebari.map(
            intrebare => `

                <div class="admin-intrebare-item">

                    <h4>
                        ❓ Întrebarea
                        ${intrebare.ordine}
                    </h4>

                    <p>
                        ${escapeHTML(
                            intrebare.intrebare
                        )}
                    </p>

                    <p>
                        A:
                        ${escapeHTML(
                            intrebare.raspuns_a
                        )}
                    </p>

                    <p>
                        B:
                        ${escapeHTML(
                            intrebare.raspuns_b
                        )}
                    </p>

                    <p>
                        C:
                        ${escapeHTML(
                            intrebare.raspuns_c
                        )}
                    </p>

                    <p>
                        D:
                        ${escapeHTML(
                            intrebare.raspuns_d
                        )}
                    </p>

                    <p>
                        ✅ Răspuns:
                        <strong>
                            ${escapeHTML(
                                intrebare.raspuns_corect
                            )}
                        </strong>
                    </p>

                    <p>
                        🐾 Animal:
                        ${escapeHTML(
                            intrebare.animal
                        )}
                    </p>

                    ${
                        intrebare.imagine_animal
                            ? `
                                <img
                                    src="${escapeHTML(
                                        intrebare.imagine_animal
                                    )}"
                                    alt="Animal"
                                    style="
                                        width:120px;
                                        height:100px;
                                        object-fit:cover;
                                        border-radius:12px;
                                    "
                                >
                            `
                            : ""
                    }

                    <button
                        class="admin-btn sterge-opera-btn"
                        type="button"
                        onclick="stergeIntrebareQuiz(
                            ${intrebare.id},
                            ${intrebare.quiz_id}
                        )">

                        🗑️ Șterge întrebarea

                    </button>

                </div>

            `
        ).join("");
}
// =====================================================
// ACTIVEAZĂ / DEZACTIVEAZĂ QUIZ
// =====================================================

async function schimbaActivQuiz(
    quizId,
    esteActiv
) {

    const user =
        await utilizatorAutentificat();


    if (!user) {

        alert(
            "Trebuie să fii administrator."
        );

        return;
    }


    const {
        error
    } =
        await window.supabaseClient
            .from("quizuri")
            .update({
                activ:
                    !esteActiv
            })
            .eq(
                "id",
                quizId
            );


    if (error) {

        console.error(error);

        alert(
            "Nu am putut modifica statusul quizului."
        );

        return;
    }


    await incarcaQuizuriAdmin();
}
// =====================================================
// ȘTERGE ÎNTREBARE
// =====================================================

async function stergeIntrebareQuiz(
    intrebareId,
    quizId
) {

    const confirmare =
        confirm(
            "Sigur vrei să ștergi această întrebare?"
        );


    if (!confirmare) {
        return;
    }


    const user =
        await utilizatorAutentificat();


    if (!user) {

        alert(
            "Trebuie să fii administrator."
        );

        return;
    }


    try {

        const {
            error
        } =
            await window.supabaseClient
                .from("intrebari_quiz")
                .delete()
                .eq(
                    "id",
                    intrebareId
                );


        if (error) {
            throw error;
        }


        await incarcaIntrebariQuizAdmin();

    } catch (error) {

        console.error(
            "Eroare ștergere întrebare:",
            error
        );

        alert(
            "Nu am putut șterge întrebarea: " +
            error.message
        );
    }
}

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
            await window.supabaseClient
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
            window.supabaseClient
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
            await window.supabaseClient
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

            await window.supabaseClient
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
        await window.supabaseClient
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

    const rezumatWord =
        document
            .getElementById("operaRezumatWord")
            .files[0];

    const linkFilm =
        document
            .getElementById("operaLinkFilm")
            .value
            .trim();

    const linkAudiobook =
        document
            .getElementById("operaLinkAudiobook")
            .value
            .trim();

    const linkTestLectura =
        document
            .getElementById("operaLinkTestLectura")
            .value
            .trim();

    const personajeInstagram =
        document
            .getElementById("operaPersonajeInstagram")
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


    const areResursa = [
        rezumat,
        valoriMorale,
        caracterizare,
        rezumatWord,
        linkFilm,
        linkAudiobook,
        linkTestLectura,
        personajeInstagram
    ].some(Boolean);

    if (!areResursa) {

        status.textContent =
            "Adaugă cel puțin o resursă pentru operă.";

        status.style.color =
            "#c62828";

        return;

    }

    const linkuriExterne = [
        linkFilm,
        linkAudiobook,
        linkTestLectura
    ];

    if (linkuriExterne.some(link => link && !/^https?:\/\//i.test(link))) {
        status.textContent =
            "Linkurile trebuie să înceapă cu http:// sau https://.";

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
    const imaginiIncarcate = [];


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
                await window.supabaseClient
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

        let caleRezumatWord = null;

        if (rezumatWord) {

            if (
                !rezumatWord.name
                    .toLowerCase()
                    .endsWith(".docx") &&
                !rezumatWord.name
                    .toLowerCase()
                    .endsWith(".doc")
            ) {
                throw new Error("Rezumatul Word trebuie să fie .doc sau .docx.");
            }

            const numeWord =
                rezumatWord.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-zA-Z0-9._-]/g, "_");

            caleRezumatWord =
                `${autorId}/${Date.now()}_rezumat_word_${numeWord}`;

            const { error: wordError } =
                await window.supabaseClient
                    .storage
                    .from(BUCKET)
                    .upload(
                        caleRezumatWord,
                        rezumatWord,
                        {
                            contentType:
                                rezumatWord.type ||
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            upsert: false
                        }
                    );

            if (wordError) {
                throw wordError;
            }

            fisiereIncarcate.push(caleRezumatWord);
        }

        let pozaPersonajeUrl = null;

        if (personajeInstagram) {

            if (!personajeInstagram.type.startsWith("image/")) {
                throw new Error("Imaginea personajelor nu este validă.");
            }

            const extensieImagine =
                personajeInstagram.name
                    .split(".")
                    .pop()
                    .toLowerCase();

            const caleImaginePersonaje =
                `personaje/${Date.now()}_${autorId}.${extensieImagine}`;

            const { error: imagineError } =
                await window.supabaseClient
                    .storage
                    .from(IMAGINI_BUCKET)
                    .upload(
                        caleImaginePersonaje,
                        personajeInstagram,
                        {
                            contentType: personajeInstagram.type,
                            upsert: false
                        }
                    );

            if (imagineError) {
                throw imagineError;
            }

            imaginiIncarcate.push(caleImaginePersonaje);

            const { data: imagineData } =
                window.supabaseClient
                    .storage
                    .from(IMAGINI_BUCKET)
                    .getPublicUrl(caleImaginePersonaje);

            pozaPersonajeUrl = imagineData.publicUrl;
        }


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
            await window.supabaseClient
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
                            pdfCaracterizare,

                        rezumat_word:
                            caleRezumatWord
                                ? `storage://${BUCKET}/${caleRezumatWord}`
                                : null,

                        link_film:
                            linkFilm || null,

                        link_audiobook:
                            linkAudiobook || null,

                        link_test_lectura:
                            linkTestLectura || null,

                        personaje_instagram:
                            pozaPersonajeUrl
                    }
                ]);


        if (error) {

            throw error;

        }


        status.textContent =
            "Opera a fost adăugată cu succes!";

        status.style.color =
            "#2e7d32";


        golesteCampuri(
            "operaAutor",
            "operaTitlu",
            "operaRezumat",
            "operaValoriMorale",
            "operaCaracterizare",
            "operaRezumatWord",
            "operaLinkFilm",
            "operaLinkAudiobook",
            "operaLinkTestLectura",
            "operaPersonajeInstagram"
        );


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

            await window.supabaseClient
                .storage
                .from(BUCKET)
                .remove(
                    fisiereIncarcate
                );

        }

        if (imaginiIncarcate.length > 0) {

            await window.supabaseClient
                .storage
                .from(IMAGINI_BUCKET)
                .remove(imaginiIncarcate);

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
    } = await window.supabaseClient
        .from("autori")
        .select("*")
        .order("nume", {
            ascending: true
        });

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

                    <label for="autorDescriereEdit-${autor.id}">>
                    
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
            await window.supabaseClient
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
        document.getElementById("listaOpereAdmin");

    if (!container) {
        return;
    }

    try {

        const {
            data: opere,
            error: eroareOpere
        } = await window.supabaseClient
            .from("opere")
            .select("*")
            .order("titlu", {
                ascending: true
            });

        if (eroareOpere) {
            throw eroareOpere;
        }

        const {
            data: autori,
            error: eroareAutori
        } = await window.supabaseClient
            .from("autori")
            .select("id, initiale, nume");

        if (eroareAutori) {
            throw eroareAutori;
        }

        if (!opere || opere.length === 0) {

            container.innerHTML =
                "<p>Nu există opere.</p>";

            return;
        }

        container.innerHTML =
            opere.map(opera => {

                const autor =
                    (autori || []).find(
                        a =>
                            String(a.id) ===
                            String(opera.autor_id)
                    );

                return `

                    <div class="admin-opera">

                        <strong>
                            📖 ${escapeHTML(opera.titlu)}
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


                        <!-- =========================
                             REZUMAT
                        ========================== -->

                        <p>
                            Rezumat:
                            ${opera.pdf
                        ? "✔ Există"
                        : "✖ Lipsește"
                    }
                        </p>

                        <input
                            type="file"
                            id="pdfRezumat-${opera.id}"
                            accept="application/pdf">

                        <button
                            class="admin-btn"
                            type="button"
                            onclick="inlocuiestePDF(
                                ${opera.id},
                                'pdf',
                                'pdfRezumat-${opera.id}'
                            )">

                            📕 Înlocuiește rezumatul

                        </button>


                        <!-- =========================
                             VALORI MORALE
                        ========================== -->

                        <p>
                            Valori morale:
                            ${opera.pdf_valori_morale
                        ? "✔ Există"
                        : "✖ Lipsește"
                    }
                        </p>

                        <input
                            type="file"
                            id="pdfValori-${opera.id}"
                            accept="application/pdf">

                        <button
                            class="admin-btn"
                            type="button"
                            onclick="inlocuiestePDF(
                                ${opera.id},
                                'pdf_valori_morale',
                                'pdfValori-${opera.id}'
                            )">

                            ❤️ Înlocuiește valorile morale

                        </button>


                        <!-- =========================
                             CARACTERIZARE
                        ========================== -->

                        <p>
                            Caracterizare:
                            ${opera.pdf_caracterizare
                        ? "✔ Există"
                        : "✖ Lipsește"
                    }
                        </p>

                        <input
                            type="file"
                            id="pdfCaracterizare-${opera.id}"
                            accept="application/pdf">

                        <button
                            class="admin-btn"
                            type="button"
                            onclick="inlocuiestePDF(
                                ${opera.id},
                                'pdf_caracterizare',
                                'pdfCaracterizare-${opera.id}'
                            )">

                            👤 Înlocuiește caracterizarea

                        </button>

                        <p>
                            Rezumat Word:
                            ${opera.rezumat_word
                        ? "✔ Există"
                        : "✖ Lipsește"
                    }
                        </p>

                        <input
                            type="file"
                            id="rezumatWord-${opera.id}"
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">

                        <button
                            class="admin-btn"
                            type="button"
                            onclick="inlocuiesteFisierOpera(
                                ${opera.id},
                                'rezumat_word',
                                'rezumatWord-${opera.id}',
                                'Pdf',
                                'word'
                            )">

                            📄 Înlocuiește rezumatul Word

                        </button>

                        <p>
                            Film:
                            ${opera.link_film ? "✔ Există" : "✖ Lipsește"}
                        </p>

                        <input
                            type="url"
                            id="linkFilm-${opera.id}"
                            placeholder="https://...">

                        <button
                            class="admin-btn"
                            type="button"
                            onclick="inlocuiesteLinkOpera(${opera.id}, 'link_film', 'linkFilm-${opera.id}')">

                            🎬 Înlocuiește linkul filmului

                        </button>

                        <p>
                            Audiobook:
                            ${opera.link_audiobook ? "✔ Există" : "✖ Lipsește"}
                        </p>

                        <input
                            type="url"
                            id="linkAudiobook-${opera.id}"
                            placeholder="https://...">

                        <button
                            class="admin-btn"
                            type="button"
                            onclick="inlocuiesteLinkOpera(${opera.id}, 'link_audiobook', 'linkAudiobook-${opera.id}')">

                            🎧 Înlocuiește linkul audiobookului

                        </button>

                        <p>
                            Test de lectură:
                            ${opera.link_test_lectura ? "✔ Există" : "✖ Lipsește"}
                        </p>

                        <input
                            type="url"
                            id="linkTestLectura-${opera.id}"
                            placeholder="https://...">

                        <button
                            class="admin-btn"
                            type="button"
                            onclick="inlocuiesteLinkOpera(${opera.id}, 'link_test_lectura', 'linkTestLectura-${opera.id}')">

                            📝 Înlocuiește linkul testului

                        </button>

                        <p>
                            Imagine Instagram personaje:
                            ${opera.personaje_instagram ? "✔ Există" : "✖ Lipsește"}
                        </p>

                        <input
                            type="file"
                            id="personajeInstagram-${opera.id}"
                            accept="image/*">

                        <button
                            class="admin-btn"
                            type="button"
                            onclick="inlocuiesteFisierOpera(
                                ${opera.id},
                                'personaje_instagram',
                                'personajeInstagram-${opera.id}',
                                'Imagini',
                                'personaje'
                            )">

                            📸 Înlocuiește imaginea Instagram

                        </button>


                        <div
                            id="inlocuireStatus-${opera.id}"
                            class="admin-status">
                        </div>


                        <hr>


                        <button
                            class="admin-btn sterge-opera-btn"
                            type="button"
                            onclick="stergeOpera(${opera.id})">

                            🗑️ Șterge opera

                        </button>

                    </div>

                `;

            }).join("");


    } catch (error) {

        console.error(error);

        container.innerHTML =
            `<p style="color:#c62828">
                ${escapeHTML(error.message)}
            </p>`;
    }
}

// ======================================================
// ÎNLOCUIEȘTE UN PDF EXISTENT
// ======================================================

async function inlocuiestePDF(
    operaId,
    coloana,
    inputId
) {

    const coloanePermise = [
        "pdf",
        "pdf_valori_morale",
        "pdf_caracterizare"
    ];

    if (!coloanePermise.includes(coloana)) {

        alert("Coloana PDF nu este permisă.");

        return;
    }


    const input =
        document.getElementById(inputId);

    const status =
        document.getElementById(
            `inlocuireStatus-${operaId}`
        );


    if (!input || !input.files[0]) {

        if (status) {
            status.textContent =
                "Selectează un fișier PDF.";
            status.style.color =
                "#c62828";
        }

        return;
    }


    const fisier =
        input.files[0];


    if (
        fisier.type !== "application/pdf" &&
        !fisier.name
            .toLowerCase()
            .endsWith(".pdf")
    ) {

        if (status) {
            status.textContent =
                "Fișierul selectat nu este PDF.";
            status.style.color =
                "#c62828";
        }

        return;
    }


    const user =
        await utilizatorAutentificat();


    if (!user) {

        if (status) {
            status.textContent =
                "Trebuie să fii administrator.";
            status.style.color =
                "#c62828";
        }

        return;
    }


    try {

        if (status) {
            status.textContent =
                "Se încarcă noul PDF...";
            status.style.color =
                "#7b2450";
        }


        // ==================================================
        // 1. OBȚINEM OPERA EXISTENTĂ
        // ==================================================

        const {
            data: opera,
            error: eroareOpera
        } = await window.supabaseClient
            .from("opere")
            .select("*")
            .eq("id", operaId)
            .single();


        if (eroareOpera) {
            throw eroareOpera;
        }


        // ==================================================
        // 2. PĂSTRĂM CALEA VECHIULUI PDF
        // ==================================================

        const valoareVeche =
            opera[coloana];

        const caleVeche =
            obtineCalePDF(
                valoareVeche
            );


        // ==================================================
        // 3. NUME NOU PDF
        // ==================================================

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


        const caleNoua =
            `${opera.autor_id}/${Date.now()}_${coloana}_${numeCurat}`;


        // ==================================================
        // 4. UPLOAD NOUL PDF
        // ==================================================

        const {
            error: uploadError
        } = await window.supabaseClient
            .storage
            .from(BUCKET)
            .upload(
                caleNoua,
                fisier,
                {
                    contentType:
                        "application/pdf",

                    upsert:
                        false
                }
            );


        if (uploadError) {
            throw uploadError;
        }


        const valoareNoua =
            `storage://${BUCKET}/${caleNoua}`;


        // ==================================================
        // 5. ACTUALIZĂM BAZA DE DATE
        // ==================================================

        const {
            error: updateError
        } = await window.supabaseClient
            .from("opere")
            .update({
                [coloana]:
                    valoareNoua
            })
            .eq(
                "id",
                operaId
            );


        // Dacă UPDATE-ul eșuează,
        // ștergem noul fișier.
        if (updateError) {

            await window.supabaseClient
                .storage
                .from(BUCKET)
                .remove([
                    caleNoua
                ]);

            throw updateError;
        }


        // ==================================================
        // 6. ȘTERGEM VECHIUL PDF
        // ==================================================

        if (caleVeche) {

            const {
                error: deleteOldError
            } = await window.supabaseClient
                .storage
                .from(BUCKET)
                .remove([
                    caleVeche
                ]);


            if (deleteOldError) {

                console.warn(
                    "Noul PDF a fost salvat, dar vechiul PDF nu a putut fi șters:",
                    deleteOldError
                );

            }
        }


        // ==================================================
        // 7. SUCCES
        // ==================================================

        if (status) {

            status.textContent =
                "PDF-ul a fost înlocuit cu succes!";

            status.style.color =
                "#2e7d32";
        }


        input.value = "";


        await incarcaOpereAdmin();
        await incarcaListaPDF();
        await incarcaAutori();


    } catch (error) {

        console.error(
            "Eroare înlocuire PDF:",
            error
        );


        if (status) {

            status.textContent =
                "Nu am putut înlocui PDF-ul: " +
                error.message;

            status.style.color =
                "#c62828";
        }

    }
}

function obtineCaleResursa(valoare, bucket) {

    if (!valoare) {
        return null;
    }

    const referintaStorage = `storage://${bucket}/`;

    if (valoare.startsWith(referintaStorage)) {
        return decodeURIComponent(
            valoare.substring(referintaStorage.length)
        );
    }

    const markerPublic = `/storage/v1/object/public/${bucket}/`;
    const indexPublic = valoare.indexOf(markerPublic);

    if (indexPublic !== -1) {
        return decodeURIComponent(
            valoare.substring(indexPublic + markerPublic.length)
        );
    }

    return null;
}

async function inlocuiesteFisierOpera(
    operaId,
    coloana,
    inputId,
    bucket,
    tipFisier
) {

    const coloanePermise = [
        "rezumat_word",
        "personaje_instagram"
    ];

    if (!coloanePermise.includes(coloana)) {
        alert("Resursa nu este permisă.");
        return;
    }

    const input = document.getElementById(inputId);
    const status = document.getElementById(`inlocuireStatus-${operaId}`);
    const fisier = input && input.files[0];

    if (!fisier) {
        status.textContent = "Selectează un fișier.";
        status.style.color = "#c62828";
        return;
    }

    const esteWord = tipFisier === "word";
    const extensieValida = esteWord
        ? /\.(doc|docx)$/i.test(fisier.name)
        : fisier.type.startsWith("image/");

    if (!extensieValida) {
        status.textContent = esteWord
            ? "Fișierul trebuie să fie .doc sau .docx."
            : "Fișierul selectat nu este o imagine validă.";
        status.style.color = "#c62828";
        return;
    }

    const user = await utilizatorAutentificat();

    if (!user) {
        status.textContent = "Trebuie să fii administrator.";
        status.style.color = "#c62828";
        return;
    }

    let caleNoua = null;

    try {

        status.textContent = "Se încarcă noul fișier...";
        status.style.color = "#7b2450";

        const { data: opera, error: operaError } =
            await window.supabaseClient
                .from("opere")
                .select(coloana + ", autor_id")
                .eq("id", operaId)
                .single();

        if (operaError) {
            throw operaError;
        }

        const numeCurat = fisier.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9._-]/g, "_");

        caleNoua = tipFisier === "word"
            ? `${opera.autor_id}/${Date.now()}_rezumat_word_${numeCurat}`
            : `personaje/${Date.now()}_${opera.autor_id}_${numeCurat}`;

        const { error: uploadError } =
            await window.supabaseClient
                .storage
                .from(bucket)
                .upload(caleNoua, fisier, {
                    contentType: fisier.type || (
                        esteWord
                            ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            : "image/png"
                    ),
                    upsert: false
                });

        if (uploadError) {
            throw uploadError;
        }

        const valoareNoua = tipFisier === "word"
            ? `storage://${bucket}/${caleNoua}`
            : window.supabaseClient
                .storage
                .from(bucket)
                .getPublicUrl(caleNoua)
                .data
                .publicUrl;

        const { error: updateError } =
            await window.supabaseClient
                .from("opere")
                .update({ [coloana]: valoareNoua })
                .eq("id", operaId);

        if (updateError) {
            await window.supabaseClient.storage.from(bucket).remove([caleNoua]);
            throw updateError;
        }

        const caleVeche = obtineCaleResursa(opera[coloana], bucket);

        if (caleVeche) {
            const { error: deleteError } =
                await window.supabaseClient
                    .storage
                    .from(bucket)
                    .remove([caleVeche]);

            if (deleteError) {
                console.warn("Noua resursă a fost salvată, dar cea veche nu a putut fi ștearsă:", deleteError);
            }
        }

        input.value = "";
        status.textContent = "Resursa a fost înlocuită cu succes!";
        status.style.color = "#2e7d32";

        await incarcaOpereAdmin();
        await incarcaAutori();

    } catch (error) {

        if (caleNoua) {
            await window.supabaseClient.storage.from(bucket).remove([caleNoua]);
        }

        console.error("Eroare înlocuire resursă:", error);
        status.textContent = "Nu am putut înlocui resursa: " + error.message;
        status.style.color = "#c62828";
    }
}

async function inlocuiesteLinkOpera(operaId, coloana, inputId) {

    const coloanePermise = [
        "link_film",
        "link_audiobook",
        "link_test_lectura"
    ];

    if (!coloanePermise.includes(coloana)) {
        alert("Linkul nu este permis.");
        return;
    }

    const input = document.getElementById(inputId);
    const status = document.getElementById(`inlocuireStatus-${operaId}`);
    const valoare = input && input.value.trim();

    if (!valoare || !/^https?:\/\//i.test(valoare)) {
        status.textContent = "Introdu un link care începe cu http:// sau https://.";
        status.style.color = "#c62828";
        return;
    }

    const user = await utilizatorAutentificat();

    if (!user) {
        status.textContent = "Trebuie să fii administrator.";
        status.style.color = "#c62828";
        return;
    }

    try {

        status.textContent = "Se salvează noul link...";
        status.style.color = "#7b2450";

        const { error } = await window.supabaseClient
            .from("opere")
            .update({ [coloana]: valoare })
            .eq("id", operaId);

        if (error) {
            throw error;
        }

        input.value = "";
        status.textContent = "Linkul a fost înlocuit cu succes!";
        status.style.color = "#2e7d32";

        await incarcaOpereAdmin();
        await incarcaAutori();

    } catch (error) {
        console.error("Eroare înlocuire link:", error);
        status.textContent = "Nu am putut înlocui linkul: " + error.message;
        status.style.color = "#c62828";
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
            await window.supabaseClient
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
            await window.supabaseClient
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
                await window.supabaseClient
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
        await window.supabaseClient
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
// LOGIN ȘI REGISTER
// ======================================================

function schimbaAuthForm(formular) {

    const esteRegister = formular === "register";

    document.getElementById("loginForm").classList.toggle("ascuns", esteRegister);
    document.getElementById("registerForm").classList.toggle("ascuns", !esteRegister);
    document.getElementById("loginTab").classList.toggle("activ", !esteRegister);
    document.getElementById("registerTab").classList.toggle("activ", esteRegister);
    document.getElementById("loginMesaj").textContent = "";

}

async function loginUtilizator() {

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
            await window.supabaseClient.auth
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

        actualizeazaStareAutentificare(data.user);


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

async function inregistreazaUtilizator() {

    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("registerRole").value;
    const mesaj = document.getElementById("loginMesaj");

    if (!email || !password || !["elev", "profesor"].includes(role)) {
        mesaj.textContent = "Completează toate câmpurile și alege un rol valid.";
        mesaj.style.color = "#c62828";
        return;
    }

    if (password.length < 6) {
        mesaj.textContent = "Parola trebuie să aibă minimum 6 caractere.";
        mesaj.style.color = "#c62828";
        return;
    }

    mesaj.textContent = "Se creează contul...";
    mesaj.style.color = "#7b2450";

    try {
        const { data, error } = await window.supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role
                }
            }
        });

        if (error) {
            throw error;
        }

        if (data.session && data.user) {
            inchideLogin();
            actualizeazaStareAutentificare(data.user);
        } else {
            mesaj.textContent = "Cont creat. Verifică emailul pentru confirmare, apoi conectează-te.";
            mesaj.style.color = "#2e7d32";
        }
    } catch (error) {
        console.error("Register error:", error);
        mesaj.textContent = "Nu am putut crea contul: " + error.message;
        mesaj.style.color = "#c62828";
    }
}

function loginAdmin() {
    return loginUtilizator();
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
            await window.supabaseClient.auth
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

async function obtineRolUtilizator(user) {

    const { data, error } = await window.supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Profile error:", error);
        return null;
    }

    return data ? data.role : null;
}

function actualizeazaStareAutentificare(user) {

    const status = document.getElementById("authStatus");
    const logoutButton = document.getElementById("logoutButton");

    if (!status || !logoutButton) {
        return;
    }

    status.textContent = "Signed in: " + (user.email || "utilizator");
    status.classList.add("signed-in");
    logoutButton.classList.remove("ascuns");

}

function actualizeazaStareDelogata() {

    const status = document.getElementById("authStatus");
    const logoutButton = document.getElementById("logoutButton");

    if (!status || !logoutButton) {
        return;
    }

    status.textContent = "Signed out";
    status.classList.remove("signed-in");
    logoutButton.classList.add("ascuns");

}

async function afiseazaAdmin(user) {

    const panel =
        document.getElementById(
            "adminPanel"
        );


    const adminUser =
        document.getElementById(
            "adminUser"
        );

    const adminLink =
        document.getElementById("adminLink");


    if (
        !panel ||
        !adminUser
    ) {

        return;

    }


    const role = await obtineRolUtilizator(user);

    if (role !== "admin") {
        panel.classList.add("ascuns");

        if (adminLink) {
            adminLink.classList.add("ascuns");
        }

        if (estePaginaAdmin) {
            window.location.replace("index.html");
        }

        return;
    }

    panel.classList.toggle("ascuns", !estePaginaAdmin);

    if (adminLink) {
        adminLink.classList.remove("ascuns");
    }


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

async function logoutUtilizator() {

    try {

        const {
            error
        } =
            await window.supabaseClient.auth
                .signOut();


        if (error) {

            throw error;

        }


        document.getElementById("adminPanel").classList.add("ascuns");
        actualizeazaStareDelogata();

        if (estePaginaAdmin) {
            window.location.replace("index.html");
        }


    } catch (error) {

        console.error(
            error
        );

        alert(
            "Nu am putut realiza deconectarea."
        );

    }
}

function logoutAdmin() {
    return logoutUtilizator();
}


// ======================================================
// UTILIZATOR AUTENTIFICAT
// ======================================================

async function utilizatorAutentificat() {

    const {
        data,
        error
    } =
        await window.supabaseClient.auth
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


    const user = data.session.user;
    const role = await obtineRolUtilizator(user);

    if (role !== "admin") {
        return null;
    }

    return user;
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
            await window.supabaseClient.auth
                .getSession();


        if (error) {

            throw error;

        }


        if (
            data &&
            data.session
        ) {

            actualizeazaStareAutentificare(data.session.user);

            afiseazaAdmin(
                data.session.user
            );

        } else {

            actualizeazaStareDelogata();

            if (estePaginaAdmin) {
                window.location.replace("index.html");
            }

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

window.supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        console.log(
            "Auth:",
            event
        );


        if (session) {

            actualizeazaStareAutentificare(session.user);

            afiseazaAdmin(
                session.user
            );

        } else {

            actualizeazaStareDelogata();

            const panel =
                document.getElementById(
                    "adminPanel"
                );


            if (panel) {

                panel.classList.add(
                    "ascuns"
                );

            }

            const adminLink =
                document.getElementById("adminLink");

            if (adminLink) {
                adminLink.classList.add("ascuns");
            }

            if (estePaginaAdmin) {
                window.location.replace("index.html");
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

// =====================================================
// ÎNCARCĂ QUIZURILE ÎN PANoul ADMIN
// =====================================================

async function incarcaQuizuriAdmin() {

    const container =
        document.getElementById("listaQuizuriAdmin");

    if (!container) {
        return;
    }

    container.innerHTML =
        "<p>Se încarcă quizurile...</p>";

    try {

        const user =
            await utilizatorAutentificat();

        if (!user) {

            container.innerHTML =
                "<p style='color:#c62828;'>" +
                "Trebuie să fii administrator." +
                "</p>";

            return;
        }


        const {
            data: quizuri,
            error
        } =
            await window.supabaseClient
                .from("quizuri")
                .select("*")
                .order("id", {
                    ascending: false
                });


        if (error) {
            throw error;
        }


        if (!quizuri || quizuri.length === 0) {

            container.innerHTML =
                "<p>Nu există quizuri create.</p>";

            return;
        }


        // =============================================
        // CONSTRUIM LISTA
        // =============================================

        const elemente = [];


        for (const quiz of quizuri) {

            // Numărul de întrebări
            const {
                count,
                error: eroareNumar
            } =
                await window.supabaseClient
                    .from("intrebari_quiz")
                    .select("*", {
                        count: "exact",
                        head: true
                    })
                    .eq("quiz_id", quiz.id);


            if (eroareNumar) {
                console.error(
                    "Eroare număr întrebări:",
                    eroareNumar
                );
            }


            elemente.push(`

                <div
                    class="admin-item"
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:20px;
                        padding:15px;
                        margin-top:10px;
                        border:1px solid #ddd;
                        border-radius:12px;
                    "
                >

                    <div>

                        <strong>
                            🎮 ${escapeHTML(quiz.titlu)}
                        </strong>

                        <div>
                            <small>
                                ${quiz.categorie
                                    ? "Categorie: " +
                                      escapeHTML(quiz.categorie)
                                    : "Fără categorie"
                                }
                            </small>
                        </div>

                        <div>
                            <small>
                                ❓ ${count || 0} întrebări
                            </small>
                        </div>

                        ${
                            quiz.descriere
                                ? `
                                    <p style="margin:5px 0 0;">
                                        ${escapeHTML(quiz.descriere)}
                                    </p>
                                  `
                                : ""
                        }

                    </div>


                    <div
                        style="
                            display:flex;
                            gap:8px;
                            flex-wrap:wrap;
                        "
                    >

                        <button
                            type="button"
                            class="admin-btn"
                            onclick="selecteazaQuizAdmin('${quiz.id}')"
                        >
                            ✏️ Editează
                        </button>

                        <button
                            type="button"
                            class="admin-btn logout-btn"
                            onclick="stergeQuiz('${quiz.id}')"
                        >
                            🗑️ Șterge
                        </button>

                    </div>

                </div>

            `);
        }


        container.innerHTML =
            elemente.join("");


    } catch (error) {

        console.error(
            "Eroare încărcare quizuri admin:",
            error
        );

        container.innerHTML = `

            <p style="color:#c62828;">
                Nu am putut încărca quizurile.
            </p>

        `;
    }
}
// =====================================================
// ȘTERGE QUIZ + ÎNTREBĂRILE LUI
// =====================================================

async function stergeQuiz(quizId) {

    if (!quizId) {
        return;
    }


    const confirmare =
        confirm(
            "Sigur vrei să ștergi acest quiz?\n\n" +
            "Vor fi șterse și toate întrebările asociate."
        );


    if (!confirmare) {
        return;
    }


    try {

        const user =
            await utilizatorAutentificat();


        if (!user) {

            alert(
                "Trebuie să fii administrator."
            );

            return;
        }


        // =============================================
        // 1. ȘTERGEM ÎNTREBĂRILE
        // =============================================

        const {
            error: eroareIntrebari
        } =
            await window.supabaseClient
                .from("intrebari_quiz")
                .delete()
                .eq("quiz_id", quizId);


        if (eroareIntrebari) {
            throw eroareIntrebari;
        }


        // =============================================
        // 2. ȘTERGEM QUIZUL
        // =============================================

        const {
            error: eroareQuiz
        } =
            await window.supabaseClient
                .from("quizuri")
                .delete()
                .eq("id", quizId);


        if (eroareQuiz) {
            throw eroareQuiz;
        }


        // =============================================
        // 3. RESETĂM QUIZUL SELECTAT
        // =============================================

        if (
            typeof quizSelectatId !== "undefined" &&
            String(quizSelectatId) === String(quizId)
        ) {

            quizSelectatId = null;


            const editor =
                document.getElementById(
                    "quizEditor"
                );


            if (editor) {
                editor.style.display = "none";
            }
        }


        alert(
            "Quizul a fost șters cu succes!"
        );


        // =============================================
        // 4. REÎNCĂRCĂM LISTA
        // =============================================

        await incarcaQuizuriAdmin();


    } catch (error) {

        console.error(
            "Eroare ștergere quiz:",
            error
        );


        alert(
            "Nu am putut șterge quizul:\n\n" +
            error.message
        );
    }
}

// ======================================================

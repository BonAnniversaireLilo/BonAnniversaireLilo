let quizPages = {
    lilo_pages: ["intro_lilo.html",
        "quizEtudes.html",
        "quizGrochat.html",
        "quizDents.html",
        "quizKpop.html",
        "quizMental.html",
        "quizDouche.html",
        "quizEx.html",
        "quizAnimaux.html",
        "quizAddiction.html",
        "quizCongele.html",
        "quizPiercings.html",
        "quizPoids.html",
        "quizEst.html",
        "quizSero.html",
        "quizSport.html",
        "quizJeu.html",
        "quizMinouche.html",
        "quizqi.html",
        "score.html"
    ],
    friend_pages: ["intro_friends.html",
        "quizEtudes.html",
        "quizAnimaux.html",
        "quizJeu.html",
        "quizPiercings.html",
        "quizKpop.html",
        "quizDouche.html",
        "quizAddiction.html",
        "quizSport.html",
        "quizGrochat.html",
        "quizSero.html",
        "quizPoids.html",
        "quizMental.html",
        "quizCongele.html",
        "quizEx.html",
        "quizEst.html",
        "quizMinouche.html",
        "quizqi.html",
        "score.html"
    ],


    guest_pages: ["intro_guest.html",
        "quizEtudes.html",
        "quizAnimaux.html",
        "quizJeu.html",
        "quizPiercings.html",
        "quizKpop.html",
        "quizDouche.html",
        "quizAddiction.html",
        "quizSport.html",
        "quizGrochat.html",
        "quizSero.html",
        "quizPoids.html",
        "quizMental.html",
        "quizCongele.html",
        "quizEx.html",
        "quizEst.html",
        "quizqi.html",
        "score.html"
    ],

    mama_pages: ["intro_mama.html",
        "quizSport.html",
        "quizJeu.html",
        "quizDents.html",
        "quizEtudes.html",
        "quizMinouche.html",
        "quizDouche.html",
        "quizKpop.html",
        "quizqi.html",
        "score.html"
    ],
    ouste_pages: ["intro_ouste.html"],
}

let quizContext = loadContext();

if (!quizContext) {
    quizContext = {
        level: "ouste",
        pages: quizPages.ouste_pages,
        index: 0,
        score: 0,
    };
}

function showCorrection(answer) {
    var c = document.getElementById("correction");
    var answer_submitted = document.getElementById("answer");
    answer_submitted.disabled = true;
    if (answer_submitted.value === answer) {
        var c_state = document.getElementById("true");
        c_state.textContent = "congrats!!"
        c_state.textContent = "Bravo !"
    } else {
        var c_state = document.getElementById("false");
        c_state.textContent = "u suck"
        c_state.textContent = "t'es nul·le"
    }
    c_state.style.display = "block";
    c.style.display = "block";
    document.getElementById("valider").style.display = "none";
    document.getElementById("next").style.display = "block";
}

function showCorrectionList(answerList) {
    var c = document.getElementById("correction");
    var answer_submitted = document.getElementById("answer");
    var correct = false;
    for (const answer of answerList) {
        if (answer_submitted.value === answer) {
            correct = true;
        }
    }
    if (correct) {
        var c_state = document.getElementById("true");
        c_state.textContent = "congrats!!"
        c_state.textContent = "Bravo !"
    } else {
        var c_state = document.getElementById("false");
        c_state.textContent = "u suck"
        c_state.textContent = "t'es nul·le"
    }
    answer_submitted.disabled = true;
    c_state.style.display = "block";
    c.style.display = "block";
    document.getElementById("valider").style.display = "none";
    document.getElementById("next").style.display = "block";
}

function selectQCM(id) {
    var btnID = "qcm-btn" + id;
    var button = document.getElementById(btnID);
    if (button.className == "QCM-btn") {
        button.className = "QCM-btn-selected";
    } else {
        button.className = "QCM-btn";
    }
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}


function checkArrays(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (const answer of a) {
        if (!containsObject(answer, b)) {
            return false
        }
    }
    return true;
}

function answerQCM(answerList) {
    var buttons_selected = document.querySelectorAll(".QCM-btn-selected");
    var ids_selected = Array.from(buttons_selected).map(button => button.value);
    correct = checkArrays(ids_selected, answerList);

    if (correct) {
        var c_state = document.getElementById("true");
        c_state.textContent = "congrats!!"
        c_state.textContent = "Bravo !"
    } else {
        var c_state = document.getElementById("false");
        c_state.textContent = "u suck"
        c_state.textContent = "t'es nul"
    }
    var c = document.getElementById("correction");
    c_state.style.display = "block";
    c.style.display = "block";
    document.getElementById("valider").style.display = "none";
    document.getElementById("next").style.display = "block";

}

function Login() {
    var code = document.getElementById("code").value;
    // si tu vois ça gg la sécurité du site c'est les amis qu'on s'est fait sur le chemin
    if (code === "CBB7F5") {
        quizContext.level = "guest";
        quizContext.pages = quizPages.guest_pages;
    } else if (code === "7ADDF2") {
        quizContext.level = "lilo";
        quizContext.pages = quizPages.lilo_pages;
    } else if (code === "F2C7DB") {
        quizContext.level = "friend";
        quizContext.pages = quizPages.friend_pages;
    } else if (code === "BFE8C8") {
        quizContext.level = "madre";
        quizContext.pages = quizPages.mama_pages;
    }
    saveContext();
    nextPage();
}

function nextPage() {
    var nextUrl = quizContext.pages[quizContext.index];
    const trueObject = document.querySelector(".true");
    if (trueObject && getComputedStyle(trueObject).display === "block") {
        quizContext.score++;
    }
    quizContext.index += 1;
    saveContext();
    window.location.replace(nextUrl);
}

function displayScore() {
    var score_area = document.getElementById("score");
    var score_com = document.getElementById("score-com");
    var ratio = quizContext.pages.length / 1.5;
    var ratio_bis = quizContext.pages.length / 2.2;
    score_area.textContent += quizContext.score;
    score_area.textContent += "/";
    score_area.textContent += quizContext.pages.length;
    if (quizContext.score == quizContext.pages.lengths ||
        quizContext.score == (quizContext.pages.length - 1)
    ) {
        score_com.textContent = "omg es-tu lilo"
    } else if (quizContext.score > ratio) {
        score_com.textContent = "gg well played tu connais bien lilo"
    } else if (quizContext.score > ratio_bis) {
        score_com.textContent = "tu la connais en surface c'est pas fou"
    } else {
        score_com.textContent = "es tu vraiment ami.e avec lilochou ?"
    }

}

function saveContext() {
    sessionStorage.setItem("quizContext", JSON.stringify(quizContext));
}

function loadContext() {
    return JSON.parse(sessionStorage.getItem("quizContext"));
}



// ["intro_lilo.html",
//     "quizAnimaux.html",
//     "quizAddiction.html",
//     "quizCongele.html",
//     "quizDents.html",
//     "quizDouche.html",
//     "quizEst.html",
//     "quizEtudes.html",
//     "quizEx.html",
//     "quizGrochat.html",
//     "quizJeu.html",
//     "quizKpop.html",
//     "quizMental.html",
//     "quizMinouche.html",
//     "quizPiercings.html",
//     "quizPoids.html",
//     "quizqi.html",
//     "quizSero.html",
//     "quizSport.html",
//     "score.html"
// ],

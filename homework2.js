let scores = {
    'Beluga': 0,
    'Turtle Dove': 0,
    '\'Bred\'': 0,
    'Zebra': 0,
    'Oreo': 0,
    'Moonrock': 0
}

let images = {
    'Beluga': "https://newsneakernews-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/yeezy-boost-350-v2-hbx-restock-1.jpg",
    'Turtle Dove': "https://68.media.tumblr.com/9e13cf3d973ee5947dc2fa7c254ad643/tumblr_o510bcfQ701v3ebpbo1_500.jpg",
    '\'Bred\'': "https://cdn5.kicksonfire.com/wp-content/uploads/2017/02/adidas-Yeezy-Boost-350-v2-5.png?x77385",
    'Zebra': "https://www.sneakerfreaker.com/wp-content/uploads/2017/01/ADIDAS-YEEZY-BOOST-350-V2-BLACK-WHITE-ZEBRA-RELEASE-DATE-4-700x468.jpg",
    'Oreo': "http://sneakernews.com/wp-content/uploads/2016/11/yeezy-boost-350-v2-black-white-5.jpg",
    'Moonrock': "https://sneakerbardetroit.com/wp-content/uploads/2015/11/adidas-yeezy-350-boost-moonrock-release-1.jpg"
}

var getTopScore = () => {
    console.log(scores)

    // Yeah, there's no way I wrote this. Taken from: http://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
    var topScore = Object.keys(scores).reduce(function (a, b) {
        return scores[a] > scores[b]
            ? a
            : b
    });

    console.log(topScore);
    return topScore;

}

var modifyScore = (question, value) => {
    switch (question) {
        case 'q1':
            scores["Oreo"] += value;
            break;
        case 'q2':
            scores["Beluga"] += value;
            break;
        case 'q3':
            scores["Zebra"] += value;
            break;
        case 'q4':
            scores["\'Bred\'"] += value;
            break;
        case 'q5':
            scores["Moonrock"] += value;
            break;
        case 'q6':
            scores["Turtle Dove"] += value;
            break;
        default:
            break;
    }

}
function typeOf(obj) {
    return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

function goToIncomplete() {
    console.log("Go to top");

    let question = document.getElementsByClassName("option")[0].parentElement.id;

    // console.log(question[0].parentElement.id);

    $('html,body').animate({
        scrollTop: $("#" + question).offset().top - 120
    }, 'slow');
}

// Set event handlers
window.onload = () => {

    // var css = '.option:hover {background-color: rgb(18, 205, 223); color: black;}'; var style = document.createElement('style');
    //
    // if (style.styleSheet) {     style.styleSheet.cssText = css; } else {     style.appendChild(document.createTextNode(css)); }
    //
    // document.getElementsByTagName('head')[0].appendChild(style) EVENT Handler
    let optionClick = (e) => {
        console.log(e);

        // Set variabls
        let currentQuestionDiv;
        let currentOptionDiv;
        let currentActiveDiv;

        // Iterate to get the proper divs from the path
        for (var n = 0; n < e.path.length; n++) {
            if (e.path[n].className == "question") {
                currentQuestionDiv = e.path[n];
            } else if (e.path[n].className == "option") {
                currentOptionDiv = e.path[n];
            } else if (e.path[n].className == "active") {
                currentActiveDiv = e.path[n];
            }

            if (e.path[n].className == "inactive") {
                return;
            }

        }

        // If click on selected option - clear
        if (currentActiveDiv) {
            console.log("here!")
            let children = currentQuestionDiv.children;
            for (var i = 0; i < children.length; i++) {
                let currentDiv = children[i]

                // Style
                currentDiv.children[0].style.opacity = 1.0;
                currentDiv.style.color = 'white';
                currentDiv.classList.remove('active');
                currentDiv.classList.remove('inactive');
                currentDiv.classList.add('option');

            }
            modifyScore(currentActiveDiv.id, -1);
        } else {
            let children = currentQuestionDiv.children;
            for (var i = 0; i < children.length; i++) {
                let currentDiv = children[i]
                if (currentDiv != currentOptionDiv) {
                    // currentDiv.style.opacity = 0.0;
                    currentDiv.children[0].style.opacity = 0.1;
                    currentDiv.style.color = 'red';
                    currentDiv.classList.remove('active');
                    currentDiv.classList.remove('option');
                    currentDiv.classList.add('inactive');

                } else {
                    currentOptionDiv.children[0].style.opacity = 1.0;
                    currentDiv.style.color = 'black';
                    currentDiv.classList.remove('option');
                    currentDiv.classList.remove('inactive');
                    currentDiv.classList.add('active');

                    modifyScore(currentOptionDiv.id, 1);

                    console.log(document.getElementsByClassName('active').length);

                    // Finished Quiz!
                    if (document.getElementsByClassName('active').length == 5) {
                        let topScore = getTopScore();
                        document.getElementById("result").style.visibility = "visible";
                        document.getElementById("resultTitle").innerHTML = "You're the Boost 350v2 " + topScore;
                        document.getElementById("bottomResultShoe").innerHTML = "<img src=\"" + images[topScore] + "\"/>"
                        document.getElementById("backToTop").style.visibility = "hidden";
                        $('html,body').animate({
                            scrollTop: $("#result").offset().top - 120
                        }, 'slow');

                    } else {
                        document.getElementById("result").style.visibility = "hidden";
                        document.getElementById("backToTop").style.visibility = "visible";
                        let nextQuestion = parseInt(currentQuestionDiv.id) + 1;
                        $('html,body').animate({
                            scrollTop: $("#" + nextQuestion).offset().top - 120
                        }, 'slow');
                    }
                }
            }
        }
        e.stopPropagation();
        e.preventDefault();
    }

    let classes = document.getElementsByClassName("option");
    for (let i = 0; i < classes.length; i++) {
        classes[i].addEventListener('click', optionClick, false);
    };
}
// ADAPTED FROM SOMEWHERE, LOST LINK BUT COPIED CODE BEFORE | TODO: FIND
$(window).scroll(function (e) {

    var distanceScrolled = $(this).scrollTop();

    $(".bg").css('-webkit-filter', 'blur(' + distanceScrolled / 60 + 'px)');
    console.log("here")

});

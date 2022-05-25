// check if there is local storage color option
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
    document.documentElement.style.setProperty(
        "--main-color",
        localStorage.getItem("color-option")
    );

    // remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach((ele) => {
        ele.classList.remove("active");

        // add active class on element with data-color = local storage
        if (ele.dataset.color === mainColor) {
            //add active class
            ele.classList.add("active");
        }
    });
}

// random background option
let bgOption = true;

// variable to control the background interval
let bgInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// chaeck if random background local storage not empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        bgOption = true;
    } else {
        bgOption = false;
    }

    // rempve active class from all spans
    document.querySelectorAll(".random-bg span").forEach((ele) => {
        ele.classList.remove("active");
    });
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-bg .yes").classList.add("active");
    } else {
        document.querySelector(".random-bg .no").classList.add("active");
    }
}

// click on toggle settings gear
document.querySelector(".toggle-settings .fa-gear").onclick = function() {
    // toggle class fa-spin for rotation on slef
    this.classList.toggle("fa-spin");
    // toglle class open on main settings box
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

// loop on All list items
colorLi.forEach((li) => {
    // click on every list items
    li.addEventListener("click", (e) => {
        // Set Color on root
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );

        //set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);

        handleActive(e);
    });
});

// Switch Random background option
const randomBgEl = document.querySelectorAll(".random-bg span");

// loop on All spans
randomBgEl.forEach((span) => {
    // click on every span
    span.addEventListener("click", (e) => {
        handleActive(e);

        if (e.target.dataset.background === "yes") {
            bgOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            bgOption = false;
            clearInterval(bgInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = [
    "b-g-1.jpg",
    "b-g-2.jpg",
    "b-g-3.jpg",
    "b-g-4.jpg",
    "b-g-5.jpg",
    "b-g-6.jpg",
];

// function to randomize imgs
function randomizeImgs() {
    if (bgOption === true) {
        bgInterval = setInterval(() => {
            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // change background image url
            landingPage.style.backgroundImage =
                'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 3000);
    }
}

randomizeImgs();

// select skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // window Height
    let windowHeight = this.innerHeight;

    // window scrolltop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
        let allSkills = document.querySelectorAll(
            ".skill-box .skill-progress span"
        );

        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// create popupwith the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        // create Overlay element
        let Overlay = document.createElement("div");

        // add class to overlay
        Overlay.className = "popup-overlay";

        // append overlay to the body
        document.body.appendChild(Overlay);

        // create the popup
        let popupBox = document.createElement("div");

        // add class to the popup box
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            // create heading
            let imgHeading = document.createElement("h3");

            // create text for heading
            let imgText = document.createTextNode(img.alt);

            // append the text to the heading
            imgHeading.appendChild(imgText);

            // append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        // create the image
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src = img.src;

        // add image to popup box
        popupBox.appendChild(popupImage);

        // append the popup box to body
        document.body.appendChild(popupBox);

        // create the close span
        let closeButton = document.createElement("span");

        // create the close Button Text
        let closeButtonText = document.createTextNode("X");

        // append text to close button
        closeButton.appendChild(closeButtonText);

        // add class to close button
        closeButton.className = "close-button";

        // add close button to the popup box
        popupBox.appendChild(closeButton);
    });
});

// close popup by click on (X)
document.addEventListener("click", function(e) {
    if (e.target.className == "close-button") {
        // remove the current popup
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToPlace(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}

scrollToPlace(allBullets);
scrollToPlace(allLinks);

// HandleActive State
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
        ele.classList.remove("active");
    });

    // add active class on self
    ev.target.classList.add("active");
}

// Show And Hide Option box

let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem(".bullets-option");

if (bulletLocalItem !== null) {
    bulletSpan.forEach((span) => {
        span.classList.remove(".active");
    });
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
    }
}

bulletSpan.forEach((span) => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem(".bullets-option", "block");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem(".bullets-option", "none");
            document.querySelector(".bullets-option .no").classList.add("active");
        }

        handleActive(e);
    });
});

// Reset Button

document.querySelector(".reset-options").onclick = function() {
    localStorage.removeItem("background_option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("bullets-option");

    window.location.reload();
};

// toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {
    // stop propagation
    e.stopPropagation();

    // toggle class "menu-active" on Button
    this.classList.toggle("menu-active");
    // toggle class "pen" on links
    tLinks.classList.toggle("open");
};

// Click Anywhereoutside menu and toggle button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {

        // check if menu is open
        if (tLinks.classList.contains("open")) {
            // toggle class "menu-active" on Button
            toggleBtn.classList.toggle("menu-active");

            // toggle class "pen" on links
            tLinks.classList.toggle("open");
        }
    }
});

// stop propagation on menu
tLinks.onclick = function(e) {
    e.stopPropagation();
};
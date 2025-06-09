/////////////////////////////////////
// DATA SOURCE - Array of reviews
// 🇬🇧 Data containing all the reviews
// 🇮🇹 Dati contenenti tutte le recensioni
/////////////////////////////////////
const dataReviews = [
    { name: "John Smith", rate: 5, date: "August 12, 2023", description: "Excellent haircut and friendly staff. I always leave feeling confident and happy with my look." },
    { name: "Emily Johnson", rate: 4.8, date: "July 30, 2023", description: "Loved the haircut and the attention to detail. The salon has a great atmosphere and welcoming team." },
    { name: "Michael Brown", rate: 4.9, date: "June 15, 2023", description: "Professional and skilled stylists. The experience was relaxing and the results exceeded my expectations." },
    { name: "Sarah Davis", rate: 5, date: "May 10, 2023", description: "Highly recommended! Friendly service and beautiful results every time I visit." },
    { name: "David Wilson", rate: 4.7, date: "April 22, 2023", description: "Great experience from start to finish. The team listens and makes you feel valued." },
    { name: "Laura Martinez", rate: 4.6, date: "March 18, 2023", description: "Very professional service with attention to detail. The salon is clean and welcoming." },
    { name: "James Anderson", rate: 4.9, date: "February 8, 2023", description: "Loved the style and how easy it was to book an appointment. Staff was very attentive." },
    { name: "Olivia Thomas", rate: 5, date: "January 25, 2023", description: "Best salon ever! The team makes you feel special and the results always look amazing." },
    { name: "William Taylor", rate: 4.7, date: "December 5, 2022", description: "Friendly and skilled staff who really care about their clients. Highly recommend." },
    { name: "Sophia Moore", rate: 4.8, date: "November 12, 2022", description: "Amazing service with great attention to detail. I always leave feeling refreshed and confident." }
];

const internalLinkBtn = {
    homePageBtn: "home_page",
    servicesBtn: "services_page",
    contactBtn:  "contact_page",
    aboutBtn:    "about_page"
};

/////////////////////////////////////
// GLOBAL VARIABLES
// 🇬🇧 Used to store navigation state and DOM pointers
// 🇮🇹 Utilizzate per memorizzare lo stato e riferimenti al DOM
/////////////////////////////////////
let currentIndex = 0;
let targetInjection = [];
let currentNavBtnActive = "homePageBtn";

const pointerHomePage = document.querySelector(".home_page");
const pointerSpinnerPage = document.querySelector(".page_loading");
const pointerContactPage = document.querySelector(".contact_page");

/////////////////////////////////////
// INIT - When DOM is ready
// 🇬🇧 Initializes DOM references and populates initial reviews
// 🇮🇹 Inizializza i riferimenti e mostra le prime recensioni
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    targetInjection = arrayWithAllPunctOfReviews(); // collect review slots (DOM nodes)
    reviewsPopulator(); // populate initial reviews

    // automatic updating every 5 seconds
    setInterval(() => {
        currentIndex++;
        reviewsPopulator();
    }, 5000);
});

/////////////////////////////////////
// NAVIGATION MANAGEMENT
// Handles nav buttons and page switching
/////////////////////////////////////
function selectorNavBtn(clicked, element) {
    const oldPageTmp = currentNavBtnActive;
    if (!element.classList.contains("li_active")) {
        document.querySelector(`.${currentNavBtnActive}`).classList.remove("li_active");
        currentNavBtnActive = clicked;
        navButtonSeekerSelector(currentNavBtnActive).classList.add("li_active");
    }
    return oldPageTmp; // return old nav state
}

function navButtonSeekerSelector(currentNavBtnActive) {
    switch (currentNavBtnActive) {
        case "homePageBtn": {
            // find the actual button DOM in nav
            const homeBtn = document.querySelector(".nav_home").firstElementChild.children;
            return [...homeBtn].find(el => el.classList.contains("homePageBtn"));
        }
        case "contactBtn": {
            const cntBtn = document.querySelector(".contact_nav").firstElementChild.children;
            return [...cntBtn].find(el => el.classList.contains("contactBtn"));
        }
        default:
            return null;
    }
}

function setPageActive(clicked, old) {
    const keyOldPage = internalLinkBtn[old];
    const keyNext = internalLinkBtn[clicked];

    document.querySelector(`.${keyOldPage}`).classList.add("none"); // hide old page

    pointerSpinnerPage.classList.remove("none"); // show loader
    setTimeout(() => {
        pointerSpinnerPage.classList.add("none"); // hide loader
        document.querySelector(`.${keyNext}`).classList.remove("none"); // show new page
    }, 1000);
}

function navigationManager(clicked, element) {
    const oldPage = selectorNavBtn(clicked, element); // update nav button active state
    setPageActive(clicked, oldPage); // switch pages
}

/////////////////////////////////////
// REVIEW CAROUSEL LOGIC
// Manages prev/next review functionality
/////////////////////////////////////
function previousReview() {
    currentIndex === 0 ? currentIndex = dataReviews.length - 1 : currentIndex--;
    reviewsPopulator();
}

function nextReview() {
    currentIndex === dataReviews.length - 1 ? currentIndex = 0 : currentIndex++;
    reviewsPopulator();
}

function reviewsPopulator() {
    // Populate three slots: previous, current, next
    for (let i = 0; i < 3; i++) {
        if (i === 0) {
            const idx = currentIndex === 0 ? dataReviews.length - 1 : currentIndex - 1;
            populatorThroughIndex(idx, 0);
        } else if (i === 1) {
            populatorThroughIndex(currentIndex, 1);
        } else {
            const idx = currentIndex === dataReviews.length - 1 ? 0 : currentIndex + 1;
            populatorThroughIndex(idx, 2);
        }
    }
}

function populatorThroughIndex(indexData, indexReview) {
    const tmpObj = dataReviews[indexData];
    const reviewTarget = targetInjection[indexReview];
    if (!reviewTarget || reviewTarget.length < 4) return;

    // fill name, stars, date, description in the correct DOM nodes
    reviewTarget[0].innerText = tmpObj.name;
    reviewTarget[1].innerHTML = "";
    reviewTarget[1].appendChild(generateStars(tmpObj.rate));
    reviewTarget[2].innerText = tmpObj.date;
    reviewTarget[3].innerText = tmpObj.description;
}

function generateStars(rate) {
    // create star icons dynamically based on rating
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.25 && rate % 1 < 0.75;
    const empty = 5 - full - (half ? 1 : 0);
    const container = document.createElement("div");

    for (let i = 0; i < full; i++) {
        const star = document.createElement("i");
        star.className = "fa-solid fa-star star"; // full star
        container.appendChild(star);
    }

    if (half) {
        const star = document.createElement("i");
        star.className = "fa-solid fa-star-half-stroke star"; // half star
        container.appendChild(star);
    }

    for (let i = 0; i < empty; i++) {
        const star = document.createElement("i");
        star.className = "fa-regular fa-star"; // empty star
        container.appendChild(star);
    }

    return container;
}

/////////////////////////////////////
// DOM UTILITY FUNCTIONS
// Collects review DOM nodes and filters child tags
/////////////////////////////////////
function getReviewsHtmlCollection() {
    const domReviews = document.getElementsByClassName("review");
    return Array.from(domReviews);
}

function sorter(localTag) {
    // only allow certain tags
    switch (localTag) {
        case "cite":
        case "div":
        case "span":
        case "blockquote":
            return localTag;
        default:
            return 0;
    }
}

function arrayWithAllPunctOfReviews() {
    const pointers = getReviewsHtmlCollection();
    const result = [];

    pointers.forEach(reviewBox => {
        const collectionTmp = [];
        Array.from(reviewBox.children).forEach(child => {
            const tag = child.tagName.toLowerCase();
            if (sorter(tag) !== 0) {
                collectionTmp.push(child);
            }
        });
        result.push(collectionTmp);
    });

    return result; // nested arrays of allowed child elements
}

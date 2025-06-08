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
}

/////////////////////////////////////
// GLOBAL VARIABLES
// 🇬🇧 Used to store navigation state and DOM pointers
// 🇮🇹 Utilizzate per memorizzare lo stato e riferimenti al DOM
/////////////////////////////////////
let currentIndex = 0;
let targetInjection = [];
let currentNavBtnActive = "homePageBtn";
//arrows button into review
const pointerArrowLeft = document.querySelector(".arrow_left");
const pointerArrowRight = document.querySelector(".arrow_right");
//nav button header
const pointerHomePageBtn   = document.querySelector(".homePageBtn");
const pointerServicesBtn   = document.querySelector(".servicesBtn");
const pointerContactBtn    = document.querySelector(".contactBtn");
const pointerAboutBtn      = document.querySelector(".aboutBtn");
//pages
const pointerHomePage = document.querySelector(".home_page");
const pointerSpinnerPage = document.querySelector(".page_loading");

/////////////////////////////////////
// INIT - When DOM is ready
// 🇬🇧 Initializes DOM references and populates initial reviews
// 🇮🇹 Inizializza i riferimenti e mostra le prime recensioni
/////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    targetInjection = arrayWithAllPunctOfReviews();
    reviewsPopulator();

    // automatic updating
    setInterval(() => {
        currentIndex++;
        reviewsPopulator();
    }, 5000);

});

/////////////////////////////////////
// NAV BTN EVENTS
// 🇬🇧 Handles click navigation
// 🇮🇹 Gestisce la navigazione tramite NAV
//////////////////////////////////////////
[pointerHomePageBtn, pointerServicesBtn, pointerContactBtn, pointerAboutBtn]
  .forEach(elem => {
    elem.addEventListener("click", event => {
      navigationManager(event.target.classList[0]);
    });
  });

/////////////////////////////////////
// ARROW EVENTS
// 🇬🇧 Handles previous/next click navigation
// 🇮🇹 Gestisce la navigazione tramite frecce
/////////////////////////////////////
pointerArrowLeft.addEventListener("click", previousReview);
pointerArrowRight.addEventListener("click", nextReview);

function previousReview() {
    currentIndex === 0 ? currentIndex = dataReviews.length - 1 : currentIndex--;
    reviewsPopulator();
}

function nextReview() {
    currentIndex === dataReviews.length - 1 ? currentIndex = 0 : currentIndex++;
    reviewsPopulator();
}

/////////////////////////////////////
// reviewsPopulator
// 🇬🇧 Populates previous, current and next review
// 🇮🇹 Popola recensioni precedente, attuale e successiva
/////////////////////////////////////
function reviewsPopulator() {
    for (let i = 0; i < 3; i++) {
        if (i === 0) {
            const index = currentIndex === 0 ? dataReviews.length - 1 : currentIndex - 1;
            populatorThroughIndex(index, 0);
        } else if (i === 1) {
            populatorThroughIndex(currentIndex, 1);
        } else if (i === 2) {
            const index = currentIndex === dataReviews.length - 1 ? 0 : currentIndex + 1;
            populatorThroughIndex(index, 2);
        }
    }
}

/////////////////////////////////////
// generateStars
// 🇬🇧 Creates star icons based on rating
// 🇮🇹 Crea icone stella in base al punteggio
/////////////////////////////////////
function generateStars(rate) {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.25 && rate % 1 < 0.75;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starContainer = document.createElement("div");

    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement("i");
        star.className = "fa-solid fa-star star";
        starContainer.appendChild(star);
    }

    if (halfStar) {
        const star = document.createElement("i");
        star.className = "fa-solid fa-star-half-stroke star";
        starContainer.appendChild(star);
    }

    for (let i = 0; i < emptyStars; i++) {
        const star = document.createElement("i");
        star.className = "fa-regular fa-star";
        starContainer.appendChild(star);
    }

    return starContainer;
}

/////////////////////////////////////
// populatorThroughIndex
// 🇬🇧 Populates a single review slot (left, center, right)
// 🇮🇹 Popola uno dei tre slot di recensione (sinistra, centro, destra)
/////////////////////////////////////
function populatorThroughIndex(indexData, indexReview) {
    const tmpObj = dataReviews[indexData];
    const reviewTarget = targetInjection[indexReview];

    if (!reviewTarget || reviewTarget.length < 4) return;

    reviewTarget[0].innerText = tmpObj.name;
    reviewTarget[1].innerHTML = "";
    reviewTarget[1].appendChild(generateStars(tmpObj.rate));
    reviewTarget[2].innerText = tmpObj.date;
    reviewTarget[3].innerText = tmpObj.description;
}

/////////////////////////////////////
// getReviewsHtmlCollection
// 🇬🇧 Gets all review containers from DOM
// 🇮🇹 Ottiene tutti i contenitori recensioni dal DOM
/////////////////////////////////////
function getReviewsHtmlCollection() {
    const domReviews = document.getElementsByClassName("review");
    const pointersDomReviews = [];

    for (let i = 0; i < domReviews.length; i++) {
        pointersDomReviews.push(domReviews[i]);
    }

    return pointersDomReviews;
}

/////////////////////////////////////
// sorter
// 🇬🇧 Filters only allowed tags (cite, div, span, blockquote)
// 🇮🇹 Filtra solo i tag permessi (cite, div, span, blockquote)
/////////////////////////////////////
function sorter(localTag) {
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

/////////////////////////////////////
// arrayWithAllPunctOfReviews
// 🇬🇧 Returns nested child elements of review boxes
// 🇮🇹 Restituisce gli elementi interni delle recensioni
/////////////////////////////////////
function arrayWithAllPunctOfReviews() {
    const pointersDomReviews = getReviewsHtmlCollection();
    let pointersTargetIntoReviews = [];

    for (let i = 0; i < pointersDomReviews.length; i++) {
        let collectionTmp = [];
        for (let j = 0; j < pointersDomReviews[i].children.length; j++) {
            const tag = pointersDomReviews[i].children[j].tagName.toLowerCase();
            if (sorter(tag) !== 0) {
                collectionTmp.push(pointersDomReviews[i].children[j]);
            }
        }
        pointersTargetIntoReviews.push(collectionTmp);
    }

    return pointersTargetIntoReviews;
}
/////////////////////////////////////
// deselectorBtn
// 🇬🇧 button selector(remove/add active class)
// 🇮🇹 selettore bottone(rimuove/aggiunge classe active)
/////////////////////////////////////
function selectorNavBtn(clicked){
    const elementClicked = pointerSelector(clicked);
    if(elementClicked !== 0){
        elementClicked.classList.add("li_active");
    }
    //remove old selector
    document.querySelector(`#${currentNavBtnActive}`).classList.remove("li_active");
    currentNavBtnActive = clicked;
    
}
function pointerSelector(key){
  return key === "homePageBtn"    ? pointerHomePageBtn :
         key === "servicesBtn"    ? pointerServicesBtn :
         key === "contactBtn"     ? pointerContactBtn :
         key === "aboutBtn"       ? pointerAboutBtn :
         key === "home_page"      ? pointerHomePage :
         key === "page_loading"   ? pointerSpinnerPage : 0;
}

 
 function setPageActive(clicked){
    //hide previous page
    const keyOldPage = internalLinkBtn[currentNavBtnActive];
    const keyNext = internalLinkBtn[clicked];
    document.querySelector(`.${keyOldPage}`).classList.add("none");
    //loading....
    pointerSpinnerPage.classList.remove("none");
    setTimeout(() => {
      pointerSpinnerPage.classList.add("none"); 
    }, 1000);
    //new page
    document.querySelector(`.${keyNext}`).classList.remove("none");
 }



function navigationManager(clicked){
    setPageActive(clicked);
    if(clicked!==currentNavBtnActive){
        selectorNavBtn(clicked);//selector
    }
    
}
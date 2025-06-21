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

const body = document.querySelector("body");
body.addEventListener("click",(e)=>{
    if (
        e.target.parentElement && 
        e.target.parentElement.parentElement && 
        e.target.parentElement.parentElement.localName === "nav"
    ) {
        navigationManager(e.target.classList[0], e.target);
    }
});

function navigationManager(clicked, element) {
    const oldPage = selectorNavBtn(clicked, element);
    setPageActive(clicked, oldPage);
}

function selectorNavBtn(clicked, element) {
    const oldPageTmp = currentNavBtnActive;
    if (!element.classList.contains("li_active")) {
        document.querySelector(`.${currentNavBtnActive}`).classList.remove("li_active");
        currentNavBtnActive = clicked;
        navButtonSeekerSelector(currentNavBtnActive).classList.add("li_active");
    }
    return oldPageTmp;
}

function navButtonSeekerSelector(currentNavBtnActive) {
    switch (currentNavBtnActive) {
        case "homePageBtn": {
            const homeBtn = document.querySelector(".nav_home").firstElementChild.children;
            return [...homeBtn].find(el => el.classList.contains("homePageBtn"));
        }
        case "contactBtn": {
            const cntBtn = document.querySelector(".contact_nav").firstElementChild.children;
            return [...cntBtn].find(el => el.classList.contains("contactBtn"));
        }
        case "aboutBtn": {
            const cntBtn = document.querySelector(".about_nav").firstElementChild.children;
            return [...cntBtn].find(el => el.classList.contains("aboutBtn"));
        }
        case "servicesBtn": {
            const cntBtn = document.querySelector(".services_nav").firstElementChild.children;
            return [...cntBtn].find(el => el.classList.contains("servicesBtn"));
        }
        default:
            return null;
    }
}

function setPageActive(clicked, old) {
    const keyOldPage = internalLinkBtn[old];
    const keyNext = internalLinkBtn[clicked];

    document.querySelector(`.${keyOldPage}`).classList.add("none");

    pointerSpinnerPage.classList.remove("none");
    setTimeout(() => {
        pointerSpinnerPage.classList.add("none");
        document.querySelector(`.${keyNext}`).classList.remove("none");
    }, 700);
}

let currentIndex = 0;
let targetInjection = [];
let currentNavBtnActive = "homePageBtn";

const pointerHomePage = document.querySelector(".home_page");
const pointerSpinnerPage = document.querySelector(".page_loading");
const pointerContactPage = document.querySelector(".contact_page");
const pointerAboutPage = document.querySelector(".about_page");
const pointerServicesPage = document.querySelector(".services_page");

function scrollEffectHeader(header) {
        window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('resized');
            if(header.classList.contains("header_about_page")
            || header.classList.contains("header_services_page")){
              header.style.position = 'fixed';
            }
          } else {
             if(header.classList.contains("header_about_page")
             || header.classList.contains("header_services_page") ){
              header.style.position = 'static';
            }
            header.classList.remove('resized');
            header.animate([
                { padding: '0' },
                { padding: '1rem' },
                { padding: '2rem' }
            ], {
                duration: 500,
                easing: 'linear'
            });
        }
    });
   }
document.addEventListener("DOMContentLoaded", function () {
    targetInjection = arrayWithAllPunctOfReviews();
    reviewsPopulator();

    setInterval(() => {
        currentIndex = (currentIndex + 1) % dataReviews.length;
        reviewsPopulator();
    }, 5000);

    const contact_header = document.querySelector(".header_contact_page");
    const about_header = document.querySelector(".header_about_page")
    const services_header = document.querySelector(".header_services_page")

   scrollEffectHeader(contact_header);
   scrollEffectHeader(about_header);
   scrollEffectHeader(services_header);
});
function previousReview() {
    currentIndex = (currentIndex - 1 + dataReviews.length) % dataReviews.length;
    reviewsPopulator();
}

function nextReview() {
    currentIndex = (currentIndex + 1) % dataReviews.length;
    reviewsPopulator();
}

function reviewsPopulator() {
    const indices = [
        (currentIndex - 1 + dataReviews.length) % dataReviews.length,
        currentIndex,
        (currentIndex + 1) % dataReviews.length
    ];

    indices.forEach((reviewIndex, i) => {
        populatorThroughIndex(reviewIndex, i);
    });
}

function populatorThroughIndex(indexData, indexReview) {
    if (!Array.isArray(dataReviews) || indexData < 0 || indexData >= dataReviews.length) return;

    const tmpObj = dataReviews[indexData];
    const reviewTarget = targetInjection?.[indexReview];

    if (!Array.isArray(reviewTarget) || reviewTarget.length < 4) return;

    reviewTarget[0].innerText = typeof tmpObj.name === "string" && tmpObj.name.trim() !== ""
        ? tmpObj.name
        : "Anonymous";

    reviewTarget[1].innerHTML = "";
    try {
        const starsNode = generateStars(tmpObj.rate || 0);
        if (starsNode) reviewTarget[1].appendChild(starsNode);
    } catch (e) {
        console.error("Error generating stars:", e);
    }

    reviewTarget[2].innerText = tmpObj.date || "Date not available";
    reviewTarget[3].innerText = tmpObj.description || "No description.";
}

function generateStars(rate) {
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.25 && rate % 1 < 0.75;
    const empty = 5 - full - (half ? 1 : 0);
    const container = document.createElement("div");

    for (let i = 0; i < full; i++) {
        const star = document.createElement("i");
        star.className = "fa-solid fa-star star";
        container.appendChild(star);
    }

    if (half) {
        const star = document.createElement("i");
        star.className = "fa-solid fa-star-half-stroke star";
        container.appendChild(star);
    }

    for (let i = 0; i < empty; i++) {
        const star = document.createElement("i");
        star.className = "fa-regular fa-star";
        container.appendChild(star);
    }

    return container;
}

function getReviewsHtmlCollection(classChoose) {
    const domReviews = document.getElementsByClassName(`${classChoose}`);
    return Array.from(domReviews);
}

function sorter(localTag) {
    return ["cite", "div", "span", "blockquote"].includes(localTag) ? localTag : 0;
}

function arrayWithAllPunctOfReviews() {
    const pointers = getReviewsHtmlCollection("review");
    const result = [];

    pointers.forEach(reviewBox => {
        const collectionTmp = [];
        Array.from(reviewBox.children).forEach(child => {
            const tag = child.tagName.toLowerCase();
            if (sorter(tag)) {
                collectionTmp.push(child);
            }
        });
        result.push(collectionTmp);
    });

    return result;
}


///MODAL/FORM///MODAL//FORM//MODAL//FORM//MODAL//FORM/////////////////////////////////////////////////////
//////////BOOKING BUTTON HERO///////////////////////////
function openModal(pointer) {
   pointer.addEventListener("click", () => {
    document.querySelector("body").style.overflow = "hidden"; // prevent body scroll
    document.querySelector(".modal_page").classList.remove("none"); // show modal
    const buttonclose = document.querySelector(".div_close");
    if(buttonclose && buttonclose.classList.contains("none")){
        buttonclose.classList.remove("none");
    }
    modalManager("modal_location");
 });
}
document.querySelectorAll(".booking").forEach(openModal); // apply event listener to booking buttons
// apply event listener to modal page and manage tasks with delegation events
const modalPage = document.querySelector(".modal_page");
modalPage.addEventListener("click", (e) => {
    taskManagerModal(e); // handle modal tasks
});



function getNext7Days() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const result = [];
   
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    result.push(`${weekdays[day.getDay()]}/${day.getDate()}`);

  }

  return result;
}
function workerAvailable(day_chosen, job_days) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const interval = job_days.split("-").map(Number);
  let currentDayValue = interval[0];
  let target = weekdays.indexOf(day_chosen);
  let flagFind = false;

  do {
    if (target === currentDayValue || target === (currentDayValue + 1) % 7) {
      flagFind = true;
    }
    if (currentDayValue === interval[1]) break;
    currentDayValue = (currentDayValue + 1) % 7;
  } while (!flagFind);
  
  return flagFind;
}
function numToDay(num){
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days = num.split("-")
    for (let i = 0; i < days.length; i++) {
        days[i] = weekdays[Number(days[i])];    
    }
    return days;
}

// CONTACT FORM data
const data_form_modal = {
    modal_location: {
        title: "Select a Location",
        data: ["Wallaby BC", "Lunenburg Kelowna", "Tofino Kelowna"]
    },
    modal_services:{
        title: "Select a Service",
        data: ["Men's Haircut", "Color / Ombre", "Styling / Blow-dry "],
        prices: ["€25", "€50", "€30"],
        style_class: "modal_services"
    },
    modal_when: {
        title: "Select a Date and Time",
        data: ["time_field", "date_field"],
        adaptClass: () => {
        const mainModal = document.querySelector(".main_modal");
        const divs = mainModal.querySelectorAll("div");
        divs.forEach((div) => {
              if(!div.classList.contains("close")){
                 if(!div.classList.contains("div_close")){
                   // remove all classes that start with 'button_'
            div.classList.forEach(className => {
                if (className.startsWith('button_')) {
                    div.classList.remove(className);
                }
            });
            // add the class right to each div
            div.classList.add(div.textContent.replace(/\s+/g, ''));
            // clear text content
            div.textContent = ""; 
                 }
            }
            
    });
    },
        date_field: {
            title: `Today is ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}` ,
            data: getNext7Days(),
        },
        time_field: {
            title: "Select a Time",
            data : [
                      "09:00 – 09:30",
                      "09:30 – 10:00",
                      "10:00 – 10:30",
                      "10:30 – 11:00",
                      "11:00 – 11:30",
                      "11:30 – 12:00",
                      "12:00 – 12:30",
                      "12:30 – 13:00",
                      // break point
                      "14:00 – 14:30",
                      "14:30 – 15:00",
                      "15:00 – 15:30",
                      "15:30 – 16:00",
                      "16:00 – 16:30",
                      "16:30 – 17:00",
                      "17:00 – 17:30",
                      "17:30 – 18:00"
                    ],
        }
    },
    modal_worker:{
        title: "Select your trusted hairdresser",
        data: [
                "Edward Scissorhands",
                "Freddy Krueger",
                "Zorro",
                "Wolverine",
                "Aragorn",
                "Hannibal Lecter"
    ],
    job_days:[
                "1-3",
                "2-4",
                "5-0",
                "4-6",
                "2-5",
                "5-0"
    ],
        prices: ["€5", "€10", "€12", "€20", "€15", "€0"],
        pics: [
            "/Assets/hairstylers/edward.jpg",
            "/Assets/hairstylers/freddie.jpg",
            "/Assets/hairstylers/zorro.jpg",
            "/Assets/hairstylers/wolverine.jpg",
            "/Assets/hairstylers/aragorn.jpg",
            "/Assets/hairstylers/lecter.jpg"
        ],
    }
}


///////task manager modal//////////////////////////////
let dateBook = null; // variable to store selected date
let timeBook = null; // variable to store selected date
function taskManagerModal(e) {
    const target = e.target;
    //check if the clicked element is a button inside the modal
    //close button
    if(target.parentElement !== null && target.firstElementChild !== null ){
      if  (target.firstElementChild.classList.contains("modal_book")) {
        cleanTable(); 
        closeModal(); 
        return;
      }
    }

    if(target.classList.contains("close")) {//SELECT LOCATIONS
        cleanTable(); // clear previous buttons
        closeModal(); // close modal if clicked on close button
        return;
    }
    //check if the clicked element is a button inside the modal
    if (target.classList.contains("btn_modal")) {   
       //SELECT SERVICES 
       if(target.parentElement.classList.contains("modal_location")) {
        cleanTable("modal_location"); // clear previous buttons
        modalManager("modal_services"); // switch to services modal
        chosenData.location = target.textContent;
        return;
       }//SELECT DATE AND TIME
       if(target.parentElement.classList.contains("modal_services")) {
        const closeButton = document.querySelector(".div_close")
        closeButton.classList.add("none"); // hide close button
        cleanTable("modal_services"); // clear previous buttons
        modalManager("modal_when"); // switch to when modal   
        data_form_modal.modal_when.adaptClass(); // adapt class for time and date field
        modalManager("modal_when.date_field"); // populate buttons for date and time
        modalManager("modal_when.time_field"); // populate buttons for time
        const time_field = document.querySelector(".time_field");
        const continueButton = document.createElement("button");
        continueButton.className = "continue_btn flex_center noclick btn_modal";
        continueButton.innerText = "Continue";
        time_field.insertAdjacentElement("afterend", continueButton);
        let match = target.textContent.match(/\w+[ ]\w+|\w+[ ][/][ ]\w+/)
        chosenData.service = match[0];
        let priceServ = target.firstElementChild.textContent.match(/\d+/);
        chosenData.priceService = priceServ[0] ;
        return;
       } //SELECT WORKER
         if(target.parentElement.classList.contains("modal_when")) {
          cleanTable(); // clear previous buttons
          modalManager("modal_worker"); // switch to worker modal
          return;
         }
    }   

    
         //FINALIZE BOOKING
    if (
              
              target.classList.contains("worker") ||
              target.classList.contains("worker_price") ||
              target.classList.contains("worker_name") ||
              target.classList.contains("worker_image") ||
              target.closest(".worker")
            ) {
               cleanTable(); // clear previous buttons
                let match = null;

                if (target.parentElement && target.parentElement.className) {
                  match = target.parentElement.className.match(/\d+/g);
                }

                if (!match && target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement.className) {
                  match = target.parentElement.parentElement.className.match(/\d+/g);
                }

                if (!match && target.className) {
                  match = target.className.match(/\d+/g);
                }

              
              chosenData.hairdresser = data_form_modal.modal_worker.data[match[0]-1]; 
              chosenData.pic = data_form_modal.modal_worker.pics[match[0]-1];
              let addCosts = data_form_modal.modal_worker.prices[[match[0]-1]].match(/\d+/);
              
              chosenData.extraCosts =  parseInt(addCosts[0]);
              let container = document.querySelector(".main_modal");
              container.remove();
              createTemplateFinalForm(); // create final form template
              
              return;
            }
        


    if (
      [...target.classList].some(el => el.startsWith("day_")) ||
      target.closest("[class^='day_']") && !target.classList.contains("date_field")
    ) {
      if (dateBook !== true) {
        target.closest("[class^='day_']").classList.add("active_date");
      } else {
        const oldActive = document.querySelector(".active_date");
        if (oldActive) oldActive.classList.remove("active_date");
        target.closest("[class^='day_']").classList.add("active_date");
      }
      dateBook = true;
    
      if (dateBook === true && timeBook === true) {
        const continueButton = document.querySelector(".continue_btn");
        continueButton.classList.remove("noclick");
        continueButton.classList.add("pulse");
      }
      
      const match = isNaN(target.textContent.match(/[a-zA-Z]+/)) ?
                    target.textContent.match(/[a-zA-Z]+/) : 
                    target.previousElementSibling.textContent.match(/[a-zA-Z]+/);
         chosenData.day = match[0];

    }
    
    if (
      [...target.classList].some(el => el.startsWith("time_")) ||
      target.closest("[class^='time_']") && !target.classList.contains("time_field")
    ) {
        const elements = target.closest("[class^='time_']")
      if (timeBook !== true) {
        if(elements){
          elements.classList.add("active_time");
        }
        
      } else {
        const oldActive = document.querySelector(".active_time");
        if (oldActive) oldActive.classList.remove("active_time");
        if(elements){
            elements.classList.add("active_time");
        }
      }
    
      timeBook = true;
    
      if (timeBook === true && dateBook === true) {
        const continueButton = document.querySelector(".continue_btn");
        continueButton.classList.remove("noclick");
        continueButton.classList.add("pulse");
      }
        chosenData.hour = target.textContent;
    }

  
}
////////modal manager/////////////////////////////////
function modalManager(section) {
   const mainModal = document.querySelector(".main_modal");
    mainModal.classList.add(section); // add section class to main modal for style
    titleMaker(section); // set modal title
    modalPopulator(section); // populate buttons based on section
}
////title maker/////////////////////////////////
function titleMaker(section) {
    if(!section.includes(".")) {
    const modalTitle = document.querySelector(".modal_title");
    modalTitle.innerText =  data_form_modal[section].title;
    }else{
     const firstQuery = section.split(".").shift(); // get the first part of the section   
     const lastQuery = section.split(".").pop(); // get the last part of the section
     const title = document.querySelector(`.${lastQuery}`);
     let strong = document.createElement("strong");
        strong.innerText = data_form_modal[firstQuery][lastQuery].title; // set title
        if(lastQuery === "date_field"){
            strong.className = "title_day uppercase"; // add class for styling
        }else if(lastQuery === "time_field"){
            strong.className = "time_title uppercase"; // add class for styling
        }
        title.appendChild(strong) // set title in the modal
    }
}
/////modal populator////////////////////////////////
function modalPopulator(section){
    const buttons = buttonMaker(section);
    let mainModal;
    if(section === "modal_when.date_field" || section === "modal_when.time_field") {
       // if section is date_field or time_field, append buttons to date_field  
       const lastQuery = section.split(".").pop(); // get the last part of the section
       mainModal = document.querySelector(`.${lastQuery}`);
       buttons.forEach(button => {
        mainModal.appendChild(button);
    });}else{
        mainModal = document.querySelector(".main_modal");
        buttons.forEach(button => {
        mainModal.firstElementChild.insertAdjacentElement("afterend", button);
    });
    }
    
}
////////button maker////////////////////////////////
function buttonMaker(section){
    let buttons = [];
    if(!section.includes(".")){
        for(let i = 0; i < data_form_modal[section].data.length; i++){
        let button = document.createElement("div");
        button.className = `button_${i + 1} btn_modal flex_center`;
        if(section !== "modal_worker"){button.innerText = data_form_modal[section].data[i];}
          if(section === "modal_services"){
            const price = document.createElement("span")
             price.innerText = data_form_modal[section].prices[i];
             button.appendChild(price);
        }else if(section === "modal_when"){
             button.className = `button_${i + 1} flex_center`;
        }else if(section === "modal_worker"){
             button.className = `worker_${i + 1} worker flex_center btn_modal`;
             if(!workerAvailable(chosenData.day, data_form_modal.modal_worker.job_days[i])){
                button.classList.add("noclick")
             }
             button = populateWorkerbutton(button, data_form_modal[section].data[i], data_form_modal[section].prices[i], data_form_modal[section].pics[i], data_form_modal[section].job_days[i]);
        }
        buttons.push(button);
     }
    }else{
        const firstQuery = section.split(".").shift(); // get the first part of the section
        const lastQuery = section.split(".").pop(); // get the last part of the section
        for(let i = 0; i < data_form_modal[firstQuery][lastQuery].data.length; i++){
            const button = document.createElement("div");
            if(lastQuery === "date_field"){
                button.className = `day_${i + 1} flex_center day`;
                button.style.flexDirection = 'column';
                button.style.flexWrap = 'wrap';

            }else  if(lastQuery === "time_field"){
                button.className = `time_${i + 1} flex_center time`;
            }else
             {
            button.className = `button_${i + 1} flex_center`;
            }
            if(lastQuery === "date_field"){
            const span1 = document.createElement("span");
            const span2 = document.createElement("span");
            const dateParts = data_form_modal[firstQuery][lastQuery].data[i].split("/");
            span1.innerText = dateParts[0]; // day of the week
            span2.innerText = dateParts[1]; // date
            button.appendChild(span1);
            button.appendChild(span2);
            }else{
                 button.innerText = data_form_modal[firstQuery][lastQuery].data[i];
            }
           
            buttons.push(button);
        }
        
    }

    return buttons; // returns an array of buttons
}


///////////clean table////////////////////////////////////////////
function cleanTable(section = "close") {
    const mainModal = document.querySelector(".main_modal");
        
        
    if (section === "close") {
        
        
        mainModal.className = "main_modal"; // reset class
        
        // Rimuove solo i pulsanti generati dinamicamente (es. quelli con classe button_ o day/time)
        mainModal.querySelectorAll(".btn_modal, .day, .time, .continue_btn, .date_field, .time_field, .epilogue, .final_button, .final_form ").forEach(el => el.remove());
        
        // Rimuove eventuali titoli dinamici
        const modalTitle = mainModal.querySelector(".modal_title");
        if (modalTitle) modalTitle.innerText = "";

        return;
    } else {
        mainModal.classList.remove(section);
        const title = mainModal.firstElementChild;
        if (title) title.textContent = "";
        mainModal.querySelectorAll(".btn_modal, .day, .time, .continue_btn, date_field, time_field").forEach(el => el.remove());
    }
    const closeButton = mainModal.querySelector(".div_close");
    if (closeButton && mainModal.classList.contains("modal_when")) closeButton.classList.remove("none");
    if (closeButton && mainModal.classList.contains("modal_final_form")) closeButton.classList.remove("none");
}

///////////close modal//////////////////////////////
function closeModal() {
    const closeButton = document.querySelector(".div_close");
    document.querySelector(".modal_page").classList.add("none"); // hide modal
    document.querySelector("body").style.overflow = "auto"; // allow body scroll
    if(closeButton.classList.contains("none")) {
        closeButton.classList.remove("none"); // show close button
    }
    timeBook = null;
    dateBook = null;
        return; 
}
///////for worker modal/////////////////////
function populateWorkerbutton(container, workerName, workerPrice, workerPic, job_days) {
  if (!container || !(container instanceof HTMLElement)) {
    console.error("Invalid container. A valid HTML element is required.");
    return;
  }

  // Create three inner divs
  const firstDiv = document.createElement('div');
  const secondDiv = document.createElement('div');
  const thirdDiv = document.createElement('div');

  // Create the image and insert it into the first div
  const img = document.createElement('img');
  img.src = workerPic;
  img.alt = workerName;
  firstDiv.className = "worker_image";
  firstDiv.appendChild(img);
  firstDiv.style.height = "100%";

  // Create the worker's name and availability text
  const days = numToDay(job_days);
  const disponibility = document.createElement("span");
  const name = document.createElement("span");
  name.innerText = workerName;
  secondDiv.appendChild(name);
  secondDiv.appendChild(document.createElement("br"));
  secondDiv.appendChild(document.createElement("br"));
  disponibility.appendChild(document.createTextNode(`Available on: ${days.join(" - ")}`));
  disponibility.className = "disponibility worker";
  secondDiv.appendChild(disponibility);
  secondDiv.className = "worker_name t_center worker";

  // Style the availability text
  disponibility.style.fontSize = "0.7rem";
  disponibility.style.color = "rgb(208, 96, 76)";
  disponibility.style.fontWeight = "400";
  disponibility.style.textTransform = "uppercase";

  // Set the third div with the worker's price
  thirdDiv.className = "worker_price worker";
  thirdDiv.innerText = `+  ${workerPrice}`;

  // Append all three divs to the container
  container.appendChild(firstDiv);
  container.appendChild(secondDiv);
  container.appendChild(thirdDiv);
  return container;
}

let chosenData = {
  location: "",
  service: "",
  priceService: "",
  day: "",
  hour: "",
  hairdresser: "",
  pic: "",
  extraCosts: ""
};

function createTemplateFinalForm() {
  const modalPage = document.querySelector(".modal_book");

  // Create the main modal container
  const container = document.createElement("div");
  container.className = "main_modal modal_final_form";
  container.innerHTML = `
  <h3 class="modal_title flex_center">Insert your data</h3>
  <article class="epilogue"> 
    <div class="eplg_loc">
      <strong>Salon</strong>
      <p>${chosenData.location} on ${chosenData.day} at ${chosenData.hour}</p>
    </div>
    <div class="eplg_hairdr">
       <strong>Hairdresser</strong>
       <img class="img_fluid" src="${chosenData.pic}" alt="pic of hairdresser chosen">
       <p class="uppercase">${chosenData.hairdresser}</p>
    </div>
    <div class="eplg_serv">
       <strong>Service</strong>
       <p class="uppercase">${chosenData.service}</p>
    </div>
    <div class="eplg_price">
       <strong>Final Price</strong>
       <p class="uppercase">
         €${parseInt(chosenData.priceService)} + €${chosenData.extraCosts} = 
         €${parseInt(chosenData.priceService) + chosenData.extraCosts}
       </p>
    </div>
    </article>
    <form class="final_form">
      <div class="inputForm_modal">
        <label for="first_name_modal" class="fn_fld">First name</label>
        <input type="text" id="first_name_modal" name="first_name"
               required autocomplete="given-name" aria-required="true">
      </div>
      <div class="inputForm_modal">
        <label for="last_name_modal" class="fn_fld">Last name</label>
        <input type="text" id="last_name_modal" name="last_name "
               required autocomplete="family-name" aria-required="true">
      </div>
      <div class="inputForm_modal">
        <label for="email_modal_form" class="fn_fld">Email</label>
        <input type="email" id="email_modal_form" name="email"
               required autocomplete="email" aria-required="true">
      </div>
      <div class="inputForm_modal">
        <label for="cell_modal_form" class="fn_fld">Telephone number</label>
        <input type="tel" id="cell_modal_form" name="phone"
               required autocomplete="tel" aria-required="true">
      </div>
    </form>
    <div class="final_button">
      <button class="continue_btn submit_modal">Send Reservation</button>
    </div>
    <div class="div_close flex_center none">
      <button class="close t_center uppercase">return to the page</button>
    </div>  
  `;

  // Append the modal container to the modal page
  modalPage.appendChild(container);
  document.querySelector(".submit_modal").addEventListener("click",(e)=>sendFormModal(e));
}   

function sendFormModal (event) {
 event.preventDefault(); // Prevents page reload on submit
  const form = document.querySelector(".final_form");

  // Check if form is valid using built-in HTML5 validation
  if (form.reportValidity()) {
    alert("Boking Send");
    cleanTable();
    closeModal();
    // Optional: perform data submission here
  }
  
}
///////////////////////////////////////////////////////////////////////////
//////////header contact page/////////////////////////////////////////////
//////////////////////////////////////
//only central europe
function randomlat() {
  const lat = Math.round(((Math.random() * (51 - 45) + 45) * 10000)) / 10000;  return lat;
}
function randomlon() {
  const lon = Math.round(((Math.random() * (20 - 5) + 5) * 10000)) / 10000;  return lon;
}

function initMap(map_location) {
    
    const position = { lat: randomlat(), lng: randomlon() }; // random choose

    const map = new google.maps.Map(document.querySelector(`#${map_location}`), {
      center: position,
      zoom: 12,
      disableDefaultUI: true, // simple
      gestureHandling: "cooperative", //scroll
      zoomControl: false,
      styles: [
    {
      elementType: 'all',
      stylers: [
        { saturation: -100 },
        { lightness: 0 }
      ]
    }
  ]
    });

    new google.maps.Marker({
      position: position,
      map: map,
      title: "random place",
      icon: {
      url: './Assets/logo/icons8-h-100.png',    
      scaledSize: new google.maps.Size(30, 30), 
      }
    });
  }
 function allMapsInit() {
  initMap("map_one");
  initMap("map_two");
  initMap("map_three");
}





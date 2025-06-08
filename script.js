const pointerArrowLeft = document.querySelector(".arrow_left");
const pointerArrowRight = document.querySelector(".arrow_right");
const dataRewiews = [
   {
        name: "John Smith",
        rate: 5,
        date: "August 12, 2023",
        description: "Excellent haircut and friendly staff. I always leave feeling confident and happy with my look."
    },
    {
        name: "Emily Johnson",
        rate: 4.8,
        date: "July 30, 2023",
        description: "Loved the haircut and the attention to detail. The salon has a great atmosphere and welcoming team."
    },
    {
        name: "Michael Brown",
        rate: 4.9,
        date: "June 15, 2023",
        description: "Professional and skilled stylists. The experience was relaxing and the results exceeded my expectations."
    },
    {
        name: "Sarah Davis",
        rate: 5,
        date: "May 10, 2023",
        description: "Highly recommended! Friendly service and beautiful results every time I visit."
    },
    {
        name: "David Wilson",
        rate: 4.7,
        date: "April 22, 2023",
        description: "Great experience from start to finish. The team listens and makes you feel valued."
    },
    {
        name: "Laura Martinez",
        rate: 4.6,
        date: "March 18, 2023",
        description: "Very professional service with attention to detail. The salon is clean and welcoming."
    },
    {
        name: "James Anderson",
        rate: 4.9,
        date: "February 8, 2023",
        description: "Loved the style and how easy it was to book an appointment. Staff was very attentive."
    },
    {
        name: "Olivia Thomas",
        rate: 5,
        date: "January 25, 2023",
        description: "Best salon ever! The team makes you feel special and the results always look amazing."
    },
    {
        name: "William Taylor",
        rate: 4.7,
        date: "December 5, 2022",
        description: "Friendly and skilled staff who really care about their clients. Highly recommend."
    },
    {
        name: "Sophia Moore",
        rate: 4.8,
        date: "November 12, 2022",
        description: "Amazing service with great attention to detail. I always leave feeling refreshed and confident."
    }
]
let currentIndex = 0;
pointerArrowLeft.addEventListener("click", previousRewiew);
pointerArrowRight.addEventListener("click", nextRewiew);
function previousRewiew(){ 
    currentIndex === 0 ? currentIndex = 9 : currentIndex--;
    rewiewsPopulator()
}
function nextRewiew(){
    currentIndex === 9 ? currentIndex = 0 : currentIndex++;
    rewiewsPopulator()
}

function rewiewsPopulator(){
    for (let i = 0; i < 3; i++) {
       if(i === 0){
        currentIndex === 0 ? populatorTrhoughIndex(dataRewiews.length-1 , 0) :
                             populatorTrhoughIndex(currentIndex-1, 0);
       }else if ( i === 1 ){
            populatorTrhoughIndex(currentIndex, 1);
       }else if ( i === 2 ){
        currentIndex === dataRewiews.length-1 ? populatorTrhoughIndex(0, 2) :
                                                populatorTrhoughIndex(currentIndex+1, 2);
       }
        
    }
}
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
function populatorTrhoughIndex(indexData, indexRewiew) {
    const tmpObj = dataRewiews[indexData];
    const rewiewTarget = targetInjection[indexRewiew];
    console.log(currentIndex);
    
    if (!rewiewTarget) return;

    // Assumendo che l'ordine dei figli sia: nome, rate, data, descrizione
    if (rewiewTarget.length >= 4) {
        rewiewTarget[0].innerText = tmpObj.name;
        rewiewTarget[1].innerHTML = ""; // clean
        rewiewTarget[1].appendChild(generateStars(tmpObj.rate));
        rewiewTarget[2].innerText = tmpObj.date;
        rewiewTarget[3].innerText = tmpObj.description;
    }
}
   
   


//  <i class="fa-solid fa-star star"></i>


arrayWithAllPunctOfRewiews();
//FUNCTIONS GET PUNCTATIONS OF REWIEWS
function getRewiewsHtmlColection(){
     const domRewiews = document.getElementsByClassName("rewiew");
     const pointersDomRewiews = []
      for(let i=0; i<domRewiews.length; i++){
        pointersDomRewiews.push(domRewiews[i])
    }
    return pointersDomRewiews;
}
/////////////
function sorter(localTag){
     switch (localTag) {
                case "cite":
                    return localTag;
                case "div":
                    return localTag;
                case "span":
                    return localTag;
                case "blockquote":
                    return localTag;
                default:
                    return 0;
            }
}
/////////////
function arrayWithAllPunctOfRewiews() {
     const pointersDomRewiews = getRewiewsHtmlColection();
     let pointersTargetIntoRewiews = [];
    for(let i=0; i<pointersDomRewiews.length; i++){
        let colecctionTmp = [];
        for (let j = 0; j < pointersDomRewiews[i].children.length; j++) {
           if( sorter(pointersDomRewiews[i].children[j].tagName.toLocaleLowerCase()) != 0 ){
            colecctionTmp.push(pointersDomRewiews[i].children[j])
           }   
        }
        pointersTargetIntoRewiews.push(colecctionTmp);
        colecctionTmp = [];
    }
    return pointersTargetIntoRewiews;
}
////////////////////////////////////////
let targetInjection = [];
document.addEventListener("DOMContentLoaded", function () {
    targetInjection = arrayWithAllPunctOfRewiews();
    
    rewiewsPopulator();
});

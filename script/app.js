
const loadData = async (primaryData) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, primaryData);
}
const displayData = (aiItems, primaryData) => {
    const aiContainer = document.getElementById('ai-container');





// short by date button 


    if (primaryData === 6) {

        aiItems = aiItems.slice(0, 6);
    }

    aiItems.forEach(aiItem => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card p-3 h-100">
            <img src="${aiItem.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>

                <ol id="${50 + aiItem.id}">
                </ol>
                <hr>

                <div class="d-flex justify-content-between align-items-center">
                    <div>
                    <h5 class="card-title">${aiItem.name}</h5>
                    <span>${aiItem.published_in}</span>
                    </div>
                    <div>
                       <button onclick="loadAiDetails('${aiItem.id}')" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#ai-description"> <i class="fa-solid fa-arrow-right-long"></i></button>
                    </div>
                </div>
            </div>
      </div>
        `

        aiContainer.appendChild(aiDiv);

        // add feature on ol tag and append
        aiItem.features.forEach(feature => {
            // crate li tag
            const li = document.createElement('li');
            li.innerText = feature;

            // get ol tag and append 
            const featuresContainer = document.getElementById(`${50 + aiItem.id}`);
            featuresContainer.appendChild(li);
        });

    });





    // stop loading spinner ;
    const loadingSpinner = document.getElementById('spinner');
    loadingSpinner.classList.add('d-none');
    // view short by date button;
    const shortByDateBtn = document.getElementById('short-by-date-btn');
    shortByDateBtn.classList.remove('d-none');
    // view see more button;
    const seeMoreBtn = document.getElementById('see-more-btn');
    seeMoreBtn.classList.remove('d-none');
}





// show button eventlistener

document.getElementById('see-more-btn').addEventListener('click', function () {
    // clear the previous html
    const previousHtml = document.getElementById('ai-container');
    previousHtml.innerHTML = '';
// show hide button and loading spinner;
    buttonShowHide();

    // call the data without parameter
    loadData()

})



// ai details in modal 
const loadAiDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiDetails(data.data);
}

const displayAiDetails = details => {

    // modal price plan;
    const modalPriceBasic = document.getElementById('modal-price-basic')
    const modalPricePro = document.getElementById('modal-price-pro')
    const modalPriceEnterprise = document.getElementById('modal-price-enterprise')


    details.pricing ? modalPriceBasic.innerHTML = `<span>${details.pricing[0].price}</span><br><span>${details.pricing[0].plan}</span>`: modalPriceBasic.innerHTML = `<span>Free of cost/Basic</span>`;

    details.pricing ? modalPricePro.innerHTML = `<span>${details.pricing[1].price}</span><br><span>${details.pricing[1].plan}</span>`: modalPricePro.innerHTML = `<span>Free of cost/Pro</span>`;

     details.pricing ? modalPriceEnterprise.innerHTML = `<span>${details.pricing[2].price}</span><br><span>${details.pricing[2].plan}</span>` : modalPriceEnterprise.innerHTML = `<span>Free of cost/Enterprise</span>`;







    // modal features 
    const modalCardFeature = document.getElementById('modal-card-feature');
    modalCardFeature.innerHTML = `
   <h5>Feature</h5>
   <ul id="${30 + details.id}"></ul>
   `;






console.log(details.features[1].feature_name);

    //    features li;
   
        const ulLi = document.createElement('li');
        const ul = document.getElementById(`${30 + details.id}`);
      
        ul.innerHTML = `
        <li class="${details.features[1] ? "" : "d-none"} ">${details.features[1].feature_name}</li>
        <li class="${details.features[2] ? "" : "d-none"} ">${details.features[2].feature_name}</li>
        <li class="${details.features[3] ? "" : "d-none"} ">${details.features[3].feature_name}</li>
        <li class="${details.features[4] ? "" : "d-none"} ">${details.features[4] ? details.features[4].feature_name:"" }</li>
        <li class="${details.features[5] ? "" : "d-none"} ">${details.features[5] ? details.features[5].feature_name:"" }</li>
        `;



    // modal integration 
    const modalCardIntegration = document.getElementById('modal-card-integration');
    modalCardIntegration.innerHTML = `
    <h5>Integrations</h5>
    <ul id="${70 + details.id}"></ul>

`
const integrationOl = document.getElementById(`${70 + details.id}`)
details.integrations ? details.integrations.forEach(integration => {
        const li = document.createElement('li');
        li.innerText = `${integration}`;

        integrationOl.appendChild(li);


    }):integrationOl.innerText = "No data Found";


    // modal first card dynamic texts and images;
    const modalFirstCardTitle = document.getElementById('modal-first-card-title');
    modalFirstCardTitle.innerText = `${details.description}`;

    // modal second card;
    const secondCardContainer = document.getElementById('modal-second-card');
    secondCardContainer.innerHTML = `
    <img src="${details.image_link[0] ? details.image_link[0] : details.image_link[1]}" class="card-img-top" alt="...">
    <span class="${details.accuracy.score != null ? "accuracyBtn" : "d-none"} ">${details.accuracy.score != null ? details.accuracy.score * 100 + "%" + " " + "accuracy": ""} </span> 
    <h5>${details.input_output_examples != null ? details.input_output_examples[0].input : "Can you give any example?"} </h5>
    <p>${details.input_output_examples != null ? details.input_output_examples[0].output : "No! Not Yet! Take a break!!!"} </p>
    `;


}


const buttonShowHide =() =>{
    // start loading spinner ;
    const loadingSpinner = document.getElementById('spinner');
    loadingSpinner.classList.remove('d-none');
    // view short by date button;
    const shortByDateBtn = document.getElementById('short-by-date-btn');
    shortByDateBtn.classList.add('d-none');
    // view see more button;
    const seeMoreBtn = document.getElementById('see-more-btn');
    seeMoreBtn.classList.add('d-none');
}

document.getElementById('short-by-date-btn').addEventListener('click', async function(){
    const previousHtml = document.getElementById('ai-container');
    previousHtml.innerHTML = '';

        
        buttonShowHide();
    

    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    sortData(data.data.tools);

    })

    const sortData = data => {
        console.log(data);
        const sortedAllData = data.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
        displayData(sortedAllData)
    }



loadData(6);

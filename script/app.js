
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools);
}
const displayData = aiItems => {
    const aiContainer = document.getElementById('ai-container');
       
    aiItems = aiItems.slice(0, 6);

    aiItems.forEach(aiItem => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card p-3 h-100">
            <img src="${aiItem.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>Natural language processing</li>
                    <li>Natural language processing</li>
                    <li>Natural language processing</li>
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

document.getElementById('see-more-btn').addEventListener('click', function(){
   
})

const loadAiDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiDetails(data.data);
}

const displayAiDetails = details => {

    // modal dynamic texts and images;
    const modalFirstCardTitle = document.getElementById('modal-first-card-title');
    modalFirstCardTitle.innerText = `${details.description}`;

    // modal second card;
    const secondCardContainer = document.getElementById('modal-second-card');
    secondCardContainer.innerHTML = `
    <img src="${details.image_link[0] ? details.image_link[0]:details.image_link[1]}" class="card-img-top" alt="...">
    <h5>${details.input_output_examples[0] ? details.input_output_examples[0].input:"Can you give any example?"} </h5>
    <p>${details.input_output_examples[0] ? details.input_output_examples[0].output:"No! Not Yet! Take a break!!!"} </p>
    `
    
    console.log(details);
}

loadData();

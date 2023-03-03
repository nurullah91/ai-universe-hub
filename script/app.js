
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
                       <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#ai-description"> <i class="fa-solid fa-arrow-right-long"></i></button>
                    </div>
                </div>
            </div>
      </div>
        `

        aiContainer.appendChild(aiDiv);

    });
}





// show button eventlistener
document.getElementById('see-more-btn').addEventListener('click', function(){
   
})


loadData();

const sortButton = document.getElementById('sort');
sortButton.addEventListener('click', function() {
    console.log('clicked');
    const petContainer = document.getElementById('all_pets');
    petContainer.innerHTML = "";
    
    loadPets1(sortedPets);
});

const loadPets1 = (callback) => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            console.log(data.pets);
            if (callback) {
                callback(data.pets);
            }
        })
        .catch(error => console.log(error));
}

const sortedPets = (pets) => {
    const sorted = pets.sort((a, b) => {
        return (b.price || 0) - (a.price || 0);
    });
    
    displayPets(sorted);
}

const displayPets = (pets) => {
    const petContainer = document.getElementById('all_pets');
    for (let i = 0; i < pets.length; i++) {

        const card = document.createElement('div');
        card.classList = "card border-2 rounded-lg p-4"
        card.innerHTML = `
  <figure>
    <img class="h-full w-full object-cover"
      src=${pets[i].image}
      alt="" />
  </figure>
  <p class="font-bold text-xl">${pets[i].pet_name}</p>

  <div class="flex items-center gap-1">
    <img class="h-[16px] w-[16px]" src='https://img.icons8.com/?size=50&id=gGUs3TPWpvgb&format=png' alt="">
    <p>Breed: ${pets[i].breed ? pets[i].breed : "Not available"}</p>
</div>
<div class="flex items-center gap-1">
    <img class="h-[18px] w-[18px]" src='https://img.icons8.com/?size=25&id=jlu5uUD466DT&format=png' alt="">
    <p>Birth: ${pets[i].date_of_birth ? pets[i].date_of_birth : "Not available"}</p>
</div>
<div class="flex items-center gap-1">
    <img class="h-[18px] w-[18px]" src='https://img.icons8.com/?size=32&id=15255&format=png' alt="">
    <p>Gender: ${pets[i].gender ? pets[i].gender : "Not available"}</p>
</div>
<div class="flex items-center gap-1">
    <img class="h-[18px] w-[18px]" src='https://img.icons8.com/?size=24&id=85782&format=png' alt="">
    <p>Price: ${pets[i].price ? `${pets[i].price} $` : "Not available"}</p>
</div>

<hr class="">

        `;


const likedButton = document.createElement('button');
likedButton.classList = "bg-red-400 border-1 rounded-lg p-1 btn";
likedButton.innerHTML = `
    <img src='https://img.icons8.com/?size=24&id=82788&format=png' />
`;
likedButton.addEventListener('click', function(){
    const likedContainer = document.getElementById('liked_list')

    const img = document.createElement('img');
    img.classList = "h-[100px] w-full"; 
    img.src = pets[i].image;
    img.alt = pets[i].pet_name; 

    likedContainer.appendChild(img);
}); 

const adoptButton = document.createElement('button');
adoptButton.classList = "bg-white text-[#127982] font-bold border border-[#127982] rounded-lg p-1 btn";
adoptButton.innerText = "Adopt";

adoptButton.addEventListener('click',function(){
    console.log('click')
    const modalContainer = document.getElementById('congrats_modal')
    modalContainer.classList.remove('hidden');
    modalContainer.innerHTML = ""; 
    const divModal = document.createElement('div')
    divModal.classList = "modal-content bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-1/3 mx-auto space-y-3 max-h-[90vh] overflow-y-auto mt-10"
    divModal.innerHTML = `
    <img class="mx-auto" src='https://img.icons8.com/?size=80&id=mhqnQm2e8Vst&format=png' />
    <p class="text-5xl text-center font-bold">Congrats</p>
    <p class="text-xl text-center">Adoption process starts for your Pet</p>
    <p class="text-5xl text-center font-bold" id="countdown">3</p>
    `
    modalContainer.append(divModal)
    startCountdown(divModal, 3);
})

const detailsButton = document.createElement('button');
detailsButton.classList = "bg-white text-[#127982] font-bold border border-[#127982] rounded-lg p-1 btn";
detailsButton.innerText = "Details";

detailsButton.addEventListener('click',function(){
    console.log('çlicked');

    const modalContainer = document.getElementById('modal')
    modalContainer.classList.remove('hidden');
    modalContainer.innerHTML = ""; 
    const divModal = document.createElement('div')
    
    // divModal.classList = "space-y-2 bg-red-400 w-[40%] h-[50%] rounded-lg p-2"
    divModal.classList = "modal-content bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-1/3 mx-auto space-y-3 max-h-[90vh] overflow-y-auto"

    divModal.innerHTML = `
    
    <figure>
    <img class="h-full w-full object-cover"
      src=${pets[i].image}
      alt="" />
  </figure>
  <p class="font-bold text-xl">${pets[i].pet_name}</p>

  <div class="flex items-center gap-1">
    <img class="h-[16px] w-[16px]" src='https://img.icons8.com/?size=50&id=gGUs3TPWpvgb&format=png' alt="">
    <p>Breed: ${pets[i].breed ? pets[i].breed : "Not available"}</p>
</div>
<div class="flex items-center gap-1">
    <img class="h-[18px] w-[18px]" src='https://img.icons8.com/?size=25&id=jlu5uUD466DT&format=png' alt="">
    <p>Birth: ${pets[i].date_of_birth ? pets[i].date_of_birth : "Not available"}</p>
</div>
<div class="flex items-center gap-1">
    <img class="h-[18px] w-[18px]" src='https://img.icons8.com/?size=32&id=15255&format=png' alt="">
    <p>Gender: ${pets[i].gender ? pets[i].gender : "Not available"}</p>
</div>
<div class="flex items-center gap-1">
    <img class="h-[18px] w-[18px]" src='https://img.icons8.com/?size=24&id=85782&format=png' alt="">
    <p>Price: ${pets[i].price ? `${pets[i].price} $` : "Not available"}</p>
</div>

<hr class="">

<div class="">
    <p class="font-bold">Details Information</p>
    <p>${pets[i].pet_details}</p>
</div>

<div>
    <button class="btn w-full" onclick="modfunc()">Close</button>
</div>

    
    `



    modalContainer.append(divModal)
})

const actionContainer = document.createElement('div');
actionContainer.classList = "flex items-center gap-2 justify-between pt-4";
actionContainer.append(likedButton, adoptButton, detailsButton);
card.append(actionContainer);


petContainer.append(card)
    }
}

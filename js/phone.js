const searchButton = () => {
    const input = document.getElementById("input-value");
    const phoneSearch = document.getElementById("phone-search-result");
    const error = document.getElementById("error");
    const inputValue = input.value;
    input.value = "";
    const input20 = inputValue.slice(0,20);
    if (isNaN(inputValue)) {
        error.innerHTML = "";
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then (res => res.json())
        .then (data => displayPhone(data.data))
    }
    else if (inputValue == "") {
        error.innerText = "Please try again.";
        phoneSearch.innerHTML = "";
    }
    else {
        error.innerText = "Do not enter a number.";
        phoneSearch.innerHTML = "";
    }
   
}

const displayPhone = phones => {
    const phoneSearch = document.getElementById("phone-search-result");
    const first20Phones = phones.slice(0,20);
    first20Phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card ms-5 me-5 mt-5 mb-5">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.brand}</p>
              <button onclick = "exploreDetails('${phone.slug}')" class="btn btn-success">Explore</button>
            </div>
        </div>
        `
        phoneSearch.appendChild(div);
    });
    
}

const exploreDetails = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`
    fetch (url)
    .then (res => res.json())
    .then (data => showDetails(data));
}

const showDetails = (data) => {
    const showDetails = document.getElementById("show-details");
    // const first20Phones = phones.slice(0,20);
    // first20Phones.forEach(phone => {
    //     console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="border border-success border-1 p-4 ">
            <div>
                <h3>${data.data.name}</h3>
            </div>
        <div class="d-flex ms-5 me-5 mt-5 mb-5">
          <div class="me-5"><img src="${data.data.image}" height = "300px" width = "800px" class="card-img-top" alt="..."></div>
             <div class="ms-5">
                 <p class="card-text">${data.data.releaseDate}</p>
                 <p class="card-text">${data.data.storage}</p>
             </div>
         </div>
        </div>
       
        `
        showDetails.appendChild(div);

}





const searchButton = () => {
    const input = document.getElementById("input-value");
    const phoneSearch = document.getElementById("phone-search-result");
    const showDetails = document.getElementById("show-details");
    const error = document.getElementById("error");
    const inputValue = input.value;
    input.value = "";
    const input20 = inputValue.slice(0,20);
    if (isNaN(inputValue)) {
        error.innerHTML = "";
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then (res => res.json())
        .then (data => checkStatus(data))
    }
    else if (inputValue == "") {
        showDetails.innerHTML = "";
        phoneSearch.innerHTML = "";
        error.innerText = "Please try again.";
    }
    else {
        showDetails.innerHTML = "";
        phoneSearch.innerHTML = "";
        error.innerText = "Do not enter a number.";
    }
}

const checkStatus = (data) => {
    const phoneSearch = document.getElementById("phone-search-result");
    const error = document.getElementById("error");
    if (data.status == true) {
        displayPhone(data.data);
    }
    else {
        phoneSearch.innerHTML = "";
        error.innerText = "Phone not found";
    }
}

const displayPhone = phones => {
    const phoneSearch = document.getElementById("phone-search-result");
    const showDetails = document.getElementById("show-details");
    showDetails.innerHTML = "";
    phoneSearch.innerHTML = "";
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
    console.log(data);
    const showDetails = document.getElementById("show-details");
    showDetails.innerHTML = "";
    const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="justify-content-center border border-success border-1 p-3">
            <div>
                <h3 class="bg-success text-white text-center text-success">${data.data.name}</h3>
            </div>
        <div class="ms-5 me-5 mt-5 mb-5">
          <div class="me-5"><img src="${data.data.image}" height = "300px" width = "1000px" class="mx-auto card-img-top" alt="...">
          </div>
          <div class="pt-5 ps-5">
                <h5>Release Date: </h5>
                <p class="card-text">${data.data.releaseDate ? data.data.releaseDate: "Not available"}</p>
                <h5>Main Features: </h5>
                <p class="card-text"><h6 class="bolder">Chip Set: </h6>${data.data.mainFeatures.chipSet}</p>
                <p class="card-text"><h6 class="bolder">Display Size: </h6>${data.data.mainFeatures.displaySize}</p>
                <p class="card-text"><h6 class="bolder">Memory: </h6>${data.data.mainFeatures.memory}</p>
                <p class="card-text"><h6 class="bolder">Storage </h6>${data.data.mainFeatures.storage}</p>
                <p class="card-text"><h6 class="bolder">Sensors </h6>${data.data.mainFeatures.sensors.join(" ")}</p>
          </div> 
          <div class = "pt-5 ps-5">
                <h5>Others: </h5>
                <p class="card-text">${data.data.others?.Bluetooth ? data.data.others?.Bluetooth: "Not available"}</p>
                <p class="card-text"><h6 class="bolder">GPS: </h6>${data.data?.GPS ? data.data.others?.GPS: "Not available"}</p>
                <p class="card-text"><h6 class="bolder">NFC: </h6>${data.data.others?.NFC ? data.data.others?.NFC: "Not available"}</p>
                <p class="card-text"><h6 class="bolder">Radio: </h6>${data.data.others?.Radio ? data.data.others?.Radio: "Not available"}</p>
                <p class="card-text"><h6 class="bolder">USB: </h6>${data.data.others?.USB ? data.data.others?.USB: "Not available"}</p>
                <p class="card-text"><h6 class="bolder">WLAN: </h6>${data.data.others?.WLAN ? data.data.others?.WLAN: "Not available"}</p>
           </div> 
         </div>
        </div>
        `
        showDetails.appendChild(div);
}





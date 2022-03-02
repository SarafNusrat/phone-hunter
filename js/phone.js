const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    const inputValue = input.value;
    input.value = "";
    console.log(inputValue);
  
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then (res => res.json())
    .then (data => displayPhone(data.data))
}

const displayPhone = phones => {
    const phoneSearch = document.getElementById("phone-search-result");
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card ms-5 me-5 mt-5 mb-5">
            <img src="${phone.image}" class="card-img-top .img-fluid" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.brand}</p>
              <a href="#" class="btn btn-success">Explore</a>
            </div>
        </div>
        `
        phoneSearch.appendChild(div);
    });
    
}




//LOAD CATAGORY LIST

loadCatagoryList = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
        displayCatagoryList(data.categories);
        })
}

loadCatagoryList();


//DISPLAY CATAGORY LIST

function displayCatagoryList(categories){
    const catagoryList = document.getElementById('catagory-list')
    for(let cat of categories)
    {
    catagoryList.innerHTML += `
    <p class="bg-[#15803D] w-52 h-8 text-lg my-4 pl-2 hover:cursor-pointer">${cat.category_name}</p>
    `
    }
}
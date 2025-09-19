
//LOAD CATAGORY LIST

loadCategoryList = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
            displayCategoryList(data.categories);
        })
}

loadCategoryList();


//DISPLAY CATEGORY LIST

function displayCategoryList(categories) {
    const categoryList = document.getElementById('category-list')
    for (let cat of categories) {
        categoryList.innerHTML += `
    <p class="hover:bg-[#12b21a88] w-56 h-9 flex items-center text-lg font-semibold my-4 pl-3 rounded-lg hover:cursor-pointer">${cat.category_name}</p>
    `
    }
}

//DISPLAY ACTIVE

document.getElementById('category-list').addEventListener('click', (event) => {
    if (event.target.localName === 'p') {
        document.querySelectorAll('#category-list p').forEach((p) => {
            p.classList.remove('activeClass')
        })
        event.target.classList.add('activeClass')
    }
})
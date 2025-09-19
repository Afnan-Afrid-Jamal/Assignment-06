
//LOAD CATAGORY LIST

loadCategoryList = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
            displayCategoryList(data.categories);
        })

}

//FUNCTION CALL

loadCategoryList();



//DISPLAY CATEGORY LIST

function displayCategoryList(categories) {
    const categoryList = document.getElementById('category-list')
    for (let cat of categories) {
        categoryList.innerHTML += `
    <p id="${cat.id}" class="hover:bg-[#12b21a88] w-56 h-9 flex items-center text-lg font-semibold my-4 pl-3 rounded-lg hover:cursor-pointer">${cat.category_name}</p>
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
        if (event.target.id === 'all-trees') {
            loadAllTrees();
        }
        else {
            loadCategoryContent(event.target.id);
        }
    }
})


// LOAD ALL TREES

loadAllTrees = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => {
            const allplant = data.plants
            const categoryContent = document.getElementById("category-content")
            categoryContent.innerHTML = ``
            for (let plant of allplant) {
                showAllTrees(plant)
            }
        })

}

//DISPLAY ALL TREES

function showAllTrees(plant) {
    const categoryContent = document.getElementById('category-content')
    categoryContent.innerHTML +=
        `
        <div id="categoryContentContainer" class="w-70 h-auto shadow-xl p-4 mb-8 rounded-xl">
        <div>
            <img src="${plant.image}" alt="" class="w-[298px] h-[178px] object-cover">
            <h2 class="my-3 text-lg font-semibold">${plant.name}</h2>
            <p class="my-3 text-[#1f2937e7] text-sm text-justify">${plant.description}</p>
        </div>
        <div class="flex justify-between mt-4 mb-5">
            <h4 class="bg-green-200 text-green-700 font-medium px-2 py-1 rounded-3xl">${plant.category}</h4>
            <h3 class="text-lg font-semibold">৳${plant.price}</h3>
        </div>
        <div>
            <button
            class="w-32 h-10 bg-[#15803D] rounded-4xl text-white text-center font-medium hover:cursor-pointer hover:bg-[#FACC15] hover:text-[#15803D] duration-300 hover:scale-103 w-full">Get
            Involved
            </button>
        </div>
    </div>
    `
}

//LOAD CATEGORY CONTENT

function loadCategoryContent(categoryId) {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
            const categoryTrees = data.plants;
            const categoryContent = document.getElementById("category-content")
            categoryContent.innerHTML = ``
            for (const categoryTree of categoryTrees) {
                showCategoryContent(categoryTree)
            }
        })

}

//DISPLAY CATEGORY CONTENT

function showCategoryContent(plants) {
    const categoryContent = document.getElementById("category-content")

    categoryContent.innerHTML +=
        `
    <div id="categoryContentContainer" class="w-72 auto shadow-xl p-4 mb-8 rounded-xl">
        <div>
            <img src="${plants.image}" alt="" class="w-[298px] h-[178px] object-cover">
            <h2 class="my-3 text-lg font-semibold">${plants.name}</h2>
            <p class="my-3 text-[#1f2937e7] text-sm">${plants.description}</p>
        </div>
        <div class="flex justify-between mt-4 mb-5">
            <h4 class="bg-green-200 text-green-700 font-medium px-2 py-1 rounded-3xl">${plants.category}</h4>
            <h3 class="text-lg font-semibold">৳${plants.price}</h3>
        </div>
        <div>
            <button
            class="w-full py-2 bg-[#15803D] rounded-4xl text-white text-center font-medium hover:cursor-pointer hover:bg-[#FACC15] hover:text-[#15803D] duration-300 hover:scale-103 w-full">Get
            Involved
            </button>
        </div>
    </div>
    `
}

// DEFAULT ALL TREES DISPLAY

document.getElementById('all-trees').classList.add('activeClass');
loadAllTrees();


// LOADING SPINNER

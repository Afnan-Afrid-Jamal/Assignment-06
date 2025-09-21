
//LOAD CATAGORY LIST

loadCategoryList = () => {
    showLoadingSpinner()
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
            displayCategoryList(data.categories);
            removeLoadingSpinner()
        })
    

}

//FUNCTION CALL

loadCategoryList();



//DISPLAY CATEGORY LIST

function displayCategoryList(categories) {
    const categoryList = document.getElementById('category-list')
    for (let cat of categories) {
        categoryList.innerHTML += `
    <p id="${cat.id}" class="hover:bg-[#12b21a88] text-[#1f2937e7] w-56 h-9 flex items-center text-lg my-4 pl-3 rounded-lg hover:cursor-pointer duration-300 hover:scale-102 transform active:scale-95">${cat.category_name}</p>
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
    showLoadingSpinner()
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => {
            const allplant = data.plants
            const categoryContent = document.getElementById("category-content")
            categoryContent.innerHTML = ``
            for (let plant of allplant) {
                showAllTrees(plant)
            }
            removeLoadingSpinner()
        })

}

//DISPLAY ALL TREES

function showAllTrees(plant) {
    const categoryContent = document.getElementById('category-content')
    categoryContent.innerHTML +=
        `
        <div id="categoryContentContainer" class="md:w-70 sm:w-full h-auto shadow-xl p-4 rounded-xl">
        <div>
            <img src="${plant.image}" alt="" class="w-[298px] h-[178px] object-cover">
            <h2 class="my-3 text-lg font-semibold hover:cursor-pointer" onclick="showDetail('${plant.id}')">${plant.name}</h2>
            <p class="my-3 text-[#1f2937e7] text-sm text-justify">${plant.description}</p>
        </div>
        <div class="flex justify-between mt-4 mb-5">
            <h4 class="bg-green-200 text-green-700 font-medium px-2 py-1 rounded-3xl">${plant.category}</h4>
            <h3 class="text-lg font-semibold">৳${plant.price}</h3>
        </div>
        <div>
            <button
            class="add-to-cart-btn w-32 h-10 bg-[#15803D] rounded-4xl text-white text-center font-medium hover:cursor-pointer hover:bg-[#FACC15] hover:text-[#15803D] duration-300 hover:scale-102 transform active:scale-95 w-full"  data-name="${plant.name}" data-price="${plant.price}">Add to Cart
            </button>
        </div>
    </div>
    `

}

//LOAD CATEGORY CONTENT

function loadCategoryContent(categoryId) {
    showLoadingSpinner()
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
            const categoryTrees = data.plants;
            const categoryContent = document.getElementById("category-content")
            categoryContent.innerHTML = ``
            for (const categoryTree of categoryTrees) {
                showCategoryContent(categoryTree)
            }
            removeLoadingSpinner()
        })
}

//DISPLAY CATEGORY CONTENT

function showCategoryContent(plants) {
    const categoryContent = document.getElementById("category-content")

    categoryContent.innerHTML +=
        `
    <div id="categoryContentContainer" class="md:w-70 sm:w-full h-auto shadow-xl p-4 rounded-xl">
        <div>
            <img src="${plants.image}" alt="" class="w-[298px] h-[178px] object-cover">
            <h2 class="my-3 text-lg font-semibold hover:cursor-pointer" onclick="showDetail('${plants.id}')">${plants.name}</h2>
            <p class="my-3 text-[#1f2937e7] text-sm text-justify">${plants.description}</p>
        </div>
        <div class="flex justify-between mt-4 mb-5">
            <h4 class="bg-green-200 text-green-700 font-medium px-2 py-1 rounded-3xl">${plants.category}</h4>
            <h3 class="text-lg font-semibold">৳${plants.price}</h3>
        </div>
        <div>
            <button
            class="w-full py-2 bg-[#15803D] rounded-4xl text-white text-center font-medium hover:cursor-pointer hover:bg-[#FACC15] hover:text-[#15803D] duration-300 hover:scale-102 transform active:scale-95 w-full" data-name="${plants.name}" data-price="${plants.price}">Add to Cart
            </button>
        </div>
    </div>
    `
}

// DEFAULT ALL TREES DISPLAY

document.getElementById('all-trees').classList.add('activeClass');
loadAllTrees();

//CART

const categoryContent = document.getElementById('category-content');
const purchaseProductContainer = document.getElementById('purchase-product-container');

let existingProductInCart = [];

categoryContent.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (btn.tagName !== 'BUTTON') {
        return;
    }
    else {
        const name = btn.dataset.name;
        const price = btn.dataset.price;
        let existingItem = existingProductInCart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        }

        else {
            existingProductInCart.push({ name: name, price: price, quantity: 1 });
        }

        showCart();
        alert(`${name} added to cart!`);
    }
});





//DELETE BTN

purchaseProductContainer.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('.remove-btn');
    if (!removeBtn) {
        return;
    }
    else {

        const itemDiv = removeBtn.parentElement;
        const itemName = itemDiv.querySelector('h4').innerText;

        itemDiv.remove();

        existingProductInCart = existingProductInCart.filter(item => item.name !== itemName);

        alert(`${itemName} removed from cart!`);
        showCart()
    }
});

// DISPLAY IN CART

function showCart() {
    purchaseProductContainer.innerHTML = '';
    let totalAmount = 0;
    existingProductInCart.forEach(item => {
        const purchaseProduct = document.createElement('div');
        purchaseProduct.innerHTML = `
        <div class="flex justify-between items-center bg-[#d9ffe4] p-3 rounded-xl my-2">
            <div>
                <h4 class="font-medium mb-1">${item.name}</h4>
                <p>৳${item.price} x ${item.quantity}</p>
            </div>
            <div class="remove-btn hover:cursor-pointer" data-name="${item.name}">
                <img src="./assets/exit-button.png" alt="" class="w-5">
            </div>
        </div>
        `;
        purchaseProductContainer.appendChild(purchaseProduct);
        totalAmount += item.price * item.quantity;
    });

    document.getElementById('total-taka').innerText = `৳${totalAmount}`;
}


// SHOW MODAL

function showDetail(treeId) {
    showLoadingSpinner()
    fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`)
        .then((res) => res.json())
        .then((data) => {
            const tree = data.plants;

            const modalBox = document.querySelector('#modalStructure .modal-box');
            modalBox.innerHTML = `
                <h3 class="text-3xl font-bold text-center">${tree.name}</h3>
                <img src="${tree.image}" alt="${tree.name}" class="w-full h-48 object-cover my-3 rounded-lg">
                <p class="py-2 text-lg text-gray-600 text-justify">${tree.description}</p>
                <div class="flex justify-between mt-4 mb-5">
                    <h4 class="bg-green-200 text-green-700 font-medium px-2 py-1 rounded-3xl">${tree.category}</h4>
                    <h3 class="text-xl font-semibold">৳${tree.price}</h3>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            `;

            document.getElementById('modalStructure').showModal();
            removeLoadingSpinner()
        })
}


// LOADING SPINNER

// const loadingSpinner = document.getElementById('loading-spinner')

function showLoadingSpinner() {
    const loadingSpinner = document.getElementById('loading-spinner')
    loadingSpinner.classList.remove('hidden');
}

function removeLoadingSpinner() {
    const loadingSpinner = document.getElementById('loading-spinner')
    loadingSpinner.classList.add('hidden');
}
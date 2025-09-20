
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
    <p id="${cat.id}" class="hover:bg-[#12b21a88] text-[#1f2937e7] w-56 h-9 flex items-center text-lg my-4 pl-3 rounded-lg hover:cursor-pointer">${cat.category_name}</p>
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
        <div id="categoryContentContainer" class="md:w-70 sm:w-full h-auto shadow-xl p-4 rounded-xl">
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
            class="add-to-cart-btn w-32 h-10 bg-[#15803D] rounded-4xl text-white text-center font-medium hover:cursor-pointer hover:bg-[#FACC15] hover:text-[#15803D] duration-300 hover:scale-103 w-full"  data-name="${plant.name}" data-price="${plant.price}">Add to Cart
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
    <div id="categoryContentContainer" class="md:w-70 sm:w-full h-auto shadow-xl p-4 rounded-xl">
        <div>
            <img src="${plants.image}" alt="" class="w-[298px] h-[178px] object-cover">
            <h2 class="my-3 text-lg font-semibold">${plants.name}</h2>
            <p class="my-3 text-[#1f2937e7] text-sm text-justify">${plants.description}</p>
        </div>
        <div class="flex justify-between mt-4 mb-5">
            <h4 class="bg-green-200 text-green-700 font-medium px-2 py-1 rounded-3xl">${plants.category}</h4>
            <h3 class="text-lg font-semibold">৳${plants.price}</h3>
        </div>
        <div>
            <button
            class="w-full py-2 bg-[#15803D] rounded-4xl text-white text-center font-medium hover:cursor-pointer hover:bg-[#FACC15] hover:text-[#15803D] duration-300 hover:scale-103 w-full" data-name="${plants.name}" data-price="${plants.price}">Add to Cart
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
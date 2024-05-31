const categoryParamToCategoryNameMap = {
    'shirt': 'Shirt',
    'tshirt': 'T-Shirt',
    'pant': 'Pant',
    'saree': 'Saree',
    'chudi': 'Chudi'
}

const categoryApiMap = {
    'shirt': 'https://b8e846cae0cc45d6a291607f6fd56738.api.mockbin.io/',
    'tshirt': 'https://56009baf9c774d5883354efa8c3988b0.api.mockbin.io/',
    'pant': 'https://ffb7144fba1e4745bce1b6f7e6130fff.api.mockbin.io/',
    'saree': 'https://cb6c1a6b3678477599f897700d1cf7ea.api.mockbin.io/',
    'chudi': 'https://c2b0b6d4cd5e4033b7c20c918d9c8784.api.mockbin.io/'
};

$(document).ready(function() {
    const successAlert = document.getElementById('productAdditionSuccessAlert');
    const failureAlert = document.getElementById('productAdditionFailureAlert');
    successAlert.style.display = 'none';
    failureAlert.style.display = 'none';

    var params = new URLSearchParams(window.location.search);
    var categoryName = params.get('category');
    var categoryWiseAPI = categoryApiMap[categoryName];

    const productArray = getProducts(categoryWiseAPI).then(productsArray => {
        if (productsArray === null) {
            return;
        } else {
            productsArray.forEach(item => {
                const allCardsContainer = document.querySelector('#allCardsContainer')
                const cardHtml = `
                    <div class="col-md-3 mb-4">
                        <div class="card">
                            <img src="${item.image_url}" width="253" height="383" class="card-img-top" alt="Product Image">
                            <div class="card-body">
                                <p class="card-text product-id">Product ID: ${item.productId}</p>
                                <p class="card-text product-name">Name: ${item.name}</p>
                                <p class="card-text product-price">Price: ${item.price}</p>
                                <button class="addToCartBtn btn btn-primary btn-sm" onclick="addToCart(this)">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
                allCardsContainer.innerHTML += cardHtml;
            });
        }
    });
});

function addToCart(addToCartBtn) {
    const signedInUserJsonString = localStorage.getItem('signedInUser');
    const signedInUser = JSON.parse(signedInUserJsonString);
    if (signedInUser === null) {
        window.location = '/signin.html';
        return;
    }

    const card = addToCartBtn.closest('.card');

    const productImage = card.querySelector('.card-img-top').getAttribute('src');
    const productIdElement = card.querySelector('.product-id');
    const productId = productIdElement.textContent.replace('Product ID: ', '').trim();
    const productNameElement = card.querySelector('.product-name');
    const productName = productNameElement.textContent.replace('Name: ', '').trim();
    const productPriceElement = card.querySelector('.product-price');
    const productPrice = productPriceElement.textContent.replace('Price: INR', '').trim();
    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    var categoryName = categoryParamToCategoryNameMap[category];

    const newProduct = {
        image_url: productImage,
        productId: productId,
        productName: productName,
        category: categoryName,
        price: productPrice,
        quantity: 1
    };

    addItemToUsersCarts(newProduct);
}

function addItemToUsersCarts(newProduct) {
    const successAlert = document.getElementById('productAdditionSuccessAlert');
    const failureAlert = document.getElementById('productAdditionFailureAlert');
    successAlert.style.display = 'none';
    failureAlert.style.display = 'none';

    const signedInUserJsonString = localStorage.getItem('signedInUser');
    const signedInUser = JSON.parse(signedInUserJsonString);
    const localStorageData = localStorage.getItem('usersCarts');
    let data = JSON.parse(localStorageData);
    const email = signedInUser.email
    if (data !== null) {
        if (data.hasOwnProperty(email)) {
            if (Array.isArray(data[email])) {
                const productExists = data[email].some(product => product.productId === newProduct.productId);
                if (!productExists) {
                    data[email].push(newProduct);
                } else {
                    failureAlert.innerText = 'Product with this ID already exists.';
                    failureAlert.style.display = 'block';
                    return;
                }
            } else {
                data[email] = [newProduct];
            }
        } else {
            data[email] = [newProduct];
        }
    } else {
        data = {[email]: [newProduct]};
    }
    const updatedDataString = JSON.stringify(data);
    localStorage.setItem('usersCarts', updatedDataString);

    successAlert.innerText = 'Product added to acrt successfully';
    successAlert.style.display = 'block';
}

async function getProducts(categoryWiseAPI) {
    try {
        const response = await fetch(categoryWiseAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
        return null;
    }
}

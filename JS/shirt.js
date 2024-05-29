$(document).ready(function() {
    const productArray = getProducts().then(productsArray => {
        if (productsArray === null) {

        } else {
            productsArray.forEach(item => {
                const allCardsContainer = document.querySelector('#allCardsContainer')
                const cardHtml = `
                    <div class="col-md-3 mb-4">
                        <div class="card">
                            <img src="${item.image_url}" width="253" height="383" class="card-img-top" alt="Product Image">
                            <div class="card-body">
                                <p class="card-text">Product ID: ${item.productId}</p>
                                <p class="card-text">Name: ${item.name}</p>
                                <p class="card-text">Price: ${item.price}</p>
                                <button class="addToCartBtn btn btn-primary btn-sm" onclick="handleButtonClick(this)">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
                allCardsContainer.innerHTML += cardHtml;
            });
        }
    });
});

function handleButtonClick(addToCartBtn) {
    let signedInUserJsonString = localStorage.getItem('signedInUser');
    let signedInUser = JSON.parse(signedInUserJsonString);
    if (signedInUser === null) {
        window.location = '/signin.html';
    }
}

async function getProducts() {
    try {
        const response = await fetch('https://b8e846cae0cc45d6a291607f6fd56738.api.mockbin.io/', {
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
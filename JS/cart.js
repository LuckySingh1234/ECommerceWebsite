$(document).ready(function() {
    const cartItems = getUsersCartsData();
    if (cartItems === null || cartItems.length === 0) {
        const cartPageContent = document.getElementById('cartPageContent');
        cartPageContent.innerHTML = `<h2 style="margin-top: 6rem; text-align: center;">No Products in Cart</h2>`;
    } else {
        let totalAmount = 0;
        cartItems.forEach(item => {
            const totalPrice = parseFloat(item.price) * parseInt(item.quantity);

            const cartTableBody = document.querySelector('#cartTable tbody');
            const cartTableBodyHtml = `
            <tr>
                <td><img src=${item.image_url} width="50" height="50" alt="Product Image"></td>
                <td>${item.productName}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>INR ${parseFloat(item.price).toFixed(2)}</td>
                <td>INR ${parseFloat(totalPrice).toFixed(2)}</td>
                <td><button class="removeFromCartBtn btn btn-primary btn-sm" onclick="removeFromCart(this)">Remove</button></td>
            </tr>
            `;
            cartTableBody.innerHTML += cartTableBodyHtml;
            totalAmount += totalPrice;
        });
        const totalAmountDomELement = document.querySelector('#totalAmount')
        totalAmountDomELement.innerHTML = `<h5>Total Amount: INR ${totalAmount.toFixed(2)}</h5>`;
    }
});

function getUsersCartsData() {
    const signedInUserJsonString = localStorage.getItem('signedInUser');
    const signedInUser = JSON.parse(signedInUserJsonString);
    const email = signedInUser.email;

    const localStorageData = localStorage.getItem('usersCarts');
    const usersCarts = JSON.parse(localStorageData);
    if (usersCarts !== null) {
        if (usersCarts.hasOwnProperty(email)) {
            if (Array.isArray(usersCarts[email])) {
                return usersCarts[email];
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

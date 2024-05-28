$(document).ready(function() {
    let signedInUser = localStorage.getItem('signedInUser');

    const myCartBtn = document.getElementById('mycartbtn');
    const signInBtn = document.getElementById('signinbtn');
    const signOutBtn = document.getElementById('signoutbtn');
    const signUpBtn = document.getElementById('signupbtn');
    if (signedInUser !== null) {
        myCartBtn.style.display = 'block';
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        signOutBtn.style.display = 'block';
    } else {
        myCartBtn.style.display = 'none';
        signInBtn.style.display = 'block';
        signUpBtn.style.display = 'block';
        signOutBtn.style.display = 'none';
    }
});

function signOut() {
    localStorage.removeItem('signedInUser');
    window.location = 'signin.html'
}

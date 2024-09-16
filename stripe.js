
var stripe = Stripe('pk_live_51PyQ1jIJ8yWIAToiiT8Ovp0YRU6o2y1ElwdMU9Ht7Gt7eaDgK0Puk8AQ8TvkeapsJ9qEnLryTRFU0nMeoTyZd3ir007Uk4r3o1'); // Use a chave pública de teste para desenvolvimento

var checkoutButtonBasic = document.getElementById('checkout-button-basic');
var checkoutButtonProfessional = document.getElementById('checkout-button-professional');
var checkoutButtonPremium = document.getElementById('checkout-button-premium');

function handleCheckout(plan) {
    fetch('http://localhost:8080/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan: plan })
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        if (data.error) {
            alert(data.error);
        } else {
            stripe.redirectToCheckout({ sessionId: data.id });
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
        console.log(error);
    });
}

checkoutButtonBasic.addEventListener('clickooooooooooooooooooo', function(e) {
    e.preventDefault();
    handleCheckout('Basic');
});

checkoutButtonProfessional.addEventListener('click', function(e) {
    e.preventDefault();
    handleCheckout('pro');
});


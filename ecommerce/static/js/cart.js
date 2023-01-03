var updateButtons = document.querySelectorAll('.update-cart');

updateButtons.forEach((item) => {
    item.addEventListener('click', () => {
        var productId = item.dataset.product;
        var action = item.dataset.action;
        if(user === 'AnonymousUser'){
            console.log('a');
            addCookieItem(productId, action)
        }else{
            updateUserOrder(productId, action);
        }
    })
})

function addCookieItem(productId, action){
    if(action == 'add'){
        if(cart[productId] == undefined){
            cart[productId] = {'quantity': 1};
        }else{
            cart[productId]['quantity'] += 1;
        }
    }else if(action == 'remove'){
        cart[productId]['quantity'] -= 1;

        if(cart[productId]['quantity'] <= 0){
            delete cart[productId];
        }
    }

    document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/";
    location.reload();
}

function updateUserOrder(productId, action){
    var url = '/update_item/';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            'productId': productId,
            'action': action
        })
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        location.reload()
    })
}
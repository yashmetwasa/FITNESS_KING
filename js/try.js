let carts = document.querySelectorAll('.shop-item-button');
console.log(carts);
console.log(carts.length);

let products = [
    {
        name: 'Dumbbell Set',
        tag: 'dumbbell',
        price: 50,
        inCart: 0
    },
    {
        name: 'Freemotion',
        tag: 'treadmeal',
        price: 600,
        inCart: 0
    },
    {
        name: 'Peloton',
        tag: 'cycle',
        price: 300,
        inCart: 0
    },
    {
        name: 'Chest Press',
        tag: 'incline-press',
        price: 150,
        inCart: 0
    },
    {
        name: 'Addidas',
        tag: 'gym-bag',
        price: 40,
        inCart: 0
    },
    {
        name: 'RDX',
        tag: 'wrist-support',
        price: 20,
        inCart: 0
    },
]

for (let i=0; i< carts.length; i++){
     carts[i].addEventListener('click', () => {
             cartNumbers(products[i]);
             totalCost(products[i]);
             //console.log(products[i]);
     })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    console.log(productNumbers);
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
     }
}

 function cartNumbers(product) {
     let productNumbers = localStorage.getItem('cartNumbers');
     productNumbers = parseInt(productNumbers);
     if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
     }else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
     }
     setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);  
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
     //console.log("The product  price is", product.price);
     let cartCost = localStorage.getItem('totalCost');
     console.log("My cartCost is", cartCost);
     console.log(typeof cartCost);

     if(cartCost != null){
        cartCost = parseInt(cartCost);
         localStorage.setItem("totalCost", cartCost + product.price);
     }else{
        localStorage.setItem("totalCost", product.price);
     }

     //console.log(product.price);
}
onLoadCartNumbers();
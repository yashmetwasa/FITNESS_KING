
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".product-container");
    
    console.log(cartItems);
    if(cartItems && productContainer){

        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        console.log(removeCartItemButtons);
        console.log(removeCartItemButtons.length);
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
         }

        
        // console.log(productContainer);
        // var dltBtn = document.querySelector(".product-container .btn-danger");
        // console.log(dltBtn);
        // document.querySelector(".product-container").addEventListener("click", (e)=>{
        //     if(e.target.className == "btn-danger"){
        //         var cartRow = e.target.parentElement.parentElement;
        //         console.log("working dlt");
        //         cartRow.parentNode.removeChild(cartRow);
                
        //     }
        // })
        

        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        console.log(quantityInputs);
        console.log(quantityInputs.length);
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }

        // var addToCartButtons = document.getElementsByClassName('shop-item-button')
        // for (var i = 0; i < addToCartButtons.length; i++) {
        //     var button = addToCartButtons[i]
        //     button.addEventListener('click', addToCartClicked)
        // }
        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    }
}



let carts = document.querySelectorAll('.shop-item-button');
console.log(carts);
console.log(carts.length);

let products = [
    {
        name: 'ON ISOLATE',
        tag: 'isolate',
        price: 70,
        inCart: 0
    },
    {
        name: 'Protein Bar',
        tag: 'protein_bar',
        price: 5,
        inCart: 0
    },
    {
        name: 'ABSOLUTE',
        tag: 'absolute',
        price: 60,
        inCart: 0
    },
    {
        name: 'Fish Oil',
        tag: 'on-fishoil',
        price: 40,
        inCart: 0
    },
    {
        name: 'BIGMUSCLES',
        tag: 'big-muscles',
        price: 80,
        inCart: 0
    },
    {
        name: 'SMP Whole Food',
        tag: 'SMP',
        price: 40,
        inCart: 0
    },
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

//------------------------Cart-side-code--------------------------------------------

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".product-container");
    
    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="./media/${item.tag}.png" width="100" height="100">
                    <span class="cart-item-title">${item.name}</span>
                </div>
                <span class="cart-price cart-column">$${item.price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="${item.inCart}">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>`
        })
        
        
    }
    updateCartTotal();
}

 

//-----------------------purchase form -code-----------------------------------------------
function purchaseClicked(){
    
        if(document.getElementById("fname").value == "")
        {
            alert("Please Enter Your Full Name.");
        }
        else if(document.getElementById("email").value == "")
        {
            alert("Please Enter Your Email.");
        }
        else if(document.getElementById("adr").value == "")
        {
            alert("Please Enter Your Address.");
        }
        else if(document.getElementById("city").value == "")
        {
            alert("Please Enter Your City.");
        }
        else if(document.getElementById("state").value == "")
        {
            alert("Please Enter Your State.");
        }
        else if(document.getElementById("zip").value == "")
        {
            alert("Please Enter Your ZipCode.");
        }
        else if(document.getElementById("cname").value == "")
        {
            alert("Please Enter Your Name on the Card.");
        }
        else if(document.getElementById("ccnum").value == "")
        {
            alert("Please Enter Your Credit Card Number.");
        }
        else if(document.getElementById("expyear").value == "")
        {
            alert("Please Enter Your Credir Card's Expiry Date");
        }
        else if(document.getElementById("cvv").value == "")
        {
            alert("Please Enter Your Credir Card's CVV Number.");
        }
        else
        {
            alert('Your payment is successfully accepted.\nThank you for your purchase');
            var cartItems = document.getElementsByClassName('cart-items')[0]
            
            while (cartItems.hasChildNodes()) {
                console.log(cartItems);
                cartItems.removeChild(cartItems.firstChild)
                localStorage.clear();
                document.querySelector('.cart span').textContent = 0;
            }
            updateCartTotal()
        }
}

 

function removeCartItem(event) {
    var buttonClicked = event.target;
    // var updateCart = document.querySelector('.cart span').textContent;
    // updateCart = parseInt(updateCart);
    // //console.log(updateCart);
    // //qq
    // var quantity = document.querySelector('.cart-quantity-input').value;
    // console.log(quantity);
    // quantity = parseInt(quantity);
    // //qq
    // localStorage.setItem('cartNumbers', updateCart - quantity);
    // document.querySelector('.cart span').textContent = updateCart - quantity;
    //rr
    var cartItemContainer = document.getElementsByClassName('product-container')[0];
    //console.log(cartItemContainer);
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        //var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        //var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        quantity = parseInt(quantity);
        console.log(quantity);
        total = total + quantity;
        console.log(total);
        console.log(quantity);
        quantity = total - quantity;
    }
    localStorage.setItem('cartNumbers', quantity);
    document.querySelector('.cart span').textContent = quantity;
    //rr
    //console.log(updateCart);
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target
    // //var updatenumber = document.querySelector('.cart-quantity-input').value;
    // var temp=input.value;
    // console.log(typeof temp);
    // console.log(temp);
    // var cartNum = localStorage.getItem('cartNumbers');
    // cartNum = parseInt(cartNum);
    // console.log( typeof cartNum);
    // localStorage.setItem('cartNumbers', cartNum + input.value);
    // document.querySelector('.cart span').textContent = cartNum + input.value;
    var cartItemContainer = document.getElementsByClassName('product-container')[0];
    //console.log(cartItemContainer);
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        //var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        //var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        quantity = parseInt(quantity);
        console.log(typeof quantity);
        total = total + quantity;
    }
    localStorage.setItem('cartNumbers', total);
    document.querySelector('.cart span').textContent = total;
    
    //document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}



function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('product-container')[0];
    //console.log(cartItemContainer);
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
    //var j=
    document.getElementsByClassName('total')[0].innerText= '$' + total;
    //console.log(j);
} 

//------Search Item
//  const searchitem= document.getElementById("search-item");
//  //console.log("searched",searchitem)
//  searchitem.addEventListener("keyup",(e)=>{
//    var term= e.target.value.toLowerCase(); // This will read textfrom userinput
//    //console.log("firstsearch",term)
//    var searchitems= document.getElementsByClassName("shop-item");
   
//    for (i = 0; i < searchitems.length; i++) {
//      if (searchitems[i].innerText.toLowerCase().includes(term)) {
//        searchitems[i].style.display = "block";
//      } else {
//        searchitems[i].style.display = "none";
      
//      }
//    }
// })


onLoadCartNumbers();
displayCart();
updateCartTotal()
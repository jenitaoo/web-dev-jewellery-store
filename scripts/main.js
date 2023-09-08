//SHOPPING BASKET
let productCards = document.getElementById("productCards");


//CREATE AN ARRAY FOR THE BASKET AND RETRIEVE DATA FROM LOCAL STORAG OR CREATE EMPTY ARRAYE
//THIS IS SO THAT WHEN THE PAGE IS REFRESHED, THE DATA FROM PREVIOUS SESSIONS CAN STILL BE ACCESSED
let basket = JSON.parse(localStorage.getItem("basketData")) || [];

//ES6 ARROW FUNCTION  TO GENERATE PRODUCT CARDS BY ACCESSING DATA IN THE ARRAY DECLARED ABOVE
let generateProductCards = () => {
    return (productCards.innerHTML = productData
        .map((eachProduct)=>{
            let {id, name, price, img, alt} = eachProduct
            //SEARCH FOR EACH PRODUCT ID, IF THAT ID ALREADY EXISTS ON LOCAL STORAGE THEN DISPLAY THE QUANTITY OF PRODUCTS, IF NOT DON'T DO ANYTHING  
            let search = basket.find((eachProduct) => eachProduct.id === id) || [];
            return `
        <div class="product">
            <img src="${img}" alt="${alt}">
            <div class="productDetails">
                <h3>${name}</h3>
                <div class="priceAndQuantity">
                    <h4>€${price}</h4>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id="${id}" class="quantity">
                        ${search.product === undefined ? 0 : search.product}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                </div>
            </div> 
        </div>
        `;
    }).join(""));
};

generateProductCards();

//ES6 ARROW FUNCITON TO INCRREMENT THE QUANTITY OF PRODUCTS SELECTED FOR THE BASKET
let increment = (id) => {
    let selectedProduct = id;

    //FUNTION SEARCHES IF THE PRODUCT IS ALREADY IN THE BASKET
    let search = basket.find((eachProduct) => eachProduct.id === selectedProduct.id);

    //IF THE PRODUCT ISN'T ALREADY IN THE BASKET THEN THE ID IS APPENDED TO THE BASKET ARRAY AND PRODUCT QUANTITY VALUE IS 
    if(search === undefined) {
        //APPEND TO BASKET ARRAY
        basket.push({
            id: selectedProduct.id,
            product: 1,
        });     
    } else {
        search.product += 1;
    }

    //STORE IN LOCAL STORAGE SO THE DATA IS STILL THERE WHEN PAGE IS REFRESHED
    localStorage.setItem("basketData", JSON.stringify(basket));

    //CALL UPDATE FUNCTION
    update(selectedProduct.id);
};

//ES6 ARROW FUNCITON TO DECREMENT THE QUANTITY OF PRODUCTS SELECTED FOR THE BASKET
let decrement = (id) => {
    let selectedProduct = id;

    //FUNCTION SEARCHES IF THE PRODUCT IS ALREADY IN THE BASKET
    let search = basket.find((eachProduct) => eachProduct.id === selectedProduct.id);

    //IF THE PRODUCT QUANTITY IS 0 OR LOCAL STORAGE IS EMPTY, DON'T DO ANYTHING AND STOP THE PROCESS ELSE DECREMENT
    if(search === undefined) return;
    else if(search.product === 0) return; 
    else {
        search.product -= 1;
    }

    //CALL UPDATE FUNCTION
    update(selectedProduct.id);

    //THE BAASKET ARRAY WILL ONLY CONTAIN PRODUCTS THAT DON'T HAVE A QUANTITY OF 0
    basket = basket.filter((eachProduct)=>eachProduct.product !== 0);

    //STORE IN LOCAL STORAGE SO THE DATA IS STILL THERE WHEN PAGE IS REFRESHED
    localStorage.setItem("basketData", JSON.stringify(basket));
};

//ES6 ARROW FUNCITON TO UPDATE THE DISPLAY OF THE QUANTITY OF PRODUCTS SELECTED FOR THE BASKET FOR EACH PRODUCT TO THE USER
let update = (id) => {
    //SEARCH IF THE PRODUCT IS IN THE BASKET THEN QUANTITY DISPLAYED TO USER IS UPDATED
    let search = basket.find((eachProduct) => eachProduct.id === id);
    console.log(search.product);
    document.getElementById(id).innerHTML = search.product

    //CALL CALCULATE FUNCITON IF THE QUANTITY IS UPDATED
    calculateBasket();
};

//FUNCTION TO CALCULATE AND DISPLAY THE AMOUNT OF PRODUCTS IN THE BASKET
let calculateBasket = () => {
    //SELECTING OUR BASKET AMOUNT AND STORING IT IN A VARIABLE
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((eachProduct) => eachProduct.product).reduce((eachProduct, nextNumber) => eachProduct + nextNumber, 0);
};

//CALL FUNCTION SO THAT THE AMOUNT INSIDE THE BASKET IS DISPLAYED UPON PAGE REFRESH
calculateBasket(); 


//CREATE THE CONTENT INSIDE THESE HTML ELEMENTS WITH JS
let shoppingBasketSection = document.getElementById("shoppingBasketSection");
let shoppingBasket = document.getElementById("shoppingBasket");

//CREATE AN ARRAY FOR THE BASKET AND RETRIEVE DATA FROM LOCAL STORAG OR CREATE EMPTY ARRAYE
//THIS IS SO THAT WHEN THE PAGE IS REFRESHED, THE DATA FROM PREVIOUS SESSIONS CAN STILL BE ACCESSED
let basket = JSON.parse(localStorage.getItem("basketData")) || [];

//FUNCTION TO CALCULATE AND DISPLAY THE AMOUNT OF PRODUCTS IN THE BASKET
let calculateBasket = () => {
    //SELECTING OUR CART AMOUNT AND STORING IT IN A VARIABLE
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((eachProduct) => eachProduct.product).reduce((eachProduct, nextNumber) => eachProduct + nextNumber, 0);
};

//CALL FUNCTION SO THAT THE AMOUNT INSIDE THE BASKET IS DISPLAYED UPON PAGE REFRESH
calculateBasket(); 
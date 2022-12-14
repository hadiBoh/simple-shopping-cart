//made up database
function dbReturn(){
    return {
        0:{
            company:"lito",
            name:"lito L-13",
            price:200
        },
        1:{
            company:"lito",
            name:"lito L07",
            price:150
        },
        2:{
            company:"lito",
            name:"lito LT-11",
            price:230
        },
        3:{
            company:"lito",
            name:"lito LB-13",
            price:300
        },
        4:{
            company:"lito",
            name:"lito LB-15",
            price:280
        },
        5:{
            company:"lito",
            name:"lito LB08",
            price:90       
        },
        6:{
            company:"lito",
            name:"lito LT-10",
            price:280
        }
    }
}


//data controller
class Controller{
    constructor(){
        if (Controller.instance instanceof Controller) {
			return Controller.instance
		}
        this.db = dbReturn() 
        this.cart = [];  
        this.setedIds = []  
        Controller.instance = this
    }

   getDB(){
        return this.db
   }

   setTocart(id){
        this.cart.push(this.db[id])
   }

   setId(id){
        this.setedIds.push(id)
   }

   deleteFromcart(id){
        this.cart.splice(id,1) 
   }

   deleteId(id){
        this.setedIds.splice(id,1)
   }

   getUniqQuntity(){
        return [... new Set(this.cart)].length
   }

   getUniqeItems(){
    return [... new Set(this.cart)]
   }

   isAlreadyAdded(id){
        const result = this.setedIds.filter(item => item === id)
        return result
   }
}


//add items to carts wrapper
function addItems(){
    const obj = new Controller
    const db = obj.getDB()
    let carts = ""
    const indexes = Object.keys(db)
    for(let i=0; i< indexes.length; i++){
    carts += `
        <div class="cart" id="${i}">
            <a href="#"><img src="images/${db[i].name}.JPG"></a>
            <a href="#">Buy ${db[i].name}</a>
            <h2 class="price">$${db[i].price}</h2>
            <a href="#" id="add-to-cart-btn">add to cart</a>
        </div>
    `
    }
    document.querySelector(".cart-wrapper").innerHTML = carts
}
addItems()


//add to cart click handler
const allAddcartBtns = document.querySelectorAll("#add-to-cart-btn")
allAddcartBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault()
        const id = parseInt(e.target.parentElement.getAttribute("id"))
        const obj = new Controller
        obj.setTocart(id)
        obj.setId(id)
        const checkForAlreadyAddedResponse = checkForAlreadyAdded(obj,id)
        if (checkForAlreadyAddedResponse) return
        showAddedcarts(obj)
    })
})

//check already added to cart or not 
function checkForAlreadyAdded(obj,id){
    const isAlredyAdd = obj.isAlreadyAdded(id)
    if (isAlredyAdd.length > 1) {
        showAddedMessage("error-message")
        return true
    }
}

//put clicked items to our cart
function showAddedcarts(obj){
    const uniqQuantity = obj.getUniqQuntity()
    showQuantityOncartIcon(uniqQuantity)
    addInfoTocartIconModal(obj)
    showAddedMessage("succes-message")
}

function showQuantityOncartIcon(q){
    document.querySelector(".little-quantity").innerHTML = q
}

function addInfoTocartIconModal(obj){
    const uniqItems =  obj.getUniqeItems()
    let atached = ""
    uniqItems.forEach(item=>{
        atached += `<div>${item.name}</div>`
    })
    atached += `
        <input class="checkout" type="button" value="checkout">
    `
    document.querySelector(".cart-modal").innerHTML  = atached   
}

function showAddedMessage(type){
    const message = document.querySelector("."+type)
    message.classList.add("active")
    setTimeout(()=>{
        message.classList.remove("active")
    },1000)
}

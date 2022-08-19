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
        this.card = [];    
        Controller.instance = this
    }

   getDB(){
        return this.db
   }

   setToCard(id){
        this.card.push(this.db[id])
   }

   deleteFromCard(id){
      this.card.splice(id,1) 
   }

   getUniqQuntity(){
        return [... new Set(this.card)].length
   }

   getUniqeItems(){
    return [... new Set(this.card)]
   }
}


//add items to cards wrapper
function addItems(){
    const obj = new Controller
    const db = obj.getDB()
    let cards = ""
    const indexes = Object.keys(db)
    for(let i=0; i< indexes.length; i++){
    cards += `
        <div class="card" id="${i}">
            <a href="#"><img src="images/${db[i].name}.JPG"></a>
            <a href="#">Buy ${db[i].name}</a>
            <h2 class="price">$${db[i].price}</h2>
            <a href="#" id="add-to-card-btn">add to card</a>
        </div>
    `
    }
    document.querySelector(".card-wrapper").innerHTML = cards
}
addItems()


//add to card click handler
const allAddCardBtns = document.querySelectorAll("#add-to-card-btn")
allAddCardBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault()
        const id = e.target.parentElement.getAttribute("id")
        const obj = new Controller
        obj.setToCard(parseInt(id))
        showAddedCards(obj)
        showAddedMessage()
    })
})


//put clicked items to our card
function showAddedCards(obj){
    const uniqQuantity = obj.getUniqQuntity()
    showQuantityOnCardIcon(uniqQuantity)
    addInfoToCardIconModal(obj)
}

function showQuantityOnCardIcon(q){
    document.querySelector(".little-quantity").innerHTML = q
}

function addInfoToCardIconModal(obj){
    const uniqItems =  obj.getUniqeItems()
    let atached = ""
    uniqItems.forEach(item=>{
        atached += `<div>${item.name}</div>`
    })
    atached += `
        <input class="checkout" type="button" value="checkout">
    `
    document.querySelector(".card-modal").innerHTML  = atached   
}

function showAddedMessage(){
    const message = document.querySelector(".message")
    message.classList.add("active")
    setTimeout(()=>{
        message.classList.remove("active")
    },1000)
}

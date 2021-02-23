import {ProxyState} from "../AppState.js"
import { houseService } from "../Services/HouseService.js"

function _draw(){
    //added hard coded house cards from the app state
    let house = ProxyState.house
    let template = ""
    house.forEach(house => template += house.Template)
    document.getElementById("house").innerHTML = template
}

export default class HouseController{
    constructor(){
        //console.log("housecont working")
        _draw()
        ProxyState.on("house",_draw)
    }
    createHouse(event){
        event.preventDefault();
        let form = event.target
        let rawHouse = {
            bedrooms: form.bedrooms.value,
            bathrooms: form.bathrooms.value,
            levels: form.levels.value,
            year: form.year.value,
            price: form.price.value,
            description: form.description.value,
            imgUrl: form.imgUrl.value
        }
        houseService.createHouse(rawHouse)
    }
    bidHouse(id){
        houseService.bidHouse(id)
        //console.log(id)
    }
}
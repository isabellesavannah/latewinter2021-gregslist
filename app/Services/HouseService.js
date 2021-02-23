import { ProxyState } from "../AppState.js"
import House from "../Models/House.js"
import { api } from "../Services/axiosServices.js"

class HouseService{
    constructor(){
        this.getHouse()
    }
    async getHouse(){
        try{
            const res = await api.get('houses')
            //console.log(res.data)
            ProxyState.house = res.data.map(rawHouseData => new House (rawHouseData))
        }   catch (error){
            console.error(error)
        }
    }
    async createHouse(rawHouse){
        try{
            const res = await api.post('houses', rawHouse)
            ProxyState.house = [...ProxyState.house, new House(res.data)]
        }   catch (error){
            console.error(error)
        }
    }
    async bidHouse(id){
        let house = ProxyState.house.find(h=> h.id === id)
        house.price +=1000
        try {
            const res = await api.put('houses/'+id, house)
            ProxyState.house = ProxyState.house
        } catch (error){
            console.error(error)
        }
    }
}
export const houseService = new HouseService()
import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";
import { api } from "../Services/axiosServices.js"

class CarsService{

 
  constructor(){
    this.getCars()
    //console.log("cars service");
  }

  async getCars(){
    try{
      const res = await api.get('cars')
      console.log(res.data)
      ProxyState.cars = res.data.map(rawCarData => new Car (rawCarData))
    } catch (error) {
      console.error(error)
    }
  }
  async createCar(rawCar) {
    try {
      const res = await api.post('cars', rawCar)
      ProxyState.cars = [...ProxyState.cars, new Car(res.data)]
    } catch (error){
      console.error(error)
    }
  }

  async bid(id) {
    let car = ProxyState.cars.find(c => c.id ===id)
    car.price += 100
    try{
      const res = await api.put('cars/' + id, car)
      ProxyState.cars = ProxyState.cars
    }catch (error){
      console.error(error)
    }
  }

  async deleteCar(id) {
    try{
      const res = await api.delete(`cars/${id}`)
      this.getCars()
    }catch (error){
      console.error(error)
    }
  }
}

export const carsService = new CarsService()
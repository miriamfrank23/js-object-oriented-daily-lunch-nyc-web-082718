//global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
 constructor(name) {
   this.name = name
   this.id = ++neighborhoodId
   store.neighborhoods.push(this)
 }

 deliveries() {
   return store.deliveries.filter(delivery => {
     return delivery.neighborhoodId === this.id
   })
 }

 customers() {
   return store.customers.filter(customer => {
     return customer.neighborhoodId === this.id
   })
 }

 meals() {
   const allMeals = this.deliveries().map(delivery => {
     return delivery.meal()
   })
   const uniqueMeals = []
   for (let meal in allMeals) {
     if (!uniqueMeals.includes(allMeals[meal])){
      uniqueMeals.push(allMeals[meal])
     }
   }
   return uniqueMeals
 }

}

class Customer {
 constructor(name, neighborhoodId) {
   this.name = name
   this.neighborhoodId = neighborhoodId
   this.id = ++customerId
   store.customers.push(this)
 }

 deliveries (){
   return store.deliveries.filter(delivery => {
     return delivery.customerId === this.id
   })
 }

 meals (){
   return this.deliveries().map(delivery => {
     return delivery.meal()
   })
 }

 totalSpent (){
   return this.meals().map(meal => meal.price).reduce((acc, value) => {
     return acc + value
   })
 }

}

class Meal {
 constructor(title, price) {
   this.title = title
   this.price = price
   this.id = ++mealId
   store.meals.push(this)
 }

 deliveries () {
  return store.deliveries.filter(delivery => {
    return delivery.mealId === this.id
  })
 }

 customers () {
   return this.deliveries().map(delivery => {
    return delivery.customer()
   })
 }

 static byPrice () {
   return store.meals.sort((meal1, meal2) => {
     return meal2.price - meal1.price
   })
  }

}

class Delivery {
 constructor(mealId, neighborhoodId, customerId) {
   this.mealId = mealId
   this.neighborhoodId = neighborhoodId
   this.customerId = customerId
   this.id = ++deliveryId
   store.deliveries.push(this)
 }

 meal() {
  return store.meals.find(meal => {
    return meal.id === this.mealId
  })
 }

 customer() {
  return store.customers.find(customer => {
    return customer.id === this.customerId
  })
 }

 neighborhood() {
  return store.neighborhoods.find(neighborhood => {
    return neighborhood.id === this.neighborhoodId
  })
 }

}

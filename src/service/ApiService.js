import axios from "axios";
const baseURL = "http://localhost:7776";
class ApiService
{
    getConfig()
   {
      let config = {
         headers : {Authorization : "Bearer "+localStorage.getItem("token")}
      }
      return config;
   }
   register(body)
   {
      return axios.post(baseURL+"/register",body);
   }
   authenticateLogin(body)
   {
      return axios.post(baseURL+"/login",body);
   }
   addOrder()
   {
      return axios.post(baseURL+"/orders",this.getConfig());
   }
   
   getAllOrders()
   {
    return axios.get(baseURL+"/orders",this.getConfig());
   }
   getOrdersByCustomerNumber(mobileNumber)
   {
    return axios.get(baseURL+"/orders/mobileno/"+mobileNumber,this.getConfig());
   }

   getOrdersByCustomerId()
   {
    return axios.get(baseURL+"/orders/cust",this.getConfig());
   }
   getOrderById(oid){
      return axios.get(baseURL+"/orders/"+oid,this.getConfig());
   }

   cancelOrder(orderId)
   {
    return axios.put(baseURL+"/orders/cancel/"+orderId,'',this.getConfig());
   }
   getOrdersByCustomer()
   {
    return axios.get(baseURL+"/orders/cust",this.getConfig());
   }
   updateOrderStatus(orderId)
   {
      return axios.put(baseURL+"/orders/status/"+orderId,this.getConfig());
   }
   getOrderedFoodItems(id)
   {
      return axios.get(baseURL+"/ordereditems/"+id,this.getConfig());
   }
   getAllCategory()
   {
      return axios.get(baseURL+"/category",this.getConfig());
   }
   addCategory(category){
      return axios.post(baseURL + "/category",category,this.getConfig());
   }
   viewcategorybyid(id){
      return axios.get(baseURL+"/category/id/"+id,this.getConfig())
   }
   viewcategorybyname(name){
      return axios.get(baseURL+"/category/name/"+name,this.getConfig())
   }
   deleteCategory(categoryId){
      return axios.delete(baseURL+"/category/"+categoryId,this.getConfig())
   }

   addToppings(toppingsData) {
      return axios.post(baseURL+'/toppings/addToppings', toppingsData,this.getConfig());
    }
  
    updateToppings(toppingId, toppingsData) {
      return axios.put(baseURL+"/toppings/updateToppings/"+toppingId, toppingsData,this.getConfig());
    }
  
    deleteToppings(toppingId) {
      return axios.delete(baseURL+"/toppings/deleteToppings/"+toppingId,this.getConfig());
    }
  
    getToppingsById(toppingId) {
      return axios.get(baseURL+"/toppings/getToppingsUsingId/"+toppingId,this.getConfig());
    }
  
    getAllToppings() {
      return axios.get(baseURL+"/toppings",this.getConfig());
    }


    updateCustomerDetails(customerDto){
      return axios.put(baseURL+"/customer",customerDto, this.getConfig());
    }
    addCustomerDetails(customerDto) {
      return axios.post(baseURL+"/customer",customerDto,this.getConfig());
    }
    getAllCustomer() {
      return axios.get(baseURL+"/customer",this.getConfig() );
   }

  getCustomerById(customerId) {
   return axios.get(baseURL+"/customer/",customerId,this.getConfig() );
   }

   getByUsername(){
      return axios.get(baseURL+"/customer/username",this.getConfig())
   }
   getCustomerByNumber(mobileno) {
      return axios.get(baseURL+"/customer/number/",mobileno,this.getConfig() );
  }
  getCustomerByEmail(email) {
   return axios.get(baseURL+"/customer/email/",email,this.getConfig() );
}


  addPizza(pizza){
   return axios.post(baseURL+"/pizza",pizza,this.getConfig());
}
deletePizza(id)
   {
      return axios.delete(baseURL+"/pizza/"+id,this.getConfig());
   }
   getAllPizza(){
     return axios.get(baseURL+ "/pizza",this.getConfig());
 }
 getPizzaById(id)
 {
   return axios.get(baseURL+"/pizza/id/"+id,this.getConfig());
 }

 getPizzaBySize(size)
 {
   return axios.get(baseURL+"/pizza/size/"+size,this.getConfig());
 }

 updatePizza(id,pizza)
 {
   return axios.put(baseURL+"/pizza/update/"+id,pizza,this.getConfig());
 }

 getPizzaByCategoryId(categoryId) {
   return axios.get(baseURL+"/pizza/categoryid/"+categoryId,this.getConfig());
 }

 getPizzaByCategoryName(categoryName) {
   return axios.get(baseURL+"/pizza/categoryname/"+categoryName,this.getConfig());
 }

 getPizzaByName(pizzaName) {
   return axios.get(baseURL+"/pizza/pizzaname/"+pizzaName,this.getConfig());
 }

    getCartItemsByCustomerId(){
      return axios.get(baseURL+"/cart/pizza",this.getConfig());
   }

   deleteCartitemsByCustomerId(customerId){
      return axios.delete(baseURL+"/cart/",customerId,this.getConfig())
   }
   deletePizzafromCart(id){
      return axios.delete(baseURL+"/cart/deletePizza/"+id,this.getConfig());
   }  
      updatePizzaQuantity(pt){
         return axios.put(baseURL+"/cart",pt,this.getConfig());
      }
      addPizzaToCart(cartDTO)
      {
         return axios.post(baseURL+"/cart",cartDTO,this.getConfig());
      }
     
       addPizzaToppings(ptDTO, toppingId) {
         return axios.post(baseURL+"/cart/"+toppingId, ptDTO,this.getConfig());
       }
     
       deletePizzaToppings(ptId) {
         return axios.delete(baseURL+"/cart/deletePizza/"+ptId,this.getConfig());
       }

       getTotalOrderPrice() {
         return axios.get(baseURL+"/cart/orderprice",this.getConfig());
       }
     
       getAllPizzaToppings() {
         return axios.get(baseURL+"/cart/pizzaToppings",this.getConfig());
       }     

       getAllFeedback(){
         return axios.get(baseURL+"/feedback",this.getConfig());
       }

       deleteFeedback(feedbackId){
         return axios.delete(baseURL+"/feedback/"+feedbackId,this.getConfig());
       }

       addFeedBack(feedBack){
         return axios.post(baseURL+"/feedback",feedBack,this.getConfig());
        }
        getFeedBack(pizzaId){
         return axios.get(baseURL+"/feedback/searchPizza/"+pizzaId,this.getConfig());
        }
      
        updateFeedBack(feedBack){
            return axios.put(baseURL+"/feedback",feedBack,this.getConfig());
         }
         getFeedbackbyCustomerId(){
            return axios.get(baseURL+"/searchCustomer",this.getConfig());
         }
        
}
export default ApiService;
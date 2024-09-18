
public class OrderItem{
    public int OrderItemId {get;set;}
    public int OrderID{get;set;}
    public int FoodItemId {get;set;}

    public Order Order{get;set;}
    public  FoodItem FoodItem{get;set;}
    
}

using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext:DbContext{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options){

    }

    public DbSet<FoodItem> FoodItems {get;set;}
    public DbSet<Order> Orders {get;set;}
    public DbSet<OrderItem> OrderItems {get;set;}
   
}
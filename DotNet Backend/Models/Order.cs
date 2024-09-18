public class Order
{
    public int OrderId { get; set; }
    public required string name { get; set; }
    public required string email { get; set; }
    public decimal TotalAmount { get; set; }
    public required string PaymentStatus { get; set; }
    public required string PaymentType { get; set; }
    public required string OrderStatus { get; set; }
    public required int OrderTable { get; set; }
    public DateTime OrderDate { get; set; }

    // Navigation property for the related OrderItems
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}

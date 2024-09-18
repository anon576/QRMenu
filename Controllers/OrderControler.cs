using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace QRMenu.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.FoodItem)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }


        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderRequest request)
        {
            var newOrder = new Order
            {
                name = request.Name,
                email = request.Email,
                TotalAmount = request.TotalAmount,
                PaymentStatus = request.PaymentStatus,
                PaymentType = request.PaymentType,
                OrderStatus = request.OrderStatus,
                OrderTable = request.OrderTable,
                OrderDate = DateTime.Now
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            foreach (var foodItemId in request.FoodItemIds)
            {
                var orderItem = new OrderItem
                {
                    OrderID = newOrder.OrderId,
                    FoodItemId = foodItemId
                };
                _context.OrderItems.Add(orderItem);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = newOrder.OrderId }, newOrder);
        }


        // Fetch all orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.FoodItem)
                .ToListAsync();

            return Ok(orders);
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }

     [HttpPatch("{id}/orderstatus")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string orderStatus)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            order.OrderStatus = orderStatus;
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

         [HttpPatch("{id}/paymentstatus")]
        public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] string paymentStatus)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            order.PaymentStatus = paymentStatus;
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

    }

    public class CreateOrderRequest
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public decimal TotalAmount { get; set; }
        public required string PaymentStatus { get; set; }
        public required string PaymentType { get; set; }
        public required string OrderStatus { get; set; }
        public int OrderTable { get; set; }
        public required List<int> FoodItemIds { get; set; }
    }
}
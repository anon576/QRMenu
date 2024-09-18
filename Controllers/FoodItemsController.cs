using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace QRMenu.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemController : ControllerBase{
        private readonly ApplicationDbContext _context;

        public FoodItemController(ApplicationDbContext context){
            _context = context;
        }

        [HttpGet]
         public async Task<ActionResult<IEnumerable<FoodItem>>> GetFoodItems()
        {
            return await _context.FoodItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<FoodItem>> CreateFoodItem(FoodItem fooditem){
            _context.FoodItems.Add(fooditem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFoodItems),new {id=fooditem.FoodItemId},fooditem);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFoodItem(int id,FoodItem foodItem){
            if(id!=foodItem.FoodItemId){
                return BadRequest();
            }

            _context.Entry(foodItem).State =EntityState.Modified;

            try{
                await _context.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                if(!FoodItemExist(id)){
                    return NotFound();
                }else{
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodItem(int id){
            var foodItem  = await _context.FoodItems.FindAsync(id);
            if(foodItem == null){
                return NotFound();
            }
            _context.FoodItems.Remove(foodItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FoodItemExist(int id){
            return _context.FoodItems.Any(e =>e.FoodItemId == id);
        }
    }
}
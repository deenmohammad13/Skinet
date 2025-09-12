using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;

namespace API.Controllers
{
    public class CartController(ICartService cartService): BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetCartByIdAsync(string id)
        {
            var cart = await cartService.GetCartAsync(id);
            return Ok(cart ?? new ShoppingCart { Id = id });

        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> UpdateCartAsync(ShoppingCart cart)
        {
            var updatedCart = await cartService.SetCartAsync(cart);
            if (updatedCart == null) return BadRequest("Problem updating the cart");
            return updatedCart;
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCartAsync(string id)
        {
            var result = await cartService.DeleteCartAsync(id);
            if (!result) return BadRequest("Problem deleting the cart");
            return Ok(); 
        }
    }
}

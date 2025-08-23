using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController: BaseApiController
    {
        [HttpGet("unauthorized")]
        public IActionResult GetUnAuthorized()
        {
            return Unauthorized();
        }

        [HttpGet("notfound")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("badrequest")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("Not a Good request");
        }

        [HttpGet("internalerror")]
        public IActionResult GetInternalError()
        {
            throw new Exception("This is a test exception");    
        }

        [HttpPost("validationerror")]
        public IActionResult GetValidationError()
        {
            return Ok();
        }
    }
}

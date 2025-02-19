using Microsoft.AspNetCore.Mvc;
using Taskly.Stickers.Api.Core.Interfaces;
using Taskly.Stickers.Models.StickerModels.Request;

namespace Taskly.Stickers.Api.Controllers {

    [ApiController]
    [Route("Api/[controller]")]
    public class StickersController : ControllerBase {

        private readonly IStickersService _stickersService;

        public StickersController(IStickersService stickersService) {

            _stickersService = stickersService;

        }

        [HttpGet("Sticker/{id}")]
        public async Task<IActionResult> GetStickerById(Guid id) {

            try {

                var sticker = await _stickersService.GetStickerByIdAsync(id);

                return Ok(sticker);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

        [HttpPost("Sticker")]
        public async Task<IActionResult> AddSticker([FromBody] StickerCreateRequestModel stickerModel) {

            try {

                var sticker = await _stickersService.AddStickerAsync(stickerModel);

                return Ok(sticker);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

        [HttpPut("Sticker")] 
        public async Task<IActionResult> UpdateSticker([FromBody] StickerUpdateRequestModel stickerModel) {

            try {

                var sticker = await _stickersService.UpdateStickerAsync(stickerModel);

                return Ok(sticker);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

        [HttpDelete("Sticker/{id}")]
        public async Task<IActionResult> DeleteSticker(Guid id) {

            try {

                await _stickersService.DeleteStickerByIdAsync(id);

                return Ok();

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

        [HttpGet("User/{id}")]
        public async Task<IActionResult> GetStickersByUserId(Guid id) {

            try {

                var stickers = await _stickersService.GetStickerByUserIdAsync(id);

                return Ok(stickers);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

    }

}

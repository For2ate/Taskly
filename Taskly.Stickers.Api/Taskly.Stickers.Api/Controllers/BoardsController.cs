using Microsoft.AspNetCore.Mvc;
using Taskly.Stickers.Api.Core.Interfaces;
using Taskly.Stickers.Models.BoardModels.Request;
using Taskly.Stickers.Models.BoardModels.Response;

namespace Taskly.Stickers.Api.Controllers {

    [ApiController]
    [Route("Api/[controller]")]
    public class BoardsController : ControllerBase {

        private readonly IBoardsService _boardsService;

        public BoardsController(IBoardsService boardsService) {

            _boardsService = boardsService;

        }

        [HttpGet("Board/{id}")]
        public async Task<ActionResult> GetBoardByIdAsync(Guid id) {

            try {

                var board = await _boardsService.GetBoardByIdAsync(id);

                if (board == null) {

                    return NotFound(); 

                }

                return Ok(board);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }


        [HttpPost("Board")]
        public async Task<ActionResult> CreateBoardAsync([FromBody] BoardCreateRequestModel boardModel) {

            try {

                var createdBoard = await _boardsService.CreateBoardAsync(boardModel);

                return Ok(createdBoard);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);
                
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("Board")]
        public async Task<IActionResult> UpdateBoardAsync([FromBody] BoardUpdateRequestModel boardModel) {

            try {

                var createdBoard = await _boardsService.UpdateBoardAsync(boardModel);

                return Ok(createdBoard);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

        [HttpDelete("Board/{id}")]
        public async Task<IActionResult> DeleteBoardByIdAsync(Guid id) {

            try {

                await _boardsService.DeleteBoardById(id);

                return Ok();

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }


        [HttpGet("User/{id}")]
        public async Task<IActionResult> GetBoardsByUserId(Guid id) {

            try {

                var boards = await _boardsService.GetBoardsByUserIdAsync(id);

                return Ok(boards);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

        [HttpPost("Board/AddSticker")]
        public async Task <IActionResult> AddStickerOnBoard(BoardStickerRequestModel model) {

            try {

                await _boardsService.AddStickerOnBoardAsync(model);

                return Ok("Sticker added on board.");

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

        [HttpDelete("Board/DeleteSticker")]
        public async Task<IActionResult> DeleteStickerOnBoard(BoardStickerRequestModel model) {

            try {

                await _boardsService.DeleteStickerOnBoardAsync(model);

                return Ok("Sticker delete.");

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

        [HttpGet("Board/Stickers/{boardId}")] 
        public async Task <IActionResult> GetAllStickersToBoard(Guid boardId) {

            try {

                var stickers = await _boardsService.GetAllStickersToBoardAsync(boardId);

                return Ok(stickers);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);

            }

        }

    }

}

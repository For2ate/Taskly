using Taskly.Stickers.Models.BoardModels.Request;
using Taskly.Stickers.Models.BoardModels.Response;

namespace Taskly.Stickers.Api.Core.Interfaces {
    
    public interface IBoardsService {

        Task<BoardFullResponseModel> GetBoardByIdAsync(Guid id);

        Task<IEnumerable<BoardFullResponseModel>> GetBoardsByUserIdAsync(Guid userId);

        Task<BoardFullResponseModel> CreateBoardAsync(BoardCreateRequestModel boardModel);

        Task<BoardFullResponseModel> UpdateBoardAsync(BoardUpdateRequestModel boardModel);

        Task DeleteBoardById(Guid id);


        Task AddStickerOnBoardAsync(BoardStickerRequestModel model);

        Task DeleteStickerOnBoardAsync(BoardStickerRequestModel model);

        Task<IEnumerable<Guid>> GetAllStickersToBoardAsync(Guid boardId);

    }

}

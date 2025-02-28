using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Models.BoardModels.Request;

namespace Taskly.Stickers.Data.Interfaces {

    public interface IBoardsStickersRepository : IBaseRepository<BoardStickerEntity>{

        Task<BoardStickerEntity> FindByIdsAsync(BoardStickerRequestModel model);

        Task<IEnumerable<BoardStickerEntity>> GetAllStickersByBoardIdAsync(Guid boardId);

    }

}

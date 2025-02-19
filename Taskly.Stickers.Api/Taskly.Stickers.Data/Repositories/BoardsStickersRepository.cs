using Taskly.Stickers.Data.DataContexts;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Data.Interfaces;

namespace Taskly.Stickers.Data.Repositories {
    public class BoardsStickersRepository : BaseRepository<BoardStickerEntity>, IBoardsStickersRepository {

        public BoardsStickersRepository(StickersContext context) : base(context) { }

    }

}

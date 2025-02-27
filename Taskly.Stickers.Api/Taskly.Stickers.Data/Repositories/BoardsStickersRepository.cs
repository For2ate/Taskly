using Microsoft.EntityFrameworkCore;
using Taskly.Stickers.Data.DataContexts;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Data.Interfaces;
using Taskly.Stickers.Models.BoardModels.Request;

namespace Taskly.Stickers.Data.Repositories {
    public class BoardsStickersRepository : BaseRepository<BoardStickerEntity>, IBoardsStickersRepository {

        public BoardsStickersRepository(StickersContext context) : base(context) { }

        public async Task<BoardStickerEntity> FindByIdsAsync(BoardStickerRequestModel model) {

            try {

                var entity = await _dbSet.FirstOrDefaultAsync(bs => bs.BoardId == model.BoardId && bs.StickerId == model.StickerId);

                return entity;

            } catch(Exception ex) {

                throw;

            }

        }

        public async Task<IEnumerable<BoardStickerEntity>> GetAllStickersByBoardIdAsync(Guid boardId) {

            try {

                var stickers = await _dbSet.Where(bs => bs.BoardId == boardId).ToListAsync();

                return stickers;

            } catch (Exception ex) {

                throw;
            }

        }

    }

}

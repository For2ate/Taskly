using Microsoft.EntityFrameworkCore;
using Taskly.Stickers.Data.DataContexts;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Data.Interfaces;

namespace Taskly.Stickers.Data.Repositories {
 
    public class BoardsUsersRepository : BaseRepository<BoardUserEntity>, IBoardsUsersRepository {
    
        public BoardsUsersRepository(StickersContext context) : base(context) { }

        public async Task<IEnumerable<BoardUserEntity>> GetBoardsByUserId(Guid id) {

            try {

                var boards = await _dbSet.Where(bu => bu.UserId == id).ToListAsync();

                return boards;

            } catch (Exception ex) {

                throw;

            }

        }
    
    }

}

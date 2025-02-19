using Microsoft.EntityFrameworkCore;
using Taskly.Stickers.Data.DataContexts;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Data.Interfaces;

namespace Taskly.Stickers.Data.Repositories
{
    public class StickersRepository : BaseRepository<StickerEntity>, IStickersRepository{

        public StickersRepository(StickersContext context) : base(context) {}

        public async Task<IEnumerable<StickerEntity>> GetByUserIdAsync(Guid userId) {

            try {

                var stickers = await _dbSet.Where(u => u.UserId == userId).ToListAsync();

                return stickers;

            } catch (Exception ex) {

                throw;

            }

        }

    }

}

using Taskly.Stickers.Data.Entities;

namespace Taskly.Stickers.Data.Interfaces {

    public interface IStickersRepository : IBaseRepository<StickerEntity> {

        Task<IEnumerable<StickerEntity>> GetByUserIdAsync(Guid userId);

    }

}

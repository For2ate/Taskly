using Taskly.Stickers.Data.Entities;

namespace Taskly.Stickers.Data.Interfaces {

    public interface IBoardsUsersRepository : IBaseRepository<BoardUserEntity> {

        Task<IEnumerable<BoardUserEntity>> GetBoardsByUserId(Guid id);

    }

}

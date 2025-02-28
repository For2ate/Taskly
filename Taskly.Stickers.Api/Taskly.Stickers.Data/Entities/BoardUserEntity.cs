using Taskly.Common.Boards;

namespace Taskly.Stickers.Data.Entities {

    public class BoardUserEntity : BaseEntity {

        public Guid BoardId { get; set; }

        public virtual BoardEntity Board {get; set;}

        public Guid UserId { get; set; }

        public virtual UserEntity User { get; set; }

        public BoardsRole Role { get; set; }

    }

}

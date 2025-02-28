namespace Taskly.Stickers.Data.Entities {
 
    public class UserEntity : BaseEntity {

        public virtual ICollection<StickerEntity>? Stickers { get; set; }

        public virtual ICollection<BoardUserEntity>? BoardsUsers { get; set; }

    }

}

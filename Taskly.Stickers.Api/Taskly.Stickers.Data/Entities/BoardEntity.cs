namespace Taskly.Stickers.Data.Entities {

    public class BoardEntity : BaseEntity{
    
        public string Name { get; set; }

        public string Color { get; set; }

        public virtual ICollection<BoardUserEntity> BoardsUsers { get; set; }

        public virtual ICollection<BoardStickerEntity> BoardsStickers { get; set; }

    }

}

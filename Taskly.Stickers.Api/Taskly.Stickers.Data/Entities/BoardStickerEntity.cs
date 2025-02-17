namespace Taskly.Stickers.Data.Entities {

    public class BoardStickerEntity : BaseEntity {

        public Guid BoardId { get; set; }

        public virtual BoardEntity Board { get; set; }

        public Guid StickerId { get; set; }

        public virtual StickerEntity Sticker { get; set; }

    }

}

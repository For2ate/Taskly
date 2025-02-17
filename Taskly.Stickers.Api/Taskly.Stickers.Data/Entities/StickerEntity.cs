using Taskly.Common.Stickers;

namespace Taskly.Stickers.Data.Entities {

    public class StickersEntity : BaseEntity {
        
        public Guid UserId { get; set; }

        public virtual UserEntity User { get; set; }

        public string Header { get; set; }

        public string? Text { get; set; }

        public StickersPriority Priority { get; set; }

        public DateTime DateStart { get; set; }

        public DateTime DateEnd { get; set; }
        

    }

}

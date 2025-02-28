using Taskly.Common.Stickers;

namespace Taskly.Stickers.Models.StickerModels.Request {

    public class StickerCreateRequestModel {

        public Guid UserId { get; set; }

        public string Header { get; set; }

        public string? Text { get; set; }

        public StickersPriority Priority { get; set; }
        
        public DateTime DateStart { get; set; }

        public DateTime DateEnd { get; set; }

    }

}

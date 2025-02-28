namespace Taskly.Stickers.Models.BoardModels.Request {

    public class BoardCreateRequestModel {

        public Guid UserId { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }

    }

}

using Taskly.Common.Boards;

namespace Taskly.Stickers.Models.BoardModels.Response {

    public class BoardFullResponseModel {

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }
        
        public BoardsRole Role { get; set; }

    }

}


using Taskly.Stickers.Models.StickerModels.Request;
using Taskly.Stickers.Models.StickerModels.Response;

namespace Taskly.Stickers.Api.Core.Interfaces {

    public interface IStickersService {

        Task<StickerFullResponseModel> GetStickerByIdAsync(Guid id);

        Task<IEnumerable<StickerFullResponseModel>> GetStickerByUserIdAsync(Guid userId);

        Task<StickerFullResponseModel> AddStickerAsync(StickerCreateRequestModel stickerModel);

        Task<StickerFullResponseModel> UpdateStickerAsync(StickerUpdateRequestModel stickerModel);

        Task DeleteStickerByIdAsync(Guid id);

    }

}

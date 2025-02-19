using AutoMapper;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Models.StickerModels.Request;
using Taskly.Stickers.Models.StickerModels.Response;

namespace Taskly.Stickers.Data.MappingProfilies {

    public class StickerProfile : Profile {

        public StickerProfile() {

            CreateMap<StickerEntity, StickerFullResponseModel>();

            CreateMap<StickerCreateRequestModel, StickerEntity>();
            CreateMap<StickerUpdateRequestModel, StickerEntity>();

        }

    }

}

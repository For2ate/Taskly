using AutoMapper;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Models.BoardModels.Request;
using Taskly.Stickers.Models.BoardModels.Response;

namespace Taskly.Stickers.Data.MappingProfilies {

    public class BoardProfile : Profile{

        public BoardProfile() {

            CreateMap<BoardEntity, BoardFullResponseModel>()
                .AfterMap((src, dest) => {

                    dest.Role = Common.Boards.BoardsRole.Owner;
                
                });


            CreateMap<BoardCreateRequestModel, BoardEntity>()
                .AfterMap((src, dest) => {

                    dest.Id = Guid.NewGuid();

                });

            CreateMap<BoardUpdateRequestModel, BoardEntity>();

        }

    }

}

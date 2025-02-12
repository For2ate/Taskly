using AutoMapper;
using Taskly.User.Data.Entities;
using Taskly.User.Models.UserModels.Request;
using Taskly.User.Models.UserModels.Response;

namespace Taskly.User.Data.MappingProfilies {

    public class UserProfile : Profile {

        public UserProfile() {

            CreateMap<UserEntity, UserFullResponseModel>();


            CreateMap<UserRegisterRequestModel, UserEntity>();

        }

    }

}

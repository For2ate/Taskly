using Taskly.User.Models;
using Taskly.User.Models.UserModels.Request;
using Taskly.User.Models.UserModels.Response;

namespace Taskly.User.Api.Core.Interfaces {

    public interface IAuthService {

        Task<UserFullResponseModel> RegisterAsync(UserRegisterRequestModel model);

        Task<UserFullResponseModel> LoginAsync(UserLoginRequestModel model);

    }

}

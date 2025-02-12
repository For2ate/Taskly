using AutoMapper;
using Taskly.User.Api.Core.Interfaces;
using Taskly.User.Data.Interfaces;
using Taskly.User.Models.UserModels.Response;

namespace Taskly.User.Api.Core.Services {
    
    public class UserService : IUserService {

        private readonly IUserRepository _useRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository useRepository, IMapper mapper) {

            _useRepository = useRepository;
            _mapper = mapper;

        }

        public async Task<UserFullResponseModel> GetUserByLoginAsync(string login) {

            try {

                var user = await _useRepository.GetByLoginAsync(login);

                return _mapper.Map<UserFullResponseModel>(user);

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task<UserFullResponseModel> GetUserByEmailAsync(string email) {

            try {

                var user = await _useRepository.GetByLoginAsync(email);

                return _mapper.Map<UserFullResponseModel>(user);

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task<IEnumerable<UserFullResponseModel>> GetAllUsersAsync() {

            try {

                var users = await _useRepository.GetAllAsync();

                return _mapper.Map<IEnumerable<UserFullResponseModel>>(users);

            } catch(Exception ex) {

                throw;

            }

        }

    }

}

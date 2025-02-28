using AutoMapper;
using Taskly.Stickers.Api.Core.Interfaces;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Data.Interfaces;
using Taskly.Stickers.Models.StickerModels.Request;
using Taskly.Stickers.Models.StickerModels.Response;

namespace Taskly.Stickers.Api.Core.Services {

    public class StickersService : IStickersService {

        private readonly IMapper _stickersMapper;
        private readonly IBaseRepository<UserEntity> _userRepository;
        private readonly IStickersRepository _stickersRepository;

        public StickersService(IMapper stickersMapper, IBaseRepository<UserEntity> userRepository, IStickersRepository stickersRepository) {

            _stickersMapper = stickersMapper;
            _userRepository = userRepository;
            _stickersRepository = stickersRepository;

        }

        public async Task<StickerFullResponseModel> GetStickerByIdAsync(Guid id) {

            try {

                var sticker = await _stickersRepository.GetByIdAsync(id);

                if (sticker == null) {

                    throw new Exception("Sticker doesn't exist.");

                }

                return _stickersMapper.Map<StickerFullResponseModel>(sticker);

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task<IEnumerable<StickerFullResponseModel>> GetStickerByUserIdAsync(Guid userId) {

            try {

                var stickers = await _stickersRepository.GetByUserIdAsync(userId);

                return _stickersMapper.Map<IEnumerable<StickerFullResponseModel>>(stickers);

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task<StickerFullResponseModel> AddStickerAsync(StickerCreateRequestModel stickerModel) {

            try {

                if (stickerModel == null) {
                    throw new ArgumentNullException(nameof(stickerModel));
                }

                // Проверка и добавление пользователя в локальную БД
                var userInLocalDb = await _userRepository.GetByIdAsync(stickerModel.UserId);
                if (userInLocalDb == null) {
                    var newUser = new UserEntity { Id = stickerModel.UserId };
                    await _userRepository.AddAsync(newUser);
                }

                // Создание стикера
                var stickerEntity = _stickersMapper.Map<StickerEntity>(stickerModel);

                stickerEntity.Id = Guid.NewGuid();

                await _stickersRepository.AddAsync(stickerEntity);

                return _stickersMapper.Map<StickerFullResponseModel>(stickerEntity);

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task<StickerFullResponseModel> UpdateStickerAsync(StickerUpdateRequestModel stickerModel) {

            try {

                if (stickerModel == null) {
                    throw new ArgumentNullException(nameof(stickerModel));
                }

                var existingSticker = await _stickersRepository.GetByIdAsync(stickerModel.Id);

                if (existingSticker == null) {
                    throw new Exception("Sticker doesn't exist.");
                }

                _stickersMapper.Map(stickerModel, existingSticker);

                await _stickersRepository.UpdateAsync(existingSticker);

                return _stickersMapper.Map<StickerFullResponseModel>(existingSticker);

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task DeleteStickerByIdAsync(Guid id) {

            try {

                var sticker = await _stickersRepository.GetByIdAsync(id);

                if (sticker == null) {

                    throw new Exception("Sticker doesn't exist.");

                }

                await _stickersRepository.RemoveAsync(sticker);

            } catch (Exception ex) {

                throw;

            }

        }

    }

}

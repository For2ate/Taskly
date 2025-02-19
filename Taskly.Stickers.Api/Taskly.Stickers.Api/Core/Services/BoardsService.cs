using AutoMapper;
using Taskly.Stickers.Api.Core.Interfaces;
using Taskly.Stickers.Data.Entities;
using Taskly.Stickers.Data.Interfaces;
using Taskly.Stickers.Models.BoardModels.Request;
using Taskly.Stickers.Models.BoardModels.Response;

namespace Taskly.Stickers.Api.Core.Services {

    public class BoardsService : IBoardsService {

        private readonly IBoardsUsersRepository _boardsUsersRepository;
        private readonly IBoardsStickersRepository _boardsStickersRepository;
        private readonly IBaseRepository<BoardEntity> _boardsRepository;
        private readonly IBaseRepository<UserEntity> _usersRepository;
        private readonly IMapper _boardsMapper;

        public BoardsService(IBoardsStickersRepository boardsStickersRepository, IBoardsUsersRepository boardsUsersRepository, IBaseRepository<UserEntity> usersRepository,IBaseRepository<BoardEntity> boardsRepository, IMapper boardsMapper) {

            _boardsRepository = boardsRepository;
            _boardsStickersRepository = boardsStickersRepository;
            _boardsUsersRepository = boardsUsersRepository;
            _usersRepository = usersRepository;
            _boardsMapper = boardsMapper;
        }

        public async Task<BoardFullResponseModel> GetBoardByIdAsync(Guid id) {

            try {

                var board = await _boardsRepository.GetByIdAsync(id);

                return _boardsMapper.Map<BoardFullResponseModel>(board);

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task<IEnumerable<BoardFullResponseModel>> GetBoardsByUserIdAsync(Guid userId) {

            try {

                var boardsRoles = await _boardsUsersRepository.GetBoardsByUserId(userId);

                var boards = new List<BoardFullResponseModel>();

                foreach (var boardRole in boardsRoles) {

                    var currentBoard = await _boardsRepository.GetByIdAsync(boardRole.BoardId);

                    var currentModel = _boardsMapper.Map<BoardFullResponseModel>(currentBoard);

                    currentModel.Role = boardRole.Role;

                    boards.Add(currentModel);

                }

                return boards;

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task<BoardFullResponseModel> CreateBoardAsync(BoardCreateRequestModel boardModel) {

            try {

                var boardEtity = _boardsMapper.Map<BoardEntity>(boardModel);

                await _boardsRepository.AddAsync(boardEtity);

                var userInLocalDb = await _usersRepository.GetByIdAsync(boardModel.UserId);

                if (userInLocalDb == null) {

                    var newUser = new UserEntity { Id = boardModel.UserId };
                    await _usersRepository.AddAsync(newUser);

                }

                var boardUser = new BoardUserEntity{
                    Board = boardEtity,
                    User = userInLocalDb,
                    Id = Guid.NewGuid(),
                    BoardId = boardEtity.Id,
                    UserId = boardModel.UserId,
                    Role = Common.Boards.BoardsRole.Owner
                };

                await _boardsUsersRepository.AddAsync(boardUser);

                return _boardsMapper.Map<BoardFullResponseModel>(boardEtity);

            } catch (Exception ex) {

                throw;

            }

        }


        public async Task<BoardFullResponseModel> UpdateBoardAsync(BoardUpdateRequestModel boardModel) {

            try {

                var existingBoard = await _boardsRepository.GetByIdAsync(boardModel.Id);
                if (existingBoard == null) {
                    throw new KeyNotFoundException($"Доска с ID {boardModel.Id} не найдена.");
                }

                _boardsMapper.Map(boardModel, existingBoard); 

                await _boardsRepository.UpdateAsync(existingBoard);

                return _boardsMapper.Map<BoardFullResponseModel>(existingBoard);

            } catch (Exception ex) {

                throw;

            }

        }

        public async Task DeleteBoardById(Guid id) {

            try {

                var board = await _boardsRepository.GetByIdAsync(id);

                await _boardsRepository.RemoveAsync(board);

            } catch (Exception ex) {

                throw;

            }

        }

    }

}

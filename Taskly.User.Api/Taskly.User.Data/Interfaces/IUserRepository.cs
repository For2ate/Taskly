using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskly.User.Data.Entities;

namespace Taskly.User.Data.Interfaces {
    
    public interface IUserRepository : IBaseRepository<UserEntity>{

        Task<UserEntity> GetByLoginAsync(string login);

        Task<UserEntity> GetByEmailAsync(string login);

    }

}

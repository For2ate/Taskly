﻿using Taskly.User.Data.DataContexts;
using Taskly.User.Data.Entities;
using Taskly.User.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Taskly.User.Data.Repositories {
    
    public class UserRepository : BaseRepository<UserEntity>, IUserRepository{

        public UserRepository(UserContext context) : base(context) { }

        public async Task<UserEntity> GetByLoginAsync(string login) {

            try {

                return await _dbSet.FirstOrDefaultAsync(u => u.Login == login);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                throw;
                 
            }

        }

        public async Task <UserEntity> GetByEmailAsync(string email) {

            try {

                return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);

            } catch (Exception ex) {

                Console.WriteLine(ex.Message);

                throw;

            }

        }


    }

}

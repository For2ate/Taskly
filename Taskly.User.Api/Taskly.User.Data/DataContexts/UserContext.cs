using Microsoft.EntityFrameworkCore;
using Taskly.User.Data.Configurations;
using Taskly.User.Data.Entities;

namespace Taskly.User.Data.DataContexts {

    public class UserContext : DbContext {

        public DbSet<UserEntity> Users { get; set; }

        public UserContext(DbContextOptions<UserContext> contextOptions) : base(contextOptions) { 
        
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.ApplyConfiguration(new UserEntityConfiguration());

            base.OnModelCreating(modelBuilder);

        }

    }

}

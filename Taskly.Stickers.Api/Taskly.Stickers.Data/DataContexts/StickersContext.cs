using Microsoft.EntityFrameworkCore;
using Taskly.Stickers.Data.Configurations;
using Taskly.Stickers.Data.Entities;

namespace Taskly.Stickers.Data.DataContexts {
    
    public class StickersContext : DbContext {

        public DbSet<UserEntity> Users { get; set; }

        public DbSet<StickerEntity> Stickers { get; set; }

        public DbSet<BoardEntity> Boards { get; set; }

        public DbSet<BoardUserEntity> BoardsUsers { get; set; }

        public DbSet<BoardStickerEntity> BoardsStickers { get; set; }
        
        public StickersContext(DbContextOptions<StickersContext> contextOptions) : base(contextOptions) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.ApplyConfiguration(new UserEntityConfiguration());
            modelBuilder.ApplyConfiguration(new StickerEntityConfiguration());
            modelBuilder.ApplyConfiguration(new BoardEntityConfiguration());
            modelBuilder.ApplyConfiguration(new BoardUserEntityConfiguration());
            modelBuilder.ApplyConfiguration(new BoardStickerEntityConfiguration());

            base.OnModelCreating(modelBuilder);
        
        }

    }

}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Taskly.Stickers.Data.Entities;

namespace Taskly.Stickers.Data.Configurations {
 
    public class BoardUserEntityConfiguration : IEntityTypeConfiguration<BoardUserEntity>{

        public void Configure(EntityTypeBuilder<BoardUserEntity> builder) {

            builder.HasKey(bu => new { bu.BoardId, bu.UserId });

            builder.HasOne(bu => bu.Board)
                .WithMany(b => b.BoardsUsers) 
                .HasForeignKey(bu => bu.BoardId) 
                .OnDelete(DeleteBehavior.Cascade); 

            builder.HasOne(bu => bu.User)
                .WithMany(u => u.BoardsUsers) 
                .HasForeignKey(bu => bu.UserId) 
                .OnDelete(DeleteBehavior.Cascade); 

            builder.Property(bu => bu.Role)
                .IsRequired()
                .HasConversion<string>();

        }

    }

}

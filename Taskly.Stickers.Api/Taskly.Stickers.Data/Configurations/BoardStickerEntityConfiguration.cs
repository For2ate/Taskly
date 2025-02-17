using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Taskly.Stickers.Data.Entities;

namespace Taskly.Stickers.Data.Configurations {

    public class BoardStickerEntityConfiguration : IEntityTypeConfiguration<BoardStickerEntity>{
    
        public void Configure(EntityTypeBuilder<BoardStickerEntity> builder) {

            builder.HasKey(bs => new { bs.BoardId, bs.StickerId });

            builder.HasOne(bs => bs.Board)
                .WithMany(b => b.BoardsStickers) 
                .HasForeignKey(bs => bs.BoardId) 
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(bs => bs.Sticker)
                .WithMany(s => s.BoardsStickers)
                .HasForeignKey(bs => bs.StickerId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    
    }

}

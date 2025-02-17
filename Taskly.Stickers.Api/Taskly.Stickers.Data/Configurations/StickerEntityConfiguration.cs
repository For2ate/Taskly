using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Taskly.Stickers.Data.Entities;

namespace Taskly.Stickers.Data.Configurations
{
    
    public class StickerEntityConfiguration : IEntityTypeConfiguration <StickerEntity>{

        public void Configure(EntityTypeBuilder<StickerEntity> builder) {

            builder.HasKey(s => s.Id);

            builder.HasOne(s => s.User)
                .WithMany(u => u.Stickers) 
                .HasForeignKey(s => s.UserId) 
                .OnDelete(DeleteBehavior.Cascade); 

            builder.Property(s => s.Header)
                .IsRequired() 
                .HasMaxLength(200); 

            builder.Property(s => s.Text)
                .HasMaxLength(20000); 

            builder.Property(s => s.Priority)
                .IsRequired() 
                .HasConversion<string>();

            builder.Property(s => s.DateStart)
                .IsRequired(); 

            builder.Property(s => s.DateEnd)
                .IsRequired();

        }

    }

}

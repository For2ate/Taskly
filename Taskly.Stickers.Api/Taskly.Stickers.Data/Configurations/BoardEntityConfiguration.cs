using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Taskly.Stickers.Data.Entities;

namespace Taskly.Stickers.Data.Configurations {

    public class BoardEntityConfiguration : IEntityTypeConfiguration<BoardEntity> {

        public void Configure(EntityTypeBuilder<BoardEntity> builder) {

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Name)
                .IsRequired() 
                .HasMaxLength(100); 

            builder.Property(b => b.Color)
                .IsRequired() 
                .HasMaxLength(20); 

            builder.HasIndex(b => b.Name)
                .IsUnique();

        }

    }

}

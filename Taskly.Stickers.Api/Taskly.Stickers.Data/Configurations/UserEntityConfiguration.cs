using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Taskly.Stickers.Data.Entities;

namespace Taskly.Stickers.Data.Configurations
{
    public class UserEntityConfiguration : IEntityTypeConfiguration <UserEntity>{

        public void Configure(EntityTypeBuilder<UserEntity> builder) {

            builder.HasKey(u => u.Id);

        }

    }

}

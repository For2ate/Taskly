namespace Taskly.Stickers.Data.Entities {
 
    public class UserEntity : BaseEntity {

        public virtual ICollection<StickersEntity>? Stickers { get; set; }

    }

}

using Microsoft.EntityFrameworkCore;

namespace Taskly.Stickers.Data.DataContexts {
    
    public class StickersContext : DbContext {

        public StickersContext(DbContextOptions<StickersContext> contextOptions) : base(contextOptions) {

        }

    }

}

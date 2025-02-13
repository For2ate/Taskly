using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskly.User.Data.Entities {

    public class UserEntity : BaseEntity{
    
        public string Login {  get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string? LastName { get; set; }

        public string Username => $"{FirstName} {LastName}";

    }

}

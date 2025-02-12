using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskly.User.Models.UserModels.Request {

    public class UserRegisterRequestModel {
    
        public string Login {  get; set; }

        public string Password {  get; set; }

        public string Email { get; set; }   

        public string FirstName { get; set; }

        public string? LastName { get; set; }
    
    }

}

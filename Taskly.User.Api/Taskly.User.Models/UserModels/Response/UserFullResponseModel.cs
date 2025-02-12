using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskly.User.Models.UserModels.Response {

    public class UserFullResponseModel {

        public Guid Id { get; set; }

        public string Login { get; set; }
        
        public string Email { get; set; }

        public string Username { get; set; }

    }

}

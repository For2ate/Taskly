using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Taskly.User.Api.Core.Interfaces;
using Taskly.User.Models.UserModels.Request;
using Taskly.User.Models.UserModels.Response;

namespace Taskly.User.Api.Controllers {

    [ApiController]
    [Route("Api/[controller]")]
    public class AuthController : ControllerBase {

        private readonly IValidator<UserRegisterRequestModel> _userValidator;
        private readonly IAuthService _authService;

        public AuthController(IValidator<UserRegisterRequestModel> userValidator, IAuthService authService) {

            _authService = authService;
            _userValidator = userValidator;

        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUserAsync(UserRegisterRequestModel model) {

            try {

                ValidationResult validationResult = await _userValidator.ValidateAsync(model);

                if (!validationResult.IsValid) {

                    throw new Exception(validationResult.ToString());

                }

                var user = await _authService.RegisterAsync(model);

                return Ok(user);

            } catch (Exception ex) {

                return BadRequest(ex.Message);

            }

        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginUserAsync(UserLoginRequestModel model) {

            try {

                if (model.Login == null || model.Login == "") {
                    throw new Exception("Login is required.");
                }

                if (model.Password == null || model.Password == "") {
                    throw new Exception("Password is required.");
                }

                var user = await _authService.LoginAsync(model);

                return Ok(user);


            } catch (Exception ex) {

                return BadRequest(ex.Message);

            }

        }

    }

}

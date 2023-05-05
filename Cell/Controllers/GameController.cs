using Cell.Models;
using Cell.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Cell.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepository;
        private readonly IUserRepository _userProfileRepository;
        public GameController(IGameRepository gameRepository, IUserRepository userProfileRepository)
        {
            _gameRepository = gameRepository;
            _userProfileRepository = userProfileRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_gameRepository.GetAll());
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetGameById(int id)
        {
            var game = _gameRepository.GetById(id);
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }

        [Authorize]
        [HttpGet("usergames")]
        public IActionResult GetUserGames()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return Ok(_gameRepository.GetByUserId(firebaseUserId));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Game(Game game)
        {
            User user = GetCurrentUser();

            game.UserId = user.Id;
            _gameRepository.Add(game);
            return CreatedAtAction(
                nameof(GetGameById), new { game.Id }, game);
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

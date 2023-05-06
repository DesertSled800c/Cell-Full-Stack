using Cell.Models;
using Cell.Repositories;
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

        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_gameRepository.GetAll());
        }

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

        [HttpGet("usergames")]
        public IActionResult GetUserGames()
        {
            User user = GetCurrentUser();

            return Ok(_gameRepository.GetByUserId(user.Id));
        }

        [HttpPost]
        public IActionResult Game(Game game)
        {
            User user = GetCurrentUser();

            game.UserId = user.Id;
            _gameRepository.Add(game);
            return CreatedAtAction(
                nameof(GetGameById), new { game.Id }, game);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            _gameRepository.Update(game);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _gameRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

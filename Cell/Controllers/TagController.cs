using Cell.Models;
using Cell.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Cell.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var tags = _tagRepository.GetAllTags();
            return Ok(tags);
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagRepository.AddTag(tag);

            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepository.UpdateTag(tag);
            return NoContent();
        }

        [HttpGet("gameId{id}")]
        public IActionResult Get(int id)
        {
            var tags = _tagRepository.GetTagByGameId(id);
            if (tags == null)
            {
                return NotFound();
            }
            return Ok(tags);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.DeleteTag(id);
            return NoContent();
        }

        [HttpPost("{tagId}/game/{gameId}")]
        public IActionResult AddGameTag(int tagId, int gameId)
        {
            var gameTag = new GameTag { TagId = tagId, GameId = gameId };
            _tagRepository.AddGameTag(gameTag);
            return NoContent();
        }
    }
}

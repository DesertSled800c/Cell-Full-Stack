using Cell.Models;
using System.Collections.Generic;

namespace Cell.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        void AddTag(Tag tag);
        List<Tag> GetTagByGameId(int id);
        void DeleteTag(int id);
        void UpdateTag(Tag tag);
        void AddGameTag(GameTag gameTag);
    }
}
using Cell.Models;
using System.Collections.Generic;

namespace Cell.Repositories
{
    public interface IGameRepository
    {
        List<Game> GetAll();
        Game GetById(int id);
        List<Game> GetByUserId(int id);
        void Add(Game game);
        void Update(Game game);
        public void Delete(int id);
    }
}

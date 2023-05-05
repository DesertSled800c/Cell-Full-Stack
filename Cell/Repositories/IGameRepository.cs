using Cell.Models;
using System.Collections.Generic;

namespace Cell.Repositories
{
    public interface IGameRepository
    {
        List<Game> GetAll();
        Game GetById(int id);
        List<Game> GetByUserId(string firebaseId);
        void Add(Game game);
    }
}

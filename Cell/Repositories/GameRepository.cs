using Cell.Models;
using Cell.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Cell.Repositories
{
    public class GameRepository : BaseRepository, IGameRepository
    {
        public GameRepository(IConfiguration configuration) : base(configuration) { }

        public List<Game> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT g.Id, g.UserId, g.Title, g.Body, u.FireBaseUserId, u.FullName FROM Game g
                      JOIN [User] u ON g.UserId = u.Id";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var games = new List<Game>();
                        while (reader.Read())
                        {
                            games.Add(new Game()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Body = DbUtils.GetString(reader, "Body"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    FullName = DbUtils.GetString(reader, "FullName")
                                },
                            });
                        }
                        return games;
                    }
                }
            }
        }

        public void Add(Game game)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Game (
                        UserId,
                        Title,
                        Body
                        )
                        
                        OUTPUT INSERTED.ID
	                    
                        VALUES (
                        @UserId,
                        @Title,
                        @Body)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", game.UserId);
                    DbUtils.AddParameter(cmd, "@Title", game.Title);
                    DbUtils.AddParameter(cmd, "@Body", game.Body);

                    game.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public List<Game> GetByUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT g.Id, g.UserId, g.Title, g.Body, u.FireBaseUserId, u.FullName FROM Game g JOIN [User] u ON g.UserId = u.Id WHERE u.FireBaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var games = new List<Game>();
                        while (reader.Read())
                        {
                            games.Add(new Game()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Body = DbUtils.GetString(reader, "Body"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    FullName = DbUtils.GetString(reader, "FullName")
                                },
                            });
                        }

                        return games;
                    }
                }
            }
        }

        public Game GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            
            SELECT g.UserId g.Title, g.Body, u.FireBaseUserId, u.FullName, up.Email FROM Game g JOIN User u ON g.UserId = u.Id
                WHERE g.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Game game = null;
                        if (reader.Read())
                        {
                            game = new Game()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Body = DbUtils.GetString(reader, "Body"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    FullName = DbUtils.GetString(reader, "FullName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                },
                            };
                        }
                        return game;
                    }
                }
            }
        }
    }
}

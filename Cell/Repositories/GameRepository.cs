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
               SELECT g.Id, g.UserId, g.Title, g.Body FROM Game g ORDER BY g.Title ASC";

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
                                Body = DbUtils.GetString(reader, "Body")
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
        public List<Game> GetByUserId(int UserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT g.Id, g.UserId, g.Title, g.Body FROM Game g WHERE g.UserId = @Id ORDER BY g.Title ASC";

                    DbUtils.AddParameter(cmd, "@Id", UserId);

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
                                Body = DbUtils.GetString(reader, "Body")
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
            
            SELECT g.UserId g.Title, g.Body FROM Game g WHERE g.Id = @Id";

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
                                Body = DbUtils.GetString(reader, "Body")
                            };
                        }
                        return game;
                    }
                }
            }
        }

        public void Update(Game game)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Game SET Title = @title, Body = @body WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@title", game.Title);
                    DbUtils.AddParameter(cmd, "@body", game.Body);
                    cmd.Parameters.AddWithValue("@id", game.Id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Game WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

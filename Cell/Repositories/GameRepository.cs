using Cell.Models;
using Cell.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

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
                SELECT g.Id, g.UserId, g.Title, g.Body, t.Id AS TagId, t.Name AS TagName
                FROM Game g
                LEFT JOIN GameTag gt ON g.Id = gt.GameId
                LEFT JOIN Tag t ON gt.TagId = t.Id
                ORDER BY g.Title ASC";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var games = new List<Game>();
                        while (reader.Read())
                        {
                            var gameId = DbUtils.GetInt(reader, "Id");
                            var game = games.FirstOrDefault(g => g.Id == gameId);

                            if (game == null)
                            {
                                game = new Game()
                                {
                                    Id = gameId,
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Body = DbUtils.GetString(reader, "Body"),
                                    Tags = new List<Tag>()
                                };

                                games.Add(game);
                            }

                            if (!reader.IsDBNull(reader.GetOrdinal("TagId")))
                            {
                                var tag = new Tag()
                                {
                                    Id = DbUtils.GetInt(reader, "TagId"),
                                    Name = DbUtils.GetString(reader, "TagName")
                                };

                                game.Tags.Add(tag);
                            }
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
        public List<Game> GetByUserId(int userId)
        {
            var games = new List<Game>();

            using (var connection = Connection)
            using (var command = new SqlCommand(
                @"SELECT g.Id, g.UserId, g.Title, g.Body, t.Id AS TagId, t.Name AS TagName
          FROM Game g
          LEFT JOIN GameTag gt ON g.Id = gt.GameId
          LEFT JOIN Tag t ON gt.TagId = t.Id
          WHERE g.UserId = @UserId
          ORDER BY g.Title ASC", connection))
            {
                command.Parameters.AddWithValue("@UserId", userId);

                connection.Open();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var gameId = reader.GetInt32(reader.GetOrdinal("Id"));
                        var game = games.FirstOrDefault(g => g.Id == gameId);

                        if (game == null)
                        {
                            game = new Game
                            {
                                Id = gameId,
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Body = reader.GetString(reader.GetOrdinal("Body")),
                                Tags = new List<Tag>()
                            };

                            games.Add(game);
                        }

                        if (!reader.IsDBNull(reader.GetOrdinal("TagId")))
                        {
                            var tag = new Tag
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                                Name = reader.GetString(reader.GetOrdinal("TagName"))
                                // Populate other tag properties as necessary
                            };

                            game.Tags.Add(tag);
                        }
                    }
                }
            }

            return games;
        }



        public Game GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT g.Id, g.UserId, g.Title, g.Body FROM Game g WHERE g.Id = @Id";

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

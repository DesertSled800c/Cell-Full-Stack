CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FullName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FireBaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Game] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Body] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Topic] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Topic] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [GameTopic] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GameId] int NOT NULL,
  [TopicId] int NOT NULL
)
GO

ALTER TABLE [Game] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [GameTopic] ADD FOREIGN KEY ([TopicId]) REFERENCES [Topic] ([Id])
GO

ALTER TABLE [GameTopic] ADD FOREIGN KEY ([GameId]) REFERENCES [Game] ([Id]) ON DELETE CASCADE
GO

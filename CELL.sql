CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FullName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FireBaseUserId] nvarchar(255) NOT NULL,
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
);
GO

CREATE TABLE [Game] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Body] varchar(max) NOT NULL
);
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
);
GO

CREATE TABLE [GameTag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GameId] int NOT NULL,
  [TagId] int NOT NULL
);
GO

ALTER TABLE [Game]
ADD FOREIGN KEY ([UserId])
REFERENCES [User] ([Id]);
GO

ALTER TABLE [GameTag]
ADD FOREIGN KEY ([TagId])
REFERENCES [Tag] ([Id]);
GO

ALTER TABLE [GameTag]
ADD FOREIGN KEY ([GameId])
REFERENCES [Game] ([Id])
ON DELETE CASCADE;
GO
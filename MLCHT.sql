USE svalko_DB 
GO 

CREATE TABLE [PART](
	[ID] integer IDENTITY PRIMARY KEY NOT NULL, 
	[Name] nvarchar (255) NOT NULL, 
	[Manufacturer] nvarchar(255) NOT NULL,
	[PartNumber] nvarchar(255) NOT NULL, 
	[Category] nvarchar(255) NOT NULL CHECK (Category IN (
		'Фильтры',
		'Тормозная система и гидравлика',
		'Подвеска', 
		'Рулевое управление', 
		'Двигатель', 
		'Электросистемы', 
		'Привод ГРМ и агрегатов', 
		'Система охлаждения и кондиционирования', 
		'Стеклоочистители', 
		'Топливно-воздушная система', 
		'Трансмиссия' 
		)),
	--[SubCategory] nvarchar(255)
	[Price] money NOT NULL, 
	[Quantity] integer NOT NULL, 
	[Image] nvarchar(255) NULL, 
)

CREATE TABLE [USER](
	[ID] integer IDENTITY PRIMARY KEY NOT NULL, 
	[User] nvarchar (20) UNIQUE NOT NULL, 
	[Password] nvarchar (8) NOT NULL, 
	[FirstName] nvarchar (20) NOT NULL, 
	[Surname] nvarchar (20) NOT NULL, 
	[LastName] nvarchar (20) NULL, 
	[Position] nvarchar (20) NOT NULL CHECK(Position IN ('admin', 'consultant', 'moderator')) 
)

CREATE TABLE [ORDER](
	[ID] integer IDENTITY PRIMARY KEY NOT NULL, 
	[FirstName] nvarchar (20) NOT NULL, 
	[Surname] nvarchar (20) NOT NULL, 
	[LastName] nvarchar (20) NULL, 
	[PhoneNumber] VARCHAR(20) NOT NULL, CHECK (
        PhoneNumber LIKE '+7 [9][0-9][0-9] [0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]' OR 
        PhoneNumber LIKE '8 [0-9][0-9][0-9] [0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]' OR 
        PhoneNumber LIKE '9[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
    ), 
	[Confirmed] bit NOT NULL DEFAULT 0, 
	[Delivered] bit NOT NULL DEFAULT 0
)

CREATE TABLE [ORDERED_PARTS](
	[OrderID] integer NOT NULL FOREIGN KEY REFERENCES [ORDER]([ID]), 
	[PartID] integer NOT NULL FOREIGN KEY REFERENCES [PART]([ID]), 
	[Quantity] integer NOT NULL 
)

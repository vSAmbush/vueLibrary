drop schema if exists `library`;
create schema `library`;
use `library`;

create table `users` (
	id integer auto_increment not null,
    username varchar(32) not null,
    password_hash varchar(512) not null,
    access_token varchar(256) not null,
    created_at bigint,
    updated_at bigint,
    
    primary key (id)
);

create table `books` (
	id integer auto_increment not null,
    title varchar(32) not null,
    overview text,
    wrap_color varchar(7),
    created_at bigint,
    updated_at bigint,
    created_by integer,
    
    primary key (id)
);

insert into `books` (title, overview, wrap_color) values
('Abbat', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores expedita temporibus!
Beatae commodi consectetur culpa delectus, doloremque, ex harum odio omnis pariatur, possimus
praesentium quia quis suscipit vero voluptates!', '#f40b74'),
('Abbisal', '', '#ac53a8'),
 ('August', 'Aliquam aperiam consectetur cupiditate, debitis, doloribus facilis hic impedit itaque laudantium
nulla odio quos repellat, tempore unde vel! Accusantium doloremque iure reprehenderit sunt tempora.
Accusantium assumenda autem fugit veritatis voluptas!', '#2e6cd1'),
('Avrora', '', '#1daa88'),
('Aggressor', 'Consequatur cupiditate dignissimos explicabo iste obcaecati odit officia pariatur quod repudiandae
voluptates. Accusantium consectetur corporis cum deserunt dignissimos esse, harum itaque odit
quaerat rem? Eos excepturi illo ipsa ipsam veritatis!', '#f1690e'),
('Assasin', '', '#86da25'),
('Celeron', '', '#2e6cd1'),
('Across the Nightingale Floor', 'Aperiam cum dolores eaque eligendi incidunt itaque laudantium molestias necessitatibus, quis
ratione, sed unde ut? Deserunt, dicta distinctio enim facilis harum id minima mollitia possimus quas
quisquam reiciendis reprehenderit totam.', '#bd0600'),
('Butterfly', 'A alias animi, architecto commodi cumque debitis doloribus est explicabo facere, iste, itaque
libero maiores minus nam obcaecati provident quisquam rerum soluta tempore veniam. Consectetur
deserunt error possimus quam quod?', '#f40b74'),
('Bagamarama', '', '#ac53a8'),
('Baby', 'Autem beatae culpa dolores ducimus earum eius et ex facilis fuga hic, id in iste molestias nam
nobis non numquam perferendis quas quis recusandae rerum saepe ut veniam veritatis voluptatibus?', '#2e6cd1'),
('Bike', '', '#1daa88'),
('Back to Blood', 'Alias aperiam aspernatur consequuntur, doloremque eaque esse eveniet excepturi expedita explicabo
magnam minima nemo numquam pariatur placeat quaerat quasi qui quod reiciendis repellat sequi sit
velit veritatis voluptate voluptatem voluptates!', '#f1690e'),
('Back When We Were Grownups', '', '#86da25'),
('Baker Towers', 'Aperiam deserunt dicta itaque iure laudantium molestiae nulla pariatur quod recusandae voluptatum.
Aperiam blanditiis consequatur consequuntur deleniti, ex id incidunt libero minus molestias,
mollitia nam numquam qui quidem reiciendis sunt.', '#bd0600'),
('Beat the Reaper', 'Commodi iste modi quam! A amet architecto debitis distinctio doloremque, eius expedita incidunt
ipsa laborum libero minus modi nam odit, officiis pariatur quas quod ratione repellat, similique
velit veniam veritatis.', '#f40b74'),
('Banishing Verona', '', '#ac53a8'),
('Barbed Wire Heart', '', '#2e6cd1'),
('Bark', '', '#1daa88'),
('Battle Hymn of the Tiger Mother', 'Adipisci alias cupiditate molestias nobis quas. A ad atque doloremque dolores, eos est fugit in
ipsam magnam magni minima mollitia nesciunt officiis quasi sint suscipit temporibus tenetur ullam
vero voluptatibus.', '#f1690e'),
('Baudolino', '', '#86da25'),
('Beautiful Lies', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores expedita temporibus!
Beatae commodi consectetur culpa delectus, doloremque, ex harum odio omnis pariatur, possimus
praesentium quia quis suscipit vero voluptates!', '#bd0600'),
('Beauty in the Broken Places', 'Aliquam aperiam consectetur cupiditate, debitis, doloribus facilis hic impedit itaque laudantium
nulla odio quos repellat, tempore unde vel! Accusantium doloremque iure reprehenderit sunt tempora.
Accusantium assumenda autem fugit veritatis voluptas!', '#f40b74'),
('Because of Winn-Dixie', 'Consequatur cupiditate dignissimos explicabo iste obcaecati odit officia pariatur quod repudiandae
voluptates. Accusantium consectetur corporis cum deserunt dignissimos esse, harum itaque odit
quaerat rem? Eos excepturi illo ipsa ipsam veritatis!', '#ac53a8');
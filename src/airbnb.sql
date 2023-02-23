drop database if exists airbnb;
create database airbnb;
use airbnb;

create table persons(
    id int primary key auto_increment,
    fullname varchar(80),
    birthday date
);

create table users(
    id int primary key auto_increment,
    email varchar(80),
    password varchar(80),
    uid varchar(255),
    image_profile text,
    id_person int,
    foreign key (id_person) references persons(id)
);

create table departments(
    id int primary key auto_increment,
    name varchar(80),
    location json,
    images json,
    description text,
    rating decimal,
    total_rating int,
    price decimal,
    id_user int,
    foreign key (id_user) references users(id)
);

create table bookings(
    id int primary key auto_increment,
    description text,
    rating decimal,
    check_in date,
    check_out date,
    total_price decimal,
    department_id int,
    user_id int,
    foreign key (department_id) references departments(id),
    foreign key (user_id) references users(id)
);

delimiter $$
create trigger rating
after insert on bookings
for each row
begin
	declare count_total_rating int;
    declare old_rating decimal;
    select total_rating into count_total_rating from departments where id = new.department_id;
	update departments set total_rating = (count_total_rating + 1) where id = new.department_id;
    select rating into old_rating from departments where id = new.department_id;
    update departments set rating = ((old_rating * count_total_rating) + new.rating) / (count_total_rating + 1) where id = new.department_id;
end;
$$

insert into persons(fullname, birthday) values('Juan Perez', '1990-01-01');
insert into persons(fullname, birthday) values('Maria Lopez', '1990-01-01');
insert into persons(fullname, birthday) values('Pedro Martinez', '1990-01-01');
insert into persons(fullname, birthday) values('Luisa Rodriguez', '1990-01-01');

insert into users(email, password, uid, image_profile, id_person) values('usuario1@gmail.com','123456',null,null,1);
insert into users(email, password, uid, image_profile, id_person) values('usuario2@gmail.com','123456',null,null,2);
insert into users(email, password, uid, image_profile, id_person) values('usuario3@gmail.com','123456',null,null,3);
insert into users(email, password, uid, image_profile, id_person) values('otrousuario3@gmail.com','123456',null,null,3);

insert into departments(name, location, images, description, rating, total_rating, price, id_user) values('Casa de campo', '{"lat": -12.123456, "lng": -76.123456, "cp": 62170}', null, 'Descripcion de casa de campo', 5, 1, 100, 1);
insert into departments(name, location, images, description, rating, total_rating, price, id_user) values('Casa de playa', '{"lat": -12.123456, "lng": -76.123456, "cp": 62170}', null, 'Descripcion de casa de playa', 5, 1, 100, 3);
insert into departments(name, location, images, description, rating, total_rating, price, id_user) values('Casa de montaña', '{"lat": -12.123456, "lng": -76.123456, "cp": 62170}', null, 'Descripcion de casa de montaña', 5, 1, 100, 3);

insert into bookings(description, rating, check_in, check_out, total_price, department_id, user_id) values('Reserva 1', 4.5, '2020-01-01', '2020-01-05', 400, 1, 2);
insert into bookings(description, rating, check_in, check_out, total_price, department_id, user_id) values('Reserva 2', 2.5, '2020-01-05', '2020-01-07', 200, 2, 4);




create table users (
    id int auto_increment primary key,
    username varchar(50) not null,
    password varchar(255) not null,
    role enum('user', 'admin') not null
);

create table trains (
    id int auto_increment primary key,
    train_name varchar(100) not null,
    source varchar(100) not null,
    destination varchar(100) not null,
    total_seats int not null,
    available_seats int not null
);

create table bookings (
    id int auto_increment primary key,
    user_id int,
    train_id int,
    booking_date timestamp default current_timestamp,
    seats_booked int,
    foreign key (user_id) references users(id),
    foreign key (train_id) references trains(id)
);

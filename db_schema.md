drop database Movies ;
create database Movies ;

use Movies ;

create table users(Id int NOT NULL AUTO_INCREMENT, 
					FirstName varchar(30) NOT NULL,
                    SurName varchar(60) NOT NULL,
                    Email varchar(60) NOT NULL,
                    Password varchar(256) NOT NULL,
                    PRIMARY KEY (Id),
					CONSTRAINT UN_Email UNIQUE (Email)                    
);


create table ratings(Id int NOT NULL AUTO_INCREMENT, 
					IdUser int not null,
                    IdMovie  int not null,
					Rating int not null,
                    PRIMARY KEY (Id),
					FOREIGN KEY (IdUser) REFERENCES users(Id),
                    CONSTRAINT UN_PersonMovie UNIQUE (IdUser,IdMovie)
);

insert into users(FirstName, SurName, Email, Password) values ('Ana', 'Tosi', 'anashibata@gmail.com', '$2a$08$btkkJD/21rfJhEaQyJERXegpYgU7K6tGGiJ9j1GAYFejsTwGCFcl2') ;
insert into users(FirstName, SurName, Email, Password) values ('Douglas', 'Tosi', 'douglas@gmail.com', '$2a$08$IFnv8967x72mxhSX7FIx6usVcDRzM7Nv9HF6rJB/tmtLFuCK7nQHe');

insert into ratings(IdUser, IdMovie,Rating) values (1, 18041, 5) ;
insert into ratings(IdUser, IdMovie,Rating) values (2, 18041, 3) ;
insert into ratings(IdUser, IdMovie,Rating) values (1, 18040, 9) ;


select * from users;
select * from ratings


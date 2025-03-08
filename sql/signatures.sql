create database guestBook;
use guestBook;

drop table if exists signatures;
create table signatures(
id INT AUTO_INCREMENT,

fname, 
lname, 
jobTitle, 
co, 
linkedInUrl, 
eAddress, 
weMetAt, 
other, 
message, 
mailingList, 
emailFormat

PRIMARY KEY (id)
);

insert into signatures (fname, lname, jobTitle, co, linkedInUrl, eAddress, weMetAt, other, message, mailingList, emailFormat)
values ('Emily', 
'Menken',
'emilyM@gmail.com', 
'Software Developer', 
'Emily & co', 
'linkedIn.com/emilyM', 
'emilyM@gmail', 
'other', 
'Coffee Shop', 
'Crook, you owe me for that coffee you dunked your business card into!!', 
'yes', 
'Text');

SELECT * FROM signatures;
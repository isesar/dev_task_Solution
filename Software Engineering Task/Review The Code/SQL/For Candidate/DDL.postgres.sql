create table record (
	id text,
	start_loc text,
	end_loc text,
	created timestamp,
	value int
);

create table loc (
	loc text, -- Also need to add an ID as a primary key?
	description text,
	created timestamp
);  
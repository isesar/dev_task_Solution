create or replace view recent_records as (
	-- Pre-fetch locations for performance boost
	with cte1 as (
		select
			l1.description as sld,
			l2.description as eld
		from
			record
		inner join loc as l1 on l1.loc = record.start_loc
		inner join loc as l2 on l2.loc = record.end_loc
		where -- When using multiple times, put date(now()) in variable
			record.created between date(now()) - interval '7 day' and date(now())
		order by l1.created, l2.created, l1.loc, l2.loc
	)
	select
		r.*
		, cte1.*
	from
		record r
	inner join cte1 on true
	where
		r.created between date(now()) - interval '7 day' and date(now())
	order by id
	limit 100 -- Note: Improves performance
);

-- How I would fix existing SQL
create or replace view recent_records2 as (
	-- Pre-fetch locations for performance boost
	with cte1 as (
		select
			l1.loc as loc_start,
			l2.loc as loc_end,
			l1.description as sld,
			l2.description as eld
		from
			record
		inner join loc as l1 on l1.loc = record.start_loc
		inner join loc as l2 on l2.loc = record.end_loc
		where 
			record.created >= current_date at time zone 'UTC' - interval '7 days'
		order by l1.created, l2.created, l1.loc, l2.loc
	)
	select
		r.*,
		cte1.sld,
		cte1.eld
	from
		record r
	inner join cte1 on true and cte1.loc_end = r.end_loc and cte1.loc_start = r.start_loc
	where
		r.created >= current_date at time zone 'UTC' - interval '7 days'
	order by id
	limit 100 
)

--Simpler solution, but probably not good for tables with high number of records

create or replace view recent_records as (
	SELECT r.*,
	loc1.description as start_desc,
	loc2.description as end_desc
	from record  r
	LEFT JOIN loc AS loc1 on loc1.loc = r.start_loc
	LEFT JOIN loc AS loc2 on loc2.loc = r.end_loc
	where
		 r.created >= current_date at time zone 'UTC' - interval '7 days'
	order by id
	LIMIT 100
);
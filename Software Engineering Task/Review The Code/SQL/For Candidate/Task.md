## Background

A member of your team was recently tasked with migrating client data to a new database.

Since the migration the client has said that their reports have started taking a long time to generate and contain incorrect data.

 - They are expecting to see `records` from the past 7 days (inclusive of today) that start and end at a chosen location.

You notice that a new View has been deployed which directly feeds these reports:
 - `View.postgres.sql`

The client has also provided you with a sample query for how they are retrieving data:
```sql
select 
	*
from 
	recent_records rr1
where 
	rr1.start_loc = 'A'
	and rr1.end_loc = 'B'
;
```

## Your Task

Your task is to review this new database and query and suggest how to fix/improve it with regards to:
 - Correctness
 - Improvements
 - Performance
 - Code Style
 - Maintainability


**Notes:**
 - The DDL statements that create the relevant tables has been provided in `DDL.postgres.sql`
 - Assume that the row counts are as follows:
   - `record`: 1,000,000,000
   - `loc`: 100,000

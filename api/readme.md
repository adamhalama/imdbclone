**Local database setup** <br/>
The service relies on a MySQL database.
The database instance on AWS RDS is hosted on a type of Unix-system which
handles casing and comparison of table names differently than both macOS and Windows.

Running the database in a Docker image gets us closer to how the instance runs in RDS.
This matters especially when verifying your migrations work as you develop.

You can build/start the MySQL container with `docker compose` from the project root:

`docker compose up -d`

This will both (re-)build the image (if needed) and start the container.
You can connect to the database from the MySQL Workbench when the container is running. 

Later when needing start and stop the container you can simply use:

`docker compose up -d`


`docker compose down`
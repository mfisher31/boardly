Boardly: A Board Game Directory and Tracker
=====

Tracks what board games you have, as well as all the times they have been played.  Take a look at these [screenshots](./screenshots/readme.md).

Running
=====
The application can be run locally with docker compose all in one shot.  The following will spin up the application container as well as the database container.

```sh
docker compose up
```

After this the app will be available in your web browser at http://localhost:3000/

To stop the system, press `CTRL + C`

Would Need Done for Production
=====
- Better Redirect handling: e.g. redirect, where it makes sense, to the referring page.
- Proper differentiation betweeen prod, ci, and dev environments.
- Pagination for large Game directories.
- Performance enhancements in DB queries if needed at all.
- Don't use stock bootstrap themeing
- Produce error messages somehow instead of 500 error responses

Development
=====

## Tehchologies used in Boardly:

* <a href="https://nodejs.org/en/">node.js</a>
* <a href="https://expressjs.com/">express - web server</a>
* <a href="https://ejs.co/">EJS - templating</a>
* <a href="https://mariadb.org/">MariaDB - database backend</a>
* <a href="https://www.docker.com/">Docker</a>

## Setup

Before anything else, run `npm install` to get all dependencies in place.

## Running Locally

For development, the database should first be started with docker compose

```sh
docker compose up db
```

and the application should be ran with node directly.

```sh
npm run dev
```

## Resetting the database

In the event the schema dramatically changes or otherwise needs reset, do these things:

```sh
# Stop the the whole system
docker compose down
# Then erase persistent DB data
docker volume rm boardly_db_data
```

After the database is reset, it will re-seed itself after restarting the db.

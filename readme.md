Boardly: A Board Game Directory and Tracker
=====

Tracks what board games you have, as well as all the times they have been played.

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

For development, the database should firt be started with docker compose

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

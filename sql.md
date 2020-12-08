# Useful MySQL commands

Begin MySQL session: `mysql -uroot -p`

Select database: `USE journal` (the db name is journal)

## Users and PRIVILEGES

Create user: `CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';`

(this app is username:journal_app, pwd:journal_pwd)

See all users: `SELECT user FROM mysql.user;`

Grant permissions: `GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';`

The asterisks in this command refer to the database and table (respectively) that they can access.

Reload PRIVILEGES: `FLUSH PRIVILEGES;`

More info on

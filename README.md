Adventure Game
--------------
Install:
1. database.mysql contains the mysql script for building the database
2. run terminal/console
3. cd to project directory
4. make install

Notes:
- The Makefile install ensures all dependencies are there
- There is a test user already in the database (username: test  password: test).
- There is no validation on inserting a user into the database other than what mysql performs
- There is no hashing/salting of passwords
- There is no flash messages to the user on the screen of backend processes
- Quickly going through the map may prevent from the next place loading on screen, but the player on the
    the backend will still have been updated

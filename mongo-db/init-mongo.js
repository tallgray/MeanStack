// ./mongo-db/init-mongo.js file:
// Read environment variables from the .env file
const adminUsername = process.env.MONGO_INITDB_ROOT_USERNAME || 'root';
const adminPassword = process.env.MONGO_INITDB_ROOT_PASSWORD || 'password';
const databasesToCreate = process.env.MONGO_INITDB_DATABASES ? process.env.MONGO_INITDB_DATABASES.split(',') : ['star_wars_db'];

// Create an admin user with appropriate privileges for the database
db.createUser({
  user: adminUsername,
  pwd: adminPassword,
  roles: [
    { role: 'userAdminAnyDatabase', db: 'admin' },
    { role: 'readWriteAnyDatabase', db: 'admin' },
    { role: 'dbAdminAnyDatabase', db: 'admin' }
  ]
});

// Loop through the list of databases and create a user with readWrite role
databasesToCreate.forEach(dbName => {
  // Switch to the current database
  db = db.getSiblingDB(dbName);

  // Create a user with readWrite role
  db.createUser({
    user: adminUsername,
    pwd: adminPassword,
    roles: [{ role: 'readWrite', db: dbName }]
  });

  // Insert initial data or create collections as needed

  // Use printjson or printjsononeline to display messages in MongoDB shell
  printjson({ message: `User and initial data created for the '${dbName}' database.` });
});

// Ensure the 'mongodb' user has write permissions to /data/db
// const result = run('/bin/chown', ['-R', 'mongodb:mongodb', '/data/db']);
const { execSync } = require('child_process');
const result = execSync('/bin/chown -R mongodb:mongodb /data/db');
if (result !== 0) {
  printjson({ error: 'Failed to set ownership for /data/db' });
} else {
  printjson({ message: 'Ownership set for /data/db' });
}

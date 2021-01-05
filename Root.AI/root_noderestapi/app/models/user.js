module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    }
  );

  User.associate = (models) => {
    User.hasMany(models.meals);
  };

  return User;
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { userid: res.insertId, ...newUser });
    result(null, { userid: res.insertId, ...newUser });
  });
};
/*
const sql = require("./db.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.username = user.username
  this.password = user.password;
  this.active = user.active;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { userid: res.insertId, ...newUser });
    result(null, { userid: res.insertId, ...newUser });
  });
};

User.findById = (userid, result) => {
  sql.query(`SELECT * FROM users WHERE userid = ${userid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (userid, user, result) => {
  sql.query(
    "UPDATE users SET email = ?, username = ?, password = ?, active = ? WHERE userid = ?",
    [user.email, user.username, user.password, user.active, userid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { userid: userid, ...user });
      result(null, { userid: userid, ...user });
    }
  );
};

User.remove = (userid, result) => {
  sql.query("DELETE FROM users WHERE userid = ?", userid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", userid);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;

*/
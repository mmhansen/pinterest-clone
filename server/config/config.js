//process.env.npm_lifecycle_event

export default function () {
  let config = {
    "database": "mongodb://freecodecamp:tuesday@ds011790.mlab.com:11790/pinterest-clone",
    "database_name": "pinterest-clone",
    "facebook": {
      "id": "1597692497203124",
      "secret": "f8c0bfd40eeeae87326e1e66d4362d33"
    },
    "twitter": {
      "key": "cQN8kFLWOULprKY8Zu3uG24lgYm9tLhMxw3eFnY7BNW6haPor2",
      "secret": "RVkXgAWyYsF89IhbmcCWYmIkT"
    }
    "secret": "zANzh4EEykHC7Z",
    "port": 3000
  }
  const env = process.env.npm_lifecycle_event
  if (env === "dev:server") {
    let devConfig = {
      host: "http://localhost:3000"
    }
    object.assign({}, config, devConfig)
  } else if (env === "start") {
    let prodConfig = {
      host: "https://hn-pinterest-clone.herokuapp.com"
    }
  }

}

//process.env.npm_lifecycle_event

export default function () {
  let config = {
    "database": "mongodb://freecodecamp:tuesday@ds011790.mlab.com:11790/pinterest-clone",
    "database_name": "pinterest-clone",
    "facebook": {
      "id": "1794472830833191",
      "secret": "cd949c65ae64c227cce92d02dfeac627"
    },
    "twitter": {
      "key": "cQN8kFLWOULprKY8Zu3uG24lgYm9tLhMxw3eFnY7BNW6haPor2",
      "secret": "RVkXgAWyYsF89IhbmcCWYmIkT"
    },
    "secret": "zANzh4EEykHC7Z",
    "port": 3000
  }
  const env = process.env.npm_lifecycle_event
  if (env === "dev") {
    let devConfig = {
      host: "http://localhost:3000"
    }
  config = Object.assign({}, config, devConfig)
  } else if (env === "start") {
    let prodConfig = {
      host: "https://hn-pinterest-clone.herokuapp.com"
    }
  config = Object.assign({}, config, prodConfig)
  }
  return config

}

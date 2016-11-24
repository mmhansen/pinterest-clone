//process.env.npm_lifecycle_event

export default function () {
  let config = {
    "database": "mongodb://freecodecamp:tuesday@ds011790.mlab.com:11790/pinterest-clone",
    "database_name": "pinterest-clone",
    "facebook": {
      "id": "1268152893205818",
      "secret": "c74d5d8544d07221b736b8c9454160f4"
    },
    "twitter": {
      "key": "hXpRjbJCa0LlNL3HShPn1qZg1",
      "secret": "bxuk1QsqjEzkJD2BbQlAwxP30rWEUOeQwZKMMhmjepRVhjetNb"
    },
    "secret": "zANzh4EEykHC7Z",
    "port": 3000
  }
  const env = process.env.NODE_ENV
  if (env === "dev") {
    let devConfig = {
      host: "http://localhost:3000"
    }
  config = Object.assign({}, config, devConfig)
} else if (env === "prod") {
    let prodConfig = {
      host: "https://ob-pinterest-clone.herokuapp.com"
    }
  config = Object.assign({}, config, prodConfig)
  }
  return config

}

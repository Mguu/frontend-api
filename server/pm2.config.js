module.exports = {
    apps : [
        {
          name: "innocatalog",
          script: "./server.js",
          watch: true,
          ignore_watch : ["node_modules", "*.log"],
          env: {
              "PORT": 3000,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 80,
              "NODE_ENV": "production",
          }
        }
    ]
  }
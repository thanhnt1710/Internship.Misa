var APIConfig = {
    development: 'https://localhost:44366/api/v1/',
    production: 'local:8080'
}

export default APIConfig[process.env.NODE_ENV];
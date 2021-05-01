const config = {
    api: {
        host: process.env.REACT_APP_API_HOST,
        endpoints: {
            users: {
                createUser: 'api/v1/users/registrations',
                logIn: 'api/v1/users/sessions',
            },
        }
    },
}

export default config;

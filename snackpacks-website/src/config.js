export default {
    MAX_ATTACHMENT_SIZE: 1000000,
    s3: {
        REGION: "us-east-2",
        BUCKET: "snackpacks-deployments-mobilehub-1497259064"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/admin"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_uJ9lx0oC2",
        APP_CLIENT_ID: "snackpacks_userpoolapp_MOBILEHUB_1497259064 web",
        IDENTITY_POOL_ID: "4n6lolojqqcik7okb0bmhrmes9"
    }
};
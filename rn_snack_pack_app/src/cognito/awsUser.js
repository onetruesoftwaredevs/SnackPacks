class AWSUser {
    constructor(user) {
        if (!AWSUser.instance) {
            this.user = user;
            AWSUser.instance = this;
        }
        return AWSUser.instance;
    }

    static setInstance(user) {
        AWSUser.instance = new AWSUser(user);
    }

    static getInstance() {
        //Returns user instance
        if (!AWSUser.instance) {
            return null;
        }
        return AWSUser.instance;
    }

    getGroup() {
        //Returns 'Drivers' or 'Users'
        var group = this.user.idToken.payload['cognito:groups'];
        if (group === undefined) group = "Users";//Not member of Drivers group
        else group = group[0];//Returns array of groups, select 0'th one
        return group;
    }

    getUser() {
        //Returns the username of a user
        return this.user.idToken.payload['cognito:username'];
    }

    getEmail() {
        //Returns the email of a user
        return this.user.idToken.payload.email;
    }

    getPhone() {
        //Returns the phone number of a user
        return this.user.idToken.payload.phone_number;
    }
}

module.exports = AWSUser;


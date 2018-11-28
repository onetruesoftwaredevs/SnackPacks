import {Auth} from 'aws-amplify';

class AWSUser{
    constructor(){
        //If user has an instance, return the instance
        //If usre does not have an instance, create instance
            //If there is an error creating the instance, it will be set to null
        if(!AWSUser.instance){
            Auth.currentSession()
                .then(user=>{
                    console.log(user);
                    console.log("GROUP: "+user.idToken.payload['cognito:groups']);
                    this.user=user;
                    AWSUser.instance=this;
                })
                .catch(err=>{
                    console.log(err);
                    this.user=null;
                    AWSUser.instancee=null;
                });
        }
        return AWSUser.instance;
    }

    static getInstance(){
        //Returns user instance
        if (!AWSUser.instance){
            AWSUser.instance=new AWSUser();
        }
        return AWSUser.instance;
    }

    getGroup(){
        //Returns undefined if not a member of a group or array of groups ex: ['Drivers'])
        return this.user.idToken.payload['cognito:groups'];
    }

}

module.exports=AWSUser;

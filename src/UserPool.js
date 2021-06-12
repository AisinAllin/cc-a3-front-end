import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-southeast-2_srjTftuLq",
    ClientId: "d9nut3trr4rfhorqall80s5sj",
};

export default new CognitoUserPool(poolData);

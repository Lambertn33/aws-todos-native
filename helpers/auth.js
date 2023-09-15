import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

import { cognitoConfig } from "../config/cognito";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

export function signUpHelper(username, email, password) {
  return new Promise((resolve, reject) => {
    userPool.signUp(
      username,
      password,
      [{ Name: "email", Value: email }],
      null,
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.user);
      }
    );
  });
}

export function confirmSignUpHelper(username, code) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export function signInHelper(username, password) {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

export function signOutHelper() {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
}

export function getCurrentUserHelper() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return;
        }
        const userData = attributes.reduce((acc, attribute) => {
          acc[attribute.Name] = attribute.Value;
          return acc;
        }, {});

        resolve({
          ...userData,
          username: cognitoUser.username,
          token: session.getIdToken().getJwtToken(),
        });
      });
    });
  });
}

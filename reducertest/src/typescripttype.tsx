//try typescript type
enum User {
    SignIn = "User/Signin",
    SignOut = "User/SignOut",
}

type Message = {
    [User.SignIn]: { username: string; password: string };
    [User.SignOut]: undefined;
};

interface SignIn {
    type: "SignIn";
    payload: { username: string; password: string };
}

interface SignOut {
    type: "SignOut";
}

export function signIn(username: string, password: string) {
    return {
        type: "SignIn",
        payload: { username, password },
    };
}

export function signOut() {
    return {
        type: "SignOut",
    };
}

// type Action = ReturnType<typeof  signIn> | ReturnType<typeof  signOut>;

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

type Action = ActionMap<Message>[keyof ActionMap<Message>];

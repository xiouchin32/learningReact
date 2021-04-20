import { QuestionType } from "./CreateprojectPagecontext";

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

export enum Types {
    Create = "CREATE_QUESTION",
    Delete = "DELETE_QUESTION",
    Modified = "MODIFIED",
}

type QuestionPayload = {
    [Types.Create]: {
        require_: boolean;
        type_: string;
        question_text: string;
        // question_options: string[];
        // default_value: number[];
    };
    [Types.Delete]: {
        index: number;
    };
    [Types.Modified]: {
        question_text: string;
        index: number;
    };
};

export type QuestionActions = ActionMap<QuestionPayload>[keyof ActionMap<QuestionPayload>];

export const QuestionReducer = (state: QuestionType[], action: QuestionActions) => {
    let index: number = 0;
    let tempstate: any = [];
    switch (action.type) {
        case "CREATE_QUESTION":
            return [
                ...state,
                {
                    require_: action.payload.require_,
                    type_: action.payload.type_,
                    question_text: action.payload.question_text,
                    // question_options: action.payload.question_options,
                    // default_value: action.payload.default_value,
                },
            ];
        case "DELETE_QUESTION":
            index = action.payload.index;
            tempstate = state;
            tempstate.splice(index, 1);
            return tempstate;
        case "MODIFIED":
            index = action.payload.index;
            tempstate = state;
            tempstate[index].question_text = action.payload.question_text;
            console.log(tempstate);
            return tempstate;
        default:
            return state;
    }
};

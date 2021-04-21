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
    Modified_Questiontext = "MODIFIED_QUESTION_TEXT",
    Modified_Options = "MODIFIED_QUESTION_OPTIONS",
    Add_Options = "ADD_OPTIONS",
    Delete_option = "DELETE_OPTION",
    Add_Default = "ADD_DEFAULT",
}

type QuestionPayload = {
    [Types.Create]: {
        require_: boolean;
        type_: string;
        question_text: string;
        question_options: string[];
        default_value: number[];
    };
    [Types.Delete]: {
        qeustion_index: number;
    };
    [Types.Modified_Questiontext]: {
        question_text: string;
        qeustion_index: number;
    };
    [Types.Modified_Options]: {
        option_text: string;
        qeustion_index: number;
        option_index: number;
    };
    [Types.Add_Options]: {
        qeustion_index: number;
        qeustion_text: string;
    };
    [Types.Delete_option]: {
        qeustion_index: number;
        option_index: number;
    };
    [Types.Add_Default]: {
        qeustion_index: number;
        choose_index: number[];
    };
};

export type QuestionActions = ActionMap<QuestionPayload>[keyof ActionMap<QuestionPayload>];

export const QuestionReducer = (state: QuestionType[], action: QuestionActions) => {
    let qeustion_index: number = 0;
    let option_index: number = 0;
    let tempstate: QuestionType[] = [];
    tempstate = state;
    switch (action.type) {
        case "CREATE_QUESTION":
            return [
                ...state,
                {
                    require_: action.payload.require_,
                    type_: action.payload.type_,
                    question_text: action.payload.question_text,
                    question_options: action.payload.question_options,
                    default_value: action.payload.default_value,
                },
            ];
        case "DELETE_QUESTION":
            qeustion_index = action.payload.qeustion_index;
            tempstate.splice(qeustion_index, 1);
            return tempstate;
        case "MODIFIED_QUESTION_TEXT":
            qeustion_index = action.payload.qeustion_index;
            tempstate[qeustion_index].question_text = action.payload.question_text;
            return tempstate;
        case "MODIFIED_QUESTION_OPTIONS":
            qeustion_index = action.payload.qeustion_index;
            option_index = action.payload.option_index;
            tempstate[qeustion_index].question_options[option_index] = action.payload.option_text;
            return tempstate;
        case "ADD_OPTIONS":
            qeustion_index = action.payload.qeustion_index;
            tempstate[qeustion_index].question_options.push(action.payload.qeustion_text);
            return tempstate;
        case "DELETE_OPTION":
            qeustion_index = action.payload.qeustion_index;
            option_index = action.payload.option_index;
            tempstate[qeustion_index].question_options.splice(option_index, 1);
            return tempstate;
        case "ADD_DEFAULT":
            qeustion_index = action.payload.qeustion_index;
            tempstate[qeustion_index].default_value = action.payload.choose_index;
            return tempstate;
        default:
            return state;
    }
};

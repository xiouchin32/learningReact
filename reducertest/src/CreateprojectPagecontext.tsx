import React, { createContext, useReducer, Dispatch } from "react";
import { QuestionReducer, QuestionActions } from "./CreateprojectPageReducers";

export interface QuestionType {
    require_: boolean;
    type_: string;
    question_text: string;
    // question_options: string[];
    // default_value: number[];
}

export interface InitQuestionStateType {
    Question: QuestionType[];
}

const QuestionInitState = {
    Question: [],
};

const CreateprojectPagecontext = createContext<{
    state: InitQuestionStateType;
    dispatch: React.Dispatch<QuestionActions>;
}>({
    state: QuestionInitState,
    dispatch: () => null,
});

const mainReducer = ({ Question }: InitQuestionStateType, action: any) => ({
    Question: QuestionReducer(Question, action),
});

const CreateprojectPageProvider: React.FC = ({ children }) => {
    //這裡宣告有幾個state，就有幾組問題
    const [state, dispatch] = useReducer(mainReducer, QuestionInitState);

    return (
        <CreateprojectPagecontext.Provider value={{ state, dispatch }}>{children}</CreateprojectPagecontext.Provider>
    );
};

export { CreateprojectPagecontext, CreateprojectPageProvider };

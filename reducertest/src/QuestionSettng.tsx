import React, { Component, useEffect, useState } from "react";
import { CreateprojectPagecontext, QuestionType } from "./CreateprojectPagecontext";
import { Types } from "./CreateprojectPageReducers";

const QuestionSettng = () => {
    //state
    const [Dicom_option, setDicom_option] = useState<QuestionType>({
        require_: true,
        type_: "radio",
        question_text: "",
        // question_options: [],
        // default_value: [],
    });
    //Reqire : true false
    const [Require, setRequire] = useState<boolean>(true);

    //context
    const { state, dispatch } = React.useContext(CreateprojectPagecontext);

    console.log(state);

    const handleQuestion = (type_: string, value: string | boolean) => {
        setDicom_option((Dicom_option) => ({
            ...Dicom_option,
            [type_]: value,
        }));
    };

    const createProduct = () => {
        dispatch({
            type: Types.Create,
            payload: {
                require_: Dicom_option.require_,
                type_: Dicom_option.type_,
                question_text: Dicom_option.question_text,
                // question_options: [],
                // default_value: [],
            },
        });
    };

    const deleteProduct = (index: number) => {
        console.log(index);
        dispatch({
            type: Types.Delete,
            payload: {
                index,
            },
        });
    };

    const modify = (type_: string, value: string, idx: number) => {
        handleQuestion(type_, value);
        dispatch({
            type: Types.Modified,
            payload: {
                index: idx,
                question_text: value,
            },
        });
    };

    const change_require = (status: boolean) => {
        handleQuestion("require_", status);
        setRequire(status);
    };

    return (
        <div>
            <div>
                <button
                    style={Require ? { backgroundColor: "#2A98D0" } : { backgroundColor: "" }}
                    onClick={() => change_require(true)}
                >
                    必填
                </button>
                <button
                    style={Require ? { backgroundColor: "" } : { backgroundColor: "#2A98D0" }}
                    onClick={() => change_require(false)}
                >
                    非必填
                </button>
            </div>
            <select
                // value={form.name}
                onChange={(e) => {
                    handleQuestion("type_", e.target.value);
                }}
                value={Dicom_option.type_}
            >
                <option value="radio">單選</option>
                <option value="checkbox">複選</option>
                <option value="text">文字框</option>
                <option value="select">下拉選單</option>
            </select>
            <input
                // value={Dicom_option.question_text}
                type="text"
                onChange={(e) => {
                    handleQuestion("question_text", e.target.value);
                }}
                placeholder="Question Text"
            />
            <button onClick={createProduct}>新增</button>
            <div style={{ marginTop: 20 }}>
                {state.Question.map((quetion_list: any, idx: number) => (
                    <div>
                        <input
                            onChange={(e) => {
                                modify("question_text", e.target.value, idx);
                            }}
                            value={quetion_list.question_text}
                        />
                        <button onClick={() => deleteProduct(idx)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionSettng;

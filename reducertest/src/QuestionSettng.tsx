import React, { Component, useState } from "react";
import { CreateprojectPagecontext, QuestionType } from "./CreateprojectPagecontext";
import { Types } from "./CreateprojectPageReducers";

const QuestionSettng = () => {
    const [Dicom_option, setDicom_option] = useState<QuestionType>({
        // require_: true,
        type_: "radio",
        question_text: "",
        // question_options: [],
        // default_value: [],
    });

    const { state, dispatch } = React.useContext(CreateprojectPagecontext);

    console.log(state);

    const handleForm = (type_: string, value: string) => {
        setDicom_option((Dicom_option) => ({
            ...Dicom_option,
            [type_]: value,
        }));
    };

    const createProduct = () => {
        dispatch({
            type: Types.Create,
            payload: {
                // require_: true,
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

    return (
        <div>
            <select
                // value={form.name}
                onChange={(e) => {
                    handleForm("type_", e.target.value);
                }}
                value={Dicom_option.type_}
            >
                <option value="radio">單選</option>
                <option value="checkbox">複選</option>
                <option value="text">文字框</option>
                <option value="select">下拉選單</option>
            </select>
            <input
                value={Dicom_option.question_text}
                type="text"
                onChange={(e) => {
                    handleForm("question_text", e.target.value);
                }}
                placeholder="question"
            />
            <button onClick={createProduct}>create</button>
            <div style={{ marginTop: 20 }}>
                {state.Question.map((c: any, idx: number) => (
                    <div>
                        <span>{c.question_text}</span>
                        {/* <span>{c.price}</span> */}
                        <button onClick={() => deleteProduct(idx)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionSettng;

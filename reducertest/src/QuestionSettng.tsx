import React, { Component, useEffect, useState } from "react";
import { CreateprojectPagecontext, QuestionType } from "./CreateprojectPagecontext";
import { Types } from "./CreateprojectPageReducers";

const QuestionSettng = () => {
    //state
    const [Dicom_option, setDicom_option] = useState<QuestionType>({
        require_: true,
        type_: "radio",
        question_text: "",
        question_options: [],
        default_value: [],
    });
    //Reqire : true false
    const [Require, setRequire] = useState<boolean>(true);
    const [optionnumber, setoptionnumber] = useState<number>(1);
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
                question_text: "",
                question_options: [],
                default_value: [],
            },
        });
    };

    const deleteQuestion = (index: number) => {
        console.log(index);
        dispatch({
            type: Types.Delete,
            payload: {
                qeustion_index: index,
            },
        });
    };

    const modifyQuestion = (type_: string, value: string, idx: number) => {
        handleQuestion(type_, value);
        dispatch({
            type: Types.Modified_Questiontext,
            payload: {
                qeustion_index: idx,
                question_text: value,
            },
        });
    };

    const modifyOption = (value: string, idx: number, option_idx: number) => {
        dispatch({
            type: Types.Modified_Options,
            payload: {
                option_text: value,
                qeustion_index: idx,
                option_index: option_idx,
            },
        });
    };

    const change_require = (status: boolean) => {
        handleQuestion("require_", status);
        setRequire(status);
    };
    const add_select_option = (type: string, idx: number) => {
        let option_text = (document.getElementById("select_option_" + idx) as HTMLInputElement).value;
        if (option_text !== "") {
            add_option(idx, option_text);
            (document.getElementById("select_option_" + idx) as HTMLInputElement).value = "";
        } else {
            alert("請輸入選項名稱");
        }
    };

    const add_option = (idx: number, text: string) => {
        dispatch({
            type: Types.Add_Options,
            payload: {
                qeustion_index: idx,
                qeustion_text: text,
            },
        });
    };

    const delete_option = (quetion_idx: number, option_idx: number) => {
        dispatch({
            type: Types.Delete_option,
            payload: {
                qeustion_index: quetion_idx,
                option_index: option_idx,
            },
        });
    };

    const setdefalutoption = (event: any, questionidx: number, option_index: number, type: string) => {
        if (type === "radio") {
            let option: number[] = [];
            option = [option_index];
            dispatch({
                type: Types.Add_Default,
                payload: {
                    qeustion_index: questionidx,
                    choose_index: option,
                },
            });
        } else {
            //chcekbox
            let temp_option: number[] = [];
            if (state.Question[questionidx].default_value) temp_option = state.Question[questionidx].default_value;
            if (event.checked) {
                //checked === true add option
                temp_option.push(option_index);
                console.log(temp_option);
            } else {
                console.log(option_index);
                temp_option = temp_option.filter((item) => item !== option_index);
                console.log(temp_option);
            }
            if (temp_option) {
                dispatch({
                    type: Types.Add_Default,
                    payload: {
                        qeustion_index: questionidx,
                        choose_index: temp_option,
                    },
                });
            }
        }
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
                <option value="textarea">文字框</option>
                <option value="select">下拉選單</option>
            </select>
            <button onClick={createProduct}>新增</button>
            <div style={{ marginTop: 20 }}>
                {state.Question.map((quetion_list: any, questionidx: number) => (
                    <div>
                        {/* quetion_text */}
                        <input
                            type="textarea"
                            onChange={(e) => {
                                modifyQuestion("question_text", e.target.value, questionidx);
                            }}
                            value={quetion_list.question_text}
                        />
                        {/* quetion_option */}
                        {quetion_list.type_ === "textarea" ? (
                            <div>
                                <input type="textarea" placeholder="讓使用者輸入" readOnly />
                            </div>
                        ) : quetion_list.type_ === "radio" || quetion_list.type_ === "checkbox" ? (
                            <div>
                                {quetion_list.question_options.map((option: any, optionidx: number) => {
                                    return (
                                        <div>
                                            <input
                                                type={quetion_list.type_}
                                                id={questionidx + "_" + option}
                                                value={option}
                                                name={questionidx.toString()}
                                                onClick={(e) =>
                                                    setdefalutoption(
                                                        e.target,
                                                        questionidx,
                                                        optionidx,
                                                        quetion_list.type_
                                                    )
                                                }
                                            />
                                            <input
                                                value={option}
                                                onChange={(e) => {
                                                    modifyOption(e.target.value, questionidx, optionidx);
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    delete_option(questionidx, optionidx);
                                                }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    );
                                })}
                                <button onClick={() => add_option(questionidx, "")}>add option</button>
                            </div>
                        ) : (
                            <div>
                                <input type="textarea" placeholder="選項名稱" id={"select_option_" + questionidx} />
                                <button onClick={() => add_select_option(quetion_list.type_, questionidx)}>
                                    add option
                                </button>
                            </div>
                        )}
                        <button onClick={() => deleteQuestion(questionidx)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionSettng;

import React, { Component } from "react";
import Ajv from "ajv";

interface MyData {
    foo: number;
    bar?: string;
}

const Ajvtest = () => {
    const ajv = new Ajv();

    // const innerschema = {
    //     type: "array",
    //     minItem: 0,
    //     properties: {
    //         foo: {
    //             type: "string",
    //         },
    //     },
    //     required: ["foo"],
    // };

    const default_value_schema = {
        type: "array",
        items: { type: "number" },
        uniqueItems: true,
    };

    const question_options_schema = {
        type: "array",
        items: { type: "string", minLength: 1 },
        minItems: 1,
        uniqueItems: true,
    };

    const optionsSchema = {
        type: "object",
        properties: {
            default_value: default_value_schema,
            question_options: question_options_schema,
            question_text: { type: "string", minLength: 1 },
            require_: { type: "boolean" },
            type_: { type: "string" },
        },
        required: ["default_value", "question_options", "question_text", "require_", "type_"],
        additionalProperties: false,
    };
    const validate = ajv.compile(optionsSchema);

    const Data = {
        default_value: [],
        question_options: ["123"],
        question_text: "hi",
        require_: true,
        type_: "radio",
    };
    console.log(validate(Data));
    if (validate(Data)) {
        // data is MyData here
        console.log(Data);
    } else {
        console.log(validate.errors);
    }
    return <div>123456</div>;
};

export default Ajvtest;

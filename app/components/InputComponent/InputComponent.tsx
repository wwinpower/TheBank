import React, {useState} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {InputField} from "@components/InputComponent/styles";

interface InputComponentProps {
    name: string;
    placeholder: string;
    focused: boolean;
    value: string;
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    style?: object;
    type?: string;
}

const InputComponent: React.FC<InputComponentProps> = (
    {
        name,
        placeholder,
        focused,
        value,
        onChange,
        onFocus,
        onBlur,
        style,
        type
    }
) => {

    return (
        <InputField
            placeholder={placeholder}
            focused={focused}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            style={style}
            name={name}
            type={type || "text"}
        />
    );
};
export default InputComponent;
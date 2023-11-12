import React, {useState} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData, View} from "react-native";
import InputComponent from "@components/InputComponent/InputComponent";
import ButtonComponent from "@components/ButtonComponent/ButtonComponent";
import {Container, FormItem} from "@screens/login/styles";
import {FormContent} from "@screens/update/styles";
import {useAuth} from "@app/hooks/useAuth";
import {useNavigation} from "@react-navigation/native";

const Update = () => {
    const {save} = useAuth();

    const navigation = useNavigation();

    const [inputs, setInputs] = useState({
        username: '',
    });
    const [focusedInput, setFocusedInput] = useState('');
    const [isLoadingData, setIsLoadingData] = useState(false);
    const handleInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>, name: string): void => {
        let text = (e.nativeEvent as {
            text?: string
        })?.text;

        setInputs((prevInputs) => {
            return {
                ...prevInputs,
                [name as string]: text,
            };
        });
    };

    const handleInputFocus = (name: string) => {
        setFocusedInput(name);
    };

    const handleInputBlur = () => {
        setFocusedInput('');
    };

    const onSave = () => {
        setIsLoadingData(true);

        save(inputs.username)
            .then(data => navigation.navigate("Main"))
            .finally(() => setIsLoadingData(true));
    }

    return (
        <Container>

            <FormContent>
                <FormItem>
                    <InputComponent
                        name="username"
                        placeholder="Username"
                        focused={focusedInput === 'username'}
                        value={inputs.username}
                        onChange={(e) => handleInputChange(e, "username")}
                        onFocus={() => handleInputFocus('username')}
                        onBlur={handleInputBlur}
                    />
                </FormItem>

                <ButtonComponent onPress={onSave}>{isLoadingData ? "Saving ..." : "Save"}</ButtonComponent>
            </FormContent>
        </Container>
    );
};

export default Update;




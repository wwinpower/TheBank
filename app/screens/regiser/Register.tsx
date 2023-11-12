import React, {FC, useState} from 'react';
import {
    Container,
    ContainerHeader,
    ContainerContent,
    Description,
    Form,
    FormItem,
    RegisterScreen,
    Title,
    ForgetText,
    FormGroup,
    LinkTouch,
    FormBottomText
} from "./styles";
import {NativeSyntheticEvent, TextInputChangeEventData, TouchableHighlight, Text, StyleSheet, View} from "react-native";
import InputComponent from "@components/InputComponent/InputComponent";
import ButtonComponent from "@components/ButtonComponent/ButtonComponent";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "@app/hooks/useAuth";
import {addDoc, collection} from "@firebase/firestore";
import {db} from "@app/firebase";

const Register: FC = () => {
    const {navigate} = useNavigation();
    const {register} = useAuth();

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [focusedInput, setFocusedInput] = useState('');

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

    const signUp = () => {
        register(inputs.email, inputs.password, inputs.username)
            .then(() => navigate("Login"))
    }

    return (
        <RegisterScreen>
            <Container>
                <ContainerHeader>
                    <Title>Welcome!</Title>
                    <Description>
                        Please provide following {'\n'}
                        details for your new account
                    </Description>
                </ContainerHeader>

                <ContainerContent>
                    <Form>
                        <FormGroup>
                            <FormItem>
                                <InputComponent
                                    name="username"
                                    placeholder="Your Name"
                                    focused={focusedInput === 'username'}
                                    value={inputs.username}
                                    onChange={(e) => handleInputChange(e, "username")}
                                    onFocus={() => handleInputFocus('username')}
                                    onBlur={handleInputBlur}
                                />
                            </FormItem>
                            <FormItem>
                                <InputComponent
                                    name="email"
                                    placeholder="Your Email"
                                    focused={focusedInput === 'email'}
                                    value={inputs.email}
                                    onChange={(e) => handleInputChange(e, "email")}
                                    onFocus={() => handleInputFocus('email')}
                                    onBlur={handleInputBlur}
                                />
                            </FormItem>
                            <FormItem>
                                <InputComponent
                                    name="password"
                                    placeholder="Your Password"
                                    focused={focusedInput === 'password'}
                                    value={inputs.password}
                                    onChange={(e) => handleInputChange(e, "password")}
                                    onFocus={() => handleInputFocus('password')}
                                    onBlur={handleInputBlur}
                                    secureTextEntry={true}
                                />
                            </FormItem>
                        </FormGroup>

                        <ForgetText>Forgot Password?</ForgetText>

                        <ButtonComponent onPress={signUp}>Sign Up</ButtonComponent>

                        <FormBottomText>
                            <Text>Do you have an account? - </Text>
                            <LinkTouch
                                onPress={() => navigate("Login")}
                            >
                                <Text>Sign In</Text>
                            </LinkTouch>
                        </FormBottomText>
                    </Form>
                </ContainerContent>
            </Container>
        </RegisterScreen>
    );
};
export default Register;
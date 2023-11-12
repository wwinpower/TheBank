import React, {FC, useState} from 'react';
import {
    Container,
    ContainerHeader,
    ContainerContent,
    Description,
    Form,
    FormItem,
    LoginScreen,
    Title,
    ForgetText,
    FormGroup,
    LinkTouch,
    FormBottomText
} from './styles';
import {
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Text,
} from 'react-native';
import InputComponent from '@components/InputComponent/InputComponent';
import ButtonComponent from '@components/ButtonComponent/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from "@app/hooks/useAuth";

const Login: FC = () => {
    const {isLoading, login} = useAuth();
    const {navigate} = useNavigation();

    const [inputs, setInputs] = useState({
        password: '',
        email: ''
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

    const signIn = () => {
        login(inputs.email, inputs.password).then((data) => navigate("Profile"))
    };

    return (
        <LoginScreen>
            <Container>
                <ContainerHeader>
                    <Title>Welcome Back!</Title>
                    <Description>Sign in to continue</Description>
                </ContainerHeader>

                <ContainerContent>
                    <Form>
                        <FormGroup>
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

                        <ButtonComponent onPress={() => signIn()}>Sign in</ButtonComponent>

                        <FormBottomText>
                            <Text>Don’t have an account? - </Text>
                            <LinkTouch onPress={() => navigate('Register')}>
                                <Text>Sign Up</Text>
                            </LinkTouch>
                        </FormBottomText>
                    </Form>
                </ContainerContent>
            </Container>
        </LoginScreen>
    );
};
export default Login;

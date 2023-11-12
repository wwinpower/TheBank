import styled from "styled-components/native";
import theme from "@styles/theme";

interface InputFieldProps {
    focused: boolean;
    name: string;
    type: string;
}

export const InputField = styled.TextInput<InputFieldProps>`
  padding: 12px 24px;
  border-radius: 10px;
  color: ${theme.COLOR.INPUT};
  background-color: ${({focused}) => (!focused ? theme.BACKGROUND.INPUT : theme.BACKGROUND.INPUT_ACTIVE)};
  border-color: ${({focused}) => (!focused ? theme.BORDER.INPUT : theme.BORDER.INPUT_ACTIVE)};
  border-width: 1px;
  border-style: solid;
`;
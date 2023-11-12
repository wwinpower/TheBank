import styled from "styled-components/native";
import theme from "@styles/theme";

export const RegisterScreen = styled.View`
  background-color: ${theme.COLOR.WHITE};
  height: 100%;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.View`
  gap: 62px;
  width: 100%;
  padding: 40px;
`;
export const ContainerHeader = styled.View`
  gap: 20px;
`;
export const ContainerContent = styled.View``;
export const Title = styled.Text`
  font-size: 35px;
  color: ${theme.COLOR.TITLE};
  text-align: center;
  text-wrap: unset;
`;
export const Description = styled.Text`
  font-size: 15px;
  color: ${theme.COLOR.TITLE};
  text-align: center;
`;
export const Form = styled.View`
`;
export const FormItem = styled.View``;
export const FormGroup = styled.View`
  gap: 12px;
`;
export const ForgetText = styled.Text`
  text-align: right;
  margin-top: 20px;
  margin-bottom: 50px;
`;
export const FormBottomText = styled.View`
   flex-direction: row;
   justify-content: center;
   align-items: center;
    margin-top: 10px;
`;
export const LinkTouch = styled.Text`
  font-weight: bold;
  color: ${theme.COLOR.TEXT};
  font-size: 15px;
`;
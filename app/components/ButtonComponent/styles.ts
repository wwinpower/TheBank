import styled from "styled-components/native";
import {TouchableOpacity} from "react-native";
import theme from "@styles/theme";

export const StyledButton = styled(TouchableOpacity)`
  background-color: ${theme.BACKGROUND.BUTTON_FIRST};
  padding: 12px 24px;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: ${theme.COLOR.WHITE};
  font-size: 16px;
`;
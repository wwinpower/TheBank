import styled from "styled-components/native";
import theme from "@styles/theme";


export const FooterContainer = styled.View`
  background-color: ${theme.BACKGROUND.FOOTER};
  border: 1px solid ${theme.BORDER.FOOTER_TOP};
  padding: 6px;
  position: absolute;
  bottom: 0;
`;
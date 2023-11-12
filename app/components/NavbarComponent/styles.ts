import styled from "styled-components/native";
import theme from "@styles/theme";

interface INavItem {
    isActive: boolean
}

export const NavContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  //padding: 12px;
`;
export const NavItem = styled.View<INavItem>`
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background: ${({isActive}) => isActive ? theme.BACKGROUND.NAVBAR_LINK_ACTIVE : theme.BACKGROUND.FOOTER};
`;

export const NavItemLink = styled.Text`
  text-align: center;
`;

export const NavItemIcon = styled.Text`
  text-align: center;
`;
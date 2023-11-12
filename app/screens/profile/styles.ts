import styled from "styled-components/native";
import theme from "@styles/theme";

interface UserAvatarProps {
    source: { uri: string };
}

interface UserInfoProps {
    onPress: () => void
}

interface StoryImageProps {
    source: { uri: string };
}

export const ProfileScreen = styled.View`
  background-color: #fff;
  height: 100%;
`
export const ProfileHeader = styled.View`
  padding: 20px 0`
export const UserInfo = styled.View<UserInfoProps>`
  padding: 40px 20px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
export const UserAvatar = styled.Image<UserAvatarProps>`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`
export const UserAvatarNot = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: ${theme.BACKGROUND.USER_AVATAR};
  justify-content: center;
  align-items: center;
`
export const UserAvatarText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${theme.COLOR.WHITE};
`
export const Username = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: ${theme.COLOR.PARAGRAPH};
`
export const StoryContainer = styled.View`
  padding: 0 20px;
  gap: 20px;
  flex-direction: row;
`
export const StoryItem = styled.View`
  border: 2px solid ${theme.BORDER.INPUT_ACTIVE};
  border-radius: 20px;
  width: 80px;
  height: 80px;
  margin-right: 6px;
`

export const StoryImage = styled.Image<StoryImageProps>`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 20px;
  border: 2px solid ${theme.COLOR.WHITE};
`
export const ProfileContent = styled.View`
  //margin: 20px;
`
export const CardItem = styled.View`
  box-shadow: rgba(149, 157, 165, 0.9) 0px 8px 24px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: space-between;
`

export const CardItemLeft = styled.View`
  flex-direction: column;
  gap: 6px;
`
export const CardItemSum = styled.Text`
  font-size: 18px;
  font-weight: bold;
`
export const CardNumber = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
`
export const CardItemName = styled.Text`
  margin-bottom: 20px;
  font-size: 16px;
  color: ${theme.COLOR.TEXT}
`

export const CardBackground = styled.View`
  background-color: black;
  width: 60px;
  height: 40px;
  border-radius: 5px;
  flex-direction: row;
  align-items: flex-end;
  padding: 3px;
`
export const CardItemIcon = styled.Text``
export const CardItemAction = styled.View`
  margin: 0 20px;
`


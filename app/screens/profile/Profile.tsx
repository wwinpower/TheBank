import React, {
    FC,
    MutableRefObject,
    RefAttributes,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {
    CardBackground,
    CardItem, CardItemAction,
    CardItemLeft,
    CardItemName,
    CardItemSum,
    CardNumber,
    ProfileContent,
    ProfileHeader,
    ProfileScreen,
    StoryContainer,
    StoryImage,
    StoryItem,
    UserAvatar,
    UserAvatarNot,
    UserAvatarText,
    UserInfo,
    Username
} from "@screens/profile/styles";
import {AntDesign} from "@expo/vector-icons";
import ButtonComponent from "@components/ButtonComponent/ButtonComponent";
import {useNavigation} from "@react-navigation/native";
import {
    BottomSheetModal, BottomSheetModalProps,
    BottomSheetModalProvider,
    BottomSheetView
} from "@gorhom/bottom-sheet";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";
import {useAuth} from "@app/hooks/useAuth";
import {BottomSheetModalMethods} from "@gorhom/bottom-sheet/lib/typescript/types";


const stories = [
    {
        data: [
            "https://www.creatopy.com/blog/wp-content/uploads/2020/08/beneficial_bank_revolving-debt-1-448x600.jpg",
            "https://www.creatopy.com/blog/wp-content/uploads/2020/08/Warba-Bank-ad-example-600x600.jpg",
            "https://image.adsoftheworld.com/v5vaeuiwvkdv118527e1ushn5raz",
        ],
    },
    {
        data: [
            'https://i.pinimg.com/550x/74/b8/d1/74b8d19425f4c56bfd3a0f456d5d7121.jpg',
            'https://sp2cdn-idea-global.zingfront.com/sp_opera/c6065238880e84402bec657313f7bc9c.jpg',
            'https://d1j19yvx1huxho.cloudfront.net/thumbs/0c386.png',
        ],
    },
    {
        data: [
            "https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/127306/screen_shot_2019-08-26_at_9.44.42_am.png?w=1280&ar=default&fit=crop&crop=faces,edges&auto=format"
        ],
    },
    {
        data: [
            "https://cdn4.singleinterface.com/files/enterprise/coverphoto/5280/personal-loan-banner-nearme-16-03-23-07-23-21.jpg"
        ],
    },
    {
        data: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/23af6368653133.5dc976a006fe5.jpg"
        ],
    }
];

interface ICards {
    id: number
    currency: string,
    balance: number,
    title: string,
    cardIcon: string,
    cardNumber: number
}

const cardsData = [
    {
        id: 1,
        currency: "$",
        balance: 340.79,
        title: "TheBank Black Card",
        cardIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/2560px-Mastercard_2019_logo.svg.png",
        cardNumber: 3450
    },
    {
        id: 2,
        currency: "€",
        balance: 200.79,
        title: "TheBank Black Card",
        cardIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/2560px-Mastercard_2019_logo.svg.png",
        cardNumber: 4908
    },
]

interface CustomBottomSheetModalMethods extends BottomSheetModalMethods {
    present: () => void
}

interface CustomBottomSheetModalRef extends RefObject<CustomBottomSheetModalMethods> {
}


const Profile: FC = ({navigation}: any) => {
    const {logout, user, data} = useAuth()
    const [cards, setCards] = useState<ICards[]>([])
    const [image, setImage] = useState("https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg")

    const navigate = useNavigation();

    const bottomSheetModalRef = useRef<CustomBottomSheetModalMethods>(null);

    const snapPoints = useMemo(() => ["30%"], []);

    const handlePresentModal = useCallback(() => {
        const {current} = bottomSheetModalRef;

        (current as CustomBottomSheetModalMethods | null | undefined)?.present?.();
    }, []);

    useEffect(() => {
        setCards(cardsData)
    }, []);

    return (
        <BottomSheetModalProvider>
            <View>
                <ProfileScreen>
                    <ProfileHeader>
                        <UserInfo onPress={handlePresentModal}>
                            {
                                !image
                                    ? <UserAvatar source={{uri: image}}/>
                                    : (
                                        <UserAvatarNot>
                                            <UserAvatarText>{data?.displayName && data?.displayName.slice(0, 1)}</UserAvatarText>
                                        </UserAvatarNot>
                                    )
                            }
                            <TouchableOpacity onPress={handlePresentModal}>
                                <Username>👋 {data?.displayName && data?.displayName || "No name"}</Username>
                            </TouchableOpacity>
                        </UserInfo>
                    </ProfileHeader>

                    <StoryContainer>
                        <FlatList
                            style={{gap: 20, flexDirection: "row", paddingBottom: 20}}
                            data={stories}
                            horizontal
                            scrollToOverflowEnabled={false}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('Story', {
                                                data: item.data,
                                            });
                                        }}>
                                        <StoryItem>
                                            <StoryImage source={{uri: item.data[0]}}/>
                                        </StoryItem>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </StoryContainer>

                    <ProfileContent>
                        <View style={{overflow: "scroll"}}>
                            {
                                cards && cards.map(item => (
                                    <View style={styles.shadow}>
                                        <CardItem>
                                            <CardItemLeft>
                                                <CardItemSum>{item.currency} {item.balance}</CardItemSum>
                                                <CardItemName>{item.title}</CardItemName>
                                            </CardItemLeft>

                                            <CardBackground>
                                                <CardNumber>{item.cardNumber}</CardNumber>
                                                <Image
                                                    source={{uri: item.cardIcon}}
                                                    style={{
                                                        width: 10,
                                                        height: 10,
                                                        position: "absolute",
                                                        right: 5,
                                                        bottom: 2,
                                                        objectFit: "contain"
                                                    }}/>
                                            </CardBackground>
                                        </CardItem>
                                    </View>
                                ))
                            }
                        </View>

                        <CardItemAction>
                            <ButtonComponent onPress={handlePresentModal}>
                                <Text>Add New Card</Text>
                            </ButtonComponent>
                        </CardItemAction>
                    </ProfileContent>
                </ProfileScreen>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                >
                    <BottomSheetView style={{gap: 20, paddingTop: 40, flex: 1}}>
                        <View style={{paddingRight: 20, paddingLeft: 20, gap: 20}}>
                            <ButtonComponent onPress={() => navigation.navigate("Update")}>
                                <Text>Edit</Text>
                            </ButtonComponent>

                            <ButtonComponent onPress={() => {
                                logout()
                                console.log("ok")
                            }}>
                                <Text>Logout</Text>
                            </ButtonComponent>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    shadow: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        shadowColor: '#17171750',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 15,
        borderRadius: 20
    }
});
export default gestureHandlerRootHOC(Profile);
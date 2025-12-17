import UserInfoCardContainer from "@/components/User/UserInfoCardContainer";
import { icons } from "@/constants/icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ButtonNavProps = {
  Icon: any;
  name: string;
  text?: string;
  isTheme?: boolean;
  enabled?: boolean;
  setEnabled?: any;
};

const ButtonNav = ({
  Icon,
  name,
  text,
  isTheme,
  enabled,
  setEnabled,
}: ButtonNavProps) => (
  <TouchableOpacity
    className="flex flex-row items-center justify-between"
    style={{ padding: 10 }}
  >
    <View className="flex flex-row items-center gap-x-4">
      <Icon name={name} size={24} color="white" />
      {isTheme ? (
        <Text className="text-white">
          {enabled ? "Dark Mode" : "Light Mode"}
        </Text>
      ) : (
        <Text className="text-white">{text}</Text>
      )}
    </View>

    <View className=" flex flex-row items-center">
      {isTheme ? (
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          trackColor={{ false: "#4B5563", true: "#030014" }}
          thumbColor={enabled ? "#030014" : "#ffffff"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color="white" />
      )}
    </View>
  </TouchableOpacity>
);

const Profile = () => {
  // theme change
  const [enabled, setEnabled] = useState(true);
  return (
    <SafeAreaView className="flex flex-col flex-1 bg-primary px-2">
      <ScrollView
      className="flex-1"
        showsVerticalScrollIndicator={false}>
      <View className=" py-3 justify-center" style={{ paddingBottom: 40 }}
      >

        {/* Center title */}
        <Text className="text-light-200 text-center" style={{ fontSize: 22 }}>
          Account
        </Text>
      </View>

      {/* user card X actions*/}
      <View
        className="flex flex-col"
        style={{ paddingHorizontal: 13, gap: 16 }}
      >
        {/* user card */}
        <UserInfoCardContainer>
          <View
            style={{
              backgroundColor: "#6a5db0",
              borderRadius: 16,
              padding: 20,
            }}
            className=" flex flex-row items-center"
          >
            <Image source={icons.person} style={{ width: 90, height: 90 }} />

            <View className=" flex flex-col">
              <Text className="text-white text-xl">Test Name</Text>
              <Text className=" text-light-200">Test Email</Text>
            </View>
          </View>
        </UserInfoCardContainer>

        {/* user actions 1*/}
        <View
          style={{
            backgroundColor: "#6a5db0",
            borderRadius: 16,
            padding: 20,
          }}
          className="px-2 mt-4 flex flex-col"
        >
          <ButtonNav
            Icon={MaterialCommunityIcons}
            name="account"
            text="Personal Info"
          />
          <ButtonNav Icon={Feather} name="bell" text="Notifications" />
          <ButtonNav
            Icon={FontAwesome6}
            name="ticket"
            text="Vouchers / Discounts"
          />
          <ButtonNav
            Icon={FontAwesome}
            name="credit-card"
            text="Payment Method"
          />
        </View>

        {/* user actions 2*/}
        <View
          style={{
            backgroundColor: "#6a5db0",
            borderRadius: 16,
            padding: 20,
          }}
          className="px-2 mt-4 flex flex-col"
        >
          <ButtonNav Icon={Feather} name="shield" text="Security" />
          <ButtonNav Icon={Entypo} name="language" text="Language" />
          <ButtonNav
            Icon={AntDesign}
            name={enabled ? "moon" : "sun"}
            isTheme
            enabled={enabled}
            setEnabled={setEnabled}
          />
          <ButtonNav
            Icon={AntDesign}
            name="question-circle"
            text="Help Center"
          />
        </View>

        {/* Logout */}
        <TouchableOpacity className=" bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
         style={{
            backgroundColor: "#6a5db0",
            borderRadius: 16,
          }}>
          <MaterialCommunityIcons name="logout" size={22} color="white" />
          <Text className=" text-white font-semibold text-base ml-2">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  onPress?: () => void;
  placeholder: string;
  value ?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({  placeholder,value,onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
      <Image
        source={icons.search}
        className=" size-8"
        resizeMode="contain"
        tintColor="#ab8bff"
      />

      <TextInput
        placeholder={placeholder}
        className="flex-1 ml-2 text-white"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#fff"
      />
    </View>
  );
};

export default SearchBar;

import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Movie ID: {id}</Text>
    </View>
  );
}

import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: Movie;
  onPress?: () => void;
};

const MovieCard = ({ item, onPress }: Props) => {
  if (!item) {
    console.log("movie not found");
    return null;
  } // ✅ hard guard

  const { id, title, poster_path, vote_average, release_date } = item;

  return (
    <Link
      href={`/movies/${id}`}
      onPress={onPress} // ✅ side-effect lives HERE
      asChild
    >
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placeholder.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center">
          {Array.from({ length: Math.round(vote_average / 2) }).map((_, i) => (
            <Image key={i} source={icons.star} className="size-5" />
          ))}
        </View>

        <Text className="text-xs text-light-300 mt-1">
          {release_date?.split("-")[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

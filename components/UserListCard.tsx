import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type listProps = {
  item: SavedMovie;
  onPress?: () => void;
};

const UserListCard = ({ item, onPress }: listProps) => {
  const { movie_id, movie_title, genres, poster_path } = item;

  return (
     
        <Link href={`/movies/${movie_id}`} asChild>
          <TouchableOpacity
            onPress={onPress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              
              borderRadius: 12,
             
            }}
          >
            {/* Image */}
            <View
              style={{
                width: 140,
                height: 100,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: "#fff",
                overflow: "hidden",
                marginRight: 10,
              }}
            >
              <Image
                source={{
                  uri: poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : "https://placeholder.co/600x400/1a1a1a/ffffff.png",
                }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="stretch"
              />
            </View>

            {/* Text block */}
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                {movie_title}
              </Text>
              <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>
                {genres.join(" - ")}
              </Text>
            </View>

            {/* Chevron */}
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </Link>
    
  );
};

export default UserListCard;

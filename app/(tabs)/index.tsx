import MovieCard from "@/components/MovieCard";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
// icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Background image */}
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/* Sticky Transparent Header */}
        <BlurView
          intensity={70}
          tint="dark"
          className="flex flex-row items-center justify-between bg-transparent pt-20 pb-4 px-4 z-10"
        >
          <View className="applogo flex flex-row items-center justify-center gap-x-2">
          <Image source={icons.logo} className="w-14 h-12" />
          <Text className="text-white text-2xl font-bold">Stream</Text>
          </View>

          <View className=" flex-row items-center gap-x-4">
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Image source={icons.search} className="w-14 h-10" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              className="rounded-full border-2 p-1"
            >
              <MaterialCommunityIcons
                name="account-circle"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </BlurView>
        <View className="flex-1 px-5">
          {/* Loading */}
          {moviesLoading ||
            (trendingLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ))}

          {/* Error */}
          {(moviesError || trendingError) && (
            <Text className="text-white mt-5 text-center">
              Error: {moviesError?.message || trendingError?.message}
            </Text>
          )}

          {/* Movie list */}
          {!moviesLoading && !moviesError && movies && (
            <View className="flex-1 mt-5">
              {/* trending Movies Header */}
              {trendingMovies && trendingMovies.length > 0 && (
                <View className=" mt-10 ">
                  <Text className="text-lg font-bold text-white mb-3">
                    Trending Searches
                  </Text>
                </View>
              )}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className=" w-4" />}
                className=" mb-4 mt-3"
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingMovieCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />

              {/* Latest Movies Header */}
              <Text className="text-lg font-bold text-white mt-5 mb-3">
                Latest Movies
              </Text>

              {/* FlatList, never conditionally render a AltList */}
              <FlatList
                key={movies.length} // ensures FlatList remounts safely
                data={movies}
                renderItem={({ item }) => <MovieCard item={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className=" mt-2 pb-32"
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

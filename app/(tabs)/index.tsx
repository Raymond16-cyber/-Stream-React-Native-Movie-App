import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
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
        className=" flex-1 px-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="flex-1 px-5">
          {/* Logo */}
          <Image source={icons.logo} className="w-14 h-12 mt-20 mb-5 mx-auto" />

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
              {/* Search bar */}
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie..."
                value=""
              />

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
                renderItem={({ item, index }) => <TrendingMovieCard movie={item} index={index} />}
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

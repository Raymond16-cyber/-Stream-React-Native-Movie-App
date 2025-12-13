import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

type TrendingCardProps = {  
    movie: {
        title: string;
        poster_url: string;
        movie_id: number;
    };
    index: number;
}

const TrendingMovieCard = ({movie:{title,poster_url,movie_id},index}:TrendingCardProps) => {
  return (
     <Link
          href={`/movies/${movie_id}`}
          asChild
        >
          <TouchableOpacity className="w-32 relative pl-5">
            <Image
              source={{
                uri: poster_url
              }}
              className="w-32 h-48 rounded-lg"
              resizeMode="cover"
            />
    
            <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
              {title}
            </View>
    
    
        
          </TouchableOpacity>
        </Link>
  )
}

export default TrendingMovieCard
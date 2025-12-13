import { Account, Avatars, Client, ID, Query, Storage, TablesDB } from "appwrite";
import Constants from "expo-constants";


// Configuration from app.config.js
const APPWRITE_ENDPOINT = Constants.expoConfig?.extra?.appwriteEndpoint;
const APPWRITE_PROJECT_ID = Constants.expoConfig?.extra?.appwriteProjectId;
const APPWRITE_DATABASE_ID = Constants.expoConfig?.extra?.appwriteDatabaseId;
const APPWRITE_TABLE_ID = "metrics"


const client = new Client();

client
  .setEndpoint(APPWRITE_ENDPOINT!)     // Appwrite Cloud endpoint
  .setProject(APPWRITE_PROJECT_ID!)
 

export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
const tablesDB = new TablesDB(client);


export { client };


// track searches made by users
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await tablesDB.listRows({
      databaseId: APPWRITE_DATABASE_ID!,
      tableId: APPWRITE_TABLE_ID,
      queries: [Query.equal("movie_id", movie.id)],
    });

    if (result.rows.length > 0) {
      const existing = result.rows[0];

      await tablesDB.updateRow(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TABLE_ID,
        existing.$id,
        {
          count: existing.count + 1,
          searchTerm: query.trim(), // optional but useful
        }
      );

      console.log(`Updated count for ${existing.title}`);
    } else {
      await tablesDB.createRow({
        databaseId: APPWRITE_DATABASE_ID!,
        tableId: APPWRITE_TABLE_ID,
        rowId: ID.unique(),
        data: {
          movie_id: movie.id,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          count: 1,
          searchTerm: query.trim(),
        },
      });

      console.log(`Created metric for ${movie.title}`);
    }
  } catch (error) {
    console.error("updateSearchCount error", error);
}
};


export const getTrendingMovies = async(): Promise<TrendingMovie[] | undefined>=>{
    try {
    const result = await tablesDB.listRows({
      databaseId: APPWRITE_DATABASE_ID!,
      tableId: APPWRITE_TABLE_ID,
      queries: [
        Query.limit(5),
        Query.orderDesc("count")
        // this can be used on integered fields specified in Query.orderDesc() to get them in descending order and  Query.limit(5) only picks the first FIVE
    ],
    });
    console.log("resullts for trending movies",result)
    return result.rows as unknown as TrendingMovie[]

    } catch (error) {
        console.error("updateSearchCount error", error);
        return undefined
    }
}
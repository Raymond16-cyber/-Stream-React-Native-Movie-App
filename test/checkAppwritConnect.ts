import { account } from "../services/appwrite";

export const connectAnonymously = async () => {
  try {
    // This creates an anonymous session for the guest
    await account.createAnonymousSession();
    
    const user = await account.get(); 
    console.log("Connected as anonymous user:", user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log("Appwrite connection failed:", errorMessage);
  }
};


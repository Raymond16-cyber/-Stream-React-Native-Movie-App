// auth.ts
import { account } from "./appwrite";

export async function ensureSession() {
  try {
    // If this works, session already exists
    const session = await account.get();
    console.log("available session")
    return;
  } catch {
    // No session → create one
    const email = "uchennaraymond74@gmail.com"
    const password = "fxXdev@fort"
 const session = await account.createEmailPasswordSession(email,password);
 console.log("session created")
  }
}

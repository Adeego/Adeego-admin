import app from "../../firebaseConfig";
import { getMessaging } from "firebase/messaging";

// Messaging service
export const messaging = getMessaging(app);
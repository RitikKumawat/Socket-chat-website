import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyBXfNq-fBDOOBHTumwXsDzJB8JyoPEQjCc",
  authDomain: "notification-system-59649.firebaseapp.com",
  projectId: "notification-system-59649",
  storageBucket: "notification-system-59649.appspot.com",
  messagingSenderId: "313095838869",
  appId: "1:313095838869:web:edb1fa7df6a2a3862b4f9c",
  measurementId: "G-KWRC1NNLYB",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey:
          "BA9h8Jved5G_GtF4i2SURTxK7boj4LRkjenfCQzK6o6X5S7FXE3iVYi1JsVr8lAz2v6HmymkRHA9CxXxbAtqxXY",
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Customize notification here
});

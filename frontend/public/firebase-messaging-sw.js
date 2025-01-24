import { getMessaging } from "firebase/messaging";

importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBXfNq-fBDOOBHTumwXsDzJB8JyoPEQjCc",
  authDomain: "notification-system-59649.firebaseapp.com",
  projectId: "notification-system-59649",
  storageBucket: "notification-system-59649.appspot.com",
  messagingSenderId: "313095838869",
  appId: "1:313095838869:web:edb1fa7df6a2a3862b4f9c",
  measurementId: "G-KWRC1NNLYB",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "", // Add your app's icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

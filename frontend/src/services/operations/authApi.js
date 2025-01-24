import { toast } from "react-hot-toast";
import { endpoints } from "../apis";
import { apiconnector } from "../apiconnector";
import { setAuthUser, setLoading } from "../../slices/authSlice";
import { getToken, onMessage } from "firebase/messaging";
import { messaging, requestNotificationPermission } from "../firebase.config";
// import { messaging } from "../../../public/firebase-messaging-sw";

const { SIGNUP_API, LOGIN_API, LOGOUT_API } = endpoints;
function handleInputError({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
export function signUp(
  { fullName, username, password, confirmPassword, gender },
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    dispatch(setLoading(true));
    try {
      const response = await apiconnector("POST", SIGNUP_API, {
        fullName,
        username,
        password,
        confirmPassword,
        gender,
      });

      console.log("SIGNUP API RESPONSE...", response);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(response.data.data));
      dispatch(setAuthUser(response.data.data));
      navigate("/");
      dispatch(setLoading(false));
    } catch (error) {
      console.log("SIGNUP API ERROR", error);
    }
  };
}
function handleInputLogin({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted");
//       const token = getToken(messaging, {
//         vapidKey:
//           "BA9h8Jved5G_GtF4i2SURTxK7boj4LRkjenfCQzK6o6X5S7FXE3iVYi1JsVr8lAz2v6HmymkRHA9CxXxbAtqxXY",
//       });
//       console.log("TOken generated", token);
//     } else {
//       console.log("permission not granted");
//     }
//   });
// }
// const requestPermission = async () => {
//   try {
//     await Notification.requestPermission();
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BA9h8Jved5G_GtF4i2SURTxK7boj4LRkjenfCQzK6o6X5S7FXE3iVYi1JsVr8lAz2v6HmymkRHA9CxXxbAtqxXY",
//     });
//     console.log("FCM Token:", token);
//   } catch (error) {
//     console.error("Error getting token:", error);
//   }
// };
// onMessage(messaging, (payload) => {
//   console.log("Message received. ", payload);
//   // Show notification or handle the message as needed
// });
export function login({ username, password }, navigate) {
  return async (dispatch) => {
    const success = handleInputLogin({ username, password });
    if (!success) return;
    dispatch(setLoading(true));
    try {
      const res = await apiconnector("POST", LOGIN_API, { username, password });
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      console.log("RESPONSE LOGIN", res.data);
      console.log("TOKEN", res.data.token);
      await requestNotificationPermission();
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      dispatch(setAuthUser(res.data));
      navigate("/");
      // dispatch(setLoading(false));
    } catch (error) {
      toast.error(error.message);
      console.log("LOGIN API ERROR", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiconnector("POST", LOGOUT_API);
      console.log(res);
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      localStorage.removeItem("chat-user");
      dispatch(setAuthUser(null));
      navigate("/login");
      // dispatch(setLoading(false));
    } catch (error) {
      console.log("LOGOUT API ERROR", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

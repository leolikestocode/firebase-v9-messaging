import { getToken, getMessaging } from "firebase/messaging";
import localforage from "localforage";

const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },
  init: async function (app) {
    try {
      const tokenInLocalForage = await this.tokenInlocalforage();
      //if FCM token is already there just return the token
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }
      //requesting notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === "granted") {
        //getting token from FCM
        const messaging = getMessaging(app);

        const fcm_token = await getToken(messaging, {
          vapidKey:
            "BPHyWaQJLLH0oA72SNR-EuUPGj1oUrn2G0GRMaBK_nBOyfcNfKcMboMyiGB0RxX7sgQSydXfs-G2EIsYvEhj1IQ",
        }).then(a => console.log('token', a));
        if (fcm_token) {
          //setting FCM token in indexed db using localforage
          localforage.setItem("fcm_token", fcm_token);
          //return the FCM token after saving it
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
export { firebaseCloudMessaging };

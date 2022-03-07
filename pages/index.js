import React, { useEffect } from "react";

import { onMessage, getMessaging } from "firebase/messaging";
import { firebaseCloudMessaging } from "../helpers/webPush";
import { app } from "../firebase";

function App() {
  useEffect(() => {
    setToken();
    async function setToken() {
      try {
        console.log("primeiro");
        const token = await firebaseCloudMessaging.init(app);
        console.log("token", token);
        if (token) {
          console.log("entrou");
          const messaging = getMessaging(app);
          onMessage(messaging, (payload) =>
            console.log("foreground 1sa", payload)
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return <div>firebase 9</div>;
}
export default App;

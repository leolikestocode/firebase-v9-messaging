importScripts(
  "https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js"
);

// Reference: https://firebase.google.com/docs/cloud-messaging/js/receive

import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const messaging = getMessaging();
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

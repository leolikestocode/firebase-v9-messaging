importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

if (!firebase.apps.length) {
  firebase.initializeApp({
    // ...
  });
  const messaging = firebase.messaging();

  //background notifications will be received here
  messaging
    .setBackgroundMessageHandler((payload) =>
      console.log("aaaaa 2", payload)
    );

  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body."
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
const sw = "service-worker.js";
navigator.serviceWorker
  .register(sw)
  .then((registration) => {
    registration.onupdatefound = () => {
      if (registration.installing == null) {
        return;
      }
      registration.installing.onstatechange = () => {
        if (registration.installing.state === "installed") {
          if (navigator.serviceWorker.controller) {
            console.log(
              "SW installed."
            );
          } else {
            console.warn("Device is offline.");
          }
        }
      };
    };
  })
  .catch((error) => {
    console.error("SWreg Error:", error);
  });

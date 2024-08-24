// myapp.js

const manifestUri =
  "https://org-007-jc.jiotv.com/DASH/9707eff1a2e44a65bdc56a9df38e2a82/1723862351/baseline-std-v4/1556784378_WWE_SD_MULTI_HLS_17082024_eng_baseline-800300010.mpd?contentId=1000286585&cpCustomerId=2408160919156963323&deviceId=1234&partner=JIOTVVOD&partnerId=1556784491&platform=ANDROID_PHONE&user-agent=jiotv&sku_name=Jiotv_feed_to_vod&__hdnea__=st=1724479538~exp=1724483138~acl=/DASH/9707eff1a2e44a65bdc56a9df38e2a82/1723862351/baseline-std-v4/*~hmac=8ce9ad2e1da68002b77cb7c6b7b064eb9abd09a28b2c89027a807147ec103e2d";
const licenseServer =
  "https://wv.service.expressplay.com/hms/wv/rights/?ExpressPlayToken=BwA2T1gfKdEAJDFhZWU2MmNiLTA2YzQtNDFmZC1iZjdkLWRhZDg2NWFlNWNmYwAAAIAs76pksXFsyiZzXsw8D2-Gonl7hJAMhj5HSwhdZZIRz_bwnweIoo3lYnEaw4583fIQ4w19emywE-WM9qFYqjUPwSH-Yt8dME2x8aJTw8d0iAGJZpqG5PzQEJmjYPXXEgqCSnxZM1A-x7gzLUw8z-z9aaYLNQWTFuBxe7Gf5XwX7-zIiw4JawUGQCuaiu5siUmvaIti";

// Add your DRM server URLs and configuration here
const drmConfiguration = {
  drm: {
    servers: {
      "com.widevine.alpha": licenseServer,
    },
  },
};

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error("Browser not supported!");
  }
}

async function initPlayer() {
  // Create a Player instance.
  const video = document.getElementById("video");
  const player = new shaka.Player(video);

  // Apply DRM configuration
  player.configure(drmConfiguration);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener("error", onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(manifestUri);
    // This runs if the asynchronous load is successful.
    console.log("The video has now been loaded!");
  } catch (e) {
    // onError is executed if the asynchronous load fails.
    onError(e);
  }
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error("Error code", error.code, "object", error);
}

document.addEventListener("DOMContentLoaded", initApp);

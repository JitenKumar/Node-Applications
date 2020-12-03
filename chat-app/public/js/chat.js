const socket = io();
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("#text-message");
const $messageFormButton = $messageForm.querySelector("#send-message");
const $messageFormShareButton = $messageForm.querySelector("#share-location");
const messageTemplate = document.querySelector("#message-template").innerHTML;
const $messages = document.querySelector("#chat-messages");
socket.on("welcomeMessage", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $messageFormButton.setAttribute("disabled", "disabled");
  let message = e.target.elements.message.value;
  socket.emit("messageFromClient", message, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log();
  });
});

socket.on("newMessage", (message) => {
  console.log(message);
});

$messageFormShareButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by this browser");
  }
  $messageFormShareButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (error) => {
        $messageFormShareButton.removeAttribute("disabled");
        if (error) {
          return console.log("Location Not shared to users");
        }
        console.log("Location shared to users");
      }
    );
  });
});

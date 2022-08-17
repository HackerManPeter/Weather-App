async function getData(location, messageOne, messageTwo) {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const response = await fetch(`/weather?address=${location}`);
  const data = await response.json();
  if (data.error) return (messageOne.textContent = data.error);
  messageOne.textContent = data.location;
  messageTwo.textContent = data.forecast;
}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  getData(location, messageOne, messageTwo);
});

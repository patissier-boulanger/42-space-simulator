import * as THREE from "three";
const introPage = document.querySelector(".intro");
const introPageText = document.querySelector(".intro-text");
const counter = document.querySelector(".counter");
const caption = document.querySelector(".caption");
const canvas = document.querySelector("canvas.webgl");

const loadingManager = new THREE.LoadingManager();

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

loadingManager.onLoad = async () => {
  await pause(3000);
  introPageText.innerHTML = "I am pretty much fucked";
  await pause(3000);
  introPageText.innerHTML = "Left alone in the space";
  await pause(3000);
  introPageText.innerHTML = "Time left... 42 minute";
  await pause(3000);
  introPage.classList.toggle("hidden");
  counter.classList.toggle("hidden");
  caption.classList.toggle("hidden");
  canvas.classList.toggle("hidden");
};

loadingManager.onProgress = async function (url, itemsLoaded, itemsTotal) {
  console.log(`Items loaded: ${itemsLoaded}/${itemsTotal}`);
  introPageText.innerHTML = "20XX/05/17";
};

loadingManager.onError = function (url) {
  console.error("There was an error loading " + url);
};

export { loadingManager };

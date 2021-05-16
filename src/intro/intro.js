import * as THREE from "three";
const introPage = document.querySelector(".intro");
const introPageText = document.querySelector(".intro-text");
const counter = document.querySelector(".counter");
const canvas = document.querySelector("canvas.webgl");

const loadingManager = new THREE.LoadingManager();

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

loadingManager.onLoad = async () => {
  console.log("Loading complete!");
  await pause(2000);
  introPageText.innerHTML = "Left alone in the space";
  await pause(2000);
  introPageText.innerHTML = "Time left...";
  await pause(2000);
  introPageText.innerHTML = "42 minute";
  await pause(3000);
  introPage.classList.toggle("hidden");
  counter.classList.toggle("hidden");
  canvas.classList.toggle("hidden");
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log(`Items loaded: ${itemsLoaded}/${itemsTotal}`);
  introPageText.innerHTML = "I am pretty much fucked";
};

loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};

console.log();

export { loadingManager };

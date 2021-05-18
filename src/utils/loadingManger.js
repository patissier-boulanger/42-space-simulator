import * as THREE from "three";
import { autorun } from "mobx";

import { counterStore } from "../store/counterStore";
import { captionStore } from "../store/captionStore";

const introPage = document.querySelector(".intro");
const introPageText = document.querySelector(".intro-text");
const counter = document.querySelector(".counter");
const caption = document.querySelector(".caption");
const canvas = document.querySelector("canvas.webgl");

const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = async () => {
  autorun(() => {
    introPageText.innerHTML = captionStore.currentCaption;
  });

  // autorun(() => {
  //   counter.innerHTML = counterStore.count;
  // });

  await captionStore.showOpeningScript();

  introPage.classList.toggle("hidden");
  counter.classList.toggle("hidden");
  caption.classList.toggle("hidden");
  canvas.classList.toggle("hidden");

  counterStore.step();
};

loadingManager.onProgress = async function (url, itemsLoaded, itemsTotal) {
  console.log(`Items loaded: ${itemsLoaded}/${itemsTotal}`);
  introPageText.innerHTML = "20XX/05/17";
};

loadingManager.onError = function (url) {
  console.error("There was an error loading " + url);
};

export { loadingManager };

import { observable, action, makeObservable } from "mobx";
const caption = document.querySelector(".caption");

class CaptionStore {
  constructor() {
    this.currentCaption = "";
    makeObservable(this, {
      currentCaption: observable,
      showOpeningScript: action,
      showCounterScript: action,
      clearCaption: action,
      changeCaption: action,
      pause: action,
    });
  }

  async showOpeningScript() {
    await this.pause(3000);
    this.changeCaption("I am pretty much fucked");
    await this.pause(3000);
    this.changeCaption("Left alone in the space");
    await this.pause(3000);
    this.changeCaption("Time left... 42 minute");
    await this.pause(3000);
  }

  changeCaption(caption) {
    this.currentCaption = caption;
  }

  async showCounterScript(count) {
    switch (count) {
      case 40:
        this.changeCaption("So this is the end.");
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";

        break;

      case 36:
        this.changeCaption("Far from home.");
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";
        break;

      case 30:
        this.changeCaption("Maybe i should stay at home.");
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";
        break;

      case 25:
        this.changeCaption("Or maybe i should't buy those doge coin");
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";
        break;

      case 10:
        this.changeCaption("I'm getting cold. ");
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";
        break;

      case 1:
        this.changeCaption("Time to go");
        caption.innerHTML = this.currentCaption;
        await this.pause(1000);
        caption.innerHTML = "";
        break;
    }
  }

  clearCaption() {
    this.currentCaption = "";
  }

  pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

const captionStore = new CaptionStore();

export { captionStore };

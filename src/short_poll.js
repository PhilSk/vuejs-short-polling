import { increment, get } from "./api";
import { EventBus } from "./event-bus.js";

let INTERVAL_ID;

export function startShortpolling() {
  EventBus.$emit("start_shortpolling", 0);
  let cached_counter = 0;
  get()
    .then(counter => {
      EventBus.$emit("counter_incremented", counter);
    })
    .catch(e => {
      console.log(error);
    });
  INTERVAL_ID = setInterval(function() {
    get()
      .then(counter => {
        if (cached_counter !== counter) {
          EventBus.$emit("counter_incremented", counter);
        }
      })
      .catch(e => {
        console.log(error);
      });
  }, 1000);
}

export function stopShortpolling() {
  clearInterval(INTERVAL_ID);
  EventBus.$emit("stop_shortpolling", 0);
}

import { increment, get } from "./api";
import { EventBus } from "./event-bus.js";
import {
  START_SHORTPOLLING,
  STOP_SHORTPOLLING,
  COUNTER_INCREMENTED
} from "./bus-events.js";

let INTERVAL_ID;

export function startShortpolling() {
  EventBus.$emit(START_SHORTPOLLING, 0);
  let cached_counter = 0;
  get()
    .then(counter => {
      EventBus.$emit(COUNTER_INCREMENTED, counter);
    })
    .catch(e => {
      console.log(error);
    });
  INTERVAL_ID = setInterval(function() {
    get()
      .then(counter => {
        if (cached_counter !== counter) {
          EventBus.$emit(COUNTER_INCREMENTED, counter);
        }
      })
      .catch(e => {
        console.log(error);
      });
  }, 1000);
}

export function stopShortpolling() {
  clearInterval(INTERVAL_ID);
  EventBus.$emit(STOP_SHORTPOLLING, 0);
}

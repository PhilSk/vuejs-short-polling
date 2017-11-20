const COUNTER = 'counter';

const randomBetween = (a,b) => Math.floor(Math.random() * b) + a;

export function get() {
  return Promise.resolve(localStorage.getItem(COUNTER))
}

export function increment() {
  setTimeout(function() {
    const value = Number(localStorage.getItem(COUNTER) || 0);
    localStorage.setItem(COUNTER, value + 1);
  }, randomBetween(3,5) * 1000);

  return Promise.resolve('ok');
}


export default {};

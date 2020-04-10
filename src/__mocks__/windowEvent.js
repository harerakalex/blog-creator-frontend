const map = {};
window.document.addEventListener = jest.fn((event, callback) => {
  map[event] = callback;
});
window.addEventListener = jest.fn((event, callback) => {
  map[event] = callback;
});

const event = jest.fn(e => map[e.name](e));
export const document = { event };
export default { ...document, document };

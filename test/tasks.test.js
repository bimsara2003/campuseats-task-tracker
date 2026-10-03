const test = require("node:test");
const assert = require("node:assert/strict");
const { tasks, calculateTotal } = require("../src/tasks");

test("initial task list has three nonempty items", () => {
  assert.equal(tasks.length, 3);
  assert.ok(tasks.every(task => typeof task === "string" && task.length > 0));
});
test("regular customer pays full subtotal", () => {
  assert.equal(calculateTotal(100, 2, "regular"), 200);
});
test("VIP customer receives ten percent discount", () => {
  assert.equal(calculateTotal(100, 2, "vip"), 180);
});
test("customer type comparison is case sensitive", () => {
  assert.equal(calculateTotal(100, 2, "VIP"), 200);
});
test("zero price and quantity are accepted", () => {
  assert.equal(calculateTotal(0, 2, "vip"), 0);
  assert.equal(calculateTotal(100, 0, "regular"), 0);
});
for (const [name, price, quantity] of [
  ["negative price", -1, 2], ["negative quantity", 1, -2],
  ["string price", "100", 2], ["string quantity", 100, "2"],
  ["NaN price", NaN, 2], ["infinite quantity", 100, Infinity],
  ["missing price", undefined, 2], ["overflow", Number.MAX_VALUE, 2],
]) {
  test(`rejects ${name}`, () => {
    assert.throws(() => calculateTotal(price, quantity, "regular"));
  });
}

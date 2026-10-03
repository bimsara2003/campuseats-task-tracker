// CampusEats task list and order total calculation
const tasks = [
  "Design the menu screen",
  "Build the orders API",
  "Add user login",
];
const VIP_DISCOUNT = 0.1;

function calculateTotal(price, quantity, customerType) {
  if (!Number.isFinite(price) || !Number.isFinite(quantity)) {
    throw new TypeError("price and quantity must be finite numbers");
  }
  if (price < 0 || quantity < 0) {
    throw new RangeError("price and quantity must be >= 0");
  }
  const subtotal = price * quantity;
  if (!Number.isFinite(subtotal)) {
    throw new RangeError("total must be finite");
  }
  return customerType === "vip"
    ? subtotal * (1 - VIP_DISCOUNT)
    : subtotal;
}

// Read API keys from process.env.API_KEY; never hardcode or log secrets.
if (require.main === module) {
  console.log(`CampusEats has ${tasks.length} open tasks`);
}
module.exports = { tasks, VIP_DISCOUNT, calculateTotal };

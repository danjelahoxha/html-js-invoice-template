export function calculateTotal(rows) {
    return rows.reduce((total, product) => total + product.unit * product.price, 0);
  }
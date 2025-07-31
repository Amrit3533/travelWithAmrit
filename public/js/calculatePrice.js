function calculatePrice(oldPrice, elementId) {
    const newPrice = (oldPrice * 1.18).toFixed(2);
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = Number(newPrice).toLocaleString("en-IN");
    }
  }
  
  window.calculatePrice = calculatePrice;
  
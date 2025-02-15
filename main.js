document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const orderType = params.get("orderType");
    document.getElementById("orderTypeTitle").textContent = `주문 유형: ${orderType}`;

    document.getElementById("orderForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const menu = document.getElementById("menu").value;
        const quantity = document.getElementById("quantity").value;
        alert(`주문 완료!\\n주문 유형: ${orderType}\\n메뉴: ${menu}\\n수량: ${quantity}`);
    });
});

let orders = {};

function addToOrder(item, price) {
    if (orders[item]) {
        orders[item].quantity++;
    } else {
        orders[item] = { price: price, quantity: 1 };
    }
    renderOrder();
}

function updateQuantity(item, delta) {
    if (orders[item]) {
        orders[item].quantity += delta;
        if (orders[item].quantity <= 0) {
            delete orders[item];
        }
        renderOrder();
    }
}

function renderOrder() {
    let orderList = document.getElementById('orderList');
    let totalPrice = document.getElementById('totalPrice');
    orderList.innerHTML = '';
    let total = 0;

    for (let item in orders) {
        let order = orders[item];
        total += order.price * order.quantity;
        orderList.innerHTML += `
                    <div class="order-item">
                        ${item} x${order.quantity} 
                        <button onclick="updateQuantity('${item}', 1)">+</button>
                        <button onclick="updateQuantity('${item}', -1)">-</button>
                    </div>
                `;
    }
    totalPrice.textContent = `총 가격: ${total}원`;
}
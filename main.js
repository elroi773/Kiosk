document.addEventListener("DOMContentLoaded", function () {
    fetch('http://localhost:3000/menu') // 서버에서 메뉴 데이터 가져오기
        .then(response => response.json())
        .then(data => {
            let menuContainer = document.querySelector('.menu');
            menuContainer.innerHTML = ''; // 기존 메뉴 초기화

            data.forEach(item => {
                let button = document.createElement('button');
                button.textContent = `${item.name} (${item.price}원)`;
                button.onclick = () => addToOrder(item.name, item.price);
                menuContainer.appendChild(button);
            });

            // 주문 내역이 있으면 불러오기
            loadOrders();
        })
        .catch(error => console.error("메뉴 데이터를 불러오는 중 오류 발생:", error));
});

let orders = {};

// ✅ 주문 내역을 localStorage에 저장
function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

// ✅ localStorage에서 주문 내역 불러오기
function loadOrders() {
    let storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
        orders = JSON.parse(storedOrders);
        renderOrder();
    }
}

function addToOrder(item, price) {
    if (orders[item]) {
        orders[item].quantity++;
    } else {
        orders[item] = { price: price, quantity: 1 };
    }
    saveOrders(); // 주문 내역 저장
    renderOrder();
}

function updateQuantity(item, delta) {
    if (orders[item]) {
        orders[item].quantity += delta;
        if (orders[item].quantity <= 0) {
            delete orders[item];
        }
        saveOrders(); // 변경된 주문 내역 저장
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
                ${item} (${order.price}원) x${order.quantity} 
                <button onclick="updateQuantity('${item}', 1)">+</button>
                <button onclick="updateQuantity('${item}', -1)">-</button>
            </div>
        `;
    }
    totalPrice.textContent = `총 가격: ${total}원`;
}

document.addEventListener("DOMContentLoaded", function () {
    let orderDetails = "";
    let storedOrders = localStorage.getItem("orders");

    if (storedOrders) {
        let orders = JSON.parse(storedOrders);
        for (let item in orders) {
            let order = orders[item];
            orderDetails += `<p>${item} (${order.price}원) x ${order.quantity}</p>`;
        }
    }

    document.getElementById("orderSummary").innerHTML = orderDetails;
});

function goToPayment() {
    let queryParams = new URLSearchParams();
    for (let item in orders) {
        queryParams.append("item", item);
        queryParams.append("price", orders[item].price);
        queryParams.append("quantity", orders[item].quantity);
    }
    window.location.href = `pay.html?${queryParams.toString()}`;
}

document.addEventListener("DOMContentLoaded", function () {
    let orderDetails = "";
    let total = 0;
    let storedOrders = localStorage.getItem("orders");

    if (storedOrders) {
        let orders = JSON.parse(storedOrders);
        for (let item in orders) {
            let order = orders[item];
            total += order.price * order.quantity;
            orderDetails += `<p>${item} (${order.price}원) x ${order.quantity}</p>`;
        }
    }

    document.getElementById("orderSummary").innerHTML = orderDetails;
    document.getElementById("totalAmount").textContent = `총 가격: ${total}원`;
});

// ✅ 결제 완료 후 주문 내역 초기화
function completePayment() {
    alert("결제가 완료되었습니다!");
    localStorage.removeItem("orders"); // 주문 내역 초기화
    window.location.href = "index.html"; // 메인 페이지로 이동
}

// ✅ 뒤로 가기 기능
function goBack() {
    window.history.back();
}

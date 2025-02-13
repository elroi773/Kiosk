document.addEventListener("DOMContentLoaded", function() {
    const togoButton = document.getElementById("togo");
    const tohereButton = document.getElementById("tohere");
    
    togoButton.addEventListener("click", function() {
        navigateToOrder("포장");
    });
    
    tohereButton.addEventListener("click", function() {
        navigateToOrder("매장" );
    });
});

function navigateToOrder(type) {
    window.location.href = `main.html?orderType=${type}`;
}

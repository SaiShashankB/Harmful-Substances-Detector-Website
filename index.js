const elements = document.querySelectorAll(".glowing");
elements.forEach((element) => {
  element.style.animationDelay = `${Math.random() * 2}s`;
});

window.addEventListener("DOMContentLoaded", () => {
  let x = document.querySelector('input[type="text"]');
  x.addEventListener("focusin", myFocusFunction);
  x.addEventListener("focusout", myBlurFunction);
  function myFocusFunction() {
    document.getElementById("product-box").style.backgroundColor = "lightblue";
  }
  function myBlurFunction() {
    document.getElementById("product-box").style.backgroundColor = "";
  }
});

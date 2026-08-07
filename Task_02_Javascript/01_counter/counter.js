let count = 0;

document.getElementById("DecBtn").onclick = function () {
  count -= 1;
  document.getElementById("countLabel").innerHTML = count;
};
document.getElementById("ResetBtn").onclick = function () {
  count = 0;
  document.getElementById("countLabel").innerHTML = count;
};
document.getElementById("IncBtn").onclick = function () {
  count += 1;
  document.getElementById("countLabel").innerHTML = count;
};

let isOpen = (bln, id) => {
  let el;
  if (bln) {
    el = document.getElementById(id).className = "drop open";
  } else {
    el = document.getElementById(id).className = "drop";
  }
};

let errorMsg = (el, msg) => {
  removeSelection(el);
  document.getElementById("error").textContent = msg;
  $("#error").slideDown();
};

let parseBoolean = val => {
  if (val) {
    val = val.toLowerCase();
  }
  let bool = val == "true" ? true : false;
  return bool;
};

let getSiblings = elem => {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;
  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType !== 1 || sibling === elem) continue;
    siblings.push(sibling);
  }
  return siblings;
};

let calculateSelectedPrices = () => {
  let els = document.getElementsByClassName("option-item");
  let price = 0.0;
  let activePrice = 0.0;
  for (let i = 0; i < els.length; i++) {
    let el = els[i];
    let isElActive = el.dataset["active"];
    isElActive = parseBoolean(isElActive);
    if (isElActive) {
      price = el.dataset["price"];
      activePrice = parseFloat(activePrice) + parseFloat(price);
      price = parseFloat(price);
      let sibs = getSiblings(el);
      for (let a = 0; a < sibs.length; a++) {
        let sib = sibs[a];
        let sibPrice = sib.dataset["price"];
        sibPrice = parseFloat(sibPrice);
        let adjustedPrice = 0.0;
        if (sibPrice > 0) {
          if (sibPrice > price) {
            adjustedPrice = sibPrice - price;
            let action = "plus";
            adjustSiblingPrices(sib, adjustedPrice, action);
          } else {
            adjustedPrice = price - sibPrice;
            let action = "minus";
            adjustSiblingPrices(sib, adjustedPrice, action);
          }
        }
      }
    }
  };
  document.getElementById("currentPrice").textContent =
    "$" + String(activePrice.toFixed(2));
};

let adjustSiblingPrices = (el, amount, action) => {
  amount = amount.toFixed(2);
  let priceEl = el.firstElementChild.nextElementSibling.nextElementSibling;

  if (action === "plus") {
    if (priceEl) {
      el.firstElementChild.nextElementSibling.nextElementSibling.innerHTML =
        "+$" + String(amount);
    }
  } else {
    if (priceEl) {
      el.firstElementChild.nextElementSibling.nextElementSibling.innerHTML =
        "-$" + String(amount);
    }
  }
};

let removeActiveSelection = el => {
  el.dataset["active"] = "false";
  let price = el.dataset["price"];
  if(el.dataset['description'] === 'select'){
  } else {
  let priceEl = el.firstElementChild.nextElementSibling.nextElementSibling;
    if (priceEl) {
      el.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = "+$" + String(price);
    }
  }
};

let loadDefaultRequiredOptions = () => {
  let els = document.getElementsByClassName("po-options--list");

  for (let i = 0; i < els.length; i++) {
    let el = els[i];
    let optionRequired = el.dataset["optionRequired"];

    optionRequired = parseBoolean(optionRequired);

    if (optionRequired) {
      let defaultOption = el.firstElementChild;
      let id = defaultOption.id;
      setSelectedOption(id);
    }
  }
  calculateSelectedPrices();
};

let setSelectedOption = id => {
  let el = document.getElementById(id);
  //console.log(el);
  el.dataset["active"] = true;

  let placeholder =
    el.parentElement.parentElement.previousElementSibling.firstElementChild;
  
  if (el.dataset["description"] === "select") {
    el.innerHTML = '<span>Please select</span>'
    let htmlData = el.innerHTML;
    
    placeholder.innerHTML = htmlData;g
    placeholder.dataset["status"] = "";
    placeholder.parentElement.classList.remove('selected');
  } else {
    let parentEl = el.parentElement;

    if(parentEl.dataset['optionRequired'] === 'false'){
      let pleaseSelect = parentEl.firstElementChild;
      pleaseSelect.innerHTML = '<span>Remove selection</span>'
    }

    let priceEl = el.firstElementChild.nextElementSibling.nextElementSibling;

    if (priceEl) {
      el.firstElementChild.nextElementSibling.nextElementSibling.innerHTML =
        "<i style='font-style: italic; font-size: 13px;'>included in price</i>";
    }

    // let htmlData = el.firstElementChild.getAttribute('src');
    
    // placeholder.innerHTML = placeholderImg + '<strong>' + el.dataset['description'] + '</strong>';
    // placeholder.firstElementChild.setAttribute('src', htmlData);

    let htmlData = el.innerHTML;
    
    placeholder.innerHTML = htmlData;
    placeholder.dataset["status"] = "selected";
    placeholder.parentElement.classList.add("selected");
  }
};

let selectBoxClickEvent = () => {
  let els = document.getElementsByClassName("drop");
  for (let i = 0; i < els.length; i++) {
    let el = els[i];
    el.addEventListener(
      "click",
      function() {
        let classVal = el.className;
        if (classVal === "drop") {
          isOpen(true, els[i].id);
        } else {
          isOpen(false, els[i].id);
        }
        event.stopPropagation();
      },
      false
    );
  }
};

let optionSelectedClickEvent = () => {
  let els = document.getElementsByClassName("option-item");
  for (let i = 0; i < els.length; i++) {
    let el = els[i];
    el.addEventListener("click", function() {
      el.dataset["active"] = "true";
      let id = el.id;
      let sibs = getSiblings(el);
      for (let a = 0; a < sibs.length; a++) {
        let sib = sibs[a];
        let isSibActive = sib.dataset["active"];
        isSibActive = parseBoolean(isSibActive);
        if (isSibActive) {
          removeActiveSelection(sib);
        }
      }
      //removeActiveSelection(sibs);
      //console.log(id);
      setSelectedOption(id);
      calculateSelectedPrices();
    });
  }
};

// logic will not execute if boolKitBuilder is not located on page.
let bKit;
if (document.getElementById("boolKitBuilder")) {
  bKit = document.getElementById("boolKitBuilder").value.toLowerCase();
}

bKit = parseBoolean(bKit);

if (bKit) {
  selectBoxClickEvent();
  optionSelectedClickEvent();
  loadDefaultRequiredOptions();
}

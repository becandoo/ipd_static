//import $ from 'jquery';

//import utility functions
//import { isOpen, removeSelection, errorMsg } from "./utilities";

$('#selectProductOptions').click(function(){
  if($(this).hasClass('open')) {
    $(this).removeClass('open');
    $('#optionsCell').slideUp();
  }else {
    $(this).addClass('open');
    $('#optionsCell').slideDown(); 
  }
  
});

$('.view-link').click(function() {
  let id = $(this).attr('id');
  alert(id);
});

let isOpen = (bln, id) => {
  let el;
  if (bln) {
    el = document.getElementById(id).className = "drop open";
  } else {
    el = document.getElementById(id).className = "drop";
  }
};

//remove selected item
let removeSelection = (el, id) => {
  el.innerText = "Please make a selection";
  el.className = "placeholder";
  //id of element to hide
  $("#" + id).slideUp();
};

let errorMsg = (el, msg) => {
  removeSelection(el);
  document.getElementById("error").innerText = msg;
  $("#error").slideDown();
};

let showOptions = () => {
  $("#qualityLevel").slideDown();
  $("#requiredOptions").slideDown();
  $("#optionalOptions").slideDown();
};

let getSiblings = (elem) => {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if (sibling.nodeType !== 1 || sibling === elem) continue;
		siblings.push(sibling);
	}
	return siblings;
}

// let adjustPrice = amount => {
//   //console.log(amount);
//   if(amount){
//     amount = parseFloat(amount);
//   } else{
//     amount = 0.00
//   }
//   let originalPrice = document.getElementById("originalPrice").value;

//   let selectedOptions = document.getElementsByClassName("selected");
//   for (let i = 0; i < selectedOptions.length; i++) {
//     //console.log(selectedOptions[i]);
//   }
  
//   //amount = parseFloat(amount);
 
//   //console.log(typeof amount +  ': ' + amount);
//   originalPrice = originalPrice.replace(/\$/g, "");
//   originalPrice = parseFloat(originalPrice);
  
//   //console.log(typeof originalPrice  +  ': ' + originalPrice);
//   let newPrice = originalPrice + amount;
//   //console.log(newPrice);
//   //console.log(newPrice);

//   document.getElementById("currentPrice").innerText = "$" + newPrice.toFixed(2);
// };

let adjustPrice = () =>{
  let optionPrices = document.getElementsByClassName('option-price selected');

  let basePrice = document.getElementById("originalPrice").value;

  basePrice = parseFloat(basePrice);

  let prices = 0.00;
  
  for(let i=0; i<optionPrices.length; i++){
    if(optionPrices){
      prices = parseFloat(prices) + parseFloat(optionPrices[i].value);
    } 
  }
  document.getElementById("currentPrice").innerText = "$" + prices.toFixed(2);
}

let selectorClickEvent = () => {
  let els = document.getElementsByClassName("drop");
  
  for (let i = 0; i < els.length; i++) {
    //console.log(els[i]);
    let parentElement = els[i].parentElement.parentElement
    //console.log(parentElement);
    let sibs = getSiblings(parentElement);
    els[i].addEventListener("click", function() {
      for(let a=0; a<sibs.length; a++){
        if(sibs[a].tagName == 'DIV'){
          let dropEl = sibs[a].firstElementChild;
          dropEl = dropEl.children[1];
          if(dropEl.className == 'drop open'){
            dropEl.className = 'drop';
          }
        }
      }
      let classVal = this.className;
      if (classVal === "drop") {
        isOpen(true, els[i].id);
      } else {
        isOpen(false, els[i].id);
      }
      event.stopPropagation();
    }, false);
  }
};

let loadDefaultOptions = () => {
  let optionsList = document.getElementsByClassName('po-options--list');
  let selectedId;
  let defaultOption;
   for(let i=0; i<optionsList.length; i++){
     //console.log(optionsList[i]);
     let placeHolderEl = optionsList[i]
                         .parentElement
                         .previousElementSibling
                         .firstElementChild;
     //console.log(placeHolderEl);
     let defaultOption = optionsList[i].firstElementChild;
     //console.log(defaultOption);
     
     let selectedId = defaultOption.firstElementChild.id;

     defaultOption = defaultOption.firstElementChild.value;
     //console.log(defaultOption);
     let selectedInput = document.getElementById(selectedId);
     //console.log(selectedInput.id);
     let id = selectedInput.id;
     let sku = id.replace(/^(opt_)/,"");
     //console.log(sku);
     if (selectedInput.classList == 'default-option option-item required'){
       let elem = optionsList[i].firstElementChild;
       //console.log(elem);
       let sibs = getSiblings(elem);
             //sets the selected option to the appropriate sku
      for(let b=0; b<sibs.length; b++){
        if(sibs[b]. firstElementChild.className == 'selected-option'){
          sibs[b].firstElementChild.value = sku;
          //console.log(sibs[b]. firstElementChild);
          //console.log(sibs[b].firstElementChild.value);
        }
      }
        // set hidden input for selected option in var.
        //console.log(selectedInput);
        let selectedPriceInput =
        selectedInput
        .nextElementSibling
        .children[1];
        //console.log(selectedPriceInput);
        selectedPriceInput.classList = 'option-price selected';        
        selectedInput = selectedInput.parentElement.nextElementSibling;        
        let selectedArr = selectedId.split("opt_");
        selectedId = selectedArr[1];
        //console.log(selectedId);
        placeHolderEl.classList = 'selected';
        placeHolderEl.innerHTML = defaultOption;
     } else {
      placeHolderEl.classList = 'placeholder';
       placeHolderEl.innerHTML = 'Please select';
     }

   }
}

let optionSelectedClickEvent = () => {
  let closeId;
  // create array of option items
  let optionItems = document.getElementsByClassName("option-item");

  for (let i = 0; i < optionItems.length; i++) {
    let parentEl = optionItems[i].parentElement.parentElement;

    optionItems[i].addEventListener("click", function() {
      //get id of current element
      let id = this.id;
      let elem = document.getElementById(this.id).parentElement;
      //console.log(id);
      let sku = id.replace(/^(opt_)/,"");
      //console.log(sku);
      // get hidden input for selected option description
      let val = document.getElementById(id).nextElementSibling;
      //get selected element siblins
      let sibs = getSiblings(elem);
      //if siblings exist, remove .selected class from hidden price input
      if(sibs.length > 0) {        
       for(let a=0; a<sibs.length; a++){
         
         let childEl = sibs[a].children[1];
         if(childEl) {
          let nextChildEl = childEl.children[1];
          nextChildEl.classList = 'option-price';
         }
       }
      }
      //sets the selected option to the appropriate sku
      for(let b=0; b<sibs.length; b++){
        if(sibs[b]. firstElementChild.className == 'selected-option'){
          sibs[b].firstElementChild.value = sku;
          //console.log(sibs[b]. firstElementChild);
          //console.log(sibs[b].firstElementChild.value);
        }
      }

      // set hidden input for selected option in var.
      let selectedPriceInput =
      val
      .firstElementChild
      .nextElementSibling;

      selectedPriceInput.classList = 'option-price selected';

      //console.log(selectedPriceInput);
      
      val = val.innerText;

      let placeholder = document.getElementById(this.id).parentElement
        .parentElement.parentElement.previousElementSibling.firstElementChild;

      placeholder.className = "selected";
      placeholder.innerHTML = val;

      let classVal = placeholder.parentElement.parentElement.className;

      let dropId = placeholder.parentElement.parentElement.id;

      if (classVal === "drop") {
        isOpen(true, dropId);
      } else {
        isOpen(false, dropId);
      }

      let optionPrices = document.getElementsByClassName('option-price selected');

      let originalPrice = document.getElementById("originalPrice").value;

      originalPrice = parseFloat(originalPrice);
      //console.log(originalPrice);
    
      let prices = 0.00;
      
      for(let i=0; i<optionPrices.length; i++){
        if(optionPrices){
          prices = parseFloat(prices) + parseFloat(optionPrices[i].value);
        }   
      }    
      //console.log(prices);
      adjustPrice();
      showOptions();
    });
  }
};

loadDefaultOptions();
optionSelectedClickEvent();
selectorClickEvent();


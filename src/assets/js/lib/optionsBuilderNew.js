
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
  }
  
  //remove selected item
  let removeSelection = (el, id) => {
    el.textContent = "Please make a selection";
    el.className = "placeholder";
    //id of element to hide
    $("#" + id).slideUp();
  }
  
  let errorMsg = (el, msg) => {
    removeSelection(el);
    document.getElementById("error").textContent = msg;
    $("#error").slideDown();
  }
    
  let getSiblings = (elem) => {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if (sibling.nodeType !== 1 || sibling === elem) continue;
		siblings.push(sibling);
	}
	return siblings;
}

let selectorClickEvent = () => {
    let els = document.getElementsByClassName("drop");
    //console.log(els);    
    for (let i = 0; i < els.length; i++) {
      els[i].addEventListener("click", function() {
        let classVal = this.className;
        if (classVal === "drop") {
          isOpen(true, els[i].id);
        } else {
          isOpen(false, els[i].id);
        }
        event.stopPropagation();
      }, false);
    }
  }

  let setBasePrice = () => {
    let els = document.getElementsByClassName('default-option');
    let price = 0.00;
    let newPrice = 0.00;

    if(els.length != 0){
      for(let i=0; i<els.length; i++){
        console.log(els[i]);
        let el = els[i];
        let priceEl = el
        .firstElementChild
        .nextElementSibling;
        price = priceEl.textContent;
        price = price.replace('$', '');
        if(price){
            newPrice = parseFloat(price) + parseFloat(newPrice);
        } else {
            price = 0.00;
        }        
    }
    document.getElementById('currentPrice').textContent = newPrice.toFixed(2);      
    }
  }

  let adjustPrices = () => {    
    let els = document.getElementsByClassName('active'); 
    for(let i=0; i<els.length; i++){
      let id = els[i].id;
      let currentSelectedOption = document.getElementById(id);

      
      let currentSelectedPriceElement = currentSelectedOption
                                        .firstElementChild
                                        .nextElementSibling;           

      let currentSelectedPrice = currentSelectedPriceElement.textContent;
      currentSelectedPrice = parseFloat(currentSelectedPrice.replace('+$',''));
      console.log(currentSelectedPrice)
      let elem = document.getElementById(id);
      let sibs = getSiblings(elem);
      for(let a=0; a<sibs.length;a++){
        let sib = document.getElementById(sibs[a].id);
        let priceElement = sib
                          .firstElementChild
                          .nextElementSibling;

        // used to hold newPrice var later
        let adjustPriceElement = sib
                          .firstElementChild
                          .nextElementSibling
                          .nextElementSibling
                          .nextElementSibling;
        console.log(adjustPriceElement);
        //console.log(adjustPriceElement);
        let price = priceElement.textContent;
        price = parseFloat(price.replace('+$',''));

        let newPrice = 0.00;
        let priceAction = '';
        let adjustPriceClass = '';
          if(currentSelectedPrice > price){
            adjustPriceElement.classList.remove('plus');
            adjustPriceElement.classList.add('minus');
            newPrice = currentSelectedPrice - price;
            priceAction = '- $';
          } else {
            adjustPriceElement.classList.remove('minus');
            adjustPriceElement.classList.add('plus');
            newPrice = price - currentSelectedPrice;
            priceAction = '+ $';        
          }
          
          adjustPriceElement.textContent = priceAction + String(newPrice.toFixed(2));

          adjustPriceElement.style.display = 'inline-block';
          priceElement.style.display = 'none';
        
        //console.log(newPrice.toFixed(2));
      }
    }
    calculatePrices();
  }

  let calculatePrices = () => { 
    let els = document.getElementsByClassName('active');
    for(let i=0; i<els.length; i++) {
      //PICK UP HERE. NEED TO CALCULATE PRICES AND CHANGE currentPrice and test. See notebook about smaller functions.
      //console.log(els[i]);
    }
  }

  let removeSelectedOption = id => {
    if(id){
        let el = document.getElementById(id);
        el.classList.remove('active');
        let descriptionEl = el
        .firstElementChild;  

        let priceEl = descriptionEl
        .nextElementSibling;
        priceEl.style.display = 'inline-block';

        let noteEl = priceEl
        .nextElementSibling;
        noteEl.style.display = 'none';

        let adjustPriceEl = noteEl
        .nextElementSibling;
        adjustPriceEl.style.display = 'none';
    }
  }

  // called whhen option is selected.
  let setSelectedOption = id => {
    let el = document.getElementById(id);
    el.classList.add('active');

    let descriptionEl = el
    .firstElementChild;  

    let priceEl = descriptionEl
    .nextElementSibling;
    priceEl.style.display = 'none';

    let noteEl = priceEl
    .nextElementSibling;
    noteEl.style.display = 'inline-block';

    let adjustPriceEl = noteEl
    .nextElementSibling;
    adjustPriceEl.style.display = 'none';

    let option = el
    .innerHTML;
    //console.log(option);
    let placeHolderEl = document.getElementById(id)
    .parentElement
    .parentElement
    .previousElementSibling
    .firstElementChild;
    //console.log(placeHolderEl);

    placeHolderEl.className = 'selected';
    placeHolderEl.innerHTML = option;

  }

  let loadDefaultOptions = () => {
    let optionsList = document.getElementsByClassName('po-options--list');
    let selectedId;
    let defaultOption;
    let amount = 0.00;
     for(let i=0; i<optionsList.length; i++){
         //get placeholder for current selectable option
        let placeHolderEl = optionsList[i]
        .parentElement
        .previousElementSibling
        .firstElementChild;
        //console.log(placeHolderEl);
        //get default option (only needed if item is required)
        defaultOption = optionsList[i].firstElementChild;
        //console.log(defaultOption);
        let id = defaultOption.id;
        //console.log(id);
        let description = document.getElementById(id)
        .firstElementChild
        .textContent;
        
        //console.log(description);
        let sku = id.replace(/^(opt_)/,"");
        //console.log(sku);
        if(defaultOption.className == 'default-option option-item required'){

            let descriptionEl = document.getElementById(id).firstElementChild;
            let priceEl = descriptionEl.nextElementSibling;
            let noteEl = priceEl.nextElementSibling;
            priceEl.style.display = 'none';
            setSelectedOption(id);
        }
     }
  }

  let optionSelectedClickEvent = () => {
    // create array of option items
    let optionItems = document.getElementsByClassName("option-item");
    let sibs;
    for (let i = 0; i < optionItems.length; i++) {
        let el = optionItems[i];
        el.addEventListener("click", function() {
            let id = this.id;
            sibs = getSiblings(this);  
            for(let a=0; a<sibs.length; a++){
                let sibsId = sibs[a].id;
                removeSelectedOption(sibsId);
            }
            setSelectedOption(id);
            adjustPrices();
        });
    }
  }

  loadDefaultOptions();
  selectorClickEvent();
  optionSelectedClickEvent();
  setBasePrice();
  adjustPrices();
// import $ from 'jquery';

// let kits =  [
//     {
//     "name": "Oil Change Kits",
//     "id": 1,
//     "options": [
//       {
//         "name": "oil",
//         "skus": ['121383','121384','125732']
//       }, 
//       {
//         "name": "filters",
//         "skus": ['110258','123815','125732']
//       }
//     ]
//     },
//     {
//     "name": "Brake Kits",
//     "id": 2,
//     "options": [
//       {
//         "name": "brake rotors",
//         "skus": ['11123','31244','63451']
//       },
//       {
//         "name": "brake pads",
//         "skus": ['12567','42314','77345']
//       },
//       {
//         "name": "caliper retaining bolts",
//         "skus": ['41232','55234','12341']
//       },
//       {
//         "name": "brake grease",
//         "skus": ['12367','43231','12345']
//       }
//     ]
//     }
// ];

// let getSelectedKit = (selectedKit) => {
//   let kit = kits.filter(item => {
//     if(item.name === selectedKit) {
//       return item;
//     }
//   });
//   return kit;
// }

// let getKitOptions = (arr) => {
//   let options = arr.map(item => {
//       return item.options;
//   });
//   if(options){
//   	for(let i=0; i<options.length; i++){
//     	return options[i];
//     }
//   }
// }

// let buildOptions = (kitOptions) => {
//   let selectBox = '';
//   for(let i=0; i<kitOptions.length; i++){
//     let optionName = kitOptions[i].name;
//     selectBox = selectBox + '<div class="small-12 medium-6 columns">' +
//                             '<div class="form-group">' +
//                             '<div class="input-group">' +
//                             '<label>' + optionName + '<select>';
//     let optionSkus = kitOptions[i].skus;
//     for(let a=0; a<optionSkus.length; a++){      
//       selectBox = selectBox + '<option>' + optionSkus[a] + '</option>';
//     }
//     selectBox = selectBox + '</label></select></div></div></div>';
//    }
//     return selectBox;
// }

// let kitSelector = document.getElementById('kit');
// kitSelector.addEventListener("change", kitChanged);

// function kitChanged() {

//   $('#options').slideUp();

//   let selectedKit = document.getElementById('kit');
//   let selectOptions = '';

//   selectedKit = selectedKit.value;
//   document.getElementById('insertText').innerHTML = '<h3>' + selectedKit + '</h3>';
 
//   //get index of array
//   //let newKit = kits.map((el) => el.name).indexOf(selectedKit);
//   //console.log(newKit);

//   //get kit from json data
//   let kit = getSelectedKit(selectedKit);
//   if(kit.length != 0){
//     //get kitName
//     let kitName = kit.map(p => p.name);
    
//     //convert kitName to string.
//     kitName = String(kitName);

//     //get array of kit options
//     let kitOptions = getKitOptions(kit);

//     let optionsBox = buildOptions(kitOptions);

//     document.getElementById('options').innerHTML = optionsBox;
//     setTimeout(function() {
//       $('#options').slideDown();
//     }, 1000);
//   }
// }

// kitChanged();

import $ from 'jquery';
import kits from './kits';

let isOpen = bln => {
    if(bln){
        document.getElementById('dropWrapper').classList.add('open');
    }else{
        document.getElementById('dropWrapper').classList.remove('open');
    }
}

let removeKit = selectedValue => {
    selectedValue.innerText = 'Please select a kit';
    selectedValue.className = 'placeholder';
    $('#kitType').slideUp();
    $('#options').slideUp();
}

// function is called if kit returns 0 options
let kitUnavailable = selectedValue => {
    removeKit(selectedValue);
    document.getElementById('kitError').innerText = 'This kit is currently unavailable, please make another selection.';
    $('#kitError').slideDown();
}

let kitSelectorClickEvent = () => {
    document.getElementById('kitSelector').addEventListener('click', function() {    
        let classVal = document.getElementById('dropWrapper').className;
        if(classVal === 'drop'){
            isOpen(true);
        } else {
            isOpen(false);
        }
    });
}

let getSelectedKit = selectedKit => {
  let kit = kits.filter(item => {
    if(item.name === selectedKit) {      
      return item;
    }
  });
  return kit;
}

let getKitOptions = (arr) => {
  let options = arr.map(item => {
      return item.options;
  });
  if(options){
  	for(let i=0; i<options.length; i++){
    	return options[i];
    }
  }
}

let buildOptions = (kitOptions) => {
  let selectBox = '';
  selectBox = selectBox + '<div class="small-12 medium-6 small-centered columns">' +
                          '<label>Kit Type (optional)' +
                          '<select>' +
                          '<option value="custom">Custom</option>' +
                          '<option value="premium">Premium</option>' +
                          '<option value="performance">Performance</option>' +
                          '<option value="value">Value</option>' +
                          '</select>' +
                          '</label>' +
                          '</div>';

  for(let i=0; i<kitOptions.length; i++){
    let optionName = kitOptions[i].name;
    selectBox = selectBox + '<div class="small-12 medium-6 columns small-centered">' +
                            '<label>' + optionName + '<select>';
    let optionSkus = kitOptions[i].skus;
    for(let a=0; a<optionSkus.length; a++){      
      selectBox = selectBox + '<option>' + optionSkus[a] + '</option>';
    }
    selectBox = selectBox + '</label></select></div>';
   }
    return selectBox;
}

let kitListClickEvent = () => {
    // create array of kit names
    let kitItems = document.getElementsByClassName('kit-item');

    // loop through arrray of kit names and add eventlistener.
    for(let i=0; i<kitItems.length; i++){
        kitItems[i].addEventListener('click', function() {
            let selectedId = this.id;
            let selectedKit = this.value;
            let selectedValue = document.getElementById('selectValue');
            selectedValue.className = 'selected';
            selectedValue.innerHTML = selectedKit + '<a href="#" id="removeValue"><i class="zmdi zmdi-close"></i></a>';

            document.getElementById('removeValue').addEventListener('click', function() {
                removeKit(selectedValue);
            });
            
            isOpen(false);
            
            let kitObj = getSelectedKit(selectedKit);            
            
            //console.log(kitObj);
                    
            let kitOptions = getKitOptions(kitObj);     

            if(kitOptions != undefined){
                let optionsBox = buildOptions(kitOptions);
                $('#options').show();
                document.getElementById('options').innerHTML = '<div class="small-12 columns"><img src="assets/img/loading.gif" style="margin: 0 auto; display: block; height: 80px;" /></div>'; 
                $('#kitError').hide();
                setTimeout(function() {         
                    document.getElementById('options').innerHTML = optionsBox;           
                    $('#kitType').slideDown();
                    $('#options').slideDown();
                }, 2000);
            }  else {
                    kitUnavailable(selectedValue);
            }
              
        });
    }
}

kitSelectorClickEvent();
kitListClickEvent();


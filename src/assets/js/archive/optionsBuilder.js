// let optionsBuilder = sku => {
//   let optionsDisplay = "";
//   let selectedKit = getSelectedKit(sku);
//   //console.log(selectedKit);
//   let selectedKitOptions = getKitOptions(selectedKit);
//   //console.log(selectedKitOptions);
//   let optionsBox =  "<label>Kit Type (optional)" +
//                     "<select>" +
//                         '<option value="default">Default</option>' +
//                         '<option value="premium">Premium</option>' +
//                         '<option value="performance">Performance</option>' +
//                         '<option value="value">Value</option>' +
//                     "</select>" +
//                     "</label>";

//   for (let i = 0; i < selectedKitOptions.length; i++) {

//     let optionName = selectedKitOptions[i].name;
//     let optionRequired = selectedKitOptions[i].required;
    
//     optionsBox = optionsBox + '<label>';

//     if (optionRequired){
//         optionsBox = optionsBox + optionName + '*' +
//         '<select required>';
//     } else{
//         optionsBox = optionsBox + optionName + ' (optional)' +
//         '<select>';
//     }
    
//     let optionSkus = selectedKitOptions[i].skus;

//      for(let a=0; a<optionSkus.length;a++) {
//        let skuDetailsArr = getSkuDetailsArr(optionSkus[a]);
//        let selectedSkuDetails = getSelectedSkuDetails(skuDetailsArr);

//        optionsBox = optionsBox + getOptionsTag(selectedSkuDetails, optionSkus[a]);

//      }

//     optionsBox = optionsBox + '</select></label>';
//   }
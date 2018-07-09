let shippingloaded=0;

$(document).ready(function(){ 
    $( '.table' ).each( function( index, tableID ) {
    $( tableID ).find( 'thead tr th' ).each( function( index ) {
        index += 1;
        $( tableID ).find( 'tbody tr td:nth-child(' + index + ')' ).attr( 'data-title', $(this).text() );
        });
    });
    ajaxdisplayshipping();
});

function ajaxdisplayshipping() {
    let index=ajax.length;
    ajax[index]=new sack();
    ajax[index].method='GET';
    ajax[index].execute=true;
    ajax[index].requestFile='/ajaxbasketshipping.asp';
    ajax[index].setVar('s',sessioncode);
    ajax[index].runAJAX();
}

function getshippingquote() {
    let pc=document.getElementById('SHIP_POSTAL_CODE').value;
    let ml=document.getElementById('SHIP_COUNTRY_ID');
    let cc=ml.options[ml.selectedIndex].value;
    obj=document.getElementById('adhocshipping');
    if(obj != null){
        obj.innerHTML='<p class=""wait4ajax""><img src=""" & strTemplateShopFolder & "skin/images/loading.gif""/></p>';			
    };
    let index=ajax.length;
    ajax[index]=new sack();
    ajax[index].method='GET';
    ajax[index].execute=true;
    ajax[index].requestFile='/ajaxbasketshipping.asp';
    ajax[index].setVar('SHIP_POSTAL_CODE',pc);
    ajax[index].setVar('SHIP_COUNTRY_ID',cc);
    ajax[index].setVar('s',sessioncode);
    ajax[index].runAJAX();
}

function removepromotion() {
    $.get('ajax_basket_promotion.asp?removepromo=yes', function(data) {eval(data);});
}

function addpromotion() {
    let obj=document.getElementById('CART_PRO_CODE');
    let pcode='';
    if(obj != null) { pcode=obj.value };
    if(pcode.length==0) { alert('Please enter a valid promotion code.'); return false;};
    $.get('ajax_basket_promotion.asp?addpromo='+pcode, function(data) {eval(data);});
}		

$('#CART_PRO_CODE').keyup(function(event){ if(event.keyCode == 13){ addpromotion(); }});
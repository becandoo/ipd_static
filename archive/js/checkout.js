
$('.btn-paymentoptions').click(function (e) {
    e.preventDefault();
    $(this).parent().siblings().children('button').each(function () {
        if ($(this).hasClass('selected')) {
            var parentEl = $(this).parent().attr('id');
            $(this).removeClass('selected');
            //console.log('removed selected from: ' + parentEl);
        } else {
            return;
        }
    });
    var x = $(this).children('img').attr('class');
    $(this).addClass('selected');

    $('#strPaymentSystem').attr('value', x);
});

$('.btn-shippingoptions').click(function (e) {
    if ($(this).hasClass('shipping')) {
        $('.pickup').removeClass('selected');
    } else if ($(this).hasClass('pickup')) {
        $('.shipping').each(function () {
            $(this).removeClass('selected');
        });
    }

    $(this).parent().siblings().children('button').each(function () {
        if ($(this).hasClass('selected')) {
            var parentEl = $(this).parent().attr('id');
            $(this).removeClass('selected');
            $(this).children('div').children('div').children('span.price').removeClass('text success');
        } else {
            return;
        }
    });

    var x = $(this).attr('id');

    $(this).children('div').children('div').children('span.price').addClass('text success');
    $(this).addClass('selected');

    $('#numShipMethod').attr('value', x);
});

//adjust order summary when shipping method is changed
$('.numShipMethod').change(function () {
    var x = $(this).attr('id');
    var shipPrice = $(this).siblings().children('span').text();

});

//displays address in <p> fields.
$('#sameAsBillAdd').change(function () {
    if (this.checked) {
        $('.ch4_shippingFields').toggle();
        $('#shippingAddress').toggle();
        var shipName = $('#shipName').text();
        if (shipName == '') {
            var shipName = $('#C_CardholderName').val();
            var shipStreet = $('#C_CardholderStreetAddress').val();
            var shipCity = $('#C_CardholderTownCity').val();
            var shipState = $('#C_CardholderCounty').val();
            var shipZip = $('#C_CardholderPostCode').val();
            //set text address values
            $('#shipName').text(shipName);
            $('#shipStreet').text(shipStreet);
            $('#shipCity').text(shipCity + ',');
            $('#shipState').text(shipState);
            $('#shipZip').text(shipZip);
            //set input field values
            $('#C_ShippingStreetAddress').val(shipStreet);
            $('#C_ShippingTownCity').val(shipCity);
            $('#C_ShippingCounty').val(shipState);
            $('#C_ShippingPostCode').val(shipZip);
        }
    } else {
        $('.ch4_shippingFields').toggle();
        $('#shippingAddress').toggle();
    }
});

$('#showShippingHelp').click(function (e) {
    e.preventDefault();
    $('#shippingHelp').toggle();
});

//show shipping inputs - not using unless displays address in <p> fields is displayed
function sameAsBillingAddress() {
    if ($('#sameAsBillAdd').prop('checked')) {
        $('.ch4_shippingFields').hide();
    }
}

//show shipping inputs - not using unless displays address in <p> fields is displayed
function setDefaultShipping() {
    var numShipMethod = $('#numShipMethod').val();
    console.log(numShipMethod);
    //set default shipping to first item in list (if it wasn't previously selected).
    if (numShipMethod != '') {

    } else {
        var shipButton = $('.ch4_shippingSection').children('div.shipping-row:first', this).children('button');
        var shipPrice = $('.ch4_shippingSection').children('div.shipping-row:first', this).children('button').children('div').children('div').children('span.price');
        shipButton.addClass('selected');
        shipPrice.addClass('text success');
        numShipMethod = shipButton.attr('id');
        $('#numShipMethod').attr('value', numShipMethod);
    }
}

var cartTotal = $('#cartprice').html();
cartTotal = Number(cartTotal.replace(/[^0-9\.]+/g, ""));

$('#strPaymentSystem').change(function (e) {
    console.log(cartTotal);
    var selectedPayment = this.options[e.target.selectedIndex].text;
    if (selectedPayment == "Pay with Affirm") {
        if (cartTotal < 250.00) {
            $('#paymentError').html('<p style="color: red;">Order must be over $250.00 to use Affirm. Please select a different payment method.</p>');
            $('#paymentContinue').prop('disabled', true);
        }
    } else {
        $('#paymentError').html('');
        $('#paymentContinue').prop('disabled', false);
    }
});

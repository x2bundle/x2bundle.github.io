$(function() {

    var initialValue = 0.05;

    $('#to-double').val(initialValue);

    $(".ui-slider").slider({
        min: 0.01,
        max: 1.005,
        step: 0.005,
        range: 'min',
        value: initialValue,
        slide : function(e, u) {
            $('#to-double').val(u.value);
        }
    });

    $('#join-form').submit(function(e) {

        e.preventDefault();

        var button = $(this).find('button[type=submit]');
        var form   = $(this);
        button.data('loading-text', '<i class="fa fa-spinner fa-spin"></i>');
        button.button('loading');
        
        $.ajax({
            type: 'POST',
            url: 'register.php',
            data: form.serialize(),
            dataType: 'json',
            success: function(res)
            {
                if( res.status == 'error' ) {
                    var modal = $('#error-modal');
                    modal.find('.modal-body').html(res.message);
                    modal.modal('show');
                }

                else if( res.status == 'dep') {

                    console.log(res);
                    var modal = $('#join-modal');
                    var qrLink = modal.find('.qrcode-holder').attr('src');
                    modal.find('.profit-holder').html(res.amount*2 + ' BTC');
                    modal.find('.amount2d-holder').html(res.amount + ' BTC');
                    document.getElementById("waitdeposit").style.display = "none";
                    document.getElementById("recdeposit").style.display = "block";  
                    modal.find('.cusername').html('Hello '+res.username);
                    modal.find('.qrcode-holder').attr('src', 'http://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=' + res.input_address + '&chld=H|0');
                    modal.find('.wallet-holder').html(res.input_address);
                    document.getElementById("bpay").style.display = "none";
                    document.getElementById("apay").style.display = "block";
                    modal.modal('show');
                    cdp(res.input_address);
                    


                }
                else if ( res.status == 'success' ) {

                    console.log(res);
                    
                    var modal = $('#join-modal');
                    var qrLink = modal.find('.qrcode-holder').attr('src');
                    modal.find('.cusername').html('Hello '+res.username);
                    modal.find('.qrcode-holder').attr('src', 'http://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=' + res.input_address + '&chld=H|0');
                    modal.find('.wallet-holder').html(res.input_address);
                    modal.modal('show');
                    cdp(res.input_address);
                } else {
                    alert('Unknown error!');
                }

                button.button('reset');
            },
            error: function(res)
            {
                var modal = $('#error-modal');
                    modal.find('.modal-body').html('error');
                    modal.modal('show');
                button.button('reset');
            }
        });

    });

});




$(function() {

    var initialValue = 0.05;

    $('#to-double').val(initialValue);

    $(".ui-slider").slider({
        min: 0.01,
        max: 1.005,
        step: 0.005,
        range: 'min',
        value: initialValue,
        slide : function(e, u) {
            $('#to-double').val(u.value);
        }
    });

    $('#aff-form').submit(function(e) {

        e.preventDefault();

        var button = $(this).find('button[type=submit]');
        var form   = $(this);

        button.data('loading-text', '<i class="fa fa-spinner fa-spin"></i>');
        button.button('loading');


        $.ajax({
            type: 'POST',
            url: 'Affiliate.php',
            data: form.serialize(),
            dataType: 'json',
            success: function(res)
            {
                if( res.status == 'error' ) {
                    var modal = $('#error-modal');
                    modal.find('.modal-body').html(res.message);
                    modal.modal('show');
                }

                else if( res.status == 'exist') {

                    var modal = $('#aff-modal');
                    modal.find('.aff-holder').html('https://doublebitcoin.win/?ref='+res.id);
                    modal.modal('show');
                    


                }
                else if ( res.status == 'success' ) {

                    var modal = $('#aff-modal');
                    modal.find('.aff-holder').html('https://doublebitcoin.win/?ref='+res.id);
                    modal.modal('show');

                } else {
                    alert('Unknown error!');
                }

                button.button('reset');
            },
            error: function(res)
            {
                var modal = $('#error-modal');
                    modal.find('.modal-body').html('error');
                    modal.modal('show');
                button.button('reset');
            }
        });

    });

});




$(function() {

    var initialValue = 0.05;

    $('#to-double').val(initialValue);

    $(".ui-slider").slider({
        min: 0.01,
        max: 1.005,
        step: 0.005,
        range: 'min',
        value: initialValue,
        slide : function(e, u) {
            $('#to-double').val(u.value);
        }
    });

    $('#sup-form').submit(function(e) {

        e.preventDefault();

        var button = $(this).find('button[type=submit]');
        var form   = $(this);

        button.data('loading-text', '<i class="fa fa-spinner fa-spin"></i>');
        button.button('loading');
      
        $.ajax({
            type: 'POST',
            url: 'contact.php',
            data: form.serialize(),
            dataType: 'json',
            success: function(res)
            {
		    $(".msucess").show();
                    $(".msucess").fadeIn(2000);
                    $(".msucess").html("<i class='fa fa-check'></i> Dear <b>" + name + "</b> Thank you for your inquiry we will respond to you as soon as possible!");
                    button.button('reset');
            },
            error: function(res)
            {
                alert('Unknown error!');
            }
        });
       

    });

});









$(document).ready(function() {
        $(".cbtn").click(function(){
        $btn = $(this);
        $btn.data('loading-text', '<i class="fa fa-spinner fa-spin"></i>');
        $btn.button("loading");
    

         var dpw = document.getElementById("dpw").innerHTML;
         

           $.ajax({
            type: 'POST',
            url: 'test.php',
            data: {dpw: dpw} ,
            dataType: 'json',
            success: function(res)
            {
              if ( res.status == 'success' ){
                var modal = $('#join-modal');
                modal.find('.profit-holder').html(res.amount*2 + ' BTC');
                modal.find('.amount2d-holder').html(res.amount + ' BTC');  
                document.getElementById("waitdeposit").style.display = "none";
                document.getElementById("recdeposit").style.display = "block";
                document.getElementById("bpay").style.display = "none";
                document.getElementById("apay").style.display = "block";
              }
              else if ( res.status == 'error' ) {
                document.getElementById("norec").style.display = "block";
               $btn.button("reset");
              }
            },
           error: function(res)
           {
           alert('Unknown error!');
           }
  
          }); 
    }); 
});







$(function() {


    $('#src-form').submit(function(e) {

        e.preventDefault();

        var button = $(this).find('button[type=submit]');
        var form   = $(this);
        button.data('loading-text', '<i class="fa fa-spinner fa-spin"></i>');
        button.button('loading');
        
        $.ajax({
            type: 'POST',
            url: 'search.php',
            data: form.serialize(),
            dataType: 'json',
            success: function(res)
            {
                if( res.status == 'error' ) {
                    var modal = $('#error-modal');
                    modal.find('.modal-body').html(res.message);
                    modal.modal('show');
                }

                else if( res.status == 'success') {

                    console.log(res);
                    var modal = $('#src-modal');
                    modal.find('.name-holder').html('Hello '+res.username+', Here are your info');
                    modal.find('.src-holder1').html(res.Status2);
                    modal.find('.src-holder2').html(res.date);
                    modal.find('.src-holder3').html(res.wallet);
                    modal.find('.src-holder4').html('<i class="fa fa-bitcoin"></i>'+res.amount);
                    modal.find('.src-holder5').html('<i class="fa fa-bitcoin"></i>'+res.amount*2);
                    modal.find('.src-holder6').html(res.total);
                    modal.find('.src-holder7').html(res.next);
                    modal.find('.src-holder8').html(res.left+' minutes');

                    modal.modal('show');
                    


                }
                else {
                    alert('Unknown error!');
                }

                button.button('reset');
            },
            error: function(res)
            {
                var modal = $('#error-modal');
                    modal.find('.modal-body').html('error');
                    modal.modal('show');
                button.button('reset');
            }
        });

    });

});













// Datatables

$(function()
{

    // init

    $.extend( $.fn.dataTable.defaults, {
        autoWidth: false,
        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });

    // dtables

    $('#deposits-dt').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/dtables/deposits',
        columns: [
            {data: 'id', 'name': 'id'},
            {data: 'updated_at', name: 'updated_at'},
            {data: 'username', name: 'username'},
            {data: 'tx_id', name: 'tx_id'},
            {data: 'amount', name: 'amount'},
            {data: 'return', name: 'return', searchable: false},
            {data: 'next_payment', name: 'next_payment'},
            {data: 'paid', name: 'paid'},
            {data: 'status', name: 'status', sortable: false, searchable: false}
        ],
        order: [[0, 'desc']],
        iDisplayLength: 50,
        oLanguage: {
            sSearch: 'Search your deposit: &nbsp;&nbsp;'
       }
    });

    $('#payouts-dt').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/dtables/payouts',
        columns: [
            {data: 'updated_at', name: 'deposit_payouts.updated_at'},
            {data: 'username', name: 'deposits.username'},
            {data: 'tx_id', name: 'deposit_payouts.tx_id'},
            {data: 'amount', name: 'deposit_payouts.amount'},
            {data: 'status', name: 'status', searchable: false, sortable: false}
        ],
        order: [[0, 'desc']],
        iDisplayLength: 50,
        oLanguage: {
            sSearch: 'Search your payout: &nbsp;&nbsp;'
       }
    });

    $('#referral-dt').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/dtables/referral',
        columns: [
            {data: 'updated_at', name: 'updated_at'},
            {data: 'tx_id', name: 'tx_id'},
            {data: 'wallet', name: 'wallet'},
            {data: 'amount', name: 'amount'},
            {data: 'status', name: 'status', searchable: false, sortable: false}
        ],
        order: [[0, 'desc']],
        iDisplayLength: 50,
        oLanguage: {
            sSearch: 'Search referral payout: &nbsp;&nbsp;'
       }
    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });

});


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function cdp(testqq) {
var btcs = new WebSocket('wss://ws.blockchain.info/inv');
var testqq = testqq;
btcs.onopen = function()

	{

	btcs.send( JSON.stringify( {"op":"addr_sub", "addr":testqq} ) );

	};
	
btcs.onclose = function()

	{
        cdp(testqq);

	};

btcs.onmessage = function(onmsg)

	{

	var response = JSON.parse(onmsg.data);

	var getOuts = response.x.out;

	var countOuts = getOuts.length; 
	
		for(i = 0; i < countOuts; i++)
		{
		var outAdd = response.x.out[i].addr;
		var specAdd = testqq;
			if (outAdd == specAdd){
                        var amount = response.x.out[i].value;
			var hash = response.x.hash;
           		var calAmount = amount / 100000000;


                          if(calAmount >= 0.001) { 
                                var str = "Success!! Your deposit TXID is "+hash+". Enjoy Our Program!";
                                str = str.fontcolor("green");
                                document.getElementById("waitdeposit").innerHTML = str;     

                           }

			}

	

		}
	};


}





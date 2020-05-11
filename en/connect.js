var tronWeb;
var waiting = 0;
var currentAddr;
var tron = 0;
var win = 15;
var btt = 30;
var depo = 0;
var time = [];


var a_gameTimer = "";
var gametimer_in_seconds = 0;
var game_numhours = 0;
var game_numminutes = 0;
var game_numseconds = 0;

var game_roundover = false;
var call = false;
var gametimer_lastminute = 60;
var i_gameTimer = false;

var gametimerdoc;
var _timert;
var jsblock = 0;
async function main() {

    if (typeof(window.tronWeb) === 'undefined') {
        console.log('Waiting for tronWeb...');
        waiting += 1;
        if (waiting == 5) {
           $("#tronWebModal").modal("hide");
            $("#noTronWebModal").modal("show");
        }
        setTimeout(main, 1000);
    } else {
        tronWeb = window.tronWeb;
      x2 = await tronWeb.contract().at("TGABKPaCJrKDebUGZXmTavnYKLhXQ99jmU");
         
        BigNumber = tronWeb.BigNumber;
        currentAddr = tronWeb.defaultAddress['base58'];
        setTimeout(function() {
            $("#tronWebModal").modal("hide");
            $("#noTronWebModal").modal("hide");
            UserData();
        }, 2000);
        setInterval(function() {
            mainloop();
            updatefaster();
        }, 2000);
    }
}




function nFormatter(num) {
    isNegative = false
    if (num < 0) {
        isNegative = true
    }
    num = Math.abs(num)
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
        formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
        formattedNumber = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        formattedNumber = num;
    }
    if (isNegative) {
        formattedNumber = '-' + formattedNumber
    }
    return formattedNumber;
}


 setInterval(function() {
            
            updatefaster();
        }, 1000);


function UserData(){
    
      x2.totalDepo(currentAddr).call().then(result => {
           console.log("totalDepo", result);
           var totalDepo = result.toNumber();
          depo = totalDepo ;
        var a; 
          
       var container = document.getElementById('items2');
       for(a = 1; a<= totalDepo; a++){   
          x2.UserDepoTiming(currentAddr,a).call().then(result => {
           console.log("totalDepo", result);
          
              
           
           var overlap = result.toNumber();
              var overtime = overlap+43200;
               time.push(overlap);
               
              console.log('Time',time)
           container.innerHTML+="<tr> <td > <span id='path"+overtime+"'>?</span></td> <td class='stats'><span >100</span> &nbsp <img src='assets/images/tron.png' width='20px'></td> <td class='stats'><span >200</span> &nbsp <img src='assets/images/tron.png' width='20px'></td><td class='stats'><span id='claimed"+overlap+"'>0</span> / 200 &nbsp <img src='assets/images/tron.png' width='20px'></td></tr>";   
              
              
           //   document.getElementById('overlap').textContent = overlap; 
            
           });
 
          
      }
  });
}


function pool(){
    
     
      x2.potTiming().call().then(result => {
    
         
     //   console.log("data", id); 
         var data = result.toNumber();
          
       // document.getElementById(id).textContent = (stat/1e6).toFixed(3); 
        
        pooltime(data); 

     });
     
}


function updatefaster(){
    
    var seconds = new Date().getTime() / 1000;
    var a;
    
    for(a = 1; a <= depo ;a++){ 
      x2.UserDepoTiming(currentAddr,a).call().then(result => {
    
        var data = result.toNumber();
        var stat = (seconds - data) * 4629;
        var id = 'claimed'+data;
        var path = 'path'+data;
         var data2 = data + 43200;
       //  
        console.log("data", id); 
	if(id >= 200e6){
	   document.getElementById(id).textContent = (stat/1e6).toFixed(3); 
	   }
	else{
		document.getElementById(id).textContent = 'Completed'; 
						   }
          
        
        
        fastupdateGameTimer(data2); 

     });
    }
}



function pooltime(data1){
    console.log('data1', data1);
        let data = data1;
    
	    var _blocktime = (new Date()).getTime();
        console.log("_callback()", _blocktime)
        //current "blocktime" in milliseconds
		var _timer = data - (_blocktime / 1000);
		
		if(_timer > 0){
			gametimer_lastminute = 0;
			var _hours = Math.floor(_timer / 3600);
			if(_hours < 10) { _hours = "0" + _hours }
			var _minutes = Math.floor((_timer % 3600) / 60);
			if(_minutes < 10) { _minutes = "0" + _minutes }
			var _seconds = parseFloat((_timer % 3600) % 60).toFixed(0);
			if(_seconds < 10) { _seconds = "0" + _seconds }
            var div = 'path'+data1;
			 	
			document.getElementById('count1').textContent = _hours + " hrs :" + _minutes + " mins :" + _seconds;
             
           
           // betopen.innerHTML = "[Waiting for blockchain confirmation...]";
			game_roundover = false;
		}  
        
        else {
             
           document.getElementById('count1').textContent = 'Completed';
		}
	 
}


function fastupdateGameTimer(data1){
    console.log('data1', data1);
        let data = data1;
    
	    var _blocktime = (new Date()).getTime();
        console.log("_callback()", _blocktime)
        //current "blocktime" in milliseconds
		var _timer = data - (_blocktime / 1000);
		
		if(_timer > 0){
			gametimer_lastminute = 0;
			var _hours = Math.floor(_timer / 3600);
			if(_hours < 10) { _hours = "0" + _hours }
			var _minutes = Math.floor((_timer % 3600) / 60);
			if(_minutes < 10) { _minutes = "0" + _minutes }
			var _seconds = parseFloat((_timer % 3600) % 60).toFixed(0);
			if(_seconds < 10) { _seconds = "0" + _seconds }
            var div = 'path'+data1;
			 	
			document.getElementById(div).textContent = _hours + " hrs :" + _minutes + " mins :" + _seconds;
             
           
           // betopen.innerHTML = "[Waiting for blockchain confirmation...]";
			game_roundover = false;
		} 
        
        else {
             
            document.getElementById('count1').textContent = 'Completed';
		}
	 
}





function mainloop() {
    pool();
    console.log(currentAddr);

    if (tronWeb.defaultAddress['base58'] !== currentAddr) {
        location.reload();
    }
    var dataRef = window.location.origin + "?ref=" + tronWeb.defaultAddress['base58']
    // document.getElementById('thewallet').value = currentAddr; 
    document.getElementById('ref').value = dataRef; 


  


     x2.Totaldeposit().call().then(result => {
           console.log("depo", result);
           var depo = result.toNumber();
               
              // console.log("index", a);
        document.getElementById("depo").textContent = (depo/1e6).toFixed(2);
     });
      x2.TotalPlayer().call().then(result => {
           console.log("TotalPlayer", result);
           var TotalPlayer = result.toString();
               
              // console.log("index", a);
        document.getElementById("TotalPlayer").textContent = TotalPlayer;
     });
    
      x2.avaliableAmount().call().then(result => {
           console.log("avaliableAmount", result);
           var avaliableAmount = (result).toNumber();
               
              // console.log("index", a);
        document.getElementById("avaliableAmount").textContent = (avaliableAmount/1e6).toFixed(2);
     });
    
    
       x2.Hotlist(0).call().then(result => {
           console.log("Hotlist1", result);
           var Hotlist1 = result.toString();
               
              // console.log("index", a);
        document.getElementById("Hotlist1").textContent = tronWeb.address.fromHex(Hotlist1);
           
           
           
            x2.rewardBalance(Hotlist1).call().then(result => {
           console.log("Hotlist1", result);
           var reward1 = result.toNumber();
               
              // console.log("index", a);
        document.getElementById("reward1").textContent = (reward1/1e6).toFixed(2);
     });
     });
    x2.Hotlist(1).call().then(result => {
           console.log("Hotlist1", result);
           var Hotlist2 = result.toString();
               
              // console.log("index", a);
        document.getElementById("Hotlist2").textContent = tronWeb.address.fromHex(Hotlist2);
        
       
        
        
         x2.rewardBalance(Hotlist2).call().then(result => {
           console.log("Hotlist1", result);
           var reward2 = result.toNumber();
               
              // console.log("index", a);
        document.getElementById("reward2").textContent = (reward2/1e6).toFixed(2);
     });
         });
    x2.Hotlist(2).call().then(result => {
           console.log("Hotlist1", result);
           var Hotlist3 = result.toString();
               
              // console.log("index", a);
        document.getElementById("Hotlist3").textContent = tronWeb.address.fromHex(Hotlist3);
         x2.rewardBalance(Hotlist3).call().then(result => {
           console.log("Hotlist1", result);
           var reward3 = result.toNumber();
               
              // console.log("index", a);
        document.getElementById("reward3").textContent = (reward3/1e6).toFixed(2);
     });
     });
    
    
    
    x2.Newplayer().watch((err, {result}) => {
        if (err) return console.error('Failed to bind event listener:', err);
        console.log('event',result);
        var $div2 = $('.newplayer');
        $div2.show().delay( 10000 ).hide( 0 );
    });
    
    
    
    
    
     x2.Totalwithdraw().call().then(result => {
           console.log("withdraw", result);
           var withdrawAmt = result.toNumber();
               
              // console.log("index", a);
        document.getElementById("withdraw").textContent = (withdrawAmt/1e6).toFixed(2);
     });

    x2.PoolPrice().call().then(result => {
           console.log("PoolPrice", result);
           var PoolPrice = result.toNumber();
               
              // console.log("index", a);
        document.getElementById("PoolPrice").textContent = PoolPrice/1e6.toFixed(2);
     });
    
          x2.Player(currentAddr).call().then(result => {
           var result1 = result.totalDeposit.toNumber();
              var result2 = result.Totalwithdraw.toNumber();
              document.getElementById("Addessdepo").textContent = (result1/1e6).toFixed(2);
              document.getElementById("Addesswithdraw").textContent = (result2/1e6).toFixed(2);
              
     });
    
    
   
 
}




function buynow() {
    event.preventDefault();
     
    x2.deposit('TKhzQqogHrbmYf98dBhN1Da7oQyzpVNA9P').send({callValue : 100000000}).then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });

}


function refresh(){
    location.reload();
}

function Withdraw() {
    //  var _trxneeded = (document.getElementById('sellprv').value)

    x2.Withdraw().send().then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });

}


$('#dropd').click(function() {

    $('#dropdd').toggle();




});

$('#trx').click(function() {

    $('#topinpt').attr('placeholder', 'TRONIX(TRX)');
    $('#hiddentoken').value = 1;

    $('#dropdd').toggle();

    $("#coinico").css("background-image", "url(social/tron.png)");
    document.getElementById('tokenSpec').textContent = "TRX";
    document.getElementById('tokenprice').textContent = tron;
    

});



$('#input').on('keyup input', function() {
    var id = Number($("#hiddentoken").val());
    if(id == 1){
        
        
       }
     



});





$('#btt').click(function() {

    $('#topinpt').attr('placeholder', 'BITTORENT(BTT)');
    $('#hiddentoken').value = 2;
    $('#dropdd').toggle();

    $("#coinico").css("background-image", "url(social/btt.png)");

    document.getElementById('tokenSpec').textContent = "BTT";
    document.getElementById('tokenprice').textContent = btt;


});

$('#win').click(function() {

    $('#topinpt').attr('placeholder', 'WINK(WIN)');
    $('#hiddentoken').value = 3;
    $('#dropdd').toggle();

    $("#coinico").css("background-image", "url(social/win.jpg)");
    document.getElementById('tokenSpec').textContent = "WIN";
    document.getElementById('tokenprice').textContent = win;

});




main();

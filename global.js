/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends

checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});


});


function go_nav(direction) {
var page_id =  parseInt($("#wrapper").attr("rel"));
			
		
var flag=0;
if(direction == 'b') {


	if(page_id >= 0){
		page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
            flag=2;
        }
	}
	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	
		//window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	}
	
}else {
	

	if(page_id <= 1){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 2){
            flag=1;
        }
	}
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
		 var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };


	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
		 //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
  
    }


}



$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		/* $(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	}); */
		
	}
	 checkClickThrough();
}

function set_pg_content(pg_id){
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1_1"><img src="slide1/s1_1.png" width="1024" height="768" alt=""/></div><div class="s1_2_wrap"><div class="s1_2"><img src="slide1/s1_2.png"/></div></div><div class="s1_3"><img src="slide1/s1_3.png"/></div><div class="s1_3_1_wrap"><div class="s1_3_1"><img src="slide1/s1_3_1.png"/></div></div><div class="s1_4"><img src="slide1/s1_4.png"/></div><div class="s1_5"><img src="slide1/s1_5.png"/></div><div class="s1_6"><img src="slide1/s1_6.png"/></div><div class="strike1" onclick="strike1();"></div><div class="s1_7"><img src="slide1/s1_7.png"/></div><div class="s1_8_wrap"><div class="s1_8"><img src="slide1/s1_8.png"/></div></div><div class="s1_9_wrap"><div class="s1_9"><img src="slide1/s1_9.png"/></div></div><div class="s1_10"><img src="slide1/s1_10.png"/></div><div class="s1_11"><img src="slide1/s1_11.png"/></div><div class="s1_12"><img src="slide1/s1_12.png"/></div><div class="s1_13"><img src="slide1/s1_13.png"/></div><div class="s1_14"><img src="slide1/s1_14.png"/></div><div class="s1_15"><img src="slide1/s1_15.png"/></div><div class="s1_16"><img src="slide1/s1_16.png"/></div><div class="s1_17"><img src="slide1/s1_17.png"/></div><div class="strike3" onclick="strike3();"></div><div class="s1_18_wrap"><div class="s1_18"><img src="slide1/s1_18.png"/></div></div><div class="s1_19"><img src="slide1/s1_19.png"/></div><div class="s1_20"><img src="slide1/s1_20.png"/></div><div class="s1_21"><img src="slide1/s1_21.png"/></div><div class="s1_22"><img src="slide1/s1_22.png"/></div><div class="s1_23"><img src="slide1/s1_23.png"/></div><div class="s1_24"><img src="slide1/s1_24.png"/></div><div class="s1_25"><img src="slide1/s1_25.png"/></div><div class="s1_26"><img src="slide1/s1_26.png"/></div><div class="s1_27"><img src="slide1/s1_27.png"/></div><div class="s1_28"><img src="slide1/s1_28.png"/></div><div class="s1_29"><img src="slide1/s1_29.png"/></div><audio autoplay loop><src="slide1/theme.mp3" id="theme"></audio><audio id="draw-sword" src="slide1/draw-sword.mp3"></audio><audio id="gun-shots" src="slide1/gun-shots.mp3"></audio><audio id="glador-logo" src="slide1/glador-logo.mp3"></audio>';
	break;

}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}

function open_page(url,page_id){
	 //alert("===openpage====");
	localStorage.getItem('currentbrand');
    localStorage.getItem('currentcontent');
    localStorage.getItem('currentcontentbrandId');
    localStorage.getItem('current');
	localStorage.setItem("gotoNextPrevBrand" ,0);
	//alert("====currentbrand======"+localStorage.getItem('currentbrand'));
	//alert("====currentcontent======"+localStorage.getItem('currentcontent'));
	//alert("====currentcontentbrandId======"+localStorage.getItem('currentcontentbrandId'));
	//alert("====current======"+localStorage.getItem('current'));
	//alert("====previousslide======"+localStorage.getItem("previousslide"));
	//alert("====page_id======"+page_id);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe

	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	 if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 }
	  checkClickThrough();
	}

	function checkClickThrough(){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(currentslide == 1){
	document.getElementById("click_through").innerHTML='';
		}
    if(currentslide == 2){
	document.getElementById("click_through").innerHTML='';
		}
	}

	function checkBtns(refNum){
		switch(refNum){
			case 1:
			open_page('',1);
            break;
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

// new js

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})


/*---------------Javascript Gamification------------------*/


function strike1() {
	document.getElementById("draw-sword").play();
	$('.s1_3').addClass("s1_3_out");
	$('.s1_3_1_wrap').addClass("s1_3_1_out");
	$('.s1_4').addClass("s1_4_out");
	$('.s1_5, .s1_6').addClass("s1_5_out");
	$('.s1_7').css("display","block");
	$('.s1_8_wrap, .s1_8').css("display","block");
	$('.s1_9_wrap, .s1_9').css("display","block");
	$('.s1_9').css("display","block");
	$('.s1_10').css("display","block");
	$('.s1_11').css("display","block");
	$('.s1_12').css("display","block");
	$('.s1_13').css("display","block");
	$('.s1_14').css("display","block");
	$('.s1_15').css("display","block");
	$('.s1_16').css("display","block");
	$('.s1_17').css("display","block");
	$('.s1_18_wrap, .s1_18').css("display","block");
	$('.strike1').css("display","none");
	$('.strike3').css("display","block");
}

/* function strike2() {
	document.getElementById("draw-sword").play();
	$('.s1_8').addClass("s1_8_out");
	$('.s1_9_wrap, .s1_9').addClass("s1_9_out");
	$('.s1_10, .s1_11').addClass("s1_10_out");
	$('.s1_12').css("display","block");
	$('.s1_13').css("display","block");
	$('.s1_14').css("display","block");
	$('.s1_15').css("display","block");
	$('.s1_16').css("display","block");
	$('.s1_17').css("display","block");
	$('.s1_18_wrap, .s1_18').css("display","block");
	$('.strike2').css("display","none");
	$('.strike3').css("display","block");
} */

function strike3() {
	var draw = document.getElementById("draw-sword");
		draw.currentTime = 0;
		draw.play();
	$('.s1_9_wrap, .s1_9').addClass("s1_9_out");
	$('.s1_10, .s1_11').addClass("s1_10_out");
	setTimeout(function(){
		var gun = document.getElementById("gun-shots");
		gun.currentTime = 3.7;
		gun.play();
	}, 1000);
	$('.s1_18_wrap').addClass("s1_18_shift");
	$('.s1_19').css("display","block");
	setTimeout(function(){
	   $('.s1_13').css("display","none");
	}, 1000);
	$('.s1_20').css("display","block");
	setTimeout(function(){
	   $('.s1_14').css("display","none");
	}, 1300);
	$('.s1_21').css("display","block");
	setTimeout(function(){
	   $('.s1_15').css("display","none");
	}, 1600);
	$('.s1_22').css("display","block");
	setTimeout(function(){
	   $('.s1_16').css("display","none");
	}, 1900);
	$('.s1_23').css("display","block");
	setTimeout(function(){
	   $('.s1_17').css("display","none");
	}, 2200);
	$('.s1_24').css("display","block");
	$('.s1_25').css("display","block");
	$('.s1_26').css("display","block");
	$('.s1_27').css("display","block");
	$('.s1_28').css("display","block");
	$('.s1_29').css("display","block");
	setTimeout(function(){
		var glad = document.getElementById("glador-logo");
		glad.play();
	}, 4500);
	$('.strike3').css("display","none");
}
	var currentUser = localStorage.getItem("currentUser");
	var senderName = localStorage.getItem("senderName");
	var toEmail="";
	var toName="";
	
	$("#currentUser").html(currentUser);

	var db=new Firebase("https://r3chat.firebaseio.com/users");
	
	var messages = new Firebase("https://r3chat.firebaseio.com/messages");
	db.on("value", function(serverObject){
		var users = serverObject.val();
		$("#users").html("");
		$.each(users, function(index, value){
			var html = "<li><a href='#' onClick=\"changeName('"+value.email+"','"+value.name+"')\">"+value.name+"</a></li>";
			var temp = $("#users").html();
			$("#users").html(temp+html);
		});
	}, function(error){
			console.log(error);
	});

	function changeName(email,name){
		toEmail=email;
		toName=name;
		$("#to").html(name);
	}
	/*Load Messages*/
	messages.on("value", function(serverMessages){
		var msg=serverMessages.val();
		$("#messagessent").html("");
		$("#messagesrec").html("");
		$.each(msg, function(index, value){
			var d = new Date(value.date);
			console.log(d);
			if(value.senderName==senderName){
				var html = "<li><b>"+value.receiverName+"</b>:<small>"+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+"</small><br>"+value.msg+"</li>";
				var temp = $("#messagessent").html();
				$("#messagessent").html(temp+html);
			}
			if(value.receiverName==senderName){
				var html = "<li><b>"+value.senderName+"</b>:<small>"+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+"</small><br>"+value.msg+"</li>";
				var temp = $("#messagesrec").html();
				$("#messagesrec").html(temp+html);
			}			
			}) 
	});

	/*Send Message*/
	$("#sendBtn").on("click", function(){
		var message={
			to: toEmail,
			from: currentUser,
			senderName: senderName,
			receiverName: toName,
			msg: $("#msg").val(),
			date: Date.now()
		};
		if(toEmail==""){
			$("#to").html("Please enter recipient");
		}
		else if(message.msg==""){
			$("#msg1").html("You can't send empty message");
		}
		else{
			messages.push().set(message, function(error){
				console.log(error);
				$("#msg").val("");
				$("#to").val("");
			});
		}		
	});

	$("#logoutbtn").on("click", function(){
		localStorage.setItem("currentUser","");
		window.location.href="../index.html";	
	});

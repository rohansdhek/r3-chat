	var currentUser = localStorage.getItem("currentUser");
	var toEmail="";
	var fromName="";
	var toName=localStorage.getItem("toName");
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
			fromName=name;
			
			$("#toName").html(email);
		}
		var messages = new Firebase("https://r3chat.firebaseio.com/messages");
		messages.on("value", function(serverMessages){
			var msg=serverMessages.val();
			$("#messages").html("");
			$.each(msg, function(index, value){
				var html = "<li><b>"+value.fromName+"</b>:"+value.msg+"</li>";
				var temp = $("#messages").html();
				$("#messages").html(temp+html);
			
				}) 
		});
	$("#sendBtn").on("click", function(){
		var msg={
			to: toEmail,
			toName:toName,
			from: currentUser,
			fromName: fromName,
			msg: $("#msg").val(),
			date: Date.now(),
			toName:$("#toName").val()
		};
			if(toName=="")
			{
				$("#toName").html("Please select atleast one recipient.");
			}
			else
			{
			messages.push().set(msg, function(error){
				console.log(error);
			}
		});
	});
		
	$("#logoutbtn").on("click", function(){
		localStorage.setItem("currentUser","");
		window.location.href="../index.html";			
	});

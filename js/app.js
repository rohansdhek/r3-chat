	var db = new Firebase("https://r3chat.firebaseio.com/");
	db.on("value",function(data){});
	$("#login").on('click',function()
	{		
			
		var email1=$("#log_email").val();
		var pass1=$("#log_pass").val();
		if(email1=="" || pass1==""){
			$("#warning").html("Fill all the fields");
		}
		else{	
			$("#load").html("Please wait...")
			$("#warning").html("");
			var log={email:email1,password:pass1};
			db.authWithPassword(log,function(error,authdata){
				if(error){

						$("#warning").html("login failed!! " + error);
						$("#load").html(" 	");
				}
				else{
					$("#load").html(" 	");
					console.log("Success");
					localStorage.setItem("currentUser",email1);
					/**/
					var temp = new Firebase("https://r3chat.firebaseio.com/users");
					var role = "";
					temp.on("value", function(serverData){
						var users = serverData.val();
						$.each(users, function(index, user){
							if(user.email === email1){
								role=user.role;
							}
						});
						if(role==='admin'){
							window.location.href="admin/index.html";
						}
						else{
							window.location.href="user/index.html";
						}
					});
					/**/
				}
			});	
		}
	});
	

	$("#btn").on('click', function()
		{

			var fullName=$("#name").val();
			var email= $("#email").val();
			var password=$("#pass").val();

				if(fullName=="" || email=="" || password=="")
				{
					$("#error").html("Please fill all the fields");
				}
				else
				{
					$("#error").html("");
					var email2=$("#email").val();
					var password2=$("#pass").val();
					var set={email:email2,password:password2};
					
						db.createUser(set,function(error,UserData){});

						var create={name:fullName,email:email,password:password2,role:"user",};
						db.child("users").push().set(create, function(error)
						{	
							

							$("#status").html('Account Created');
							$("#email").val("");
							$("#pass").val("");
							$("#name").val("");
						});
				}	
		});

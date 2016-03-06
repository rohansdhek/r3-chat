	var currentUser = localStorage.getItem("currentUser")
	$("#currentUser").html(currentUser);
	var db = new Firebase("https://r3chat.firebaseio.com/users");

	db.on("value", function(data) {
	  var count = 0;
	  var users = data.val();
	  $("#users").html("");

	  $.each(users, function(index, value) {

	    var user_list = "<li class=\"li list-group-item\">" + value.name + "<span class=\"badge del\"><a href='#' onclick=\"removeUser('" + value.email + "','" + value.password + "','" + index + "')\" > <abbr title=\"Delete this User\"><i class=\"fa fa-times icon\"> </i></abbr></a></li>";
	    var temp = $("#users").html();
	    $("#users").html(temp + user_list);
	    count += 1;


	  });
	  $("#total").html("Users in total: " + count);

	});

	function removeUser(email, password, index) {
	  console.log("we are in remove");
	  var rem_user = {
	    email: email,
	    password: password
	  };
	  db.child(index).remove();
	  db.removeUser(rem_user, function(error) {
	    if (error) {
	      console.log(" User can't be deleted because" + error);
	    } else {
	      console.log("user successfully deleted");
	    }
	  });
	}

	//Message Counting
	var messages = new Firebase("https://r3chat.firebaseio.com/messages");
	messages.on("value", function(serverMessages) {

	  var count = 0;
	  var msg = serverMessages.val();
	  $.each(msg, function(index, value) {
	    count += 1;
	  });
	  $("#total_msg").html(count);

	});

	/*Logout Function*/
	$("#logout").on("click", function() {
	  localStorage.setItem("currentUser", "");
	  window.location.href = "../index.html";
	});

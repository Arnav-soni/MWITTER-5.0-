var firebaseConfig = {
    apiKey: "AIzaSyCMBo5C72KQkkXK5WdMzRZwXmU0xkT818o",
    authDomain: "mwitter-f7f43.firebaseapp.com",
    databaseURL: "https://mwitter-f7f43-default-rtdb.firebaseio.com",
    projectId: "mwitter-f7f43",
    storageBucket: "mwitter-f7f43.appspot.com",
    messagingSenderId: "869066985443",
    appId: "1:869066985443:web:f3fedae9b45b82f2695ad6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name1 = message_data['name'];
                        message = message_data['message'];
                        like1 = message_data['like'];
                        name_with_tag = "<h4>" + name1 + "<img src='tick.png' class='user_tick'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like1 + " onclick='updatelike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " +like1+ "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updatelike(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
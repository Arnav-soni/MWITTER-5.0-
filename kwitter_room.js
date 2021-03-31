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
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

function add_room() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room_name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";

}

function getData() {
  firebase.database().ref("/").on('value',
    function (snapshot) {
      document.getElementById("output").innerHTML =
        "";
      snapshot.forEach(function (childSnapshot) {
        childKey =
          childSnapshot.key;
        Room_names = childKey;
        //Start code
        console.log("room_name - "+ Room_names);
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToroomname(this.id)'>#"+Room_names +"</div> <hr>";
        document.getElementById("output").innerHTML += row;
        //End code
      });
    });
}
getData();
function redirectToroomname(name){
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html" ;

}
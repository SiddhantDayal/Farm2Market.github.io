const firebaseConfig = {
	apiKey: "AIzaSyC7XnxPkAMH8oMpgD8YDJH5xo-fTwsj28o",
	authDomain: "loginfirebase-43570.firebaseapp.com",
	databaseURL: "https://loginfirebase-43570-default-rtdb.firebaseio.com",
	projectId: "loginfirebase-43570",
	storageBucket: "loginfirebase-43570.appspot.com",
	messagingSenderId: "556401206349",
	appId: "1:556401206349:web:dd7046d06d79094e16e804",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

const signUpButton = document.querySelector(".submitBtn")
const logInButton = document.querySelector(".loginBtn")

// Set up our register function
function register() {
	// Get all our input fields
	console.log("I am in")
	full_name = document.getElementById("full_name").value
	email = document.getElementById("email").value
	password = document.getElementById("password").value
	console.log(email + password + full_name)
	phone_number = document.getElementById("phone_number").value
	aadhar_number = document.getElementById("aadhar_number").value

	// Move on with Auth
	auth.createUserWithEmailAndPassword(email, password)
		.then(function () {
			// Declare user variable
			var user = auth.currentUser
			console.log(user)

			// Add this user to Firebase Database
			var database_ref = database.ref()

			// Create User data
			var user_data = {
				email: email,
				full_name: full_name,
				phone_number: phone_number,
				aadhar_number: aadhar_number,
				last_login: Date.now(),
			}

			// Push to Firebase Database
			database_ref.child("users/" + user.uid).set(user_data)

			// Done
			alert("User Created!!")
		})
		.catch(function (error) {
			// Firebase will use this to alert of its errors
			var error_code = error.code
			var error_message = error.message

			// alert(error_message)
			console.log(error_code + error_message)
		})
}

// Set up our login function
function login() {
	// Get all our input fields
	email = document.getElementById("email").value
	password = document.getElementById("password").value

	auth.signInWithEmailAndPassword(email, password)
		.then(function () {
			// Declare user variable
			var user = auth.currentUser

			// Add this user to Firebase Database
			var database_ref = database.ref()

			// Create User data
			var user_data = {
				last_login: Date.now(),
			}

			// Push to Firebase Database
			database_ref.child("users/" + user.uid).update(user_data)

			// DOne
			goto()
			//alert("User Logged In!!")   
		})
		.catch(function (error) {
			// Firebase will use this to alert of its errors
			var error_code = error.code
			var error_message = error.message

			alert(error_message)
		})
}

function goto(){
	location.href="./firstp.html";
}
// Validate Functions
function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/
	if (expression.test(email) == true) {
		// Email is good
		return true
	} else {
		// Email is not good
		return false
	}
}

function validate_password(password) {
	// Firebase only accepts lengths greater than 6
	if (password < 6) {
		return false
	} else {
		return true
	}
}

function validate_field(field) {
	if (field == null) {
		return false
	}

	if (field.length <= 0) {
		return false
	} else {
		return true
	}
}

// signUpButton.addEventListener("click", register)
// logInButton.addEventListener("click", login)

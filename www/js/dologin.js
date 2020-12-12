var dologin = function(){
    let navigation = document.getElementById("bottomNav");
    navigation.classList.add("hide");
    content=document.getElementById("content");
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    content.appendChild(clon);
    let signupbutton = document.getElementById("signup-button");
// onclick event listener for signup form button
signupbutton.addEventListener("click",function(){
    let email = document.getElementById("signup-email").value;
let password = document.getElementById("signup-password").value;

auth.createUserWithEmailAndPassword(email, password).then(cred =>{
    navigation.classList.remove("hide");
    dohome();
    console.log("user signed up!")
    
    return db.collection('users').doc(cred.user.uid).set({
        favorite: "hello world2"
    });

})
console.log("signup form submitted.")
})
    let loginbutton = document.getElementById("login-button");
    loginbutton.addEventListener("click",function(){
        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;
        auth.signInWithEmailAndPassword(email,password).then(cred =>{
            console.log("user logged in")
            navigation.classList.remove("hide");
            dohome();
            // close login and signup modal, reset form, and display bottomNav
        })
    })


// switch between login and sign up tabs code below using tabs 
let signuptab = document.getElementById("signup-tab");
signuptab.addEventListener("click",function(){
    let signupForm = document.getElementById("signup-form");
    let loginForm = document.getElementById("login-form"); 
    loginForm.classList.add("hide");
    signupForm.classList.remove("hide");
signuptab.classList.add("active")
logintab.classList.remove("active")
});
let logintab = document.getElementById("login-tab");
logintab.addEventListener("click",function(){
    let signupForm = document.getElementById("signup-form");
    let loginForm = document.getElementById("login-form"); 
    loginForm.classList.remove("hide");
    signupForm.classList.add("hide");
    logintab.classList.add("active");
    signuptab.classList.remove("active");
});

   // content.innerHTML = ' <div class = "login-modal"><h1>Login</h1>
   //<label for = "login-email">Email</label>
   //<input id = "login-email" type = "email" placeholder = "example@gmail.com">
   //<br><label for = "login-password">Password</label>
   //<input id = "login-password" type = "password" placeholder = "******"></div>
   //<div id = "signup-form"><h1>Signup</h1><label for = "signup-email">
   //Email: </label><input type = "email" id = "signup-email" name = "signup-email" placeholder = "example@email.com">
   //<br><label for = "signup-password">Password: </label>
   //<input type = "password" id = "signup-password" name = "signup-password" placeholder = "Write at least 6 digits...">
   //<button name = "submit" id = "signup-button"> Submit </button></div>';


  
  

}
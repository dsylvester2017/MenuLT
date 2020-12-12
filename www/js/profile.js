var doprofile = function(){
    
    content=document.getElementById("content");
    content.innerHTML = `<div><h2>Profile Page</h2>
    <button id = "logout">Sign Out</button></div>
    <h4>Favorites</h4>`;
   // var temp = document.getElementsByTagName("template")[1];
   // var clon = temp.content.cloneNode(true);
   // content.appendChild(clon);
    
   let logout = document.getElementById("logout");
    logout.addEventListener("click",function(){
        console.log("clicked recognized logout")
        auth.signOut().then(cred=>{
            console.log("logged out!")
            document.getElementById("content").innerHTML = "";
            dologin();
        });
    })
   
   function findyelpfav(yelpid){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            
            let result = JSON.parse(this.responseText);
            //let workspace = document.getElementById("content");
            content.innerHTML += `<div style = "position:relative;">
            <img onclick="removefavorite('${result.id}')" style = "width:25px;height:25px;" src= "img/remove.png"/>
            ${result.name}
            </div>`;
        }
    }; 
    let url = "https://api.yelp.com/v3/businesses/"+yelpid;
    let API_KEY = "6u85EwwJj94SohWzva8zcBmH7wouQziJn7eeZjQgSfBPwBmveI1pN7Op5Z4DnAYXBgCFgSJPhMzE2WPLIGUKoKEpw5lg3F_SHcArrFSlJbYtKYhs9f9zo1KyiVyvX3Yx";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.setRequestHeader('Authorization', 'Bearer '+API_KEY);
   
    xmlhttp.send();
   }
   const displayFavs = (data)=> 
   {
       //let html = '';
       data.forEach(doc =>{
           const fav = doc.data();
           if (fav.user == firebase.auth().currentUser.uid){
               findyelpfav(fav.favorite)
               
           /* const li = `
            <li>
                 <div class="card">${fav.favorite}</div>
             </li>
            `
            html += li*/
           }
           
       })
      // content.innerHTML += html;
   }
   db.collection("favs").get().then(snapshot=>{
    displayFavs(snapshot.docs)
})

}
function removefavorite(yelpid){
    db.collection("favs").where("user", "==", firebase.auth().currentUser.uid)
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        
            if (doc.data().favorite == yelpid)
            {
                console.log("attempting delete")
                doc.ref.delete().then({
                    doprofile()
                });
                
            }
    });
})
}

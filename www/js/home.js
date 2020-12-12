

    
 




var dohome = function(){
    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccess = function(position) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            let workspace = document.getElementById("content");
            workspace.innerHTML = "Loading...";
            if (this.readyState == 4 && this.status == 200) {
                
                let result = JSON.parse(this.responseText);
                let workspace = document.getElementById("content");
                workspace.innerHTML = "<h2 class = 'title'> Open Restaurants Near your Area</h2>";
                build(result)
            }
        }; 
        let url = "https://api.yelp.com/v3/businesses/search?latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&categories=food&is_closed=false";
        let API_KEY = "6u85EwwJj94SohWzva8zcBmH7wouQziJn7eeZjQgSfBPwBmveI1pN7Op5Z4DnAYXBgCFgSJPhMzE2WPLIGUKoKEpw5lg3F_SHcArrFSlJbYtKYhs9f9zo1KyiVyvX3Yx";
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlhttp.setRequestHeader('Authorization', 'Bearer '+API_KEY);
       
        xmlhttp.send();
        
    };
 
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true, timeout: 20000 });
}
function doit(where){
    where = where + " Restaurant near me";
    window.location = "http://google.com/search?q="+where;
}
/*function setFav(yelpId){
    var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
    myId = profile.uid;
    yelpId = id;
    db.collection('favorites').add({
        person: myId,
        restaurant:yelpId
    }).then(() => {
        console.log("done")
    })
  });
}

  
}*/
function addToFavorite(Id)
{
    return db.collection('favs').doc().set({
        user: firebase.auth().currentUser.uid,
        favorite:Id
    }).then(() =>{
        document.getElementById(Id).src = "img/staractive.png"
    });
}
function build(obj){
    let workspace = document.getElementById("content");
    let favorites = ["user"]
    db.collection("favs").where("user", "==", firebase.auth().currentUser.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
                favorites.push(doc.data().favorite);
                console.log(favorites)
            console.log(doc.id, " => ", doc.data());
        });
        for (key in obj.businesses)
        {
    
            
        
         
        
        thisyelpid = obj.businesses[key].id;
        // let googleit = "'"+obj.businesses[key].name +"'";
        let googleit = obj.businesses[key].name.replace("'","");
        let businessId = obj.businesses[key].id;
        faved = "img/star.png"
        console.log(businessId)
        console.log(favorites[2])
        console.log
        favorited = favorites.includes(String(businessId))
        console.log(favorited)
        addyelpfav =` onclick = "addToFavorite('${businessId}')"`
        if (favorited == true){
            addyelpfav =   ` none`
            faved = "img/staractive.png"
            console.log("im in")
        }
        console.log(faved)
        workspace.innerHTML += '<img id = '+businessId+' style = "height:25px;width:25px;" src= "'+faved+'" '+addyelpfav+'>Add Restaurant below to favorite list<div class="cards-list" onclick = "doit(\''+googleit+'\')"><div class="card"><div class="card_image"> <img src="'+obj.businesses[key].image_url+'" /> </div><div class="card_title title-white"><p>'+obj.businesses[key].name+'</p></div></div></div>';
            
            // workspace.innerHTML += "  <div class='card'> <p class='title'>"+obj.businesses[key].name+"</p><div class='image'><img  style= 'height:100%;width:100%;overflow:hidden;'src= '"+obj.businesses[key].image_url+"'</div></div>" 
       
    
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   







}
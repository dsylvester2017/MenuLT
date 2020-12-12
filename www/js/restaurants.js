var dorestaurants = function(){
    let Restaurants = '  <div class = "searchForm"><h1 class="gwd-span-14hh" style = "text-align: center;">Discover Restaurants by location</h1><input id ="searchText" class="gwd-input-gth7" style = "width:100%" type="text" placeholder = "Discover restaurants by location: e.g: 33415, west"><button id = "searchButton" class="gwd-button-1elv gwd-button-2v8h">Search</button></div>';
    document.getElementById("content").innerHTML = Restaurants;



    function build(obj){
        let workspace = document.getElementById("content");
        workspace.innerHTML = "<h2 = 'title'> Discovering Restaurants near: " + obj.businesses[0].location.zip_code +"</h2>";
        for (key in obj.businesses)
        {
          
            let googleit = obj.businesses[key].name;
           workspace.innerHTML += '<div class="cards-list" onclick = "doit(\' '+googleit+' \')"><div class="card"><div class="card_image"> <img src="'+obj.businesses[key].image_url+'" /> </div><div class="card_title title-white"><p>'+obj.businesses[key].name+'</p></div></div></div>';
            // workspace.innerHTML += "  <div class='card'> <p class='title'>"+obj.businesses[key].name+"</p><div class='image'><img  style= 'height:100%;width:100%;overflow:hidden;'src= '"+obj.businesses[key].image_url+"'</div></div>" 
        }   
    }

    var onSearch = function() {
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            let workspace = document.getElementById("content");
            workspace.innerHTML = "Loading...";
            if (this.readyState == 4 && this.status == 200) {
                
                let result = JSON.parse(this.responseText);
                let workspace = document.getElementById("content");
           //     workspace.innerHTML = "<h1 class = 'title'> Discovering Restaurants near: " + document.getElementById("searchText").value+"</h1>";
                build(result)
            }
        }; 
        let url = "https://api.yelp.com/v3/businesses/search?location="+ document.getElementById("searchText").value +"&categories=food";
        let API_KEY = "6u85EwwJj94SohWzva8zcBmH7wouQziJn7eeZjQgSfBPwBmveI1pN7Op5Z4DnAYXBgCFgSJPhMzE2WPLIGUKoKEpw5lg3F_SHcArrFSlJbYtKYhs9f9zo1KyiVyvX3Yx";
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlhttp.setRequestHeader('Authorization', 'Bearer '+API_KEY);
       
        xmlhttp.send();
        
    };
    document.getElementById("searchButton").addEventListener("click",onSearch);

}
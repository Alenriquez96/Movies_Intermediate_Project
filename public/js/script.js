const heart = document.getElementById("like");
heart.addEventListener("click", like()) 

    function like (){

        if(heart.getAttribute('src') == "../../img/like_1.svg"){
    
            heart.setAttribute("src", "../../img/like_2.svg")
        
        } else {
        
            heart.setAttribute("src", "../../img/like_1.svg")
        }


    }

        
 


/* const like = async (offer) => {
    try {

        a(href='/movie/' + idMovie)
        
        let offerData = { 
            url: document.getElementById(`url${index}`).href,
            title: document.getElementById(`title${index}`).innerText,
            company: document.getElementById(`company${index}`).innerText,
            salary: document.getElementById(`salary${index}`).innerText,

        };

        const data = await fetch('http://localhost:3000/',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(offerData)
        })
        const res = await data.json()
        return res
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
} */






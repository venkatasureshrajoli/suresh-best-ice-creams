const express = require("express"),
        cors = require("cors"),
        request = require("request");
const app = express();
const PORT =  3001;
const YELP_AUTHORIZATION_TOKEN="e0avliKlTGlhb5AuyMWlvGPOUWmzJLIzkZGKSsvx5aAR4iKTWh6UBVvWE4DYqEKs5IB9yoY08OuJLcY-BVumoOZapvlVBZkjutLF7cJaXVTCoaR8f9VSBpwW4_51XXYx"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, (req,res)=>{
    console.log(`Server running on PORT ${PORT}`);
});

app.get("/ice-creams/:count", (req,res)=>{
    request.get({
        url:"https://api.yelp.com/v3/businesses/search?term=ice cream&location=Alpharetta&sort_by=rating",
        headers:{
        'Authorization':'Bearer '+YELP_AUTHORIZATION_TOKEN
    }}, function(err,response,body){
        if(err || response.statusCode!=200){
            res.status(400).send({status:false, error:true, message:"YELP Fusion Server Issue"});
        }
        let result;
        try{
            result = JSON.parse(body).businesses;
            result = result.slice(0,req.params.count);
            /* Manipulating and returning only required details */
            result = result.map((item)=>({id:item.id, name:item.name, address:`${item.location.address1} ${item.location.address2} ${item.location.address3}, ${item.location.city}`}));
        }catch(e){
            result = [];
        }
        res.status(200).send(result);
    });
});

app.get("/business/review/:id", (req,res)=>{
    request.get({
        url:`https://api.yelp.com/v3/businesses/${req.params.id}/reviews`,
        headers:{
        'Authorization':'Bearer '+YELP_AUTHORIZATION_TOKEN
    }}, function(err,response,body){
        if(err || response.statusCode!=200){
            res.status(400).send({status:false, error:true, message:"YELP Fusion Server Issue"});
        }
        let result;
        try{
            result = JSON.parse(body).reviews[0];
            /* Manipulating and returning only required details */
            result = {
             id:result.id,
             review: result.text,
             reviewer: result.user.name   
            }
        }catch(e){
            result = {};
        }
        res.status(200).send(result);
    });
});
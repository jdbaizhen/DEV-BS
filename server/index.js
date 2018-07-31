let express=require('express');
let app=express();
let bodyParser=require('body-parser');


let account=require('./routes/account');
let name='/collageLi';

app.listen(1208);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(name+'/user',account);

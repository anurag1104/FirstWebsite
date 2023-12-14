import express from "express";
import bodyParser from "body-parser";
import { render } from "ejs";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const date = new Date();
const cDate = date.toLocaleDateString();
var postArray = [];
var postNo=0;

app.get("/",(req,res)=>{
    res.render("index.ejs",{postArr:postArray});
}
);
app.post("/submit",(req,res)=>{
    var postContent = req.body.postText;
    var postName = req.body.postTitle;
    var postDescription = req.body.postDes;
    const postObj = {id:postNo,pcontent:postContent,pname:postName,pdes:postDescription,pdate:cDate};
    postArray.push(postObj);
    postNo++;
    console.log(postArray);    
    res.render("index.ejs",{postArr:postArray});
});

app.post("/del",(req,res)=>{
    console.log(req.body);
    var delPost = parseInt(req.body.id);
    postArray= postArray.filter((elem)=>{return elem.id!==delPost});
    res.redirect("/");
}
);

app.post("/view",(req,res)=>{
    var viewId = parseInt(req.body.id);
    var viewPost = postArray.filter((elem)=>{return elem.id===viewId})[0];
    res.render("view.ejs",{viewpost:viewPost}); 
}
);

app.post("/edit",(req,res)=>{
    var editID = parseInt(req.body.id);
    var editPost = postArray.filter((elem)=>{return elem.id === editID})[0];
    res.render("edit.ejs",{editpost:editPost}); 
}
);

app.post("/save",(req,res)=>{
    var saveId = parseInt(req.body.id);
    var saveIndex = postArray.findIndex((elem)=>{return elem.id===saveId});
    // var savePost = postArray.filter((elem)=>{return elem.id === saveId})[0];
    postArray[saveIndex].pname = req.body.editTitle;
    postArray[saveIndex].pdes = req.body.editDes;
    postArray[saveIndex].pcontent = req.body.editContent;

    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`The server is running on port:${port}`);
});

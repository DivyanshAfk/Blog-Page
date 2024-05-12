import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Dave",
    date: "2024-05-12",
  },
  {
    id: 2,
    title: "Exploring Culinary Delights: A Journey Through Global Cuisines",
    content:"Embark on a culinary adventure around the world with our blog series dedicated to exploring diverse cuisines and culinary traditions. From the spicy flavors of Thai street food to the comforting warmth of Italian pasta dishes, each post delves into the history, ingredients, and techniques behind beloved dishes. Join us as we celebrate the richness and diversity of global gastronomy.",
    author: "Dave",
    date: "2024-05-12",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Dave",
    date: "2024-05-12",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts",(req,res)=>{
  console.log(posts);
  res.json(posts);
})
//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id",(req,res)=>{
  const post = posts.find((p)=>{p.id === parseInt(req.params.id)});
  if(!post) return res.status(404).json({error :"Naah bruv"});
  res.json(post)
})
//CHALLENGE 3: POST a new post
app.post("/posts",(req,res)=>{
  const newId = lastId +1;
  const post ={
    id:newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  }
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
})

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id",(req,res)=>{
  const post = posts.find((p)=>{p.id === parseInt(req.params.id)});
  if(!post) res.status(404).json({error : "Naaaah bRuvvv"});

  if(req.body.title) post.title = req.body.title;
  if(req.body.content) post.content = req.body.content;
  if(req.body.author) post.author = req.body.author;

  res.json(post);
})
//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id",(req,res)=>{
  const index = posts.findIndex(p=>{p.id === parseInt(req.params.id)});
  if (index === -1) {
    res.status(404).json({messege :"nah bruv not found"});
  }
  posts.splice(index,1);
  res.json({messege:"Del bruv"})
})
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

let express= require('express')
let app=express()
let connection= require('./connection/mongo')
let shortUrl=require('./model/shortUrl');
const port = process.env.PORT || 5000; 


app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))


app.get('/',async(req,res)=>{
    let shortUrls=await shortUrl.find()
    res.render('index',{shortUrls:shortUrls})
})

app.post('/shortUrls',async(req,res)=>{
    await shortUrl.create({full:req.body.fullUrl})
    res.redirect('/')

})

app.get('/:shorturl',async(req,res)=>{

let shortUrls= await shortUrl.findOne({short:req.params.shorturl})
if (shortUrls == null) return res.sendStatus(404)

shortUrls.clicks++
shortUrls.save()

res.redirect(shortUrls.full)


})






app.listen(port,()=>{
    console.log(`server running on ${port} `)
})
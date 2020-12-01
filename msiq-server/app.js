
const express  = require('express');
const app = express()


app.use(express.static(__dirname+'/../dist/'))

app.get('/',(rep,res)=>{
    return res.sendFile('index.html',{root:__dirname+'/../dist/'})
})

app.listen(8080, () => {
  console.log(`Msiq app listening at http://localhost:${8080}`+ ' and in '+process.env.NODE_ENV+' mode')
})



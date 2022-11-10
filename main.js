
const express = require('express')
const yt = require("youtube-search-api");
const app = express()
const port = 3000;

function sürebulucu(video){
    if(video > "0:10") return false
    else if(video < "0:10") return true
}

async function videoBul(keyword){
    let videos = await yt.GetListByKeyword(keyword)
    if(!videos) return null;
    let sn = videos.items[0].length.simpleText
    for (let index = 0; index < videos.items.length; index++) {
        const element = videos.items[index];
        if(sürebulucu(element.length.simpleText) == true) return element.id
    }
    
}





app.get('/', async (req, res) => {
  let video = await videoBul(req.header("video"))
  if(video == null) return res.sendStatus(405)
  console.log(video)
  res.json(`https://www.youtube.com/watch?v=${video}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

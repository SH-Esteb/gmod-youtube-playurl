var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const { loadavg } = require("os");
const express = require('express')
const app = express()
app.use("/mp3",express.static(__dirname+"/mp3"));
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs')


app.get("/:id",(req,res)=>{
    let code = req.params.id
    const path = "/root/Musique/mp3/" + code + ".mp3"
    console.log(path)

    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": "/usr/bin/ffmpeg",
        "outputPath": "/root/Musique/example/mp3",
        "youtubeVideoQuality": "highest",
        "queueParallelism": 20,
        "progressTimeout": 2000
    });
        
    try {
        if (fs.existsSync(path)) {
            const linker = "http://_______/mp3/" + code + ".mp3"
            res.send( '{ "link":"' + linker + '"}');
        }else{
            YD.download(code, code + ".mp3")
    
            YD.on("finished", function(err, data) {
                    let pata = data.file.replace("/root/Musique/mp3/", "")
                    data.link = "http://__________/mp3/" + pata
                    res.send(data)
                    console.log(pata)
            });

            YD.on("error", function(error) {
                res.send(error)
            });

            YD.on("progress", function(progress) {
                console.log(JSON.stringify(progress));
            });
        }
      } catch(err) {
        console.error(err)
      }

})

app.listen(80)

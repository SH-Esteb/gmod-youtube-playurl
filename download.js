var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const { loadavg } = require("os");
const express = require('express')
const app = express()
app.use("/mp3",express.static(__dirname+"/mp3"));


app.get("/:id",(req,res)=>{
    let code = req.params.id
    console.log(code)

    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": "/usr/bin/ffmpeg",
        "outputPath": "/root/Musique/example/mp3",
        "youtubeVideoQuality": "highest",
        "queueParallelism": 2,
        "progressTimeout": 2000
    });
    
    //Download video and save as MP3 file
    YD.download(code)

    YD.on("finished", function(err, data) {
        let pata = data.file.replace("/root/Musique/example/mp3/", "")
        data.link = "http://217.160.255.98/mp3/" + pata
        res.send(data)
        console.log(pata)
    });
})

app.listen(80)

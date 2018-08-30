var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
    res.status(200).json({status: 1});
});

router.get('/youtube/:id', function(req, res, next) {
  res.render('youtube', { title: 'Express' });
});

router.get('/local/:id', function(req, res, next) {
    res.render('local', { title: 'Express' });
});

router.get('/content/:deviceId/:source', function(req, res, next) {

    global.db.ad.query(
        "call getNextContent(?, ?)",
        [req.params.deviceId, req.params.source]
    ).then(function(dataset){
        var row = dataset[0][0],
            videoParam = {
                suggestedQuality: 'hd720',
                endSeconds: 10
            };

        if (row.disabled) {
            videoParam.disabled = true;
        } else {
            videoParam = {
                videoId: "http://df.fun.co.ua:8082/" + row.ref
            };
            if (row.start) videoParam.startSeconds = row.start;
            if (row.end) videoParam.endSeconds = row.end;
        }

        res.status(200).json(videoParam);
    }).catch(function (e){
        console.log(e)
    });
});

router.get('/videos/:category', function(req, res, next) {
    global.db.ad.query(
        "select * from video",
        [req.params.category]
    ).then(function(rows){
        res.status(200).json(rows);
    });

});



module.exports = router;

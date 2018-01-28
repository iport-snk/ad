var express = require('express');
var router = express.Router();

/* GET home page. */
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
            videoParam;

        if (row.disabled) {
            videoParam = row;
        } else {
            videoParam = {
                videoId: row.ref,
                suggestedQuality: 'hd720'
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

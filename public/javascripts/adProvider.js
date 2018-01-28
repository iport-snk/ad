class AdProvider {
    static play (options = {listeners: {}}) {
        var mid  = this.getMonitorId();

        fetch(
            '/content/' + mid + '/ad',
            {cache: 'no-store'}
        ).then(response => response.json()).then( params => {
            if (params.hasOwnProperty('disabled')) {
                document.querySelectorAll('.box').forEach( item => item.style.display = 'none');
            } else {
                this.showBanner(params);
                setTimeout(AdProvider.play.bind(this, options), params.endSeconds * 1000);
                if (options.listeners.updated) {
                    options.listeners.updated(params);
                }
            }
        });
    }

    static showBanner (banner) {
        for (var item of document.querySelectorAll('.box')) {
            if (item.classList.contains('full-screen')) {
                var el = item;
                setTimeout( function () {
                    el.classList.remove('full-screen')
                }, 2000);
            }
            if (item.classList.contains('fade')) {
                item.style.backgroundImage = "url('" + banner.videoId + "')";
                if (banner.videoId.indexOf('/full-screen/') > -1) item.classList.add('full-screen');
                item.classList.remove('fade');
            } else {
                item.classList.add('fade');
            }
        }
    }

    static getMonitorId () {
        var params = window.location.pathname.split("/"),
            camId;

        if (params[1] == 'local' || params[1] == 'youtube') camId = params[2];

        return camId;
    }
}
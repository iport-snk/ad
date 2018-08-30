class AdProvider {
    static play (options = {listeners: {}}) {
        var mid  = this.getMonitorId(),
			gParams;

        $.get('/content/' + mid + '/ad').then( params => {
			gParams = params;
            this.showBanner(params);
            
            if (options.listeners.updated) {
                options.listeners.updated(params);
            }
        }).fail(() => {
			window.Android.handleException('error');
		}).always(() => {
			setTimeout(AdProvider.play.bind(this, options), gParams.endSeconds * 1000);
		});
    }

    static showBanner (banner) {
        for (var item of document.querySelectorAll('.box')) {
            if (banner.hasOwnProperty('disabled')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
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
    }

    static getMonitorId () {
        var params = window.location.pathname.split("/"),
            camId;

        if (params[1] == 'local' || params[1] == 'youtube') camId = params[2];

        return camId;
    }
}
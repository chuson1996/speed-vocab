var Crawler = require("crawler");
var cheerio = require('cheerio');
var fs = require('fs');
var q = require('q');
function goCrawler(url) {
	var def = q.defer();
	var c = new Crawler({
		maxConnections : 1,

		// This will be called for each crawled page
		onDrain: function() {
			console.log('END.');
		},
		callback : function (error, result, $$) {
			if (error) return console.log(error);
			if (result){
				//console.log(result.body);

				var bodyHTML='';
				var bodyJSON=[];
				console.log('-------------------------------------------------------------');
				var $ = cheerio.load(result.body.toString());
				$('img').each(function(item,elem){
					//console.log('elem src: ', $(elem).attr('src'));
					if ((/tia.png/g).test($(elem).attr('src'))) return;
					bodyHTML+='<img height="'+$(elem).attr('height')+'" width="'+$(elem).attr('width')+'" src="'+$(elem).attr('src')+'">';
					bodyJSON.push($(elem).attr('src'));
				});

				return def.resolve(bodyJSON);

			}
			else{
				def.reject('No result found');
				return;
			}
		}
	});
	c.queue({
		uri: 'https://www.google.fi/search?site=&tbm=isch&source=hp&q='+url.replace(' ','+'),
		retries:2,
	});
	return def.promise;
}

module.exports = goCrawler;
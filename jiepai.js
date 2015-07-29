var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var mongoose = require('mongoose');

var proxiedRequest = request.defaults({ proxy: "http://jpyoip01.mgmt.ericsson.se:8080" });
mongoose.connect('mongodb://localhost/flaskr');
var Pic = mongoose.model('Pic', { url: String });

down();

function down(){
	var url = 'http://tommyton.tumblr.com';

	(function woker(url2){
		console.log(url2);
		proxiedRequest.get(url2, function(err, response, body){
			$ = cheerio.load(body);
			$('.photo-wrapper-inner img').each(function() {
				var picUrl = $(this).attr('src');
				
				Pic.create({url: picUrl}, function(err, res){
					//console.log(res);
				});
			});

			var nextPage = $('#pagination a[class=next]').attr('href');
			if(nextPage){
				woker(url + nextPage);
			}

		});
	})(url);

}
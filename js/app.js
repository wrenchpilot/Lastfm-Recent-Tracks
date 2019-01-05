var Lastfm = {
	init: function(config) {
		this.url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+config.username+'&api_key='+config.apikey+'&limit='+config.count+'&format=json';
		this.template = config.template;
		this.container = config.container;
		this.fetch();
	},
	
	attachTemplate: function() {
		var template = Handlebars.compile(this.template);

		this.container.empty().append(template(this.tracks));
	},
	
	fetch: function() {
		var self = this;
		$.getJSON(this.url, function(data) {
			var feed = data.recenttracks.track;

			self.tracks = $.map(feed, function(track) {
				return {
					image: track.image[2]['#text'],
					song: track.name,
					artist: track.artist['#text'],
					album: track.album['#text'],
					link: track.url
				};
			});
			self.attachTemplate();
		});
	}
};
function getTrack(){
	 Lastfm.init({
		template: $('#tracks-template').html(),
		container: $('.container'),
		username: '<USER NAME>',
		count: "1",
		apikey: '<YOUR API KEY>'
	});
}
getTrack();
var interval = setInterval(getTrack, 30000);
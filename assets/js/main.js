(function() {
	'use-strict';
	var Main, Canvas, $
	$ = function(selector, root){
		if (root === undefined) root = window.document
		return root.querySelector(selector)
	}

	Main = {
		init: function() {
			var video = document.createElement('video')
			video.loop = video.autoplay = ' '
			video.volume = 0.05
			video.src = './assets/media/video/snail.webm'
			document.body.appendChild(video)
			var canvas = document.createElement('canvas')
			document.body.appendChild(canvas)
			var ctx = canvas.getContext('2d')
			ctx.canvas.width  = 1920
			ctx.canvas.height = 1080
			video.addEventListener('play', function() { Main.draw(video, ctx, video.videoWidth, video.videoHeight, 10, 10, window.innerHeight/video.videoHeight) }, false)
		},
		draw: function(video, ctx, vw, vh, ph, pw, pho) {
			if (video.paused || video.ended) return false
			if (ph !== window.innerHeight || pw !== window.innerWidth) {
				ph = window.innerHeight
				pw = window.innerWidth
				pho = ph/vh
			}

			ctx.drawImage(video, pw/2-vw*pho/2, 0, vw*pho, vh*pho)
			ctx.drawImage(video, 0, 0, 1, vh, 0, 0, pw/2-vw*pho/2, vh*pho)
			ctx.drawImage(video, vw-1, 0, 1, vh, pw/2+vw*pho/2, 0, pw/2+vw*pho/2, vh*pho)

			setTimeout(Main.draw, undefined, video, ctx, vw, vh, ph, pw, pho)
		}
	}

	document.addEventListener('DOMContentLoaded', Main.init)
}).call(this)
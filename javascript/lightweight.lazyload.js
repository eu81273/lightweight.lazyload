/*
 * lazy load for mobile browsers, the most lightweight
 *
 * Licensed under the MIT license.
 * Copyright 2015 AHN JAE-HA
 */


;(function($) {

	$.fn.lightweightLazyload = function (thresholdHeight) {

		var $window = $(window);
		var images = [];
		var wh = $window.height();
		var th = thresholdHeight || 0;

		//get images offset
		this.each(function() {

			//currunt image
			var $e = $(this);

			//top of image position
			var et = $e.offset().top;

			//bottom of image position
			var eb = et + $e.height();

			images.push({
				"self": this,
				"et": et,
				"eb": eb
			})
		});

		var lightweightLazyload = function () {

			//top of viewport
			var wt = $window.scrollTop() - th;

			//bottom of viewport
			var wb = wt + wh + th;

			//load images in viewport
			images = images.filter(function (item) {

				//out of viewport
				if (item.eb < wt) {
					return true;
				}

				//out of viewport but need update position
				else if (item.et > wb) {
					//currunt image
					var $e = $(item.self);

					//update top of image position
					item.et = $e.offset().top;

					//update bottom of image position
					item.eb = item.et + $e.height();

					return true;
				}

				//in viewport
				else {
					//load image
					item.self.setAttribute("src", item.self.getAttribute("data-src"));

					//remove from images array
					return false;
				}
			});

			//remove event when all image loaded
			if (!images.length){
				$window.off("scroll touchmove", lightweightLazyload);
			}
		}

		//scroll event
		$window.on("scroll touchmove", lightweightLazyload);

		//run at first time
		lightweightLazyload();

		return this;
	};

})(window.jQuery);

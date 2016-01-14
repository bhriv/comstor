/**
* Gumby Framework
* ---------------
*
* Follow @gumbycss on twitter and spread the love.
* We worked super hard on making this awesome and released it to the web.
* All we ask is you leave this intact. #gumbyisawesome
*
* Gumby Framework
* http://gumbyframework.com
*
* Built with love by your friends @digitalsurgeons
* http://www.digitalsurgeons.com
*
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/
!function($) {

	'use strict';

	function Gumby() {
		this.$dom = $(document);
		this.$html = this.$dom.find('html');
		this.isOldie = !!this.$html.hasClass('oldie');
		this.click = 'click';
		this.onReady = this.onOldie = this.onTouch = false;
		this.autoInit = $('script[gumby-init]').attr('gumby-init') === 'false' ? false : true;
		this.debugMode = Boolean($('script[gumby-debug]').length);
		this.touchDevice = !!(Modernizr.touch || window.navigator.userAgent.indexOf("Windows Phone") > 0);
		this.gumbyTouch = false;
		this.touchEvents = 'js/libs';
		this.breakpoint = Number($('script[gumby-breakpoint]').attr('gumby-breakpoint')) || 768;
		this.touchEventsLoaded = false;
		this.uiModulesReady = false;
		this.uiModules = {};
		this.inits = {};

		// jQuery mobile touch events
		var touch = $('script[gumby-touch]').attr('gumby-touch'),
			path = $('script[gumby-path]').attr('gumby-path');

		// do not use touch events
		if(touch === 'false') {
			this.touchEvents = false;

		// set path to jQuery mobile
		// support touch/path attrs for backwards compatibility
		} else {
			if(touch) {
				this.touchEvents = touch;
			} else if(path) {
				this.touchEvents = path;
			}
		}

		// update click property to bind to click/tap
		if(this.touchDevice) {
			this.click += ' tap';
		}

		// add gumby-touch/gumby-no-touch classes
		// gumby touch == touch enabled && smaller than defined breakpoint
		if(this.touchDevice && $(window).width() < this.breakpoint) {
			this.$html.addClass('gumby-touch');
			this.gumbyTouch = true;
		} else {
			this.$html.addClass('gumby-no-touch');
		}

		if(this.debugMode) {
			this.debug('Gumby is in debug mode');
		}
	}

	// initialize Gumby
	Gumby.prototype.init = function(options) {
		var scope = this,
			opts = options ? options : {};

		// call ready() code when dom is ready
		this.$dom.ready(function() {
			if(opts.debug) {
				scope.debugMode = true;
			}

			scope.debug("Initializing Gumby");

			// init UI modules
			var mods = opts.uiModules ? opts.uiModules : false;
			scope.initUIModules(mods);

			if(scope.onReady) {
				scope.onReady();
			}

			// call oldie() callback if applicable
			if(scope.isOldie && scope.onOldie) {
				scope.onOldie();
			}

			// call touch() callback if applicable
			if(Modernizr.touch && scope.onTouch) {
				scope.onTouch();
			}
		});

		return this;
	};

	Gumby.prototype.helpers = function() {
		if(this.onReady) {
			this.onReady();
		}

		// call oldie() callback if applicable
		if(this.isOldie && this.onOldie) {
			this.onOldie();
		}

		// call touch() callback if applicable
		if(Modernizr.touch && this.onTouch) {
			this.onTouch();
		}
	};

	// public helper - set Gumby ready callback
	Gumby.prototype.ready = function(code) {
		if(code && typeof code === 'function') {
			this.onReady = code;
		}

		return this;
	};

	// public helper - set oldie callback
	Gumby.prototype.oldie = function(code) {
		if(code && typeof code === 'function') {
			this.onOldie = code;
		}

		return this;
	};

	// public helper - set touch callback
	Gumby.prototype.touch = function(code) {
		if(code && typeof code === 'function') {
			this.onTouch = code;
		}

		return this;
	};

	// print to console if available and we're in debug mode
	Gumby.prototype.console = function(type, data) {
		if(!this.debugMode || !window.console) { return; }
		console[console[type] ? type : 'log'](data.length > 1 ? Array.prototype.slice.call(data) : data[0]);
	};

	// pass args onto console method for output
	Gumby.prototype.log = function() { this.console('log', arguments); };
	Gumby.prototype.debug = function() { this.console('debug', arguments); };
	Gumby.prototype.warn = function() { this.console('warn', arguments); };
	Gumby.prototype.error = function() { this.console('error', arguments); };

	// public helper - return debuggin object including uiModules object
	Gumby.prototype.dump = function() {
		return {
			$dom: this.$dom,
			isOldie: this.isOldie,
			touchEvents: this.touchEvents,
			debugMode: this.debugMode,
			autoInit: this.autoInit,
			uiModules: this.uiModules,
			click: this.click
		};
	};

	// grab attribute value, testing data- gumby- and no prefix
	Gumby.prototype.selectAttr = function() {
		var i = 0;

		// any number of attributes can be passed
		for(; i < arguments.length; i++) {
			// various formats
			var attr = arguments[i],
				dataAttr = 'data-'+arguments[i],
				gumbyAttr = 'gumby-'+arguments[i];

			// first test for data-attr
			if(this.is('['+dataAttr+']')) {
				return this.attr(dataAttr) ? this.attr(dataAttr) : true;

			// next test for gumby-attr
			} else if(this.is('['+gumbyAttr+']')) {
				return this.attr(gumbyAttr) ? this.attr(gumbyAttr) : true;

			// finally no prefix
			} else if(this.is('['+attr+']')) {
				return this.attr(attr) ? this.attr(attr) : true;
			}
		}

		// none found
		return false;
	};

	// add an initialisation method
	Gumby.prototype.addInitalisation = function(ref, code) {
		this.inits[ref] = code;
	};

	// initialize a uiModule, single / array of module refs
	Gumby.prototype.initialize = function(ref, all) {
		if(typeof ref === 'object') {
			var i = 0;
			for(i; i < ref.length; i++) {
				if(!this.inits[ref[i]] || typeof this.inits[ref[i]] !== 'function') {
					this.error('Error initializing module: '+ref[i]);
					continue;
				}

				this.inits[ref[i]](all);
			}
		} else if(this.inits[ref] && typeof this.inits[ref] === 'function') {
			this.inits[ref](all);
		} else {
			this.error('Error initializing module: '+ref);
		}

		return this;
	};

	// store a UI module
	Gumby.prototype.UIModule = function(data) {
		var module = data.module;
		this.uiModules[module] = data;
	};

	// loop round and init all UI modules
	Gumby.prototype.initUIModules = function(mods) {
		var x, m, arr = this.uiModules;

		// only initialise specified modules
		if(mods) {
			arr = mods;
		}

		// initialise everything
		for(x in arr) {
			m = mods ? arr[x] : x;
			this.uiModules[m].init();
		}
	};

	window.Gumby = new Gumby();

}(jQuery);

/**
* Gumby Checkbox
*/
!function($) {

	'use strict';

	function Checkbox($el) {

		Gumby.debug('Initializing Checkbox', $el);

		this.$el = $el;
		this.$input = this.$el.find('input[type=checkbox]');

		var scope = this;

		// listen for click event and custom gumby check/uncheck events
		this.$el.on(Gumby.click, function(e) {
			// prevent checkbox checking, we'll do that manually
			e.preventDefault();

			// do nothing if checkbox is disabled
            if(scope.$input.is('[disabled]')) {
                return;
            }

			// check/uncheck
			if(scope.$el.hasClass('checked')) {
				scope.update(false);
			} else {
				scope.update(true);
			}
		}).on('gumby.check', function() {
			Gumby.debug('Check event triggered', scope.$el);
			scope.update(true);
		}).on('gumby.uncheck', function() {
			Gumby.debug('Uncheck event triggered', scope.$el);
			scope.update(false);
		});

		// update any prechecked on load
		if(this.$input.prop('checked') || this.$el.hasClass('checked')) {
			scope.update(true);
		}
	}

	// update checkbox, check equals true/false to sepcify check/uncheck
	Checkbox.prototype.update = function(check) {
		var $span = this.$el.find('span');

		// check checkbox - check input, add checked class, append <i>
		if(check) {

			Gumby.debug('Checking Checkbox', this.$el);

			$span.append('<i class="icon-check" />');
			this.$input.prop('checked', true);

			Gumby.debug('Triggering onCheck event', this.$el);
			Gumby.debug('Triggering onChange event', this.$el);

			this.$el.addClass('checked').trigger('gumby.onCheck').trigger('gumby.onChange');

		// uncheck checkbox - uncheck input, remove checked class, remove <i>
		} else {
			
			Gumby.debug('Unchecking Checkbox', this.$el);

			this.$input.prop('checked', false);
			$span.find('i').remove();

			Gumby.debug('Triggering onUncheck event', this.$el);
			Gumby.debug('Triggering onChange event', this.$el);

			this.$el.removeClass('checked').trigger('gumby.onUncheck').trigger('gumby.onChange');
		}
	};

	// add initialisation
	Gumby.addInitalisation('checkbox', function() {
		$('.checkbox').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isCheckbox')) {
				return true;
			}
			// mark element as initialized
			$this.data('isCheckbox', true);
			new Checkbox($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'checkbox',
		events: ['onCheck', 'onUncheck', 'onChange', 'check', 'uncheck'],
		init: function() {
			Gumby.initialize('checkbox');
		}
	});
}(jQuery);

/**
* Gumby Fixed
*/
!function($) {

	'use strict';

	function Fixed($el) {

		Gumby.debug('Initializing Fixed Position', $el);

		this.$el = $el;

		this.$window = $(window);
		this.fixedPoint = '';
		this.pinPoint = false;
		this.fixedPointjQ = false;
		this.pinPointjQ = false;
		this.offset = 0;
		this.pinOffset = 0;
		this.top = 0;
		this.constrainEl = true;
		this.state = false;
		this.measurements = {
			left: 0,
			width: 0
		};

		// set up module based on attributes
		this.setup();

		var scope = this;

		// monitor scroll and update fixed elements accordingly
		this.$window.on('scroll load', function() {
			scope.monitorScroll();
		});

		// reinitialize event listener
		this.$el.on('gumby.initialize', function() {
			Gumby.debug('Re-initializing Fixed Position', $el);
			scope.setup();
			scope.monitorScroll();
		});
	}

	// set up module based on attributes
	Fixed.prototype.setup = function() {
		var scope = this;

		this.fixedPoint = this.parseAttrValue(Gumby.selectAttr.apply(this.$el, ['fixed']));

		// pin point is optional
		this.pinPoint = Gumby.selectAttr.apply(this.$el, ['pin']) || false;

		// offset from fixed point
		this.offset = Number(Gumby.selectAttr.apply(this.$el, ['offset'])) || 0;

		// offset from pin point
		this.pinOffset = Number(Gumby.selectAttr.apply(this.$el, ['pinoffset'])) || 0;

		// top position when fixed
		this.top = Number(Gumby.selectAttr.apply(this.$el, ['top'])) || 0;

		// constrain can be turned off
		this.constrainEl = Gumby.selectAttr.apply(this.$el, ['constrain']) || true;
		if(this.constrainEl === 'false') {
			this.constrainEl = false;
		}

		// reference to the parent, row/column
		this.$parent = this.$el.parents('.columns, .column, .row');
		this.$parent = this.$parent.length ? this.$parent.first() : false;
		this.parentRow = this.$parent ? !!this.$parent.hasClass('row') : false;

		// if optional pin point set then parse now
		if(this.pinPoint) {
			this.pinPoint = this.parseAttrValue(this.pinPoint);
		}

		this.fixedPointjQ = this.fixedPoint instanceof jQuery;
		this.pinPointjQ = this.pinPoint instanceof jQuery;

		// if we have a parent constrain dimenions
		if(this.$parent && this.constrainEl) {
			// measure up
			this.measure();
			// and on resize reset measurement
			this.$window.resize(function() {
				if(scope.state) {
					scope.measure();
					scope.constrain();
				}
			});
		}
	};

	// monitor scroll and trigger changes based on position
	Fixed.prototype.monitorScroll = function() {
		var scrollAmount = this.$window.scrollTop(),
			// recalculate selector attributes as position may have changed
			fixedPoint = this.fixedPointjQ ? this.fixedPoint.offset().top : this.fixedPoint,
			pinPoint = false,
			timer;

		// if a pin point is set recalculate
		if(this.pinPoint) {
			pinPoint = this.pinPointjQ ? this.pinPoint.offset().top : this.pinPoint;
		}

		// apply offsets
		if(this.offset) { fixedPoint -= this.offset; }
		if(this.pinOffset) { pinPoint -= this.pinOffset; }

		// fix it
		if((scrollAmount >= fixedPoint) && this.state !== 'fixed') {
			if(!pinPoint || scrollAmount < pinPoint) {
				this.fix();
			}
		// unfix it
		} else if(scrollAmount < fixedPoint && this.state === 'fixed') {
			this.unfix();

		// pin it
		} else if(pinPoint && scrollAmount >= pinPoint && this.state !== 'pinned') {
			this.pin();
		}
	};

	// fix the element and update state
	Fixed.prototype.fix = function() {
		Gumby.debug('Element has been fixed', this.$el);
		Gumby.debug('Triggering onFixed event', this.$el);

		this.state = 'fixed';
		this.$el.css({
			'top' : this.top
		}).addClass('fixed').removeClass('unfixed pinned').trigger('gumby.onFixed');

		// if we have a parent constrain dimenions
		if(this.$parent) {
			this.constrain();
		}
	};

	// unfix the element and update state
	Fixed.prototype.unfix = function() {
		Gumby.debug('Element has been unfixed', this.$el);
		Gumby.debug('Triggering onUnfixed event', this.$el);

		this.state = 'unfixed';
		this.$el.addClass('unfixed').removeClass('fixed pinned').trigger('gumby.onUnfixed');
	};

	// pin the element in position
	Fixed.prototype.pin = function() {
		Gumby.debug('Element has been pinned', this.$el);
		Gumby.debug('Triggering onPinned event', this.$el);
		this.state = 'pinned';
		this.$el.css({
			'top' : this.$el.offset().top
		}).addClass('pinned fixed').removeClass('unfixed').trigger('gumby.onPinned');
	};

	// constrain elements dimensions to match width/height
	Fixed.prototype.constrain = function() {
		Gumby.debug("Constraining element", this.$el);
		this.$el.css({
			left: this.measurements.left,
			width: this.measurements.width
		});
	};

	// measure up the parent for constraining
	Fixed.prototype.measure = function() {
		var parentPadding;

		this.measurements.left = this.$parent.offset().left;
		this.measurements.width = this.$parent.width();

		// if element has a parent row then need to consider padding
		if(this.parentRow) {
			parentPadding = Number(this.$parent.css('paddingLeft').replace(/px/, ''));
			if(parentPadding) {
				this.measurements.left += parentPadding;
			}
		}
	};

	// parse attribute values, could be px, top, selector
	Fixed.prototype.parseAttrValue = function(attr) {
		// px value fixed point
		if($.isNumeric(attr)) {
			return Number(attr);
		// 'top' string fixed point
		} else if(attr === 'top') {
			return this.$el.offset().top;
		// selector specified
		} else {
			var $el = $(attr);
			if(!$el.length) {
				Gumby.error('Cannot find Fixed target: '+attr);
				return false;
			}
			return $el;
		}
	};

	// add initialisation
	Gumby.addInitalisation('fixed', function(all) {
		$('[data-fixed],[gumby-fixed],[fixed]').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isFixed') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isFixed') && all) {
				$this.trigger('gumby.initialize');
				return true;
			}

			// mark element as initialized
			$this.data('isFixed', true);
			new Fixed($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'fixed',
		events: ['initialize', 'onFixed', 'onUnfixed'],
		init: function() {
			Gumby.initialize('fixed');
		}
	});
}(jQuery);

/**
* Gumby Navbar
*/
!function($) {

	'use strict';

	// define and init module on touch enabled devices only
	if(!Gumby.gumbyTouch) {
		return;
	}

	function Navbar($el) {

		Gumby.debug('Initializing Navbar', $el);

		this.$el = $el;
		this.$dropDowns = this.$el.find('li:has(.dropdown)');
		var scope = this;

		var persist = this.$el.attr('gumby-persist');
		if(typeof persist === 'undefined' && persist !== 'false') {
			this.$el.find('li:not(:has(.dropdown)) a').on(Gumby.click, function() {
				scope.$el.find('ul').removeClass('active');
			});
		}

		// when navbar items
		this.$dropDowns
		// are tapped hide/show dropdowns
		.on(Gumby.click, this.toggleDropdown)
		// are swiped right open link
		.on('swiperight', this.openLink);

		// if there's a link set
		if(this.$dropDowns.children('a').attr('href') !== '#') {
			// append an icon
			this.$dropDowns.children('a').append('<i class="icon-popup"></i>').children('i')
			// and bind to click event to open link
			.on(Gumby.click, this.openLink);
		}

		// override with childlinks
		this.$el.find('li:not(:has(.dropdown)) a[href]').on(Gumby.click, this.openLink);
	}

	Navbar.prototype.toggleDropdown = function(e) {
		e.preventDefault();

		if($(this).parents('.dropdown')) {
			e.stopImmediatePropagation();
		}

		if($(e.target).is('i')) {
			return;
		}

		var $this = $(this);

		if($this.hasClass('active')) {
			$this.removeClass('active');
		} else {
			$this.addClass('active');
		}
	};

	// handle opening list item link
	Navbar.prototype.openLink = function(e) {
		e.preventDefault();

		var $this = $(this),
			$el = $this, href;

		// tapped icon
		if($this.is('i')) {
			$el = $this.parent('a');
		// swiped li
		} else if($this.is('li')) {
			$el = $this.children('a');
		}

		href = $el.attr('href');

		// open in new window
		if($el.attr('target') == 'blank') {
			window.open(href);
		// regular relocation
		} else {
			window.location = href;
		}
	};

	// add initialisation
	Gumby.addInitalisation('navbar', function() {
		$('.navbar').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isNavbar')) {
				return true;
			}
			// mark element as initialized
			$this.data('isNavbar', true);
			new Navbar($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'navbar',
		events: [],
		init: function() {
			Gumby.initialize('navbar');
		}
	});
}(jQuery);

/**
* Gumby RadioBtn
*/
!function($) {

	'use strict';

	function RadioBtn($el) {

		Gumby.debug('Initializing Radio Button', $el);

		this.$el = $el;
		this.$input = this.$el.find('input[type=radio]');

		var scope = this;

		// listen for click event and custom gumby check event
		this.$el.on(Gumby.click, function(e) {
			// prevent radio button checking, we'll do that manually
			e.preventDefault();

			// do nothing if radio is disabled
            if (scope.$input.is('[disabled]')) {
                return;
            }

			// check radio button
			scope.update();
		}).on('gumby.check', function() {
			Gumby.debug('Check event triggered', scope.$el);
			scope.update();
		});

		// update any prechecked on load
		if(this.$input.prop('checked') || this.$el.hasClass('checked')) {
			scope.update(true);
		}
	}

	// check radio button, uncheck all others in name group
	RadioBtn.prototype.update = function() {

		// already checked so no need to update
		if(this.$el.hasClass('checked') && this.$input.prop('checked') && this.$el.find('i.icon-dot').length) {
			return;
		}

		Gumby.debug('Updating Radio Button group', this.$el);

		var $span = this.$el.find('span'),
			// the group of radio buttons
			group = 'input[name="'+this.$input.attr('name')+'"]';

		// uncheck radio buttons in same group - uncheck input, remove checked class, remove <i>
		$('.radio').has(group).removeClass('checked')
				.find('input').prop('checked', false).end()
				.find('i').remove();

		// check this radio button - check input, add checked class, append <i>
		this.$input.prop('checked', true);
		$span.append('<i class="icon-dot" />');

		Gumby.debug('Triggering onCheck event', this.$el);

		this.$el.addClass('checked').trigger('gumby.onCheck');
	};

	// add initialisation
	Gumby.addInitalisation('radiobtn', function() {
		$('.radio').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isRadioBtn')) {
				return true;
			}
			// mark element as initialized
			$this.data('isRadioBtn', true);
			new RadioBtn($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'radiobtn',
		events: ['onCheck', 'check'],
		init: function() {
			Gumby.initialize('radiobtn');
		}
	});
}(jQuery);

/**
* Gumby Retina
*/
!function($) {

	'use strict';

	function Retina($el) {
		
		Gumby.debug('Initializing Retina', $el);

		this.$el = $el;
		this.imageSrc = this.$el.attr('src');
		this.retinaSrc = this.fetchRetinaImage();
		this.$retinaImg = $(new Image());

		var scope = this;

		// image src not valid
		if(!this.retinaSrc) {
			return false;
		}

		// load retina image
		this.$retinaImg.attr('src', this.retinaSrc).load(function() {
			scope.retinaImageLoaded();
		}).error(function() {
			Gumby.error('Couln\'t load retina image: '+scope.retinaSrc);
		});
	}

	// fetch retina src by appending '@2x' to image string before extension
	Retina.prototype.fetchRetinaImage = function() {
		var imgSrc = this.imageSrc,
			index = this.imageSrc.search(/(\.|\/)(gif|jpe?g|png)$/i);

		// image src is not valid
		if(index < 0) {
			return false;
		}

		// return retina src
		return imgSrc.substr(0, index) + '@2x' + imgSrc.substr(index, imgSrc.length);
	};

	// once retina image loaded swap original src
	Retina.prototype.retinaImageLoaded = function() {
		Gumby.debug('Swapping image for retina version', this.$el);
		Gumby.debug('Triggering onRetina event', this.$el);
		this.$el.attr('src', this.$retinaImg.attr('src')).trigger('gumby.onRetina');
	};

	// add initialisation
	Gumby.addInitalisation('retina', function() {

		// this module is for retina devices only
		if(!window.devicePixelRatio || window.devicePixelRatio <= 1) {
			return;
		}

		$('img[data-retina],img[gumby-retina],img[retina]').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isRetina')) {
				return true;
			}
			// mark element as initialized
			$this.data('isRetina', true);
			new Retina($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'retina',
		events: ['onRetina'],
		init: function() {
			Gumby.initialize('retina');
		}
	});
}(jQuery);

/**
* Gumby SkipLink
*/
!function($) {

	'use strict';

	function SkipLink($el) {

		Gumby.debug('Initializing Skiplink', $el);

		this.$el = $el;
		this.targetPos = 0;
		this.duration = 0;
		this.offset = false;
		this.easing = '';
		this.update = false;

		// set up module based on attributes
		this.setup();

		var scope = this;

		// skip to target element on click or trigger of gumby.skipTo event
		this.$el.on(Gumby.click+' gumby.skip', function(e) {
			e.preventDefault();

			if(e.namespace === 'skip') {
				Gumby.debug('Skip event triggered', scope.$el);
			}

			// calculate target on each click if update var set to true
			if(scope.update) {
				scope.calculateTarget(scope.skipTo);

			// skip straight to target
			} else {
				scope.skipTo();
			}
		}).on('gumby.initialize', function() {
			Gumby.debug('Re-initializing Skiplink', scope.$el);
			scope.setup();
		});
	}

	// set up module based on attributes
	SkipLink.prototype.setup = function() {
		this.duration = Number(Gumby.selectAttr.apply(this.$el, ['duration'])) || 200;
		this.offset = Gumby.selectAttr.apply(this.$el, ['offset']) || false;
		this.easing = Gumby.selectAttr.apply(this.$el, ['easing']) || 'swing';
		this.update = Gumby.selectAttr.apply(this.$el, ['update']) ? true : false;

		this.calculateTarget();
	};

	// calculate target px point to skip to
	SkipLink.prototype.calculateTarget = function(cb) {

		var scope = this,
			target = Gumby.selectAttr.apply(this.$el, ['goto']),
			$target;

		// 'top' specified so target is 0px
		if(target == 'top') {
			this.targetPos = 0;

		// px point specified
		} else if($.isNumeric(target)) {
			this.targetPos = Number(target);
		} else {

			// check for element with target as selector
			$target = $(target);

			// target does not exist, we need a target
			if(!$target.length) {
				Gumby.error('Cannot find skiplink target: '+target);
				return false;
			}

			this.targetPos = $target.offset().top;
		}

		if(cb) {
			cb.apply(this);
		}
	};

	// animate body, html scrollTop value to target px point
	SkipLink.prototype.skipTo = function() {
		
		Gumby.debug('Skipping to target', this.$el);

		var scope = this;

		// slide to position of target
		$('html,body').animate({
			'scrollTop' : this.calculateOffset()
		}, this.duration, this.easing).promise().done(function() {

			Gumby.debug('Triggering onComplete event', scope.$el);
			scope.$el.trigger('gumby.onComplete');
		});
	};

	// calculate offset with current target point
	SkipLink.prototype.calculateOffset = function() {
		// no offset so return target here
		if(!this.offset) {
			return this.targetPos;
		}

		// negative / positive
		var op = this.offset.substr(0, 1),
			off = Number(this.offset.substr(1, this.offset.length));

		// subtract offset from target position
		if(op === '-') {
			return this.targetPos - off;
		// add offset to target position
		} else if(op === '+') {
			return this.targetPos + off;
		}
	};

	// add initialisation
	Gumby.addInitalisation('skiplink', function(all) {
		$('.skiplink > a, .skip').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isSkipLink') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isSkipLink') && all) {
				$this.trigger('gumby.initialize');
				return true;
			}

			// mark element as initialized
			$this.data('isSkipLink', true);
			new SkipLink($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'skiplink',
		events: ['initialize', 'onComplete', 'skip'],
		init: function() {
			Gumby.initialize('skiplink');
		}
	});
}(jQuery);

/**
* Gumby Tabs
*/
!function($) {

	'use strict';

	function Tabs($el) {

		Gumby.debug('Initializing Tabs', $el);

		this.$el = $el;
		this.$nav = this.$el.find('> ul.tab-nav > li');
		this.$content = this.$el.children('.tab-content');

		var scope = this;

		// listen for click event on tab nav and custom gumby set event
		this.$nav.children('a').on(Gumby.click, function(e) {
			e.preventDefault();
			scope.click($(this));
		});

		// listen for gumby.set value for dynamically set tabs
		this.$el.on('gumby.set', function(e, index) {
			Gumby.debug('Set event triggered', scope.$el);
			scope.set(e, index);
		});
	}

	// handle tab nav click event
	Tabs.prototype.click = function($this) {
		// index of item to activate
		var index = $this.parent().index();

		if(this.$nav.eq(index).add(this.$content.eq(index)).hasClass('active')) {
			return;
		}

		Gumby.debug('Setting active tab to '+index, this.$el);

		// deactivate other tab navigation and content
		this.$nav.add(this.$content).removeClass('active');

		// activate this tab nav link and content
		this.$nav.eq(index).add(this.$content.eq(index)).addClass('active');

		// trigger gumby.change event and pass current active tab index
		Gumby.debug('Triggering onChange event', this.$el);
		this.$el.trigger('gumby.onChange', index);
	};

	// set specific tab
	Tabs.prototype.set = function(e, index) {
		this.$nav.eq(index).find('a').trigger(Gumby.click);
	};

	// add initialisation
	Gumby.addInitalisation('tabs', function() {
		$('.tabs').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isTabs')) {
				return true;
			}
			// mark element as initialized
			$this.data('isTabs', true);
			new Tabs($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'tabs',
		events: ['onChange', 'set'],
		init: function() {
			Gumby.initialize('tabs');
		}
	});
}(jQuery);

/**
* Gumby Toggles/Switches
*/
!function($) {

	'use strict';

	// Toggle constructor
	function Toggle($el) {
		this.$el = $($el);
		this.targets = [];
		this.on = '';
		this.className = '';
		this.self = false;

		if(this.$el.length) {
			Gumby.debug('Initializing Toggle', $el);
			this.init();
		}
	}

	// Switch constructor
	function Switch($el) {
		this.$el = $($el);
		this.targets = [];
		this.on = '';
		this.className = '';
		this.self = false;

		if(this.$el.length) {
			Gumby.debug('Initializing Switch', $el);
			this.init();
		}
	}

	// intialise toggles, switches will inherit method
	Toggle.prototype.init = function() {
		var scope = this;

		// set up module based on attributes
		this.setup();

		// bind to specified event and trigger
		this.$el.on(this.on, function(e) {
			e.preventDefault();
			scope.trigger(scope.triggered);

		// listen for gumby.trigger to dynamically trigger toggle/switch
		}).on('gumby.trigger', function() {
			Gumby.debug('Trigger event triggered', scope.$el);
			scope.trigger(scope.triggered);
		// re-initialize module
		}).on('gumby.initialize', function() {
			Gumby.debug('Re-initializing '+scope.constructor, $el);
			scope.setup();
		});
	};

	// set up module based on attributes
	Toggle.prototype.setup = function() {
		this.targets = this.parseTargets();
		this.on = Gumby.selectAttr.apply(this.$el, ['on']) || Gumby.click;
		this.className = Gumby.selectAttr.apply(this.$el, ['classname']) || 'active';
		this.self = Gumby.selectAttr.apply(this.$el, ['self']) === 'false';
	};

	// parse data-for attribute, switches will inherit method
	Toggle.prototype.parseTargets = function() {
		var targetStr = Gumby.selectAttr.apply(this.$el, ['trigger']),
			secondaryTargets = 0,
			targets = [];

		// no targets so return false
		if(!targetStr) {
			return false;
		}

		secondaryTargets = targetStr.indexOf('|');

		// no secondary targets specified so return single target
		if(secondaryTargets === -1) {
			if(!this.checkTargets([targetStr])) {
				return false;
			}
			return [$(targetStr)];
		}

		// return array of both targets, split and return 0, 1
		targets = targetStr.split('|');
		if(!this.checkTargets(targets)) {
			return false;
		}
		return targets.length > 1 ? [$(targets[0]), $(targets[1])] : [$(targets[0])];
	};

	Toggle.prototype.checkTargets = function(targets) {
		var i = 0;

		for(i; i < targets.length; i++) {
			if(targets[i] && !$(targets[i]).length) {
				Gumby.error('Cannot find '+this.constructor.name+' target: '+targets[i]);
				return false;
			}
		}

		return true;
	};

	// call triggered event and pass target data
	Toggle.prototype.triggered = function() {
		// trigger gumby.onTrigger event and pass array of target status data
		Gumby.debug('Triggering onTrigger event', this.$el);
		this.$el.trigger('gumby.onTrigger', [this.$el.hasClass(this.className)]);
	};

	// Switch object inherits from Toggle
	Switch.prototype = new Toggle();
	Switch.prototype.constructor = Switch;

	// Toggle specific trigger method
	Toggle.prototype.trigger = function(cb) {

		Gumby.debug('Triggering Toggle', this.$el);

		var $target;

		// no targets just toggle active class on toggle
		if(!this.targets) {
			this.$el.toggleClass(this.className);

		// combine single target with toggle and toggle active class
		} else if(this.targets.length == 1) {
			this.$el.add(this.targets[0]).toggleClass(this.className);

		// if two targets check active state of first
		// always combine toggle and first target
		} else if(this.targets.length > 1) {
			if(this.targets[0].hasClass(this.className)) {
				$target = this.targets[0];
				
				// add this element to it unless gumby-self set
				if(!this.self) {
					$target = $target.add(this.$el);
				}

				$target.removeClass(this.className);
				this.targets[1].addClass(this.className);
			} else {
				$target = this.targets[0];
				
				// add this element to it unless gumby-self set
				if(!this.self) {
					$target = $target.add(this.$el);
				}

				$target.addClass(this.className);
				this.targets[1].removeClass(this.className);
			}
		}

		// call event handler here, applying scope of object Switch/Toggle
		if(cb && typeof cb === 'function') {
			cb.apply(this);
		}
	};

	// Switch specific trigger method
	Switch.prototype.trigger = function(cb) {

		Gumby.debug('Triggering Switch', this.$el);

		var $target;

		// no targets just add active class to switch
		if(!this.targets) {
			this.$el.addClass(this.className);

		// combine single target with switch and add active class
		} else if(this.targets.length == 1) {
			$target = this.targets[0];
				
			// add this element to it unless gumby-self set
			if(!this.self) {
				$target = $target.add(this.$el);
			}

			$target.addClass(this.className);

		// if two targets check active state of first
		// always combine switch and first target
		} else if(this.targets.length > 1) {
			$target = this.targets[0];
				
			// add this element to it unless gumby-self set
			if(!this.self) {
				$target = $target.add(this.$el);
			}

			$target.addClass(this.className);
			this.targets[1].removeClass(this.className);
		}

		// call event handler here, applying scope of object Switch/Toggle
		if(cb && typeof cb === 'function') {
			cb.apply(this);
		}
	};

	// add toggle initialisation
	Gumby.addInitalisation('toggles', function(all) {
		$('.toggle').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isToggle') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isToggle') && all) {
				$this.trigger('gumby.initialize');
			}

			// mark element as initialized
			$this.data('isToggle', true);
			new Toggle($this);
		});
	});

	// add switches initialisation
	Gumby.addInitalisation('switches', function(all) {
		$('.switch').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isSwitch') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isSwitch') && all) {
				$this.trigger('gumby.initialize');
				return true;
			}

			// mark element as initialized
			$this.data('isSwitch', true);
			new Switch($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'toggleswitch',
		events: ['initialize', 'trigger', 'onTrigger'],
		init: function() {
			// Run initialize methods
			Gumby.initialize('switches');
			Gumby.initialize('toggles');
		}
	});
}(jQuery);

/**
* Gumby jQuery Validation Plugin
*/
!function($) {

	'use strict';

	function Validation($this, req) {

		if(Gumby) {
			Gumby.debug('Initializing Validation', $this);
		}

		// input and holder .field
		this.$this = $this;
		this.$field = this.$this.parents('.field');

		// supplied validation function with default length check
		this.req = req || function() {
			return !!this.$this.val().length;
		};

		// reference to this class
		var scope = this;

		// checkboxes and radio buttons use gumby.onChange event to validate
		if(this.$this.is('[type=checkbox], [type=radio]')) {
			this.$field = this.$this.parent('label');
			this.$field.on('gumby.onChange', function() {
				scope.validate();
			});

		// selects validate on change
		} else if(this.$this.is('select')) {
			this.$field = this.$this.parents('.picker');
			this.$field.on('change', function() {
				scope.validate();
			});

		// others (text input, textarea) use blur
		} else {
			this.$this.on('blur', function(e) {
				// ignore tab
				if(e.which !== 9) {
					scope.validate();
				}
			});
		}
	}

	// validate field
	Validation.prototype.validate = function() {

		var result = this.req(this.$this);

		// failed
		if(!result) {
			this.$field.removeClass('success').addClass('danger');

		// passed
		} else {
		//} else if(this.$field.hasClass('danger')) {
			this.$field.removeClass('danger').addClass('success');
		}

		return result;
	};

	// jQuery plugin definition
	$.fn.validation = function(options) {

		var // extend params with defaults
			settings = $.extend({
				submit : false,
				fail: false,
				required : []
			}, options),
			// store validation objects
			validations = [];

		// init each form plugin is called on
		return this.each(function() {

			// no required fields so plugin is pointless
			if(!settings.required.length) {
				return false;
			}

			var $this = $(this),
				reqLength = settings.required.length,
				i;

			// loop round each required field and instantiate new validation object
			for(i = 0; i < reqLength; i++) {
				validations.push(new Validation(
					$this.find('[name="'+settings.required[i].name+'"]'),
					settings.required[i].validate || false
				));
			}

			// hijack submit event
			$this.on('submit', function(e) {

				// reference to whole form pass/fail
				var failed = false;

				// if no passed attribute found we should halt form submit
				if(!$this.data('passed')) {
					e.preventDefault();

					// loop round validation objects and validate each
					var reqLength = validations.length, i;
					for(i = 0; i < reqLength; i++) {
						if(!validations[i].validate()) {
							failed = true;
						}
					}

					// passed
					if(!failed) {
						// if submit method present call that otherwise submit form
						if(settings.submit && typeof settings.submit === 'function') {
							settings.submit($this.serializeArray());
							return;
						}

						// store passed bool and re-submit
						$this.data('passed', true).submit();

						// failed
						} else {
						// call fail method if present
						if(settings.fail && typeof settings.fail === 'function') {
							settings.fail();
							return;
						}
					}
				}
			});
		});
	};
}(jQuery);

/*!
 * Masonry PACKAGED v3.1.5
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c(a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(this),function(a){function b(a){"function"==typeof a&&(b.isReady?a():f.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==e.readyState;if(!b.isReady&&!c){b.isReady=!0;for(var d=0,g=f.length;g>d;d++){var h=f[d];h()}}}function d(d){return d.bind(e,"DOMContentLoaded",c),d.bind(e,"readystatechange",c),d.bind(a,"load",c),b}var e=a.document,f=[];b.isReady=!1,"function"==typeof define&&define.amd?(b.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],d)):a.docReady=d(a.eventie)}(this),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:this.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function d(a){function d(a){if("string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var d=f(a);if("none"===d.display)return c();var e={};e.width=a.offsetWidth,e.height=a.offsetHeight;for(var k=e.isBorderBox=!(!j||!d[j]||"border-box"!==d[j]),l=0,m=g.length;m>l;l++){var n=g[l],o=d[n];o=h(a,o);var p=parseFloat(o);e[n]=isNaN(p)?0:p}var q=e.paddingLeft+e.paddingRight,r=e.paddingTop+e.paddingBottom,s=e.marginLeft+e.marginRight,t=e.marginTop+e.marginBottom,u=e.borderLeftWidth+e.borderRightWidth,v=e.borderTopWidth+e.borderBottomWidth,w=k&&i,x=b(d.width);x!==!1&&(e.width=x+(w?0:q+u));var y=b(d.height);return y!==!1&&(e.height=y+(w?0:r+v)),e.innerWidth=e.width-(q+u),e.innerHeight=e.height-(r+v),e.outerWidth=e.width+s,e.outerHeight=e.height+t,e}}function h(a,b){if(e||-1===b.indexOf("%"))return b;var c=a.style,d=c.left,f=a.runtimeStyle,g=f&&f.left;return g&&(f.left=a.currentStyle.left),c.left=b,b=c.pixelLeft,c.left=d,g&&(f.left=g),b}var i,j=a("boxSizing");return function(){if(j){var a=document.createElement("div");a.style.width="200px",a.style.padding="1px 2px 3px 4px",a.style.borderStyle="solid",a.style.borderWidth="1px 2px 3px 4px",a.style[j]="border-box";var c=document.body||document.documentElement;c.appendChild(a);var d=f(a);i=200===b(d.width),c.removeChild(a)}}(),d}var e=a.getComputedStyle,f=e?function(a){return e(a,null)}:function(a){return a.currentStyle},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],d):"object"==typeof exports?module.exports=d(require("get-style-property")):a.getSize=d(a.getStyleProperty)}(window),function(a,b){function c(a,b){return a[h](b)}function d(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function e(a,b){d(a);for(var c=a.parentNode.querySelectorAll(b),e=0,f=c.length;f>e;e++)if(c[e]===a)return!0;return!1}function f(a,b){return d(a),c(a,b)}var g,h=function(){if(b.matchesSelector)return"matchesSelector";for(var a=["webkit","moz","ms","o"],c=0,d=a.length;d>c;c++){var e=a[c],f=e+"MatchesSelector";if(b[f])return f}}();if(h){var i=document.createElement("div"),j=c(i,"div");g=j?c:f}else g=e;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return g}):window.matchesSelector=g}(this,Element.prototype),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){for(var b in a)return!1;return b=null,!0}function d(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function e(a,e,f){function h(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}var i=f("transition"),j=f("transform"),k=i&&j,l=!!f("perspective"),m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[i],n=["transform","transition","transitionDuration","transitionProperty"],o=function(){for(var a={},b=0,c=n.length;c>b;b++){var d=n[b],e=f(d);e&&e!==d&&(a[d]=e)}return a}();b(h.prototype,a.prototype),h.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},h.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},h.prototype.getSize=function(){this.size=e(this.element)},h.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=o[c]||c;b[d]=a[c]}},h.prototype.getPosition=function(){var a=g(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=parseInt(a[c?"left":"right"],10),f=parseInt(a[d?"top":"bottom"],10);e=isNaN(e)?0:e,f=isNaN(f)?0:f;var h=this.layout.size;e-=c?h.paddingLeft:h.paddingRight,f-=d?h.paddingTop:h.paddingBottom,this.position.x=e,this.position.y=f},h.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={};b.isOriginLeft?(c.left=this.position.x+a.paddingLeft+"px",c.right=""):(c.right=this.position.x+a.paddingRight+"px",c.left=""),b.isOriginTop?(c.top=this.position.y+a.paddingTop+"px",c.bottom=""):(c.bottom=this.position.y+a.paddingBottom+"px",c.top=""),this.css(c),this.emitEvent("layout",[this])};var p=l?function(a,b){return"translate3d("+a+"px, "+b+"px, 0)"}:function(a,b){return"translate("+a+"px, "+b+"px)"};h.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={},k=this.layout.options;h=k.isOriginLeft?h:-h,i=k.isOriginTop?i:-i,j.transform=p(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},h.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},h.prototype.moveTo=k?h.prototype._transitionTo:h.prototype.goTo,h.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},h.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},h.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var q=j&&d(j)+",opacity";h.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:q,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(m,this,!1))},h.prototype.transition=h.prototype[i?"_transition":"_nonTransition"],h.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},h.prototype.onotransitionend=function(a){this.ontransitionend(a)};var r={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};h.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,d=r[a.propertyName]||a.propertyName;if(delete b.ingProperties[d],c(b.ingProperties)&&this.disableTransition(),d in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[d]),d in b.onEnd){var e=b.onEnd[d];e.call(this),delete b.onEnd[d]}this.emitEvent("transitionEnd",[this])}},h.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(m,this,!1),this.isTransitioning=!1},h.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var s={transitionProperty:"",transitionDuration:""};return h.prototype.removeTransitionStyles=function(){this.css(s)},h.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},h.prototype.remove=function(){if(!i||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.on("transitionEnd",function(){return a.removeElem(),!0}),this.hide()},h.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options;this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0})},h.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options;this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},h.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},h}var f=a.getComputedStyle,g=f?function(a){return f(a,null)}:function(a){return a.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],e):(a.Outlayer={},a.Outlayer.Item=e(a.EventEmitter,a.getSize,a.getStyleProperty))}(window),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){return"[object Array]"===l.call(a)}function d(a){var b=[];if(c(a))b=a;else if(a&&"number"==typeof a.length)for(var d=0,e=a.length;e>d;d++)b.push(a[d]);else b.push(a);return b}function e(a,b){var c=n(b,a);-1!==c&&b.splice(c,1)}function f(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()}function g(c,g,l,n,o,p){function q(a,c){if("string"==typeof a&&(a=h.querySelector(a)),!a||!m(a))return void(i&&i.error("Bad "+this.constructor.namespace+" element: "+a));this.element=a,this.options=b({},this.constructor.defaults),this.option(c);var d=++r;this.element.outlayerGUID=d,s[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var r=0,s={};return q.namespace="outlayer",q.Item=p,q.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},b(q.prototype,l.prototype),q.prototype.option=function(a){b(this.options,a)},q.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),b(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},q.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},q.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},q.prototype._filterFindItemElements=function(a){a=d(a);for(var b=this.options.itemSelector,c=[],e=0,f=a.length;f>e;e++){var g=a[e];if(m(g))if(b){o(g,b)&&c.push(g);for(var h=g.querySelectorAll(b),i=0,j=h.length;j>i;i++)c.push(h[i])}else c.push(g)}return c},q.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},q.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},q.prototype._init=q.prototype.layout,q.prototype._resetLayout=function(){this.getSize()},q.prototype.getSize=function(){this.size=n(this.element)},q.prototype._getMeasurement=function(a,b){var c,d=this.options[a];d?("string"==typeof d?c=this.element.querySelector(d):m(d)&&(c=d),this[a]=c?n(c)[b]:d):this[a]=0},q.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},q.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},q.prototype._layoutItems=function(a,b){function c(){d.emitEvent("layoutComplete",[d,a])}var d=this;if(!a||!a.length)return void c();this._itemsOn(a,"layout",c);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f],i=this._getItemLayoutPosition(h);i.item=h,i.isInstant=b||h.isLayoutInstant,e.push(i)}this._processLayoutQueue(e)},q.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},q.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},q.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},q.prototype._postLayout=function(){this.resizeContainer()},q.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},q.prototype._getContainerSize=k,q.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},q.prototype._itemsOn=function(a,b,c){function d(){return e++,e===f&&c.call(g),!0}for(var e=0,f=a.length,g=this,h=0,i=a.length;i>h;h++){var j=a[h];j.on(b,d)}},q.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},q.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},q.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},q.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e(d,this.stamps),this.unignore(d)}},q.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=d(a)):void 0},q.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},q.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},q.prototype._manageStamp=k,q.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,d=n(a),e={left:b.left-c.left-d.marginLeft,top:b.top-c.top-d.marginTop,right:c.right-b.right-d.marginRight,bottom:c.bottom-b.bottom-d.marginBottom};return e},q.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},q.prototype.bindResize=function(){this.isResizeBound||(c.bind(a,"resize",this),this.isResizeBound=!0)},q.prototype.unbindResize=function(){this.isResizeBound&&c.unbind(a,"resize",this),this.isResizeBound=!1},q.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},q.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},q.prototype.needsResizeLayout=function(){var a=n(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},q.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},q.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},q.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},q.prototype.reveal=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.reveal()}},q.prototype.hide=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.hide()}},q.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},q.prototype.getItems=function(a){if(a&&a.length){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f=this.getItem(e);f&&b.push(f)}return b}},q.prototype.remove=function(a){a=d(a);var b=this.getItems(a);if(b&&b.length){this._itemsOn(b,"remove",function(){this.emitEvent("removeComplete",[this,b])});for(var c=0,f=b.length;f>c;c++){var g=b[c];g.remove(),e(g,this.items)}}},q.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize(),delete this.element.outlayerGUID,j&&j.removeData(this.element,this.constructor.namespace)},q.data=function(a){var b=a&&a.outlayerGUID;return b&&s[b]},q.create=function(a,c){function d(){q.apply(this,arguments)}return Object.create?d.prototype=Object.create(q.prototype):b(d.prototype,q.prototype),d.prototype.constructor=d,d.defaults=b({},q.defaults),b(d.defaults,c),d.prototype.settings={},d.namespace=a,d.data=q.data,d.Item=function(){p.apply(this,arguments)},d.Item.prototype=new p,g(function(){for(var b=f(a),c=h.querySelectorAll(".js-"+b),e="data-"+b+"-options",g=0,k=c.length;k>g;g++){var l,m=c[g],n=m.getAttribute(e);try{l=n&&JSON.parse(n)}catch(o){i&&i.error("Error parsing "+e+" on "+m.nodeName.toLowerCase()+(m.id?"#"+m.id:"")+": "+o);continue}var p=new d(m,l);j&&j.data(m,a,p)}}),j&&j.bridget&&j.bridget(a,d),d},q.Item=p,q}var h=a.document,i=a.console,j=a.jQuery,k=function(){},l=Object.prototype.toString,m="object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1===a.nodeType&&"string"==typeof a.nodeName},n=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],g):a.Outlayer=g(a.eventie,a.docReady,a.EventEmitter,a.getSize,a.matchesSelector,a.Outlayer.Item)}(window),function(a){function b(a,b){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}var c=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++){var e=a[c];if(e===b)return c}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],b):a.Masonry=b(a.Outlayer,a.getSize)}(window);
/**
* Gumby Init
*/

!function($) {

	'use strict';

	// not touch device or no touch events required so auto initialize here
	if((!Gumby.touchDevice || !Gumby.touchEvents) && Gumby.autoInit) {
		window.Gumby.init();

	// load jQuery mobile touch events
	} else if(Gumby.touchEvents && Gumby.touchDevice) {
		Gumby.debug('Loading jQuery mobile touch events');
		// set timeout to 2sec
		yepnope.errorTimeout = 2000;
		Modernizr.load({
			test: Modernizr.touch,
			yep: Gumby.touchEvents+'/jquery.mobile.custom.min.js',
			complete: function() {
				// error loading jQuery mobile
				if(!$.mobile) {
					Gumby.error('Error loading jQuery mobile touch events');
				}

				// if not auto initializing
				// this will allow helpers to fire when initialized
				Gumby.touchEventsLoaded = true;

				// auto initialize
				if(Gumby.autoInit) {
					window.Gumby.init();

				// if already manually initialized then fire helpers
				} else if(Gumby.uiModulesReady) {
					Gumby.helpers();
				}
			}
		});
	}

	// if AMD return Gumby object to define
	if(typeof define == "function" && define.amd) {
		define(window.Gumby);
	}
}(jQuery);

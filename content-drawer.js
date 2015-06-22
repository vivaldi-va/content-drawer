/**
 * Created by zaccary.price on 19/06/2015.
 */



$(function() {
	"use strict";

	var panelTargetClass = 'panelTarget';

	var panelTarget = $('.' + panelTargetClass);
	var panelContent = $('.panel__Content');

	var unselectPanels = function() {
		panelTarget.each(function(index) {
			$(this).removeClass('panel-current');
		});

		$('.panel__ContentSection').each(function(index) {
			$(this).removeClass('panel__ContentSection-active');
		});

	};

	var hidePanel = function(panel, panelContent) {
		if(!!panel && !!panelContent) {
			panelContent.removeClass('panel__Content-active');
			panel.removeClass('panel-open');
		} else {
			$('.panel__Wrapper').each(function() {
				$(this).removeClass('panel-open');
				$(this).find('.panel__Content').removeClass('panel__Content-active');
				//$(this).find('.' + panelTargetClass).removeClass('panel-current');

			});
		}
	};

	var showPanel = function(panel, panelContent) {
		panelContent.addClass('panel__Content-active');
		panel.addClass('panel-open');
	};



	panelContent.on('click', function(e) {
		e.stopImmediatePropagation();
	});

	$(window).on('click', function(e) {
		hidePanel();
	});


	// loop through panels and panel targets and attach
	// class names to allow for easier identification
	$('.panel__Wrapper').each(function(panelIndex) {
		$(this).addClass('panel-' + panelIndex);

		$(this)
			.find('.' + panelTargetClass)
			.each(function(itemIndex) {
				$(this).addClass('panelItem-' + itemIndex);
				$(this).addClass('panelBelongsTo-' + panelIndex);
			});

	});


	var positionIndicator = function(indicator, target) {

		var targetWidth = target.clientWidth;
		var targetPos = {
			x: target.getBoundingClientRect().left,
			y: target.getBoundingClientRect().top
		};

		// use full indicator width to compensate for border size doubling effective
		// element dimensions
		var indicatorOffset = targetPos.x + (targetWidth/2) - indicator.clientWidth;

		$(indicator).css({
			transform: "translateX(" + indicatorOffset + "px)"
		});
	};


	panelTarget.on('click', function(e) {
		e.stopPropagation();
		var activePanel;
		var selectedPanelContentId;

		positionIndicator(panelContent.parent().find('.panel__Indicator')[0], this);

		activePanel = $(".panel-" + this.className.match(/panelBelongsTo-(\d+)/)[1]);

		// close panel if clicking currently selected panel (toggle behaviour)
		if($(this).hasClass('panel-current')) {

			$(this).removeClass('panel-current');

			hidePanel(activePanel, panelContent);

		} else {
			selectedPanelContentId = $(this).data('panelcontentid');

			unselectPanels();
			$(this).addClass('panel-current');
			showPanel(activePanel, panelContent);
			$('#' + selectedPanelContentId).addClass('panel__ContentSection-active');
//			panelContent.html($(this).data('panel-content'));
		}
	});
});


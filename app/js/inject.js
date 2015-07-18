'use strict';

$(document).ready(function() {
	var styles = 'font-weight:600;';
	var addFavButton = function(){
		var svg_star = '<svg style="vertical-align: middle;" width="16px" height="14px" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><path d="M12.805348,12.5 L10.9236493,13.427051 L11.2830218,11.4635255 L9.76069556,10.072949 L11.8644986,9.78647451 L12.805348,8 L13.7461973,9.78647451 L15.8500004,10.072949 L14.3276742,11.4635255 L14.6870466,13.427051 L12.805348,12.5 Z M0,1 C0,0.448 0.476999212,0 1.06497811,0 L12.8074822,0 C13.394394,0 13.8724603,0.444 13.8724603,1 C13.8724603,1.552 13.3954611,2 12.8074822,2 L1.06497811,2 C0.478066324,2 0,1.556 0,1 L0,1 Z M0,6 C0,5.448 0.476999212,5 1.06497811,5 L12.8074822,5 C13.394394,5 13.8724603,5.444 13.8724603,6 C13.8724603,6.552 13.3954611,7 12.8074822,7 L1.06497811,7 C0.478066324,7 0,6.556 0,6 L0,6 Z M0,11 C0,10.448 0.483401886,10 1.06391099,10 L7.47298765,10 C8.05989944,10 8.53689865,10.444 8.53689865,11 C8.53689865,11.552 8.05349676,12 7.47298765,12 L1.06391099,12 C0.476999212,12 0,11.556 0,11 L0,11 Z" fill="#FFFFFF"></path></svg>';
		$('.page-header--buttons').append('<div id="add-fav-button" class="button v-yellow" style="' + styles + '">'+ svg_star +' Bookmark</div>');
	}

	var removeFavButton = function(){
		var svg_added = '<svg style="vertical-align: middle;" width="17" height="14" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg"><path d="M11.036 10.864L9.62 9.45c-.392-.394-1.022-.39-1.413 0-.393.393-.39 1.023 0 1.414l2.122 2.12c.193.198.45.295.703.295.256 0 .51-.1.706-.295l4.246-4.246c.385-.385.39-1.02-.002-1.413-.393-.393-1.022-.39-1.412-.002l-3.537 3.538zM0 1c0-.552.447-1 1-1h11c.553 0 1 .444 1 1 0 .552-.447 1-1 1H1c-.553 0-1-.444-1-1zm0 5c0-.552.447-1 1-1h11c.553 0 1 .444 1 1 0 .552-.447 1-1 1H1c-.553 0-1-.444-1-1zm0 5c0-.552.447-1 1-1h4.5c.552 0 1 .444 1 1 0 .552-.447 1-1 1H1c-.552 0-1-.444-1-1z" fill="#FFFFFF" fill-rule="evenodd"></path></svg>'
		$('.page-header--buttons').append('<div id="remove-fav-button" class="button v-yellow" style="' + styles + '">'+ svg_added +' Remove</div>');
	}

	/*
	 * Get data about the collection
	 * title, url, username
	 */
	function getCollectionData(){
		var title = $(".page-header--title").text();
		var url = window.location.href;
		var tmp = $(".page-header--avatar a").attr('href');
		var user;

		if(typeof tmp === 'undefined') user = "Product Hunt";
		else user = tmp.substring(1, tmp.length);

		return {
			'title': title,
			'url': url,
			'user': user
		}
	}

	$(document).on('click', '#add-fav-button', function() {
		chrome.extension.sendMessage({
		   	action : 'add',
		   	data: getCollectionData()
		});
		$('#add-fav-button').remove();
		removeFavButton();
	});

	$(document).on('click', '#remove-fav-button', function(){
		chrome.extension.sendMessage({
		   	action : 'remove',
		   	data: getCollectionData()
		});
		$('#remove-fav-button').remove();
		addFavButton();
	});

	/*
	 * If this collection is already bookmark
	 */
	chrome.extension.sendMessage({
		action : 'fav',
		data: getCollectionData()
	}, function(response){
		if(response['result']) removeFavButton();
		else addFavButton();
	});
});

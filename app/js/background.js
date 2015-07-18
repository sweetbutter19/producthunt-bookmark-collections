'use strict';

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request) {
        var storageService = new collectionStorageService();
        if(request.action === 'add') { storageService.add(request.data); }
        else if(request.action === 'remove'){ storageService.remove(request.data.url); }
        else if(request.action === 'fav'){ sendResponse({'result': storageService.fav(request.data)}); }
    }
});

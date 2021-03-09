var searchBtn = $('.search-btn');
var keywordsEl = $('.keywords');
var formatselectEl = $('.format-select');

function sendRequest(event) {
    event.preventDefault();
    let inputKeywords = keywordsEl.val().replace(' ','-');
    let format = formatselectEl.val();
    if (format === 'All') {
        format = '';
    }
    let queryString = `?q=${inputKeywords}&format=${format}`;
    location.replace(`search-results.html${queryString}`);
    // 3.) Add search term to search history list (local storage)
}

function loadResponses() {
    let queryTerms = document.location.search.split('=');
    let keywords = queryTerms[0];
    let format = '';
    if (!queryTerms[2]) {
        format = 'search';
    } else {
        format = queryTerms[2];
    }
    searchUrl = `https://www.loc.gov/${format}/?q=${keywords}&fo=json`
    // 1.) Fetch results from API
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);
            }
        )}
    }
    // 2.) Build results list HTML elements from response 
}


$(document).on('click','.search-btn',sendRequest);
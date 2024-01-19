// ./web-server/html/js/scripts.js file:
"use strict";

// Simulate asynchronous data fetching
async function fetchData() {
    return new Promise(resolve => {
        $.getJSON(`http://${BUSINESS_TIER_CONTAINER}.${DOMAIN}:${BUSINESS_TIER_CONTAINER_PORT}/`, contacts => {
            console.log(contacts);
            resolve(contacts);
        });
    });
}

function displayKeyValuePair(key, value) {
    const listItem = $('<li>');

    // Create a span for the key
    listItem.append($('<span>').text(`${key}: `));

    // If the value is an array, create an unordered list for each item
    if (Array.isArray(value)) {
        const list = $('<ul>');

        // Display each item in the list
        value.forEach((item, index) => {
            list.append($('<li>').append(displayValue(index, item)));
        });

        listItem.append(list);
    } else {
        // Display the value
        listItem.append(displayValue(key, value));
    }

    // Append the list item to the contacts list
    $('#contactsList').append(listItem);
}

function displayValue(key, value) {
    // If the value is a URL, create an active hyperlink
    if (typeof value === 'string' && value.startsWith('http')) {
        return $('<a>').attr('href', value).text(value);
    }

    // Otherwise, display the value as text
    return $('<span>').text(value);
}

function processData(contacts) {
    contacts.forEach(contact => {
        // Display each key-value pair
        Object.entries(contact).forEach(([key, value]) => {
            displayKeyValuePair(key, value);
        });
    });
}

$(document).ready(async () => {
    // Fetch data asynchronously
    const contactsData = await fetchData();

    // Convert data to pretty JSON format and display in the #jsonSnippet element
    const prettyJSON = JSON.stringify(contactsData, null, 2);
    $('#jsonSnippet').text(prettyJSON);

    // Process and display data in the contacts list
    processData(contactsData);
});

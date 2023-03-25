const fs = require('fs');

const historyFile = './search-history.json';

/**
 * Saves search history to local file in json format.
 * @param {string} keyword - the keyword for the search
 * @param {number} resultCount - the count of search results
 * @returns {Promise} - a promise that resolves when save is complete
 */
function saveSearchHistory(keyword, resultCount) {
    // returns a promise that resolves when the save is complete
    return new Promise((resolve, reject) => {
    // checks if the search history exists
        fs.access(historyFile, fs.constants.F_OK, (err) => {
            if (err) {
                // if the file does not exist, creates it and adds to the history data
                fs.writeFile(historyFile, JSON.stringify([{ search: keyword, resultCount }]), (err) => {
                    // error check, rejects promise
                    if (err){
                        reject(err);
                    }
                    // else resolves promise
                    else{
                        resolve();
                    }
                });
            } else {
                // if file exists, reads the contents and updates the history data
                fs.readFile(historyFile, (err, data) => {
                    // error check, rejects promise
                    if (err){
                        reject(err);
                    }
                    else {
                        // parse the history data from file
                        let searchHistory = JSON.parse(data);
                        // finds the index of the search history item that matches the given keyword
                        const index = searchHistory.findIndex(item => item.search === keyword);
                        if (index !== -1) {
                            // if search history item exists, update result count
                            searchHistory[index].resultCount = resultCount;
                        } else {
                            // if does not exist then adds it to the history array
                            searchHistory.push({ search: keyword, resultCount });
                        }
                        // writes the updated search history data to the file
                        fs.writeFile(historyFile, JSON.stringify(searchHistory), (err) => {
                        // error check, rejects promise
                            if (err){
                                reject(err);
                            }
                            // else resolves promise
                            else{
                                resolve();
                            }
                        });
                    }
                });
            }
        });
    });
}

module.exports = 
{saveSearchHistory};

// NYT Bestsellers Lists cli.js
// Jean Paul Espinosa, Bruck Negash, Milca Ucelo
// CS4220-01
// Due: March 24, 2023

const yargs = require('yargs');
const app = require('./app.js');

yargs // (process.argv.slice(2))
    // $0 expands the file name
    // <> indicates that the command is mandatory
    // [] indicates that options are optional
    .usage('$0: Usage <command> [options]')
    .command(
        // command
        // <> indicates the command argument required
        'search <keyword>',
        // description of the command
        'search for books by keyword',
        // builder function to build out our command arguments and options
        // the argument inside the function below represents an instance of yargs
        (yargs) => {
            // configures a command argument based off the name
            // argument below must match the name given in the <>
            return (
                yargs.positional('keyword', {
                        describe: 'date (YYYY-MM-DD or "current") to search for NYT Bestselling Fiction books',
                        type: 'string',
                    })
            );
        },
        // handler functions for handling parsed command, command arguments, and options
        (args) => {
            try {
                const keyword = args.keyword;
                // if (keyword === 'current') {
                //     // invoke a function to search fiction NYT Bestsellers List
                //     app.searchFiction(keyword);
                // } else {
                //     // invoke function to search non-fiction NYT Bestsellers List
                //     app.searchFiction(keyword);
                // }
                app.searchFiction(keyword);
            } catch (error) {
                console.log(error);
            }
            
        }

    )
    .help().argv;
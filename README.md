# twitter-scraper

## Notes
This script runs with a "head" - a screen will pop up and the script will be loading the pages. This is because whatever browser is used in headless mode isn't supported by Twitter. Leave it running in the background - I've done mine in batches of ~100, but you can try doing a larger batch (I probably wouldn't do a batch much larger than 1000 anyway). It will take a while to run, especially with the screenshots enabled. 

Puppeteer has nice error handling in that when it can't find an item on the page, it times out and moves on without breaking. You are likely to see ```TimeoutError: Waiting for selector `[data-testid="UserDescription"]` failed: Waiting failed: 5000ms exceeded``` (or UserUrl) in your console - this just means that user doesn't have Description or Url set. 
## Environment
At least node 14.1.0, puppeteer won't run on anything older. 

## Prerequisites
- Downloaded Twitter archive
- Run your the archive through [Tim Hutton's Twitter Archive Parser](https://github.com/timhutton/twitter-archive-parser)
- Edit your followers list so that each row reads `["username", "twitter profile url"],`. Remember the `,` at the end of each line! Use VScode's "add a cursor on each line" and then "move cursor by word" to add necessary characters. 
- Remove any lines that have `~unknown~handle~` as the username - those are deleted accounts and won't have anything useful to scrape

## How to run

1. Replace `YOUR TWITTER PROFILE URL` with your actual Twitter profile url
2. If you want screenshot, make sure line 50 in not commented out. If you just want a text file, comment that line out. 
3. Copy your prepared list  on line 5 (so that all of it is inside `urlToSave` array). You'll have array of arrays. 
4. Run `node index.js`
5. The screenshots (if you opted for them) will be saved to the root folder of this project, and you'll have a file called `enhancedList.json` once your script has finished running.
6. If you're doing multiple batches, you'll need to rename the `enhancedList.json` to something else before running the next batch, otherwise the file will get overwritten. 

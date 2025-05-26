# Scrobble Scrubber

---

![image](img/screenshot.jpg)

## Background

This web app helps you clean up your Last.fm library by scanning for duplicate or keyword-matching tracks, albums, or artists.

Duplicate records often appear when streaming services update track or album metadata, such as adding a feature or deluxe tag. They can also arise from using multiple streaming platforms with inconsistent metadata.

Each duplicate found includes a direct link, allowing you to edit the scrobbles on the Last.fm website. Note that scrobble editing requires a Last.fm Pro subscription. You can also save your search results for future access, independent of this site.

You can also search all fetched items for a specific keyword you'd like to clean up, such as removing &apos;Remastered&apos; or &apos;Deluxe&apos; from your library.

## Usage

The app is live at https://split-scrobble-finder-v2.vercel.app/.

Simply input your username and select either tracks, albums, or artists to scan your profile for split scrobbles.

There is an option to "use rules". Selecting this option will use a custom rule set I developed to help eliminate false split scrobbles. For example, "Human After All" and "Human After All - SebastiAn Remix" would not be detected as split scrobbles if the rule set is enabled. Otherwise, standard string similarity would be used, which would result in those two tracks being detected as a duplicate.

I recommend trying requests in both fashions. If you find that the rule set fails to detect true split scrobbles or falsely identifies split scrobbles, feel free to raise an issue here on GitHub or message me with the issue. The rule set algorithm can always be improved!

Note that request times can be significant, as it requires numerous strenuous calls to the Last.fm API.

Once your results have been fetched, you can paginate through the detected split entries, where each entry provides a hyperlink to the specified track/album/artist in your library on the Last.fm site. You can then edit the scrobbles as desired on Last.fm. You can also download your results in either JSON or CSV format, so you don't have to keep waiting for your results to be generated if you want to view your results again. The search tab allows you to find specific keywords in the fetched results that you may want to clean up, such as finding all tracks that have "Remastered" in the title.

## Getting Started

To run this app locally, you must have your own Last.fm API credentials. See [here](https://www.last.fm/api/account/create) for more details.

Once you have an API key, create a `.env.local` file in the root directory and add the key. The file should look as follows:

```
LAST_FM_API_KEY=somealphanumericvalue
```

First, install all dependencies:

```
npm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

There is a set of tests written to ensure the duplication detection algorithm works for various tag differences I have found in my own library.

Simply run the following in the root directory to run these tests:

```
npm run test
```

## Technical Specs

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The dependencies for this have been kept to a bare minimum, relying only on React and Next.js. Tailwind is used for the CSS. Keeping the app lightweight ensures it won't fall into disrepair due to outdated and/or deprecated dependencies.

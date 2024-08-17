import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
    const url = 'https://en.wikipedia.org/wiki/Web_scraping';

    try {
        // Fetch the HTML of the page
        const { data } = await axios.get(url);
        
        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Extract the first paragraph of the article
        const firstParagraph = $('#mw-content-text .mw-parser-output > p').first().text();

        // Extract all the links in the references section
        const links = [];
        $('#mw-content-text .mw-parser-output .reflist a').each((index, element) => {
            links.push($(element).attr('href'));
        });

        // Debug: Log the extracted data
        console.log({ firstParagraph, links });

        // Return the scraped data as JSON
        return NextResponse.json({ firstParagraph, links });
    } catch (error) {
        console.error('Error fetching the page:', error);
        return NextResponse.json({ error: 'Failed to scrape data' }, { status: 500 });
    }
}

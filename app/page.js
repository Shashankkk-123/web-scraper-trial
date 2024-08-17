'use client';
import { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/scraper');
                const result = await response.json();
                console.log(result); // Debug: Log the result to see what is being returned
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Handle case where data or links might be undefined
    if (!data || !data.links) {
        return <p>No data available</p>;
    }

    return (
        <div>
            <h1>Scraped Data</h1>
            <h2>First Paragraph: {data.firstParagraph || 'No content found'}</h2>
            <h3>Links:</h3>
            <ul>
                {data.links.length > 0 ? (
                    data.links.map((link, index) => (
                        <li key={index}><a href={link}>{link}</a></li>
                    ))
                ) : (
                    <li>No links found</li>
                )}
            </ul>
        </div>
    );
}

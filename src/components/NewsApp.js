import React, { useState, useEffect, useRef } from 'react'
import News from './News';
import './NewsApp.css'

function NewsApp() {
    const apiKey = 'a17a903ecba8400d8ebbc65b4691a3df';

    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('technology');

    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-03-07&sortBy=publishedAt&apiKey=${apiKey}`;

    const queryInputRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [query]);

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();

            setNewsList(jsonData.articles);
        } catch (err) {
            console.log(err, 'error occured');
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const queryValue = queryInputRef.current.value;
        setQuery(queryValue);
    }

    return (
        <>
            <h1 style={{ fontSize: '2.5rem' }}>News App</h1>
            <form onSubmit={handleSubmit}>
                <input className='query-input' type="text" ref={queryInputRef} placeholder=' search your news' />
                <input className='btn-submit' onClick={handleSubmit} type="submit" value="Submit" />
            </form>
            <div
                style={{ display: 'flex', flexWrap: 'wrap', width: '100vw', rowGap: '20px', gap: '20px', justifyContent: 'center', marginTop: '20px' }}
            >
                {newsList.map((news) => {
                    return <News key={news.url} urlToImage={news.urlToImage} title={news.title} url={news.url} />
                })}
            </div>
        </>
    )
}

export default NewsApp
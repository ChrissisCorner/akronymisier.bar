import React, { useEffect, useState } from 'react';
import { ReactComponent as ApplePodcastsBadge } from './apple-podcasts-badge.svg';
import './App.css';
import EpisodeItem from './EpisodeItem';

function App() {
  const [items, setItems] = useState([] as Element[]);

  useEffect(() => {
    const readFeed = async () => {
      const res = await fetch('/feed.rss');
      const str = await res.text();
      const data = new window.DOMParser().parseFromString(str, 'text/xml');
      console.log(data);
      const items = data.getElementsByTagName('item');
      setItems(Array.from(items));
    };
    readFeed();
  }, []);

  return (
    <div className="App">
      <header>
        {/* <h1>Akronymisierbar</h1> */}
        <img className='logo' src="logo.jpg" alt="podcast logo showing headphones and the text Akronymisierbar" />
      </header>
      <p>Podcast von und mit <a href="https://chaos.social/@hoodie">@hoodie</a> und <a href="https://chaos.social/@kilian">@kilian</a>. Geballtes gefährliches Halbwissen zu allem rund um Programmiersprachen, Messengern und anderen (meist technischen) Themen, die uns spontan einfallen.</p>
      <h2>Links</h2>
      <ul>
        <li><a href="https://feed.akronymisier.bar">RSS Feed</a></li>
        <li><a href="https://itunes.apple.com/de/podcast/akronymisierbar/id1200334668">Apple Podcasts</a></li>
        <li><a href="https://matrix.to/#/#akronymisierbar:matrix.org">Matrix</a></li>
        <li><a href="https://chaos.social/@akronymisierbar">Fediverse</a></li>
        <li><a href="https://liberapay.com/akronymisierbar/">Liberapay</a></li>
      </ul>
      <h2>Folgen</h2>
      {items.map((item, index) => (
        <EpisodeItem 
          title={item.getElementsByTagName('title')[0].textContent ?? ''}
          date={item.getElementsByTagName('pubDate')[0].textContent ?? ''}
          duration={item.getElementsByTagName('itunes:duration')[0].textContent ?? ''}
          summary={item.getElementsByTagName('itunes:summary')[0].textContent ?? ''}
        />
      ))}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Play, Music2, Film, Maximize, Settings2, ArrowRight, MonitorPlay, X } from 'lucide-react';
import { safeUrl, theaterUrl } from './links';
import './styles.css';

const services = [
  {id:'jellyfin', name:'Jellyfin', tag:'MOVIES & SERIES', description:'Your library. Your next great watch.', Icon:Film},
  {id:'navidrome', name:'Navidrome', tag:'YOUR MUSIC', description:'A soundtrack for the pause.', Icon:Music2},
  {id:'plex', name:'Plex', tag:'MORE TO EXPLORE', description:'All your entertainment, together.', Icon:Play},
];
const defaults = {jellyfin:'https://alfiejelly.duckdns.org:8443/', navidrome:'https://music.casasola.io/', plex:'https://app.plex.tv/desktop/'};
function readSettings() {
  try { const stored = JSON.parse(localStorage.getItem('casasola-theater.urls') || '{}');
    return Object.fromEntries(Object.entries(defaults).map(([key,value])=>[key,Object.hasOwn(stored,key) ? safeUrl(stored[key]) : value]));
  } catch { return defaults; }
}
function App() {
  const [urls,setUrls] = useState(readSettings);
  const [editing,setEditing] = useState(false);
  const [notice,setNotice] = useState('');
  const [help,setHelp] = useState(false);
  function save(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = Object.fromEntries(services.map(({id})=>[id,safeUrl(data.get(id))]));
    if (services.some(({id})=>data.get(id) && !next[id])) {setNotice('Use a full HTTPS address without a username or password.');return;}
    setUrls(next);
    try {localStorage.setItem('casasola-theater.urls',JSON.stringify(next));setNotice('Links saved on this browser.');}
    catch {setNotice('Links updated for this visit. This browser could not save them.');}
    setEditing(false);
  }
  return <div className="shell">
    <header><a className="brand" href="/" aria-label="Casasola Theater home"><img src="/favicon.jpg" alt=""/><span>casasola<span className="brand-dot">.</span><small>THEATER</small></span></a><div className="header-right"><span className="label">YOUR PERSONAL BOX OFFICE</span><button className="quiet" onClick={()=>{setEditing(!editing);setNotice('');}} aria-expanded={editing}><Settings2 size={18}/> Edit links</button></div></header>
    <main>
      <section className="hero"><div><p className="eyebrow"><span/> THE GOOD PART OF THE WAIT</p><h1>Park. Play.<br/><span>Make yourself at home.</span></h1><p className="intro">Your movies, your music, your little intermission.</p></div><div className="hero-art" aria-hidden="true"><div className="orbit one"/><div className="orbit two"/><div className="screen"><MonitorPlay strokeWidth={1}/><span>CASASOLA / NOW SHOWING</span></div><span className="art-caption">A LITTLE ESCAPE. ONE TAP AWAY.</span></div></section>
      <div className="section-bar"><h2>Choose your escape</h2><span>01 — 03 / YOUR APPS</span></div>
      <section className="cards" aria-label="Media services">{services.map(({id,name,tag,description,Icon},index)=><article className={`card ${id}`} key={id}><div className="card-top"><span className="app-icon"><Icon size={32} strokeWidth={1.6}/></span><span className="number">0{index+1}</span></div><div className="card-copy"><p className="tag">{tag}</p><h3>{name}</h3><p>{description}</p></div><div className="card-actions">{urls[id]?<><a className="launch" href={theaterUrl(urls[id])} aria-label={`Launch ${name} in Tesla Theater`}>Launch {name}<ArrowUpRight size={21}/></a><a className="direct" href={urls[id]} aria-label={`Open ${name} directly`}>Open directly <ArrowRight size={15}/></a></>:<><button className="launch" onClick={()=>setEditing(true)}>Set up {name}<ArrowUpRight size={21}/></button><span className="unconfigured">Add your server address to begin</span></>}</div></article>)}</section>
      <section className="theater-strip"><div className="strip-icon"><Maximize size={23}/></div><div><h2>A bigger screen for your downtime.</h2><p>Open this launcher in Tesla Theater, then choose an app.</p></div><a className="outline" href={theaterUrl(window.location.origin + window.location.pathname)}>Enter Theater <ArrowUpRight size={18}/></a></section>
      <div className="help-row"><span>Made for a little downtime. Enjoy while parked.</span><button className="quiet" onClick={()=>setHelp(!help)} aria-expanded={help}>Theater not opening? <span>{help?'−':'+'}</span></button></div>
      {help&&<aside className="help"><h2>If Theater doesn’t open</h2><p>Theater links use YouTube’s redirect page. Choose its destination link to continue. Fullscreen behavior depends on your Tesla software and may change.</p><p>Use <strong>Open directly</strong> under any app to skip the redirect, then try the player’s fullscreen button. Sign in inside each service as usual. Bookmark this launcher to return easily.</p></aside>}
      {editing&&<section className="settings" aria-labelledby="settings-title"><div className="settings-heading"><h2 id="settings-title">Your media addresses</h2><button className="quiet" aria-label="Close link settings" onClick={()=>setEditing(false)}><X/></button></div><p>Use addresses reachable from your car. Changes are saved only in this browser.</p><form onSubmit={save}>{services.map(({id,name})=><label key={id}>{name}<input type="url" autoFocus={id === "jellyfin"} name={id} defaultValue={urls[id]} placeholder="https://your-server.example" autoComplete="off" spellCheck="false"/></label>)}<button className="launch save" type="submit">Save links <ArrowRight size={18}/></button></form></section>}
      <p className="notice" role="status">{notice}</p>
    </main><footer><span>CASASOLA THEATER <span className="footer-slash">/</span> Your media. A change of scenery.</span><a href="https://casasola.io">casasola.io <ArrowUpRight size={14}/></a></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);

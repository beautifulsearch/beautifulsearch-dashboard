import React from 'react';

export default function Home() {
  return(
    <div className="home__container">
      <div className="connection__box">
        <h4 className="connection__welcome-text">Welcome to BeautifulSearch</h4>
        <h2 className="connection__headline">
          Let's start by connecting to your Solr instance
        </h2>
        <h5 className="connection__subheading">
          This Solr instance will be used for all operations like query optimization and relevence tuning.
        </h5>

        <input className="connection__url" placeholder="https://www.mysolr.com" />
        <button className="connection__button button--primary">Connect</button>
      </div>

      {/* TODO: list past urls */}
    </div>
  )
}

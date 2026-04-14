import React, { useEffect, useState } from 'react';
import useMatchStore from './store/useMatchStore';
import './App.css';

function App() {
  const { matches, fetchMatches, loading, error } = useMatchStore();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 2; // Requirement: 2 matches per page

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  if (loading) return <div className="status">Loading AFCON Results...</div>;
  if (error) return <div className="status error">{error}</div>;

  // Logic to get current matches for the page
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  // Total pages calculation
  const totalPages = Math.ceil(matches.length / matchesPerPage);

  return (
    <div className="App">
      <header className="header">
        <div className="logo-container">
          <h1>AFCON 2026</h1>
          <p>Quarter-Finals Official Results</p>
        </div>
      </header>

      <main className="container">
        <section className="match-grid">
          {currentMatches.map((match) => (
            <div key={match.id} className="match-card">
              <div className="match-meta">
                <span>{match.stadium}</span>
                <span className="date-tag">{match.date} • {match.time}</span>
              </div>

              <div className="scoreboard">
                <div className="team">
                  <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
                  <h3>{match.homeTeam.name}</h3>
                </div>

                <div className="score-area">
                  <span className="score">{match.homeTeam.score}</span>
                  <span className="divider">-</span>
                  <span className="score">{match.awayTeam.score}</span>
                  <div className="status-badge">{match.status}</div>
                </div>

                <div className="team">
                  <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
                  <h3>{match.awayTeam.name}</h3>
                </div>
              </div>

              <div className="match-footer">
                <div className="motm">
                  <span className="icon">🏅</span>
                  <div>
                    <small>Man of the Match</small>
                    <p>{match.manOfTheMatch || "Not Available"}</p>
                  </div>
                </div>
                <button className="details-btn">View Stats</button>
              </div>
            </div>
          ))}
        </section>

        {/* Pagination Navigation */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="nav-btn"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`page-num ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={indexOfLastMatch >= matches.length}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="nav-btn"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { AdBanner } from '../../components/AdSense'
import games from '../../data/games.json'

const CATEGORIES = ['Tous', 'Aventure', 'Simulation', 'Action', 'Tower Defense', 'Roleplay', 'Obby', 'Course']

export default function CodesIndex() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Tous')

  const filtered = games.filter(g => {
    const matchSearch = g.nom.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'Tous' || g.categorie === cat
    return matchSearch && matchCat
  })

  return (
    <Layout
      title="Tous les codes Roblox 2025"
      description="Catalogue complet de tous les codes actifs et expirés pour les jeux Roblox. Blox Fruits, Pet Simulator 99, Shindo Life, Adopt Me et plus encore."
      canonical="/codes"
    >
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> › Codes
          </div>
          <h1>Tous les codes <span style={{ color: 'var(--accent)' }}>Roblox</span></h1>
          <p>{games.length} jeux référencés — Sélectionne un jeu pour voir ses codes actifs et expirés.</p>
        </div>
      </div>

      <div className="container">
        <AdBanner type="leaderboard" />

        <section className="section">
          <div className="search-bar" style={{ maxWidth: '400px', margin: '0 0 24px' }}>
            <input
              type="text"
              placeholder="Chercher un jeu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="filters">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`filter-btn ${cat === c ? 'active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="games-grid">
            {filtered.map(game => {
              const actifs = game.codes.filter(c => c.actif).length
              const expires = game.codes.filter(c => !c.actif).length
              return (
                <Link
                  key={game.slug}
                  href={`/codes/${game.slug}`}
                  className="game-card"
                  style={{ '--card-color': game.couleur }}
                >
                  <span className="game-emoji">{game.image}</span>
                  <div className="game-name">{game.nom}</div>
                  <span className="game-cat">{game.categorie}</span>
                  <p className="game-desc">{game.description}</p>
                  <div className="game-meta">
                    <span className="codes-count">✓ {actifs} code{actifs > 1 ? 's' : ''} actif{actifs > 1 ? 's' : ''}</span>
                    <span className="codes-count-inactive">{expires} expiré{expires > 1 ? 's' : ''}</span>
                  </div>
                </Link>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
              Aucun jeu trouvé pour "{search}".
            </p>
          )}
        </section>
      </div>
    </Layout>
  )
}

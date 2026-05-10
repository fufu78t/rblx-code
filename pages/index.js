import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { AdBanner } from '../components/AdSense'
import games from '../data/games.json'
import news from '../data/news.json'

const CATEGORIES = ['Tous', 'Aventure', 'Simulation', 'Action', 'Tower Defense', 'Roleplay', 'Obby', 'Course']

export default function Home() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Tous')

  const totalCodes = games.reduce((acc, g) => acc + g.codes.filter(c => c.actif).length, 0)
  const totalGames = games.length

  const filtered = games.filter(g => {
    const matchSearch = g.nom.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'Tous' || g.categorie === cat
    return matchSearch && matchCat
  })

  const latestNews = news.slice(0, 3)

  return (
    <Layout>
      {/* HERO */}
      <div className="hero">
        <h1>Tous les codes <span className="highlight">Roblox</span><br />actifs en 2025</h1>
        <p>Retrouve instantanément les codes actifs et expirés pour tous tes jeux Roblox préférés. Gratuit, sans inscription.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Chercher un jeu Roblox..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* PUB HAUT */}
      <div className="container">
        <AdBanner type="leaderboard" />
      </div>

      {/* STATS */}
      <div className="container">
        <div className="stats-bar">
          <div className="stat-item">
            <div className="num">{totalCodes}+</div>
            <div className="label">Codes actifs</div>
          </div>
          <div className="stat-item">
            <div className="num">{totalGames}</div>
            <div className="label">Jeux référencés</div>
          </div>
          <div className="stat-item">
            <div className="num">100%</div>
            <div className="label">Gratuit</div>
          </div>
          <div className="stat-item">
            <div className="num">Hebdo</div>
            <div className="label">Mise à jour</div>
          </div>
        </div>
      </div>

      {/* GAMES */}
      <div className="container">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Codes par <span>jeu</span></h2>
            <Link href="/codes" className="view-all">Voir tous →</Link>
          </div>

          {/* FILTRES */}
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

          {/* GRILLE */}
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
              Aucun jeu trouvé pour "{search}". Reviens bientôt, on ajoute de nouveaux jeux régulièrement !
            </p>
          )}
        </section>

        {/* PUB MILIEU */}
        <AdBanner type="leaderboard" />

        {/* NEWS */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Dernières <span>news</span></h2>
            <Link href="/news" className="view-all">Toutes les news →</Link>
          </div>
          <div className="news-grid">
            {latestNews.map(article => (
              <Link key={article.id} href={`/news/${article.id}`} className="news-card">
                <div className="news-meta">
                  <span className={`news-cat ${article.categorie}`}>
                    {article.categorie === 'mise-a-jour' ? 'Mise à jour' : article.categorie === 'evenement' ? 'Événement' : 'Sortie'}
                  </span>
                  <span className="news-date">{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3>{article.titre}</h3>
                <p>{article.resume}</p>
                <div className="news-game-tag">{article.image} {article.jeu}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

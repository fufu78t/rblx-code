import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { AdBanner } from '../components/AdSense'
import games from '../data/games.json'
import news from '../data/news.json'

const CATEGORIES = ['Tous', 'Aventure', 'Simulation', 'Action', 'Tower Defense', 'Roleplay', 'Obby', 'Course']

const UNIVERSE_IDS = {
  'blox-fruits': '2753915549',
  'pet-simulator-99': '8737899170',
  'shindo-life': '3723359823',
  'adopt-me': '1537690962',
  'brookhaven-rp': '4924922222',
  'tower-of-hell': '1962086868',
  'murder-mystery-2': '142823291',
  'doors': '6516141723',
  'bedwars': '6872265039',
  'royale-high': '735030788',
  'jailbreak': '606849621',
  'arsenal': '286090429',
  'bloxburg': '185655149',
  'piggy': '4752873903',
  'all-star-tower-defense': '4989661698',
  'anime-defenders': '16067277819',
  'toilet-tower-defense': '13775256536',
  'blade-ball': '13772394625',
  'the-strongest-battlegrounds': '11827759684',
  'dress-to-impress': '17595386767',
  'grow-a-garden': '126244816690',
  'flee-the-facility': '1520158807',
  'slap-battles': '6403373529',
}

const CAT_COLORS = {
  'Aventure': 'linear-gradient(135deg, #1a0533 0%, #6b21a8 60%, #f59e0b 100%)',
  'Simulation': 'linear-gradient(135deg, #0c1445 0%, #1d4ed8 60%, #06b6d4 100%)',
  'Action': 'linear-gradient(135deg, #1a0000 0%, #dc2626 60%, #f97316 100%)',
  'Tower Defense': 'linear-gradient(135deg, #0a1a0a 0%, #15803d 60%, #84cc16 100%)',
  'Roleplay': 'linear-gradient(135deg, #0c0045 0%, #7c3aed 60%, #ec4899 100%)',
  'Obby': 'linear-gradient(135deg, #1a1a00 0%, #ca8a04 60%, #f97316 100%)',
  'Course': 'linear-gradient(135deg, #00101a 0%, #0891b2 60%, #06b6d4 100%)',
  'default': 'linear-gradient(135deg, #0a0a1a 0%, #1e1e3f 60%, #2d1b69 100%)',
}

function useRobloxThumbnails(gameList) {
  const [thumbnails, setThumbnails] = useState({})

  useEffect(() => {
    const pairs = gameList
      .map(g => ({ slug: g.slug, uid: UNIVERSE_IDS[g.slug] }))
      .filter(p => p.uid)

    if (pairs.length === 0) return

    const ids = pairs.map(p => p.uid).join(',')

    fetch(`/api/thumbnails?ids=${ids}`)
      .then(r => r.json())
      .then(data => {
        if (!data.data) return
        const map = {}
        data.data.forEach(item => {
          const pair = pairs.find(p => p.uid === String(item.targetId))
          if (pair && item.imageUrl) map[pair.slug] = item.imageUrl
        })
        setThumbnails(map)
      })
      .catch(() => {})
  }, [])

  return thumbnails
}

function GameCard({ game, thumbnailUrl }) {
  const actifs = game.codes.filter(c => c.actif).length
  const expires = game.codes.filter(c => !c.actif).length
  const fallback = CAT_COLORS[game.categorie] || CAT_COLORS['default']

  return (
    <Link href={`/codes/${game.slug}`} className="game-card-v2">
      <div
        className="card-bg"
        style={
          thumbnailUrl
            ? { backgroundImage: `url(${thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: fallback }
        }
      />
      <div className="card-overlay" />
      <div className="card-content">
        <div className="card-top">
          {!thumbnailUrl && <span className="game-emoji-v2">{game.image}</span>}
          <span className="game-cat-v2">{game.categorie}</span>
        </div>
        <div className="card-bottom">
          <div className="game-name-v2">{game.nom}</div>
          <p className="game-desc-v2">{game.description}</p>
          <div className="game-meta-v2">
            <span className="codes-active-v2">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {actifs} code{actifs > 1 ? 's' : ''} actif{actifs > 1 ? 's' : ''}
            </span>
            <span className="codes-expired-v2">{expires} expiré{expires > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
      <div className="card-shimmer" />
    </Link>
  )
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Tous')
  const thumbnails = useRobloxThumbnails(games)

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

          <div className="games-grid-v2">
            {filtered.map(game => (
              <GameCard key={game.slug} game={game} thumbnailUrl={thumbnails[game.slug]} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
              Aucun jeu trouvé pour "{search}". Reviens bientôt !
            </p>
          )}
        </section>

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

import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { AdBanner } from '../../components/AdSense'
import news from '../../data/news.json'

const CATS = ['Toutes', 'mise-a-jour', 'evenement', 'sortie']
const CATS_LABELS = { 'Toutes': 'Toutes', 'mise-a-jour': 'Mises à jour', 'evenement': 'Événements', 'sortie': 'Sorties' }

export default function NewsIndex() {
  const [cat, setCat] = useState('Toutes')

  const filtered = cat === 'Toutes' ? news : news.filter(n => n.categorie === cat)
  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <Layout
      title="News Roblox 2025 — Mises à jour, événements, nouvelles sorties"
      description="Toutes les actualités Roblox : mises à jour de jeux, événements limités, nouvelles sorties. Blox Fruits, Pet Simulator 99, Adopt Me et bien plus."
      canonical="/news"
    >
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> › News
          </div>
          <h1>News <span style={{ color: 'var(--accent)' }}>Roblox</span></h1>
          <p>Mises à jour, événements et nouvelles sorties — toute l'actu de tes jeux Roblox préférés.</p>
        </div>
      </div>

      <div className="container">
        <AdBanner type="leaderboard" />

        <section className="section">
          <div className="filters">
            {CATS.map(c => (
              <button
                key={c}
                className={`filter-btn ${cat === c ? 'active' : ''}`}
                onClick={() => setCat(c)}
              >
                {CATS_LABELS[c]}
              </button>
            ))}
          </div>

          <div className="news-grid">
            {sorted.map(article => (
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

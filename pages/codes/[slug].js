import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { AdBanner, AdRectangle } from '../../components/AdSense'
import games from '../../data/games.json'

export async function getStaticPaths() {
  const paths = games.map(g => ({ params: { slug: g.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const game = games.find(g => g.slug === params.slug)
  const otherGames = games.filter(g => g.slug !== params.slug).slice(0, 6)
  return { props: { game, otherGames } }
}

export default function CodePage({ game, otherGames }) {
  const [copied, setCopied] = useState(null)

  const codesActifs = game.codes.filter(c => c.actif)
  const codesExpires = game.codes.filter(c => !c.actif)

  function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Layout
      title={`Codes ${game.nom} 2025 — ${codesActifs.length} codes actifs`}
      description={`Tous les codes actifs et expirés pour ${game.nom} sur Roblox. ${codesActifs.length} codes fonctionnels en mai 2025. Récompenses détaillées pour chaque code.`}
      canonical={`/codes/${game.slug}`}
    >
      {/* HERO PAGE */}
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link> › <Link href="/codes">Codes</Link> › {game.nom}
          </div>
          <h1>{game.image} Codes {game.nom} 2025</h1>
          <p>{game.description}</p>
          <p className="last-update">Dernière mise à jour : <span>{today}</span> — {codesActifs.length} codes actifs</p>
        </div>
      </div>

      <div className="container">
        {/* PUB HAUT */}
        <AdBanner type="leaderboard" />

        <div className="content-with-sidebar">
          {/* CONTENU PRINCIPAL */}
          <div>
            {/* COMMENT UTILISER */}
            <div className="how-to">
              <h3>📋 Comment utiliser les codes {game.nom} ?</h3>
              <ol>
                <li>Lance <strong>{game.nom}</strong> sur Roblox</li>
                <li>Cherche le bouton <strong>"Codes"</strong> dans le menu principal du jeu</li>
                <li>Clique sur <strong>"Copier"</strong> ci-dessous et colle le code</li>
                <li>Valide pour recevoir ta <strong>récompense</strong> instantanément !</li>
              </ol>
            </div>

            {/* PUB MILIEU */}
            <AdBanner type="leaderboard" />

            {/* CODES ACTIFS */}
            <div className="codes-section">
              <h2>✅ Codes actifs ({codesActifs.length})</h2>
              {codesActifs.length > 0 ? (
                <div className="codes-list">
                  {codesActifs.map(c => (
                    <div key={c.code} className="code-item">
                      <div className="code-badge">{c.code}</div>
                      <div className="code-reward">
                        <span className="reward-label">Récompense</span>
                        <span className="reward-value">{c.reward}</span>
                      </div>
                      <span className="status-badge active">Actif</span>
                      <button
                        className={`copy-btn ${copied === c.code ? 'copied' : ''}`}
                        onClick={() => copyCode(c.code)}
                      >
                        {copied === c.code ? '✓ Copié !' : 'Copier'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>
                  Aucun code actif pour le moment. Reviens bientôt !
                </p>
              )}
            </div>

            {/* CODES EXPIRÉS */}
            {codesExpires.length > 0 && (
              <div className="codes-section">
                <h2 className="expired">❌ Codes expirés ({codesExpires.length})</h2>
                <div className="codes-list">
                  {codesExpires.map(c => (
                    <div key={c.code} className="code-item expired">
                      <div className="code-badge">{c.code}</div>
                      <div className="code-reward">
                        <span className="reward-label">Récompense</span>
                        <span className="reward-value">{c.reward}</span>
                      </div>
                      <span className="status-badge expired">Expiré</span>
                      <button className="copy-btn" disabled>Expiré</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-widget">
              <AdRectangle />
            </div>
            <div className="sidebar-widget">
              <h4>Autres jeux</h4>
              {otherGames.map(g => (
                <Link key={g.slug} href={`/codes/${g.slug}`} className="sidebar-game-link">
                  <span>{g.image}</span>
                  <span>{g.nom}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '0.8rem' }}>
                    {g.codes.filter(c => c.actif).length} actifs
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

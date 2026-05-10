import Link from 'next/link'
import Layout from '../../components/Layout'
import { AdBanner, AdRectangle } from '../../components/AdSense'
import news from '../../data/news.json'
import games from '../../data/games.json'

export async function getStaticPaths() {
  const paths = news.map(n => ({ params: { id: n.id } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const article = news.find(n => n.id === params.id)
  const relatedNews = news.filter(n => n.id !== params.id && n.jeuSlug === article.jeuSlug).slice(0, 3)
  const game = games.find(g => g.slug === article.jeuSlug)
  return { props: { article, relatedNews, game: game || null } }
}

export default function NewsArticle({ article, relatedNews, game }) {
  const catLabel = article.categorie === 'mise-a-jour' ? 'Mise à jour' : article.categorie === 'evenement' ? 'Événement' : 'Sortie'
  const dateFormatted = new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Layout
      title={article.titre}
      description={article.resume}
      canonical={`/news/${article.id}`}
    >
      <div className="container">
        <div className="content-with-sidebar" style={{ paddingTop: '40px' }}>
          {/* ARTICLE */}
          <article className="news-article" style={{ padding: '0' }}>
            <div className="breadcrumb" style={{ marginBottom: '20px' }}>
              <Link href="/">Accueil</Link> › <Link href="/news">News</Link> › {article.jeu}
            </div>

            <div className="news-meta" style={{ marginBottom: '20px' }}>
              <span className={`news-cat ${article.categorie}`}>{catLabel}</span>
              <span className="news-date">{dateFormatted}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '12px' }}>
              {article.titre}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', borderLeft: '3px solid var(--accent)', paddingLeft: '16px', margin: '24px 0' }}>
              {article.resume}
            </p>

            <AdBanner type="leaderboard" />

            <div className="article-body">
              <p>{article.contenu}</p>
            </div>

            {/* LIEN VERS LES CODES DU JEU */}
            {game && (
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-accent)',
                borderRadius: '14px',
                padding: '20px 24px',
                marginTop: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
                    {game.image} Codes {game.nom}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                    {game.codes.filter(c => c.actif).length} codes actifs disponibles
                  </div>
                </div>
                <Link href={`/codes/${game.slug}`} style={{
                  background: 'var(--accent)',
                  color: 'var(--bg-primary)',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>
                  Voir les codes →
                </Link>
              </div>
            )}

            {/* NEWS LIÉES */}
            {relatedNews.length > 0 && (
              <div style={{ marginTop: '50px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '16px' }}>
                  Autres news sur {article.jeu}
                </h3>
                <div className="news-grid">
                  {relatedNews.map(n => (
                    <Link key={n.id} href={`/news/${n.id}`} className="news-card">
                      <div className="news-meta">
                        <span className={`news-cat ${n.categorie}`}>
                          {n.categorie === 'mise-a-jour' ? 'Mise à jour' : n.categorie === 'evenement' ? 'Événement' : 'Sortie'}
                        </span>
                      </div>
                      <h3>{n.titre}</h3>
                      <p>{n.resume}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-widget">
              <AdRectangle />
            </div>
            <div className="sidebar-widget">
              <h4>Dernières news</h4>
              {news.slice(0, 5).map(n => (
                <Link key={n.id} href={`/news/${n.id}`} className="sidebar-game-link" style={{ padding: '10px 0', alignItems: 'flex-start', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: 1.3 }}>{n.titre}</span>
                  <span style={{ fontSize: '0.75rem' }}>{n.image} {n.jeu}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

import Link from 'next/link'
import Layout from '../components/Layout'

export default function MentionsLegales() {
  return (
    <Layout title="Mentions légales" canonical="/mentions-legales">
      <div className="container" style={{ maxWidth: '780px', padding: '60px 20px' }}>
        <div className="breadcrumb" style={{ marginBottom: '24px' }}>
          <Link href="/">Accueil</Link> › Mentions légales
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '32px' }}>Mentions légales</h1>

        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.9 }}>
          <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '28px 0 12px' }}>Éditeur du site</h2>
          <p>RobloxCodes.fr est un site non officiel, non affilié à Roblox Corporation.</p>

          <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '28px 0 12px' }}>Hébergement</h2>
          <p>Ce site est hébergé par Netlify, Inc. — 512 2nd Street, Suite 200, San Francisco, CA 94107.</p>

          <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '28px 0 12px' }}>Propriété intellectuelle</h2>
          <p>Roblox® est une marque déposée de Roblox Corporation. Les noms de jeux mentionnés appartiennent à leurs développeurs respectifs. Ce site ne revendique aucune propriété sur ces marques.</p>

          <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '28px 0 12px' }}>Publicité</h2>
          <p>Ce site utilise Google AdSense pour afficher des publicités. Google peut utiliser des cookies pour personnaliser les annonces. Consultez la politique de confidentialité de Google pour plus d'informations.</p>

          <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: '28px 0 12px' }}>Contact</h2>
          <p>Pour toute question : <Link href="/contact" style={{ color: 'var(--accent)' }}>page de contact</Link></p>
        </div>
      </div>
    </Layout>
  )
}

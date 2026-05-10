import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Layout({ children, title, description, canonical }) {
  const router = useRouter()
  const pageTitle = title ? `${title} | RobloxCodes.fr` : 'RobloxCodes.fr — Tous les codes Roblox actifs 2025'
  const pageDesc = description || 'Retrouve tous les codes actifs et expirés pour tes jeux Roblox préférés : Blox Fruits, Pet Simulator 99, Shindo Life et bien d\'autres. Mis à jour chaque semaine.'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="canonical" href={`https://robloxcodes.fr${canonical || router.asPath}`} />
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RobloxCodes.fr" />
        {/* Google AdSense — remplace ca-pub-XXXXXXXXXXXXXXXX par ton ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            Roblox<span>Codes</span>.fr
          </Link>
          <nav className="nav">
            <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Accueil</Link>
            <Link href="/codes" className={router.pathname.startsWith('/codes') ? 'active' : ''}>Codes</Link>
            <Link href="/news" className={router.pathname.startsWith('/news') ? 'active' : ''}>News</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">Roblox<span>Codes</span>.fr</Link>
            <p>Le site référence pour trouver tous les codes actifs de tes jeux Roblox préférés. Mis à jour régulièrement, gratuit pour tous.</p>
          </div>
          <div className="footer-col">
            <h5>Jeux populaires</h5>
            <ul>
              <li><Link href="/codes/blox-fruits">Blox Fruits</Link></li>
              <li><Link href="/codes/pet-simulator-99">Pet Simulator 99</Link></li>
              <li><Link href="/codes/shindo-life">Shindo Life</Link></li>
              <li><Link href="/codes/anime-adventures">Anime Adventures</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/codes">Tous les codes</Link></li>
              <li><Link href="/news">News & MAJ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Infos</h5>
            <ul>
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 RobloxCodes.fr — Site non officiel, non affilié à Roblox Corporation.</p>
        </div>
      </footer>
    </>
  )
}

// Composant pub AdSense
// Pour activer : remplace les commentaires par le vrai code AdSense une fois approuvé

export function AdBanner({ type = 'leaderboard' }) {
  return (
    <div className={`ad-banner ${type}`}>
      {/* Ici tu colleras ton code AdSense une fois approuvé */}
      {/* Exemple :
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
      */}
      <span style={{ fontSize: '0.75rem', opacity: 0.4 }}>Publicité</span>
    </div>
  )
}

export function AdRectangle() {
  return (
    <div className="ad-banner rectangle">
      {/* Pub rectangle 300x250 */}
      <span style={{ fontSize: '0.75rem', opacity: 0.4 }}>Publicité</span>
    </div>
  )
}

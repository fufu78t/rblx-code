import Link from 'next/link'
import Layout from '../components/Layout'

export default function Contact() {
  return (
    <Layout title="Contact" canonical="/contact">
      <div className="container" style={{ maxWidth: '600px', padding: '60px 20px' }}>
        <div className="breadcrumb" style={{ marginBottom: '24px' }}>
          <Link href="/">Accueil</Link> › Contact
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>Contact</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Tu veux signaler un code expiré, proposer un nouveau jeu, ou simplement nous contacter ?
        </p>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '28px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Objet</label>
            <input type="text" placeholder="Ex: Code expiré sur Blox Fruits" style={{
              width: '100%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              outline: 'none'
            }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Message</label>
            <textarea rows={5} placeholder="Ton message..." style={{
              width: '100%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              outline: 'none',
              resize: 'vertical'
            }} />
          </div>
          <button style={{
            background: 'var(--accent)',
            color: 'var(--bg-primary)',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '10px',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}>
            Envoyer
          </button>
        </div>
      </div>
    </Layout>
  )
}

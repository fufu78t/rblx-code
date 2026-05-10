export default async function handler(req, res) {
  const { ids } = req.query

  if (!ids) {
    return res.status(400).json({ error: 'Missing ids parameter' })
  }

  try {
    const response = await fetch(
      `https://thumbnails.roblox.com/v1/games/multiget-thumbnails?universeIds=${ids}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        }
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Roblox API error' })
    }

    const data = await response.json()
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' })
  }
}

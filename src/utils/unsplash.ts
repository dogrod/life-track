import axios from 'axios'

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_AK!

export async function getCityImage(cityName: string) {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${cityName}&client_id=${UNSPLASH_ACCESS_KEY}`,
    )

    if (response.status === 200) {
      const imageUrl = response.data.urls.regular
      return imageUrl
    } else {
      throw new Error('Failed to fetch image')
    }
  } catch (error) {
    console.error('Error fetching image:', error)
    // You can return a placeholder image URL or handle the error as needed.
    return '/placeholder.svg'
  }
}

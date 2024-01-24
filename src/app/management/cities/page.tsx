import { createClient } from '@/utils/supabase/server'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

interface Continent {
  id: number
  continent_name: string
  continent_name_cn: string
}

interface Country {
  id: number
  country_name: string
  country_name_cn: string
  flag_emoji: string
  continents: Continent // Assuming a country can belong to multiple continents
}

interface City {
  id: number
  city_name: string
  city_name_cn: string
  countries: Country // Assuming each city is related to exactly one country
}

const CitiesManagement = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error }: PostgrestSingleResponse<City[]> = await supabase.from(
    'cities',
  ).select(`
    id,
    city_name,
    city_name_cn,
    countries(
      id,
      country_name,
      country_name_cn,
      flag_emoji,
      continents(
        id,
        continent_name,
        continent_name_cn
      )
    )
  `)

  console.log(data)

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr className="border-b border-slate-300">
            <th className="p-3">Country</th>
            <th className="p-3">City</th>
            <th className="p-3">Continent</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((city, i) => (
            <tr key={i} className="border-b border-slate-200">
              <td className="p-3">{city.countries.flag_emoji}</td>
              <td className="p-3">{city.city_name}</td>
              <td className="p-3">
                {city.countries.continents.continent_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CitiesManagement

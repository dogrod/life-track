import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  // const supabase = createClient()

  const { data, error } = await supabase.from('cities').select(`
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
  if (error) {
    console.error(error)
  }

  return NextResponse.json({ data })
}

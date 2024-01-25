import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from '@/components/ui/card'
import { getCityImage } from '@/utils/unsplash'
import React, { useEffect, useState } from 'react'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

interface City {
  id: number
  city_name: string
  city_name_cn: string
  countries: {
    id: number
    country_name: string
    country_name_cn: string
    flag_emoji: string
    continents: {
      id: number
      continent_name: string
      continent_name_cn: string
    }[]
  }
}

interface CardProp {
  id: number
  title: string
  description: string
  date: string
  imageUrl?: string
}

const getData = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('cities')
    .select(
      `
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
  `,
    )
    .returns<City[]>()

  if (!data) {
    return {
      cards: [],
    }
  }

  const cards = data.map((city) => {
    return {
      id: city.id,
      title: city.city_name,
      description: city.countries.country_name,
      date: '2021-08-01',
    }
  }) as CardProp[]

  await Promise.all(
    cards.map(async (card, i) => {
      const imageUrl = await getCityImage(card.title)
      cards[i] = { ...card, imageUrl }

      return { ...card, imageUrl }
    }),
  )

  return {
    cards,
  }
}

export default async function Page() {
  const { cards } = await getData()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cards.map((card) => (
        <Card key={card.id}>
          {card.imageUrl && (
            <Image
              alt={card.title}
              className="w-full h-48 object-cover rounded-t-lg"
              height="200"
              src={card.imageUrl}
              style={{
                aspectRatio: '300/200',
                objectFit: 'cover',
              }}
              width="300"
            />
          )}
          <CardContent className="p-4">
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
            <p className="text-sm text-gray-500">Visited on: {card.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

'use client'
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from '@/components/ui/card'
import React, { useState } from 'react'

export default function TravelCards() {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Paris',
      description: 'France',
      date: 'June 15, 2023',
    },
    {
      id: 2,
      title: 'Tokyo',
      description: 'Japan',
      date: 'March 22, 2023',
    },
    {
      id: 3,
      title: 'New York',
      description: 'United States',
      date: 'January 5, 2023',
    },
    {
      id: 4,
      title: 'Sydney',
      description: 'Australia',
      date: 'December 1, 2022',
    },
    {
      id: 5,
      title: 'Cape Town',
      description: 'South Africa',
      date: 'November 20, 2022',
    },
    {
      id: 6,
      title: 'Rome',
      description: 'Italy',
      date: 'October 10, 2022',
    },
  ])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cards.map((card) => (
        <Card key={card.id}>
          <img
            alt={card.title}
            className="w-full h-48 object-cover rounded-t-lg"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: '300/200',
              objectFit: 'cover',
            }}
            width="300"
          />
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

// src/app/events/page.js

import React from 'react'
import EventsSchedulePage from '../../components/events/events'

export const metadata = {
  title: "Events",
}

export default function eventsPage() {
  return (
    <EventsSchedulePage />
  )
}

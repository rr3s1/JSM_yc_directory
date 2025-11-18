 'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPageClient() {
  return <NextStudio config={config} />
}



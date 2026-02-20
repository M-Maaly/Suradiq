import { FEATURED_PRODUCTS_QUERYResult } from '@/sanity.types'
import React from 'react'

type FeaturedProducts = FEATURED_PRODUCTS_QUERYResult[number]

interface FeaturedCarouselProps {
    products: FEATURED_PRODUCTS_QUERYResult
}

export default function FeaturedCarousel({products}: FeaturedCarouselProps) {

  
  return (
    <div>FeaturedCarousel</div>
  )
}

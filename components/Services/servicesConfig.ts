import React, { ReactNode } from 'react'
import { HouseIcon, OfficeIcon, AirbnbIcon, YachtIcon } from './ServiceIcons'

export interface ServiceCardData {
  id: string | number
  title: string
  icon: ReactNode       // 🆕 Now accepts SVG components
  features: string[]
  link: string
}

export const servicesData: ServiceCardData[] = [
  {
    id: 1,
    title: 'House Cleaning',
    icon: React.createElement(HouseIcon),
    features: [
      'Routine dusting',
      'Bathroom sanitization',
      'Kitchen wiped down',
      'Floor vacuuming & mopping',
    ],
    link: '/services/house-cleaning',
  },
  {
    id: 2,
    title: 'Office Cleaning',
    icon: React.createElement(OfficeIcon),
    features: [
      'Routine dusting',
      'Bathroom sanitization',
      'Kitchen wiped down',
      'Floor vacuuming & mopping',
    ],
    link: '/services/office-cleaning',
  },
  {
    id: 3,
    title: 'Airbnb Cleaning',
    icon: React.createElement(AirbnbIcon),
    features: [
      'Routine dusting',
      'Bathroom sanitization',
      'Kitchen wiped down',
      'Floor vacuuming & mopping',
    ],
    link: '/services/airbnb-cleaning',
  },
  {
    id: 4,
    title: 'Yacht Cleaning',
    icon: React.createElement(YachtIcon),
    features: [
      'Routine dusting',
      'Bathroom sanitization',
      'Kitchen wiped down',
      'Floor vacuuming & mopping',
    ],
    link: '/services/yacht-cleaning',
  },
]
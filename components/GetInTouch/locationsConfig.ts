export interface LocationData {
  id: string
  name: string
  address: string
  mapQuery: string // Used for Google Maps embed
}

export const locationsData: LocationData[] = [
  {
    id: 'orlando',
    name: 'Orlando',
    address: '4501 Black Haven Drive, Unit 104, Orlando, Florida 32839',
    mapQuery: '4501+Black+Haven+Drive,+Unit+104,+Orlando,+Florida+32839',
  },
  {
    id: 'vero-beach',
    name: 'Vero Beach',
    address: '4793 Walden CIR K, Orlando, Florida 32811',
    mapQuery: '4793+Walden+CIR+K,+Orlando,+Florida+32811',
  },
]
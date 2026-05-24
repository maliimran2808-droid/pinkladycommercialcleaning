import ServicesHeader from './ServicesHeader'
import ServiceCard from './ServiceCard'
import { servicesData } from './servicesConfig'

export default function Services() {
  return (
    <section className="w-full py-20 md:py-28 ">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header */}
        <ServicesHeader />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} data={service} />
          ))}
        </div>

      </div>
    </section>
  )
}
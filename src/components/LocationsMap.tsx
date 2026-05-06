import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

type LocationData = {
  id: string;
  name: string;
  x: number;
  y: number;
  labelPos: 'left' | 'right';
  description: string;
  industries: string[];
};

const locations: LocationData[] = [
  {
    id: 'detroit',
    name: 'DETROIT',
    x: 25,
    y: 33,
    labelPos: 'left',
    description: 'Newlab Detroit channels the raw energy of a city that built the automobile, and now leads the charge to redefine mobility, manufacturing, and the industrial economy from the ground up.',
    industries: ['Mobility', 'Manufacturing', 'Industrial Resilience']
  },
  {
    id: 'brooklyn',
    name: 'BROOKLYN',
    x: 29.5,
    y: 38,
    labelPos: 'right',
    description: 'Brooklyn is where Newlab began, inside the iconic Brooklyn Navy Yard, once a symbol of American industrial might, now reborn as a hub for critical technology and urban reindustrialization.',
    industries: ['Climate Tech', 'Energy', 'Materials']
  },
  {
    id: 'new-orleans',
    name: 'NEW ORLEANS',
    x: 23,
    y: 47,
    labelPos: 'left',
    description: 'Newlab New Orleans is a launchpad for the next chapter of critical technology in the Gulf South, scaling where energy and industry converge.',
    industries: ['Energy Transition', 'Maritime', 'Advanced Manufacturing']
  },
  {
    id: 'montevideo',
    name: 'MONTEVIDEO',
    x: 34,
    y: 82,
    labelPos: 'right',
    description: 'A critical technology gateway for LatAm for rapid commercialization and entering the global market.',
    industries: ['AgTech', 'Renewables', 'Logistics']
  },
  {
    id: 'riyadh',
    name: 'RIYADH',
    x: 60,
    y: 50,
    labelPos: 'right',
    description: 'Critical technologies focused on widespread regional industrial transformation including mining, logistics and energy.',
    industries: ['Mining', 'Logistics', 'Energy']
  }
];

export function LocationsMap() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);

  const activeLocationData = useMemo(
    () => locations.find(loc => loc.id === activeLocationId),
    [activeLocationId]
  );

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full bg-white relative">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 uppercase text-black">
          LOCATIONS
        </h2>
        <p className="text-gray-500 max-w-lg uppercase tracking-widest text-sm font-mono">
          Global hubs in geographies prioritizing reindustrialization
        </p>
      </div>

      <div 
        className="relative w-full overflow-hidden bg-white"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setActiveLocationId(null);
          }
        }}
      >
        <img 
          src="https://cdn.prod.website-files.com/677376e1e97650585235ab96/677e1de06571eae8d537fc47_map.avif" 
          alt="World Map"
          className="w-full h-auto pointer-events-none select-none"
          style={{ filter: 'invert(100%)', WebkitFilter: 'invert(100%)' }}
        />
        
        {locations.map((loc) => {
          return (
            <div 
              key={loc.id} 
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${activeLocationId === loc.id ? 'z-40' : 'z-10'}`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              {/* Blue Marker */}
              <button 
                onClick={() => setActiveLocationId(activeLocationId === loc.id ? null : loc.id)}
                className="relative w-4 h-4 md:w-5 md:h-5 bg-[#0055ff] hover:bg-blue-600 rounded-full shrink-0 cursor-pointer transition-colors border-[3px] border-transparent hover:border-black" 
                aria-label={`View ${loc.name}`}
              />
              
              {/* Static Label (Always Visible) */}
              <div 
                className={`absolute bg-black text-white font-mono text-xs md:text-sm font-bold tracking-[0.15em] px-3 py-1.5 md:px-4 md:py-2.5 whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none shadow-sm
                  ${loc.labelPos === 'left' ? 'right-full mr-2 md:mr-3' : 'left-full ml-2 md:ml-3'}`}
              >
                {loc.name}
              </div>
            </div>
          );
        })}

        {/* Info Panel Overlay */}
        <AnimatePresence>
          {activeLocationData && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-4 bottom-4 right-4 md:w-80 lg:w-96 bg-white border border-gray-200 shadow-2xl p-6 md:p-8 flex flex-col z-50 overflow-y-auto"
            >
              <button 
                onClick={() => setActiveLocationId(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-medium uppercase tracking-tight text-black mb-6 mt-4">
                {activeLocationData.name}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#0055ff] mb-2">About</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {activeLocationData.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#0055ff] mb-3">Key Industries</h4>
                  <ul className="flex flex-wrap gap-2">
                    {activeLocationData.industries.map((industry, i) => (
                      <li 
                        key={i}
                        className="bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 rounded-sm"
                      >
                        {industry}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

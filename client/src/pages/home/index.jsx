import { HeroSection } from './hero-section'
import { HowItWorks } from './how-it-works'
import { StatsSection } from './stats-section'
import { CtaSection } from './cta-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <StatsSection />
      <CtaSection />
    </>
  )
}

import React from "react";
import Hero from "../../components/Hero";
import Carousel from "../../components/Carousel";
import FeatureCard from "../../components/FeatureCard";
import Stats from "../../components/Stats";
import Footer from "../../components/Footer";

// import { useQuery } from "react-query";

function Home() {

  return (
    <div>
      <Hero />
      <Carousel />
      <FeatureCard />
      <Stats />
      <Footer />
    </div>
  );
}

export default Home;

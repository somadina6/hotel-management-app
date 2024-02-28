"use client";

import Image from "next/image";
import CountUpNumber from "../CountUpNumber/CountUpNumber";

const HeroSection = () => {
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
      <div className="py-10 h-full">
        {/* Heading */}
        <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
        <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
          Experience An Exquisite Hotel In Rich History & Timeless Elegance
        </p>
        <button className="btn-primary">Get Started</button>

        <div className="flex justify-between mt-12">
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-lg text-center">Basic Room</p>
            <CountUpNumber duration={3000} endValue={200} />
          </div>

          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-lg text-center">Luxury Room</p>
            <p className="md:font-bold font-medium text-lg cl:text-xl">+ 20</p>
          </div>

          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-lg text-center">Suites</p>
            <p className="md:font-bold font-medium text-lg xl:text-xl">+ 20</p>
          </div>
        </div>
      </div>
      {/* Images */}
      <div className="md:grid hidden gap-8 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-48">
          <Image
            src="/images/hero-1.jpeg"
            alt="hero-1"
            width={300}
            height={300}
            className="img scale-animation"
          />
        </div>

        <div className="grid grid-cols-2 gap-8 h-48">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-2.jpeg"
              alt="hero-2"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>

          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-3.jpeg"
              alt="hero-3"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

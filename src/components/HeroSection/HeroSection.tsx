"use client";

import CountUpNumber from "../CountUpNumber/CountUpNumber";
import ClientCoponent from "./ClientCoponent";
import { heading1, section2 } from "./ServerComponent";

const HeroSection = () => {
  return <ClientCoponent section2={section2} heading1={heading1} />;
};

export default HeroSection;

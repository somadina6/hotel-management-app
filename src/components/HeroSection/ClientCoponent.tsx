import React, { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};
const ClientCoponent: FC<Props> = (props) => {
  const { heading1, section2 } = props;
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
      <div className="py-10 h-full">
        {heading1}

        <div className="flex justify-between mt-12">
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-lg text-center">Basic Room</p>
            <CountUpNumber duration={5000} endValue={90} />
          </div>

          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-lg text-center">Luxury Room</p>
            <CountUpNumber duration={6000} endValue={70} />
          </div>

          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-lg text-center">Suites</p>
            <CountUpNumber duration={7000} endValue={100} />
          </div>
        </div>
      </div>
      {/* Images */}
      {section2}
    </section>
  );
};

export default ClientCoponent;

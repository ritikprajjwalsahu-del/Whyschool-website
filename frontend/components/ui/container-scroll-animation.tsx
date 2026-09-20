'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent?: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.95] : [1.02, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      className="h-[46rem] md:h-[58rem] flex items-center justify-center relative p-2 md:p-6"
      ref={containerRef}
    >
      <div
        className="py-4 md:py-8 w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
        {titleComponent && <Header translate={translate} titleComponent={titleComponent} />}
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  if (!titleComponent) return null;
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center mb-4"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03), 0 25px 50px -12px rgba(255, 101, 0, 0.15)',
      }}
      className="max-w-6xl mx-auto h-[34rem] md:h-[42rem] w-full border border-slate-200/80 p-2 md:p-4 bg-white rounded-[32px] shadow-2xl relative overflow-hidden backdrop-blur-xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#F8FAFC] p-4 md:p-6 flex flex-col justify-between border border-slate-200/60 text-slate-900">
        {children}
      </div>
    </motion.div>
  );
};

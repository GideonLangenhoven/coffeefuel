import React from 'react';
import { useInView } from 'react-intersection-observer';
// If AnimatedPoint needs CSS, create AnimatedPoint.css and import it here
// For now, its styles are simple and can be handled by global fade-in-up or inline

const AnimatedPoint = ({ children, className, tag: Tag = 'div', delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const combinedClassName = `${className} ${inView ? 'fade-in-up visible' : 'fade-in-up'}`;
  const style = { transitionDelay: `${delay}s` };
  return <Tag ref={ref} className={combinedClassName} style={style}>{children}</Tag>;
};

export default AnimatedPoint;
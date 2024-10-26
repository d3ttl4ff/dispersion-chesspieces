import { OrbitControls } from '@react-three/drei';
import { Effects } from './post-processing';
import { PerformenceMonitor } from './common';
import { EnvironmentMap, Lights } from './environment';
import { Knight } from './world';

const Experience = () => {
  return (
    <>
      <Effects />

      <PerformenceMonitor />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate={false}
        maxDistance={12}
        minDistance={2}
        enableZoom={false}
      />

      {/* Environment */}
      <Lights />
      <EnvironmentMap />

      {/* World */}
      <Knight />
    </>
  );
};

export default Experience;

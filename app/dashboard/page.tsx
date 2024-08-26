import { BarDiagram } from '@/components/BarChart';
import { StatsGrid } from '@/components/StatsGrid';

const Page = () => {
  return (
    <div>
      <StatsGrid />
      <BarDiagram />
    </div>
  );
};

export default Page;

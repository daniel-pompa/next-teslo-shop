import { titleFont } from '@/config/fonts';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className}`}>
      <h1 className={`${titleFont.className} font-extrabold`}>{title}</h1>
      {subtitle && <h2 className='mt-5 mb-10'>{subtitle}</h2>}
    </div>
  );
};

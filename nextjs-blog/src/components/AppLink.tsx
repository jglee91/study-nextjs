import Link, { LinkProps } from 'next/link';

interface AppLinkProps extends LinkProps {
  label: string;
}

const AppLink: React.FC<AppLinkProps> = ({ href, as, label }) => {
  return (
    <Link href={href} as={as}>
      <a>{label}</a>
    </Link>
  );
};

export default AppLink;

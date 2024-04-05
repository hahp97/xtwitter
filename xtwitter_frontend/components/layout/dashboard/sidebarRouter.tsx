import { tailwindMerge } from '@/utils/tailwindMerge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ListItemProps {
  className?: string;
  title: string;
  href: string;
}

const SideBarRouter = () => {
  const pathname = usePathname();
  const ListItem = ({ className, title, href, ...props }: ListItemProps) => (
    <li>
      <Link
        href={href}
        className={tailwindMerge(
          'flex justify-start items-center p-4 mb-[6px] leading-[1.2] text-base font-medium',
          className,
          `${
            pathname.startsWith(href)
              ? 'font-bold bg-theme-component text-theme rounded-3xl'
              : 'hover:font-bold hover:bg-theme-hover hover:rounded-3xl hover:duration-300'
          }`,
        )}
        {...props}
      >
        {title}
      </Link>
    </li>
  );

  return (
    <ul className="mt-10 gap-2 ">
      <ListItem
        title="Home"
        href="/"
      />
      <ListItem
        title="Check router"
        href="/home"
      />
    </ul>
  );
};

export default SideBarRouter;

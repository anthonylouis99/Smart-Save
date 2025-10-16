

// import { capitalize } from '@/lib/util';
import clsx from "clsx";
import { Link } from 'react-router-dom';

type CrumPage = {
  name: string;
  href: string;
  current: boolean;
  
};

type Props = {
  page: CrumPage[];
  className:string
};

export const BreadCrumbs = ({ page,className }: Props) => {
  return (
    <nav className={clsx('flex font-Urbanist',className)} aria-label='Breadcrumb'>
      <ol role='list' className='flex items-center space-x-0'>
        {page.map((page, index) => (
          <li key={page.name}>
            <div className='flex items-center'>
              {index ? (
                <svg
                  className='h-5 w-5 mr-2 flex-shrink-0 text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  aria-hidden='true'
                >
                  <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                </svg>
              ) : null}
              <Link
                to={page.href}
                className={clsx(
                  'mr-2 text-sm font-medium text-gray-400 hover:text-gray-700',
                  {
                    '!text-gray-700': page.current,
                  }
                )}
                aria-current={page.current ? 'page' : undefined}
              >
                {(page.name)}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

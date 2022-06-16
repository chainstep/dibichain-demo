import Head from 'next/head';
import { COMPANY_NAME, PUBLIC_BASE_PATH } from '../../constants';

interface Props {
  title?: string;
  children?: JSX.Element[] | JSX.Element;
}

const Page: React.FC<Props> = (props) => {
  return (
    <div>
      <Head>
        <title>{COMPANY_NAME}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta charSet='utf-8' />
        <link
          rel='shortcut icon'
          type='image/png'
          href={`${PUBLIC_BASE_PATH}/assets/dibichain_logo.png`}
        />
      </Head>
      {props.children}
    </div>
  );
};

export default Page;

import { Button /** ConfigProvider */ } from 'antd';

import styles from './page.module.css';
// import theme from '@/lib/theme/themeConfig';

export default function Home() {
  return (
    // <ConfigProvider theme={theme}>
    <main className={styles.main}>
      <Button type="primary">Sumbit</Button>
    </main>
    // </ConfigProvider>
  );
}

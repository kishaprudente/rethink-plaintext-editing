import React from 'react';

import '../styles/global.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'easymde/dist/easymde.min.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

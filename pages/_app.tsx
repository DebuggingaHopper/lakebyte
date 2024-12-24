import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css'
import { MdxComponentsProvider } from '../context/mdxContext';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
    return (
    <div className="bg-BackgroundColor"> 
    <MdxComponentsProvider>
        <Layout>
            <div className="max-w-prose mx-auto px-4 sticky top-0 backdrop-blur-sm fixed overflow-auto">
                <Header />
            </div>
            <Component {...pageProps} />
        </Layout>
        
    </MdxComponentsProvider>
    </div>
    )
}

export default MyApp
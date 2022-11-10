import '../styles/globals.css'
import Layout from '../components/layout'
import { AuthProvider } from '../contexts/authContext'
import { DomainProvider } from '../contexts/domainContext'
import { RestaurantProvider } from '../contexts/restaurantContext'

function MyApp({ Component, pageProps }) {
  return (
    <DomainProvider>
      <RestaurantProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </RestaurantProvider>
    </DomainProvider>
  )
}

export default MyApp

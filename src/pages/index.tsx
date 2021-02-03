import Home, { HomeTemplateProps } from 'templates/Home'
import bannersMock from 'components/BannerSlider/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONAM EM PAGES

// 3 tipos:
// getStaticProps => gerar estático em build time
// getServerSideProps => gerar via ssr (server side rendering) a cada request (nunca vai para o bunde do client (arquico JS menor))
// getInitialProps => gerar via ssr a cada request (vai para o client, faz hydrate do lado do client depois do primeiro request)

export async function getServerSideProps() {
  // server side

  // faz lógica
  // pode ser buscar dados numa API
  // fazer calculo|leitura de context

  // não se utiliza hooks aqui, hook é client side

  // retorno dos dados

  return {
    props: {
      banners: bannersMock,
      newGames: gamesMock,
      mostPopularHighlight: highlightMock,
      mostPopularGames: gamesMock,
      upcommingGames: gamesMock,
      upcommingHighligth: highlightMock,
      upcommingMoreGames: gamesMock,
      freeGames: gamesMock,
      freeHighligth: highlightMock
    }
  }
}

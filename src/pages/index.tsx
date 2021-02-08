import Home, { HomeTemplateProps } from 'templates/Home'
import { initializeApollo } from 'utils/apollo'
import { QueryHome, QueryHomeVariables } from 'graphql/generated/QueryHome'
import { QUERY_HOME } from 'graphql/queries/home'
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONAM EM PAGES

// 3 tipos:
// getStaticProps => gerar estático em build time
// getServerSideProps => gerar via ssr (server side rendering) a cada request (nunca vai para o bunde do client (arquico JS menor))
// getInitialProps => gerar via ssr a cada request (vai para o client, faz hydrate do lado do client depois do primeiro request)

export async function getStaticProps() {
  // server side
  // faz lógica
  // pode ser buscar dados numa API
  // fazer calculo|leitura de context
  // não se utiliza hooks aqui, hook é client side
  // retorno dos dados

  const apolloClient = initializeApollo()
  const TODAY = new Date().toISOString().slice(0, 10) // 2021-01-27

  const {
    data: { banners, newGames, upcomingGames, freeGames, sections }
  } = await apolloClient.query<QueryHome, QueryHomeVariables>({
    query: QUERY_HOME,
    variables: { date: TODAY }
  })

  return {
    props: {
      revalidate: 10,
      banners: bannerMapper(banners),
      newGamesTitle: sections?.newGames?.title,
      newGames: gamesMapper(newGames),
      mostPopularGamesTitle: sections?.popularGames?.title,
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGames: gamesMapper(sections!.popularGames!.games),
      upcomingGamesTitle: sections?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcomingGames),
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
      freeGamesTitle: sections?.freeGames?.title,
      freeGames: gamesMapper(freeGames),
      freeHighlight: highlightMapper(sections?.freeGames?.highlight)
    }
  }
}

import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "../utils/store"
import useDarkMode from "../utils/customHooks/useDarkMode"

export default function MyApp({ Component, pageProps }: AppProps) {
  useDarkMode()

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

// export async function getServerSideProps(context: {
//   req: { headers: { [x: string]: any } }
// }) {
//   const UA = context.req.headers["user-agent"]
//   const isMobile = Boolean(
//     UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
//   )

//   return { props: { isMobile } }
// }

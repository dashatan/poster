import DesktopTopHeader from "components/organisms/headers/DesktopTopHeader"

export interface DesktopLayoutProps {
  main: JSX.Element
  top: JSX.Element
  side: JSX.Element
}
const DesktopLayout = ({ main, top, side }: DesktopLayoutProps) => {
  return (
    <div className="h-screen w-screen">
      <header className="fixed top-0 left-0 h-16 w-full">{top}</header>
      <aside className="fixed top-16 left-0 rtl:right-0 h-[calc(100%_-_theme(space.16))] w-80">
        {side}
      </aside>
      <main className="mt-16 ml-80 rtl:mr-80 h-[calc(100%_-_theme(space.16))] mb-5 bg-light-1 dark:bg-dark-6">
        {main}
      </main>
    </div>
  )
}

export default DesktopLayout

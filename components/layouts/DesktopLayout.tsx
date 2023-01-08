import DesktopTopHeader from "components/organisms/headers/DesktopTopHeader"

export interface DesktopLayoutProps {
  children: JSX.Element
  topBar: JSX.Element
  sideBar: JSX.Element
}
const DesktopLayout = ({ children, topBar, sideBar }: DesktopLayoutProps) => {
  return (
    <div className="h-screen w-screen">
      <header className="fixed top-0 left-0 h-16 w-full">
        <DesktopTopHeader />
      </header>
      <aside className="fixed top-16 left-0 rtl:right-0 h-[calc(100%_-_theme(space.16))] w-80">
        {sideBar}
      </aside>
      <main className="mt-16 ml-80 rtl:mr-80 h-[calc(100%_-_theme(space.16))] mb-5 bg-light-1 dark:bg-dark-6">
        {children}
      </main>
    </div>
  )
}

export default DesktopLayout

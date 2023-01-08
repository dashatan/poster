import useNavItems from "../../utils/customHooks/useNavItems"
import BottomNav from "../organisms/footers/BottomNav"

const PhoneLayout = ({ children }: { children: JSX.Element }) => {
  const navItems = useNavItems()
  return (
    <div className="h-screen w-screen">
      <main className="h-[calc(100%_-_theme(space.14))] mb-5 bg-light-1 dark:bg-dark-6">
        {children}
      </main>
      <BottomNav navItems={navItems} />
    </div>
  )
}

export default PhoneLayout

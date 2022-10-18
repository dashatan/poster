import useNavItems from "../../app/customHooks/useNavItems";
import BottomNav from "../organisms/footers/BottomNav";

const PhoneLayout = ({ children }: { children: JSX.Element }) => {
    const navItems = useNavItems();
    return (
        <>
            <main className="h-screen mb-5 bg-light-1 dark:bg-dark-6">
                {children}
            </main>
            <BottomNav navItems={navItems} />
        </>
    );
};

export default PhoneLayout;

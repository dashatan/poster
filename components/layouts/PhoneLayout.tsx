import BottomNav from "../organisms/footers/BottomNav";

const PhoneLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <>
            <main className="h-screen mb-5 bg-light-2 dark:bg-dark-5">{children}</main>
            <BottomNav />
        </>
    );
};

export default PhoneLayout;

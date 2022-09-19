import MobileHeader from "../organisms/MobileHeader";

export interface HomeProps {
    searchBoxPlaceholder: string
}

const Home = (props: HomeProps) => {
    return (
        <div className="container">
            <MobileHeader/>
        </div>
    );
};

export default Home;
import setDarkMode from "../../app/funcs/setDarkMode";
import Button from "../../components/atoms/buttuns/Button";

const Profile = () => {
    const handleDarkMode = () => {
        const darkMode = localStorage.getItem("dark_mode");
        if (darkMode !== null) setDarkMode(darkMode === "on" ? "off" : "on");
    };
    return (
        <div>
            <h1>Profile</h1>
            <Button className="w-40" onClick={handleDarkMode}>
                dark mode
            </Button>
        </div>
    );
};

export default Profile;
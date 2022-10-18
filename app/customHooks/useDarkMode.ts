export default function useDarkMode(val: string) {
    if (val === "on") document.documentElement.classList.add("dark");
    if (val === "off") document.documentElement.classList.remove("dark");
    window.localStorage.setItem("dark_mode", val);
}

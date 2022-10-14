import provinces from "../../app/static/iran/provinces.json";
import cities from "../../app/static/iran/cities.json";
import { useRouter } from "next/router";
import Error from "next/error";
import BottomNav from "../../components/organisms/footers/BottomNav";
import SelectiveList, {
    ListItem,
} from "../../components/templates/phone/SelectiveList";

export default function Province() {
    const router = useRouter();
    const { province } = router.query;

    function handleClick(item: ListItem) {
        router.push("/");
    }
    const currentProvince = provinces.find((x) => x.slug === province);
    if (!currentProvince) {
        return (
            <>
                <Error statusCode={404} />
                <BottomNav />
            </>
        );
    }

    const currentCities = cities.filter(
        (x) => x.province_id === currentProvince.id
    );

    return (
        <SelectiveList
            heading={currentProvince.title_en}
            listItems={currentCities}
            titleVariableName="slug"
            onItemClick={handleClick}
        />
    );
}

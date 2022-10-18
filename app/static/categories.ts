import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    DevicePhoneMobileIcon,
    TruckIcon,
    UserGroupIcon,
    WrenchIcon,
} from "@heroicons/react/24/outline";
import { ListItem } from "../../components/templates/phone/SelectiveList";
export const categories: ListItem[] = [
    {
        title: "estate",
        Icon: BuildingOfficeIcon,
        subset: [
            {
                title: "sell-residential",
                subset: [
                    { title: "sell-apartment" },
                    { title: "sell-house-and-villa" },
                    { title: "sell-land-and-destructible" },
                ],
            },
            {
                title: "rent-residential",
                subset: [
                    { title: "rent-apartment" },
                    { title: "rent-house-and-villa" },
                ],
            },
            {
                title: "sell-official-and-commercial",
                subset: [
                    { title: "sell-office" },
                    { title: "sell-shop" },
                    { title: "sell-industrial-and-agriculture" },
                ],
            },
            {
                title: "rent-official-and-commercial",
                subset: [
                    { title: "rent-office" },
                    { title: "rent-shop" },
                    { title: "rent-industrial-and-agriculture" },
                ],
            },
        ],
    },
    {
        title: "transportation",
        Icon: TruckIcon,
        subset: [
            {
                title: "cars",
                subset: [
                    { title: "sedan" },
                    { title: "classic" },
                    { title: "rental" },
                    { title: "heavy" },
                ],
            },
            { title: "cars-parts" },
            { title: "motorcycles-and-parts" },
            { title: "boats-and-parts" },
        ],
    },
    {
        title: "commodity",
        Icon: DevicePhoneMobileIcon,
        subset: [
            {
                title: "digital",
                Icon: DevicePhoneMobileIcon,
                subset: [
                    {
                        title: "phone-and-tablet",
                        subset: [
                            { title: "phone" },
                            { title: "tablet" },
                            { title: "phone-and-tablet-parts" },
                            { title: "sim-card" },
                        ],
                    },
                    {
                        title: "computer",
                        subset: [
                            { title: "laptop" },
                            { title: "pc" },
                            { title: "computer-parts" },
                            { title: "modem-and-network" },
                            { title: "printer-scanner-copy-fax" },
                        ],
                    },
                    { title: "games-console" },
                    {
                        title: "video-and-audio",
                        subset: [
                            { title: "movie-and-music" },
                            { title: "camera" },
                            { title: "portable-player" },
                            { title: "home-audio-system" },
                            { title: "video-and-dvd-player" },
                            { title: "tv-and-projector" },
                            { title: "security-camera" },
                        ],
                    },
                    { title: "desk-phone" },
                ],
            },
            { title: "personal" },
            { title: "home-and-kitchen" },
        ],
    },
    {
        title: "services",
        Icon: WrenchIcon,
        subset: [
            { title: "cars-and-motorcycle-fix" },
            { title: "ceremonies" },
            { title: "computer-and-phone-services" },
            { title: "financial-accounting-insurance" },
            { title: "transportation" },
            { title: "skills" },
            { title: "barber-and-beauty" },
            { title: "entertainment" },
            { title: "cleaning" },
            { title: "gardening" },
            { title: "education" },
        ],
    },
    {
        title: "social",
        Icon: UserGroupIcon,
        subset: [
            { title: "events" },
            { title: "voluntary" },
            { title: "lost" },
        ],
    },
    {
        title: "hiring",
        Icon: BriefcaseIcon,
        subset: [
            { title: "office-and-management" },
            { title: "janitor" },
            { title: "architecture" },
            { title: "restaurants" },
            { title: "tech-and-computer" },
            { title: "financial" },
            { title: "marketing" },
            { title: "industrial" },
            { title: "education" },
            { title: "transportation" },
            { title: "medical-beauty-and-sanitary" },
            { title: "art-and-media" },
        ],
    },
];

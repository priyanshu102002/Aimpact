import { UserButton } from "@clerk/nextjs";
import MobileSidebarMenu from "./MobileSidebarMenu";

const Navbar = () => {
    return (
        <div className="flex items-center p-4 bg-red-200">
            <MobileSidebarMenu />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};

export default Navbar;

// lucide-react is a library of simply designed SVG icons. Automatically installed with shadcn.

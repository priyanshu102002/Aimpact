import { UserButton} from "@clerk/nextjs"
const DashboardPage = () => {
    return <p>Dashboard page (protected) <UserButton afterSignOutUrl="/" /></p>;
};

export default DashboardPage;

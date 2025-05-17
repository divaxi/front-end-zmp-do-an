import Banners from "./banners";
import CategoryMenu from "@/components/category-menu";
import DoctorList from "./doctors";

const HomePage: React.FunctionComponent = () => {
  return (
    <div className="min-h-full bg-section bg-background">
      <div className="bg-background pt-2">
        {/* <SearchBar onClick={() => navigate("/search")} /> */}
        <Banners />
      </div>

      <div className="bg-background space-y-2 rounded-lg">
        <CategoryMenu />
      </div>
      <div className="pt-2">
        <DoctorList />
      </div>
    </div>
  );
};

export default HomePage;

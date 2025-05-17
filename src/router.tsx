// import Layout from "@/components/layout";
// import CartPage from "@/pages/cart";
// import ProductListPage from "@/pages/catalog/product-list";
// import CategoryListPage from "@/pages/catalog/category-list";
// import ProductDetailPage from "@/pages/catalog/product-detail";
// import HomePage from "@/pages/home";
// import ProfilePage from "@/pages/profile";
// import SearchPage from "@/pages/search";
import { createBrowserRouter } from "react-router-dom";
import { getBasePath } from "@/utils/zma";
import LoadingTemplate from "./components/loading-template";

const router = createBrowserRouter(
  [
    {
      path: "*",
      element: <LoadingTemplate templateName="Default template" />,
      handle: {
        logo: true,
      },
    },
  ],
  { basename: getBasePath() }
);

export default router;

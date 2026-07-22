import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import Dashboard from "../page/home-page/Home";
import NotFound from "../components/not-found/NotFound";
import LoginPage from "../auth/LoginPage";
import NewSalePage from "../page/sale&billing/NewSalePage";
import SaleHistoryPage from "../page/sale&billing/SaleHistoryPage";
import SalesHoldPage from "../page/sale&billing/SalesHoldPage";
import AllProductsPage from "../page/product/AllProductPage";
import AddProductPage from "../page/product/AddProductPage";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      //   ===================================================Sales & Billing Route=========================================
      {
        path: "sales/new",
        element: <NewSalePage />,
      },
      {
        path: "sales/history",
        element: <SaleHistoryPage />,
      },
      {
        path: "sales/holds",
        element: <SalesHoldPage />,
      },
      //   ===================================================/Products Route=========================================
      {
        path: "products/all",
        element: <AllProductsPage />,
      },
      {
        path: "products/new",
        element: <AddProductPage />,
      },
      {
        path: "products/categories",
      },
      {
        path: "products/barcodes",
      },
      {
        path: "products/barcodes",
      },
      //   ===================================================/Stock Route=========================================
      {
        path: "stock",
      },
    ],
  },
]);

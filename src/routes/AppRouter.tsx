import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// ? layouts
const MainLayout = lazy(() => import("@layouts/index"));
// ? pages
const Home = lazy(() => import("@pages/Home"));
const Cart = lazy(() => import("@pages/Cart"));
const Products = lazy(() => import("@pages/Products"));
const Categories = lazy(() => import("@pages/Categories"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const WishList = lazy(() => import("@pages/WishList"));
const Profile = lazy(() => import("@pages/Profile"));
import Error from "@pages/Error";
import PageSuspense from "@components/feedback/Suspense/PageSuspense";
import IsNotAuth from "../components/auth/ProtectRoutes/IsNotAuth";
import IsAuth from "@components/auth/ProtectRoutes/IsAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: ( 
      <PageSuspense main={true}>
        {" "}
        <MainLayout />
      </PageSuspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspense>
            <Home />
          </PageSuspense>
        ),
      },
      {
        path: "/products/:prefix",
        element: (
          <PageSuspense>
            <Products />
          </PageSuspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              status: 400,
              statusText: "Invalid product prefix",
            });
          }
          return true;
        },
      },
      {
        path: "/categories",
        element: (
          <PageSuspense>
            <Categories />
          </PageSuspense>
        ),
      },
      {
        path: "/about-us",
        element: (
          <PageSuspense>
            <AboutUs />
          </PageSuspense>
        ),
      },
      {
        path: "/login",
        element: (
          <IsNotAuth>
            <PageSuspense>
              <Login />
            </PageSuspense>
          </IsNotAuth>
        ),
      },
      {
        path: "/register",
        element: (
          <IsNotAuth>
            <PageSuspense>
              <Register />
            </PageSuspense>
          </IsNotAuth>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageSuspense>
            <Cart />
          </PageSuspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <IsAuth>
            <PageSuspense>
              <WishList />
            </PageSuspense>
          </IsAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <IsAuth>
            <PageSuspense>
              <Profile />
            </PageSuspense>
          </IsAuth>
        ),
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

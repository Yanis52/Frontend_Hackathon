import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./pages";
import { commonRoutes } from "./routes/common";
// import { AthletesPage } from "./pages/Athletes";
import { AthleteDetails } from "./pages/Athletes/athleteDetails";
import { Dashboard } from "./pages/Dashboard";
import PredictionPage from "./pages/Prediction";

export default function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "host", 
          lazy: () => import("@/pages/host/index")
        },
        {
          path: "athletes",
          lazy: () => import("@/pages/Athletes/index")
          // element: <AthletesPage />,
        },
        {
          path: "athletes/athlete/:fullName",
          element: <AthleteDetails />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "/prediction",
          element: <PredictionPage />,
        },
      ]
    },
    ...commonRoutes,
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

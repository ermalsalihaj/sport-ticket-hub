import Home from "../../pages/Home/Home";
import CreateVenue from "../../pages/Venue/CreateVenue/CreateVenue";
import { RouteType } from "./route_type";

export const AppRoutes = [
    // Public Routes
    {
      type: RouteType.PUBLIC,
      path: "/",
      element: <Home />,
    },    
    {
      type: RouteType.PUBLIC,
      path: "/create-venue",
      element: <CreateVenue />,
    },
  ];
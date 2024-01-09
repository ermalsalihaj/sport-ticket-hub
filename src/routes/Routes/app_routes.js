import Home from "../../pages/Home/Home";
import CreateVenue from "../../pages/Venue/CreateVenue/CreateVenue";
import CreateEvent from "../../pages/Event/CreateEvent/CreateEvent";
import CreateShoppingCart from "../../pages/ShoppingCart/CreateShoppingCart/CreateShoppingCart";
import CreateTicket from "../../pages/Ticket/CreateTicket/CreateTicket";
import Login from "../../pages/Login/Login";

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
    path: "/login",
    element: <Login />,
  },
  {
    type: RouteType.PUBLIC,
    path: "/create-venue",
    element: <CreateVenue />,
  },
  {
    type: RouteType.PUBLIC,
    path: "/create-event",
    element: <CreateEvent />,
  },
  {
    type: RouteType.PUBLIC,
    path: "/create-ticket",
    element: <CreateTicket />,
  },

  
];

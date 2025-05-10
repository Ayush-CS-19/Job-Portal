import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Jobs } from "./components/Jobs";
import { Browse } from "./components/Browse";
import { Description } from "./components/Description";
import { Profile } from "./components/Profile";
import { CompanyCreate } from "./components/CompanyCreate";
import { Companies } from "./components/Companies";
import { CreateCompany } from "./components/CreateCompany";
import { AdminJobs } from "./components/AdminJobs";
import { PostJob } from "./components/PostJob";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AdminApplicants } from "./components/AdminApplicants";
import { AdminJobsEdit } from "./components/AdminJobsEdit";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <Description />,
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoutes>
        <Companies />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoutes>
        <CreateCompany />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoutes>
        <CompanyCreate />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoutes>
        <AdminJobs />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoutes>
        <PostJob />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/jobs/:id",
    element: (
      <ProtectedRoutes>
        <AdminApplicants />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/jobs/:id/edit",
    element: (
      <ProtectedRoutes>
        <AdminJobsEdit />
      </ProtectedRoutes>
    ),
  },
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default App;

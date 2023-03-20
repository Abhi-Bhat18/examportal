import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Exams from "./pages/Exams";
import ExamDetails from "./pages/ExamDetails";
import RegisterExam from "./pages/RegisterExam";
import About from "./pages/About";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <RegisterExam />,
      },
      {
        path: "/about",
        element: <About />,
      },
      { path: "/admin/exams", element: <Exams /> },
      {
        path: "/admin/exam/:id",
        element: <ExamDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "register", element: <Register /> },
  { path: "verify/:id", element: <VerifyEmail /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

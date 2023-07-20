import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myapps" element={<Navigate replace to={"/learn"} />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

function Home() {
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <p>All Courses</p>
      <Link className="btn btn-success" to={"/learn/courses"}>
        Courses
      </Link>{" "}
      <Link className="btn btn-primary" to={"/learn/bundles"}>
        Bundle
      </Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "NodeJs"];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Courses list</h1>
      <h4>Courses card</h4>
      <NavLink
        style={({ isActive }) => {
          return { backgroundColor: isActive ? "red" : "pink" };
        }}
        className="btn"
        to={`/learn/courses/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>{" "}
      <NavLink className="btn btn-secondary" to={"/learn/courses/tests"}>
        Tests
      </NavLink>
      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div>
      <h1>Bundles list</h1>
      <h4>Bundles card</h4>
    </div>
  );
}

function CourseId() {
  const navigate = useNavigate();
  const { courseid } = useParams();
  return (
    <div>
      <h1>URL Params Is : {courseid}</h1>
      <button
        onClick={() => {
          navigate("/dashboard", { state: "399" });
        }}
        className="btn btn-warning"
      >
        Price
      </button>
      <Link to={"/dashboard"} state={"DJANGO"} className="btn btn-info">
        Test Link
      </Link>
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>Info that I got here Is {location.state}</h1>
    </div>
  );
}

reportWebVitals();

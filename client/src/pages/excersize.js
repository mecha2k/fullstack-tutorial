import React from "react";
import MenuItem from "../components/menu-item";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CartIcon } from "../assets/icons/cart.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";
import LogoutButton from "../containers/logout-button";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "@emotion/styled";
import { colors, unit } from "../styles";

const Container = styled("footer")({
  flexShrink: 0,
  marginTop: "auto",
  backgroundColor: "white",
  color: colors.textSecondary,
  position: "sticky",
  bottom: 0
});

const InnerContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  maxWidth: 400,
  padding: unit * 2.5,
  margin: "0 auto"
});

class Excersize extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Container>
            <InnerContainer>
              <MenuItem to="/">
                <HomeIcon />
                Home
              </MenuItem>
              <MenuItem to="/cart">
                <CartIcon />
                Cart
              </MenuItem>
              <MenuItem to="/profile">
                <ProfileIcon />
                Profile
              </MenuItem>
              <LogoutButton />
            </InnerContainer>
          </Container>
        </div>
      </Router>
    );
  }
}

export default Excersize;

//
// import React from "react";
// import { Router, Link } from "@reach/router";
//
// let Home = () => <div>Home</div>;
// let Dash = () => <div>Dash</div>;
//
// class Excersize extends React.Component {
//   render() {
//     return (
//       <div>
//         <Router>
//           <Home path="/" />
//           <Dash path="dashboard" />
//         </Router>
//       </div>
//     );
//   }
// }

// const Excersize = ({ children }) => (
//   <div>
//     <Router>
//       <Home path="/" />
//       <Dash path="dashboard" />
//     </Router>
//   </div>
// );

// import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//
// export default function Excersize() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>
//
//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }
//
// function Home() {
//   return <h2>Home</h2>;
// }
//
// function About() {
//   return <h2>About</h2>;
// }
//
// function Users() {
//   return <h2>Users</h2>;
// }

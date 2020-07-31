import React, { useState, useEffect } from "react";

import CustomNavbar from "./theme/Navbars/CustomNavbar.jsx";
import SplashScreen from "../components/theme/IndexSections/SplashScreen.jsx";
import { useHistory } from "react-router-dom";

const Index = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const fetchClaims = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            claims {
              _id  
            }
          }
        `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const claims = resData.data.claims;

        if (claims && claims.length > 0) {
          history.push({
            pathname: "/mis-publicaciones",
            // state: { props: neededProps },
          });
        } else {
          history.push({
            pathname: "/objetos-publicados",
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (props.token) {
      fetchClaims();
    }
  }, []);

  return (
    <>
      <CustomNavbar />
      <SplashScreen />
    </>
  );
};

export default Index;

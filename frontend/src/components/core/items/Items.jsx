/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useContext } from "react";

import Download from "../../theme/IndexSections/Download";
import CardsFooter from "../../theme/Footers/CardsFooter";
import Spinner from "../../theme/Spinner/Spinner";
import CustomNavbar from "../../theme/Navbars/CustomNavbar";
import CardItem from "./cards/CardItem";
import AuthContext from "../../../common/providers/AuthProvider/auth-context";

import { Container, Row, Col } from "reactstrap";

const Items = () => {
  const [items, setItems] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AuthContext);

  const itemsCards = items.items.map((item) => {
    return (
      <CardItem
        key={item._id}
        id={item._id}
        description={item.description}
        type={item.type}
        category={item.category}
        date={item.date}
        location={item.location}
        creatorId={item.creator._id}
        authUserId={context.userId}
        ownerQuestion={item.ownerQuestion ? item.ownerQuestion : null}
      ></CardItem>
    );
  });

  const fetchItems = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            items {
              _id
              category
              description
              type
              date
              location
              ownerQuestion
              creator {
                _id
                email
              }
            }
          }
        `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const items = resData.data.items;
        setItems({ items: items });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItems();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <>
      <CustomNavbar />
      <main>
        <div className="position-relative">
          <section className="section section-sm, section-shaped">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="12">
                    <h1 className="display-3 text-white">
                      Acá se encuentran todos los objetos perdidos y encontrados
                      que fueron publicados
                    </h1>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>

        <Container>
          <Row className="justify-content-center" style={{ marginTop: "2rem" }}>
            <Col lg="12">
              {isLoading ? (
                <Spinner />
              ) : (
                <Row className="row-grid">{itemsCards}</Row>
              )}
            </Col>
          </Row>
        </Container>
        <Download />
      </main>
      <CardsFooter />
    </>
  );
};

export default Items;

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
import React, { useState, useEffect } from "react";
import Download from "../IndexSections/Download";
import CardsFooter from "../../components/Footers/CardsFooter";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Button,
  CardBody
} from "reactstrap";
// core components

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardItem from "./cards/CardItem";

const Items = () => {
  const [items, setItems] = useState({ items: [] });

  const itemsCards = items.items.map(item => {
    console.log("TCL: Items -> item ", item);
    return (
      <CardItem
        key={item._id}
        description={item.description}
        type={item.type}
        category={item.category}
        date={item.date}
        location={item.location}
      ></CardItem>
    );
  });

  const fetchItems = () => {
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
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const items = resData.data.items;
        setItems({ items: items });
        console.log("Items: ", items);
      })
      .catch(err => {
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
      <DemoNavbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
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
        {/* Page content */}

        <Container>
          <Row className="justify-content-center" style={{ marginTop: "2rem" }}>
            <Col lg="12">
              <Row className="row-grid">{itemsCards}</Row>
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

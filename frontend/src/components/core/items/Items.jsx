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

import Spinner from "../../theme/Spinner/Spinner";
import CustomNavbar from "../../theme/Navbars/CustomNavbar";
import CardItem from "./cards/CardItem";
import AuthContext from "../../../common/providers/AuthProvider/auth-context";
import SimpleFooter from "../../theme/Footers/SimpleFooter";

import { Container, Row, Col } from "reactstrap";
import confirm from "reactstrap-confirm";
import CategoryFilter from "./filters/CategoryFilter";

const Items = () => {
  const [items, setItems] = useState({ items: [] });
  const [allItems, setAllItems] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    fetchItems();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [setItems]);

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
              itemCreatorQuestion
              creator {
                _id
                email
              }
              createdAt
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
        setAllItems({ items: items });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const deleteItemHandler = async (itemId) => {
    let result = await confirm({
      title: <span className="text-danger font-weight-bold">¡Atención!</span>,
      message: "Estás a punto de eliminar tu publicación",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      confirmColor: "danger",
      cancelColor: "default",
    });

    const requestBody = {
      query: `
         mutation DeleteItem($itemId: ID!, $notificationDescription: String!) {
            deleteItem(itemId: $itemId, notificationDescription: $notificationDescription)
          }
        `,
      variables: {
        itemId: itemId,
        notificationDescription:
          "Lo sentimos, el otro usuario eliminó la publicación:",
      },
    };

    if (result) {
      setIsLoading(true);
      fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
          }
          return res.json();
        })
        .then((resData) => {
          const updatedValues = items.items.filter(
            (item) => item._id !== itemId
          );
          setItems({ items: updatedValues });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

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
        token={context.token}
        itemCreatorQuestion={
          item.itemCreatorQuestion ? item.itemCreatorQuestion : null
        }
        onDelete={deleteItemHandler}
        createdAt={item.createdAt}
      ></CardItem>
    );
  });

  const showContent = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (items && items.items.length > 0) {
      return <Row className="row-grid">{itemsCards}</Row>;
    } else {
      return (
        <div className="text-center mt-5">
          <h3>Todavía no se publicó ningún objeto</h3>
        </div>
      );
    }
  };

  const filterItemsHandler = (filteredItems) => {
    setItems({ items: filteredItems });
  };

  return (
    <>
      <CustomNavbar />
      <main>
        <div className="position-relative">
          <section
            className="section section-sm, section-shaped"
            style={{ paddingBottom: "0rem" }}
          >
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
            <Container className="py-sm-sm d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="12">
                    <h1 className="display-3 text-white">
                      Mirá todos los objetos perdidos y encontrados que fueron
                      publicados
                    </h1>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>

        <Container>
          <Row
            className="justify-content-center"
            style={{ marginTop: "2rem", marginBottom: "21rem" }}
          >
            <Col lg="12">
              <CategoryFilter
                onFilter={filterItemsHandler}
                allItems={allItems.items}
              />
              {showContent()}
            </Col>
          </Row>
        </Container>
      </main>
      <SimpleFooter page={"objetos-publicados"} />
    </>
  );
};

export default Items;

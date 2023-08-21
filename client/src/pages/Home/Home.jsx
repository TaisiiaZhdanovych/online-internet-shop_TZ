import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Box, Typography, Button } from "@mui/material";
import Card from "../../components/Card/Card";
import Carousel from "react-material-ui-carousel";
import { useStyles, theme } from "./HomeStyles";
import { useEffect } from "react";
import { getProducts } from "../../data/fetchProducts";
import { Link } from "react-router-dom";
import {
  container0,
  container1,
  container2,
  container3,
  container4,
  carousel,
  btn,
  name,
  price,
  latest,
  btnAll,
  carouselIcon,
  carouselItem1,
  carouselItem2,
  carouselItem3,
  carouselItem4,
  carouselItem5,
} from "./HomeStyles";
import { setProducts } from "../../features/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const styles = useStyles();
  const products = useSelector((store) => store.shop.products);
  const dispatch = useDispatch();
  const output = out();

  useEffect(() => {
    getProducts().then((data) => {
      dispatch(setProducts(data));
    });
  }, [dispatch]);

  function out() {
    if (products) {
      let prodQuantity = 0;
      return products.map((card) => {
        prodQuantity++;
        // Last 6 products from DataBase..
        if (products.length - prodQuantity < 6) {
          return (
            <Card
              key={card._id}
              product={card}
              _id={card._id}
              enabled={card.enabled}
              imageUrls={card.imageUrls}
              quantity={card.quantity}
              name={card.name}
              currentPrice={card.currentPrice}
              categories={card.categories}
              productMaterial={card.productMaterial}
              brand={card.brand}
              itemNo={card.itemNo}
              date={card.date}
              country={card.manufacturerCountry}
              previousPrice={card.previousPrice}
            />
          );
        } else {
          return null;
        }
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={container0}>
        <Container sx={container1}>
          <Container sx={container2}>
            <Carousel
              autoPlay={false}
              sx={carousel}
              IndicatorIcon={<Box sx={carouselIcon} />}
              indicatorContainerProps={{
                style: {
                  zIndex: "10",
                  position: "absolute",
                  top: "70%",
                },
              }}
              activeIndicatorIconButtonProps={{
                sx: {
                  width: "18px",
                  height: "18px",
                  backgroundColor: "transparent",
                  color: "transparent",
                  border: "1px solid white",
                  "@media (max-width: 768.9px)": {
                    width: "10px",
                    height: "10px",
                  },
                },
              }}
            >
              <Box sx={carouselItem1} />
              <Box sx={carouselItem2} />
              <Box sx={carouselItem3} />
              <Box sx={carouselItem4} />
              <Box sx={carouselItem5} />
            </Carousel>
          </Container>
          <Button variant="outlined" sx={btn}>
            View Product
          </Button>
          <Typography sx={name}>Gold big hoops</Typography>
          <Typography sx={price}>$ 68,00</Typography>
        </Container>
        <Container sx={container3}>
          <Typography sx={latest}>Shop The Latest</Typography>
          <Link className={styles.link} to="/Shop">
            <Button variant="text" sx={btnAll}>
              View All
            </Button>
          </Link>
        </Container>
        <Container sx={container4}>{output}</Container>
      </Container>
    </ThemeProvider>
  );
}
export default Home;
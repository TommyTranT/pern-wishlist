import { useState } from "react";
import "./App.css";

// components
import AddWishlist from "./components/AddWishlist";
import ShowWishlist from "./components/ShowWishlist";
import AddItem from "./components/AddItem";
import ShowItems from "./components/ShowItems";
import Homepage from "./components/Homepage";
import axios from "axios";

// material ui
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { CssBaseline } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function App() {
  const [wishlists, setWishlists] = useState([]); // Displays all wishlist
  const [showWishlists, setShowWishlists] = useState([]); // Displays items based on wishlist selected
  const [wishlistID, setWishlistID] = useState(""); // wishlistID === the selected wishlist ID
  const [wishlistName, setWishlistName] = useState(""); // wishlistID === the selected wishlist ID
  const [wishlistDescription, setWishlistDescription] = useState("");

  // material ui
  const theme = useTheme();
  const [open, setOpen] = useState(false); // state for opening side bar

  const drawerWidth = 290;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // sort by price low-high
  const sortPriceLowest = () => {
    const id = wishlistID;
    axios
      .get(`${process.env.REACT_APP_BROWSER}items/show/sort/price-lowest/${id}`)
      .then((res) => {
        console.log(res.data);
        setShowWishlists(res.data);
      });
  };

  // sort by price high-low
  const sortPriceHighest = () => {
    const id = wishlistID;
    axios
      .get(
        `${process.env.REACT_APP_BROWSER}items/show/sort/price-highest/${id}`
      )
      .then((res) => {
        console.log(res.data);
        setShowWishlists(res.data);
      });
  };

  // sort by oldest
  const sortOldest = () => {
    const id = wishlistID;
    axios
      .get(`${process.env.REACT_APP_BROWSER}items/show/${id}`)
      .then((res) => {
        console.log(res.data);
        setShowWishlists(res.data);
      });
  };

  // sort by newest
  const sortNewest = () => {
    const id = wishlistID;
    axios
      .get(`${process.env.REACT_APP_BROWSER}items/show/sort/newest/${id}`)
      .then((res) => {
        console.log(res.data);
        setShowWishlists(res.data);
      });
  };

  return (
    <div style={{ backgroundColor: "#d6e4ff", fontFamily: "Questrial" }}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" noWrap component="div">
              Gift Me 🎁
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#c2d6ff",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            {/* Add a new wishlist Form */}
            <AddWishlist wishlists={wishlists} setWishlists={setWishlists} />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {/* Display all wishlist */}
            <ShowWishlist
              wishlists={wishlists}
              setWishlists={setWishlists}
              setShowWishlists={setShowWishlists}
              setWishlistID={setWishlistID}
              setWishlistName={setWishlistName}
              setWishlistDescription={setWishlistDescription}
            />
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <h1
            style={{
              textAlign: "center",
              fontSize: "50px",
              marginBottom: "7px",
            }}
          >
            {wishlistName}
          </h1>
          <p
            style={{
              textAlign: "center",
              fontSize: "25px",
              fontStyle: "italic",
              marginTop: "0px",
            }}
          >
            {wishlistDescription}
          </p>

          <div>
            {/* If wishlistID is truthy, render add item button, else render homepage */}
            {wishlistID ? (
              <div>
                <AddItem
                  wishlistID={wishlistID}
                  showWishlists={showWishlists}
                  setShowWishlists={setShowWishlists}
                />

                {/* Display all items for each wishlist */}
                <ShowItems
                  showWishlists={showWishlists}
                  setShowWishlists={setShowWishlists}
                  wishlists={wishlists}
                  wishlistID={wishlistID}
                  wishlistName={wishlistName}
                  sortPriceLowest={sortPriceLowest}
                  sortPriceHighest={sortPriceHighest}
                  sortNewest={sortNewest}
                  sortOldest={sortOldest}
                  DrawerHeader={DrawerHeader}
                  theme={theme}
                />
              </div>
            ) : (
              <div
                id="homepage"
                style={{ marginLeft: "10%", marginRight: "10%" }}
              >
                <Homepage setOpen={setOpen} />
              </div>
            )}
          </div>
        </Main>
      </Box>
    </div>
  );
}

export default App;

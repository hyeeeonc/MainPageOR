import Header from "../../components/common/Header";

const HeaderContainer = () => {
  const name = localStorage.getItem("Name");
  if (!name) {
    return <Header />;
  } else {
    return <Header user={name} />;
  }
};

export default HeaderContainer;

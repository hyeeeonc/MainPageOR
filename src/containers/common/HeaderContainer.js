import Header from "../../components/common/Header";

const HeaderContainer = () => {
  const name = localStorage.getItem("Name");
  console.log(name);
  if (!name) {
    return <Header />;
  } else {
    return <Header user={name} />;
  }
};

export default HeaderContainer;

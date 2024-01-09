import React, { useState, useEffect } from "react";

const PokemonsPagination = ({
  totalPokemons,
  pokemonsPerPage,
  setCurrentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pages.push(i);
  }
  const [currentButton, setCurrentButton] = useState(1);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  let dotsInitial = "...";
  let dotsLeft = "... ";
  let dotsRight = " ...";

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];
    if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, 5, dotsRight];
    } else if (currentButton == 4) {
      const sliced = pages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, pages.length];
    } else if (currentButton > 4 && currentButton < pages.length - 2) {
      const sliced1 = pages.slice(currentButton - 2, currentButton);
      const sliced2 = pages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        pages.length,
      ];
    } else if (currentButton > pages.length - 3) {
      const sliced = pages.slice(pages.length - 4);
      tempNumberOfPages = [1, dotsInitial, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
      setCurrentPage(arrOfCurrButtons[3] - 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
      setCurrentPage(arrOfCurrButtons[3] - 2);
    }

    localStorage.setItem("currentButton", currentButton);
    setArrOfCurrButtons(tempNumberOfPages);
  }, [currentButton]);

  return (
    <footer>
      {arrOfCurrButtons.map((page, index) => (
        <a
          href="#header"
          className={currentButton === page ? "active" : ""}
          key={index}
          onClick={() => {
            setCurrentButton(page);
            setCurrentPage(page);
          }}
        >
          <span>{page}</span>
        </a>
      ))}
    </footer>
  );
};

export default PokemonsPagination;

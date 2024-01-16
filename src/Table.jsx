import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  const visiblePages = () => {
    const visible = [];
    const maxPagesToShow = 5;

    if (currentPage <= maxPagesToShow) {
      return pageNumbers.slice(0, maxPagesToShow);
    }

    if (currentPage > totalPages - maxPagesToShow + 1) {
      return pageNumbers.slice(totalPages - maxPagesToShow);
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      visible.push(i);
    }

    return visible;
  };

  return (
    <div className="flex justify-end space-x-2 mt-4">
      <button
        className={`border px-3 py-1 ${currentPage === 1 ? 'bg-gray-200' : ''}`}
        onClick={() => onPageChange(1)}
      >
        {'<'}
      </button>
      {visiblePages().map((number, index) => (
        <button
          key={index}
          className={`border px-3 py-1 ${currentPage === number ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={`border px-3 py-1 ${currentPage === totalPages ? 'bg-gray-200' : ''}`}
        onClick={() => onPageChange(totalPages)}
      >
        {'>'}
      </button>
    </div>
  );
};


const Table = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const recordsPerPage = 10;




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const totalPages = Math.ceil(cryptoData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = cryptoData.slice(indexOfFirstRecord, indexOfLastRecord);

  const toggleFavorite = (id) => {
    const isFavorite = favorites.some((fav) => fav.id === id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== id);
      setFavorites(updatedFavorites);
    } else {
      const cryptoItem = cryptoData.find((item) => item.id === id);
      if (cryptoItem) {
        setFavorites([...favorites, cryptoItem]);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 
  return (
    <>
      <div className="flex flex-col  border border-gray-100 rounded overflow-x-auto">
        <table className="w-full table-auto ">
          <thead
            className="capitalize text-base text-gray-100 
            font-medium border-b border-gray-100
            "
          >
            <tr className="text-black">
              <th className="py-1"></th>
              <th className="py-1">#</th>
              <th className="py-1">NAME</th>
              <th className="py-1">PRICE</th>
              <th className="py-1">24H</th>
              <th className="py-1 lg:table-cell hidden">7D</th>
              <th className="py-1 lg:table-cell hidden">MARKET CAP</th>
              <th className="py-1 lg:table-cell hidden">VOLUME(24H)</th>
              <th className="py-1 lg:table-cell hidden">CIRCULATING SUPPLY</th>

            </tr>
          </thead>
          <tbody>
            {currentRecords.map((data) => {
              return (

                <tr
                  key={data.id}
                  className="text-center text-base border-b border-gray-100 
            hover:bg-gray-200 last:border-b-0
            "
                >

                  <td className="py-4">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{
                        fontSize: '20px',
                        padding: '0 2px',
                        color: favorites.some((fav) => fav.id === data.id) ? 'gold' : '#ccc',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleFavorite(data.id)}
                    />
                  </td>
                  <td className="py-4">{data.market_cap_rank}</td>
                  <td className="py-4 flex mx-auto mt-3 md:mt-0">

                    <img
                      className="w-[1.2rem] h-[1.2rem] mx-1.5"
                      src={data.image}
                      alt={data.name}
                    />
                    <span >
                      <Link to={`/${data.id}`} className="cursor-pointer">
                        {data.name}
                      </Link>
                      <Link to={`/${data.id}`} className="text-gray-400 ml-1 cursor-pointer uppercase">
                        {data.symbol}
                      </Link>
                    </span>
                  </td>
                  <td className="py-4">
                    {new Intl.NumberFormat("en-IN", {
                      //style: "currency",
                      //currency: currency,
                    }).format(data.current_price)}
                  </td>
                  <td className="text-red-500 py-4 N_price">
                    <FontAwesomeIcon icon={faCaretDown} style={{ fontSize: '20px', padding: '0 2px' }} />
                    {Number(
                      data.price_change_percentage_24h_in_currency
                    ).toFixed(2)}
                    %</td>
                  <td
                    className="text-green-500 py-4 N_price lg:table-cell hidden"
                  >
                    <FontAwesomeIcon icon={faCaretUp} style={{ fontSize: '20px', padding: '0 2px' }} />
                    {Number(
                      data.price_change_percentage_7d_in_currency
                    ).toFixed(2)}
                    %</td>
                  <td className="py-4 lg:table-cell hidden">{data.market_cap}</td>
                  <td className="py-4 lg:table-cell hidden">{data.total_volume}</td>
                  <td className="py-4 lg:table-cell hidden">{data.circulating_supply}</td>

                </tr>

              );
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>

  );
};

export default Table;

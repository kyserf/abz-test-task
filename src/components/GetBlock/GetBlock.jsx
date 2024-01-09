import { useState, useEffect } from 'react';
import { getUsers } from '../../api';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import photocover from '../../../public/images/photocover.svg';

export const GetBlock = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const usersData = await getUsers(page);
      setUsers((prevUsers) => [...prevUsers, ...usersData]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers(1);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  function checkUrl(url) {
    const regex = /\/images\/placeholders\//;
    return !regex.test(url);
  }

  return (
    <section className="getBlock" id='users'>
      <h2 className="getBlock__title">Working with GET request</h2>

      <div className="getBlock__cardList">
      {isLoading === "true" ? (
        <Loader />
      ) : (
        users.map((user) => (
          <div key={user.id + Math.random()} className="getBlock__card">
            <img 
              src={checkUrl(user.photo) ? user.photo : photocover} 
              alt={user.name}
              className="getBlock__card-userImage"
            />
            <p className="getBlock__card-userName getBlock__card-info">{user.name}</p>
            <p className="getBlock__card-userPosition getBlock__card-info">{user.position}</p>
            <p className="getBlock__card-userEmail getBlock__card-info">{user.email}</p>
            <p className="getBlock__card-userPhone getBlock__card-info">{user.phone}</p>
          </div>
        ))
      )}
      </div>

      <Button text={"Show more"} type={""} onClick={handleShowMore} />
    </section>
  );
};

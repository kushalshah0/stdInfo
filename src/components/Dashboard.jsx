import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      const headers = {
        'Content-Type': 'application/json'
      };
      try {
        const response = await axios.get(`https://stdapi.onrender.com/users`, { headers });
        setData(response.data);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleSearch = async (e) => {
      e.preventDefault();
      setLoading(false);
      const response = await axios.get(`https://stdapi.onrender.com/users?q=${search}`);
      setData(response.data);
      setLoading(true);
      setCurrentPage(1);
    }
  
    const handleReset = () => {
      setLoading(false);
      fetchData();
      setCurrentPage(1);
      setSearch("");
    }
  
    const changePage = (factor) => {
      let newPage = currentPage + factor;
      if (newPage < 1) {
        newPage = 1;
      } else if (newPage > totalPages) {
        newPage = totalPages;
      }
      setCurrentPage(newPage);
    }
  
    return (
      <>
        <div>
          <h1 className='text-center'>Student's Info</h1>
          <form className="my-2 d-flex" role="search">
            <input onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Search" aria-label="Search" value={search} />
            <button className="btn btn-outline-success mx-2" type="submit" onClick={handleSearch}>Search</button>
            <button className="btn btn-outline-danger" type="button" onClick={handleReset}>Reset</button>
          </form>

          { loading ? (
            <>
           <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">Roll No</th>
                <th scope="col">Name</th>
                <th scope="col">Ph No</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.RollNo}>
                  <td><img src={item.Image ? item.Image : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} className='stdImg' /></td>
                  <td>{item.RollNo}</td>
                  <td>{item.Name}</td>
                  <td>{item['Mobile No']}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
    ) : ( <div class="spinner-border my-3" role="status">
      <span class="sr-only"></span>
    </div> )}
          <div className="pagination">
            <button type="button" className="btn btn-primary me-3" onClick={() => changePage(-1)}>Prev</button>
            <div className="text-center mt-2">{currentPage}</div>
            <button type="button" className="btn btn-primary ms-3" onClick={() => changePage(1)}>Next</button>
          </div>
        </div>
      </>
    )
}

export default Dashboard;

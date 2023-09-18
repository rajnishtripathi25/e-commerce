import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Products = () => {

    const [products, setproducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        let result = await fetch("http://localhost:5001/products");
        result = await result.json()
        setproducts(result)
    }


    const UpdateItem = (item) => {
        navigate('/update', { state: item })
    }
    const deleteItem = async (id) => {
        let result = await fetch(`http://localhost:5001/product/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        result = await result.json()
        if (result) {
            getProduct()
            alert("product deleted successfully")
        }


    }
    const SearchProduct = async (key) => {
        if (key) {
            try {
                let result = await fetch(`http://localhost:5001/search/${key}`, {
                    method: "GET"
                })
                result = await result.json()
                setproducts(result)
            }
            catch (e) {

            }
        }
        else {
            getProduct();
        }
    }
    return (
        <>
            <div className='product-box'>

                <h1 className='text-center'>Products</h1>
                <input
                    type="text"
                    placeholder='Search .....'
                    onChange={(e) => SearchProduct(e.target.value)}
                    className='my-3 w-100'

                />
                <table>
                    <thead className='Products heading'>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Operation</th>
                            <th>Updation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                return (
                                    <tr className='Products' key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.category}</td>
                                        <td>{item.company}</td>
                                        <td><button
                                            className='rounded-2'
                                            onClick={() => deleteItem(item._id)}
                                        >Delete</button></td>
                                        <td><button
                                            className='rounded-2'
                                            onClick={() => UpdateItem(item)}
                                        >Update</button></td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products
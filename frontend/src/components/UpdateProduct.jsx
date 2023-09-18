import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [productName, setname] = useState(location.state?.name)
    const [price, setPrice] = useState(location.state?.Price)
    const [category, setcategory] = useState(location.state?.category)
    const [company, setcompany] = useState(location.state?.company)


    const UpdateProduct = async () => {
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch(`http://localhost:5001/update/${location.state._id}`, {
            method: "PATCH",
            body: JSON.stringify({
                userID: userId,
                name: productName,
                Price: price,
                category: category,
                company: company,
            }),

            headers: {
                "content-type": "application/json"
            }
        })
        result = await result.json()
        if (result) {
            alert("Product added successfully")
            navigate('/')
        }

    }
    useEffect(() => {
        if (!location.state)
            navigate('/')
    })

    return (
        <>
            {
                location.state !== null ? <div className='mt-5 form bder'>

                    <h1 className='my-3'>Update Product</h1>
                    <div>
                        <input
                            type="text"
                            placeholder='Enter name of the product'
                            value={productName}
                            onChange={(e) => setname(e.target.value)}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter Price of the product'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}
                        />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter Company name'
                            value={company}
                            onChange={(e) => setcompany(e.target.value)}
                        />
                    </div>
                    <div>

                        <button
                            className='btn btn-outline-success'
                            onClick={UpdateProduct}
                        >Update Product</button>
                    </div>
                </div> : ""
            }

        </>
    )
}


export default UpdateProduct
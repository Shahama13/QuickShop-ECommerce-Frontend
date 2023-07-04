import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue, action, butn }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={action}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">{butn}</button>
            </form>
        </>
    )
}

export default CategoryForm
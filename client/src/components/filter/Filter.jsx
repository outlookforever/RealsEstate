import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './filter.scss'

function Filter() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [query, setQuery] = useState({
		type: searchParams.get('type') || '',
		city: searchParams.get('city') || '',
		property: searchParams.get('property,') || '',
		minPrice: searchParams.get('minPrice') || 0,
		maxPrice: searchParams.get('maxPrice') || 1000000,
		bedroom: searchParams.get('bedroom') || 1
	})

	const handelChange = e => {
		e.preventDefault()

		setQuery({ ...query, [e.target.name]: e.target.value })
	}

	const handelFilter = () => {
		setSearchParams(query)
	}

	return (
		<div className="filter">
			{query.city ? (
				<h1>
					Search results for <b>{searchParams.get('city')}</b>
				</h1>
			) : (
				<h1>Search anywhere</h1>
			)}
			<div className="top">
				<div className="item">
					<label htmlFor="city">Location</label>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="City Location"
						onChange={handelChange}
						defaultValue={query.city}
					/>
				</div>
			</div>
			<div className="bottom">
				<div className="item">
					<label htmlFor="type">Type</label>
					<select name="type" id="type" onChange={handelChange} defaultValue={query.type}>
						<option value="">any</option>
						<option value="buy">Buy</option>
						<option value="rent">Rent</option>
					</select>
				</div>
				<div className="item">
					<label htmlFor="property">Property</label>
					<select name="property" id="property" onChange={handelChange} defaultValue={query.property}>
						<option value="">any</option>
						<option value="apartment">Apartment</option>
						<option value="house">House</option>
						<option value="condo">Condo</option>
						<option value="land">Land</option>
					</select>
				</div>
				<div className="item">
					<label htmlFor="minPrice">Min Price</label>
					<input
						min={0}
						type="number"
						id="minPrice"
						name="minPrice"
						placeholder="any"
						onChange={handelChange}
						defaultValue={query.minPrice}
					/>
				</div>
				<div className="item">
					<label htmlFor="maxPrice">Max Price</label>
					<input
						max={1000000}
						type="text"
						id="maxPrice"
						name="maxPrice"
						placeholder="any"
						onChange={handelChange}
						defaultValue={query.maxPrice}
					/>
				</div>
				<div className="item">
					<label htmlFor="bedroom">Bedroom</label>
					<input
						type="text"
						id="bedroom"
						min={1}
						name="bedroom"
						placeholder="any"
						onChange={handelChange}
						defaultValue={query.bedroom}
					/>
				</div>
				<button onClick={handelFilter}>
					<img src="/search.png" alt="" />
				</button>
			</div>
		</div>
	)
}

export default Filter

import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./styles.css";

SearchInput.propTypes = {
    setValue: PropTypes.func.isRequired,
};

function SearchInput({ setValue }) {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;
        setText(val);
    };
    useEffect(() => {
        const query = setTimeout(() => {
          setValue(text)
        }, 300);
        return () => clearTimeout(query);
    }, [text]);
    return (
        <div className='wrap'>
            <div className='search'>
                <input
                    type='text'
                    className='searchTerm'
                    placeholder='Type content or title to find?'
                    onChange={handleChange}
                    value={text}
                />
                <button type='submit' className='searchButton'>
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M10.4058 0.0297308C4.66774 0.0297308 0 4.69747 0 10.4355C0 16.1736 4.66774 20.8413 10.4058 20.8413C12.1599 20.8413 13.8843 20.4251 15.3411 19.6224C15.4578 19.7628 15.5872 19.8922 15.7276 20.0089L18.7007 22.9819C18.9752 23.2908 19.31 23.5404 19.6844 23.7152C20.0589 23.8901 20.4651 23.9865 20.8782 23.9987C21.2913 24.0109 21.7025 23.9385 22.0866 23.7859C22.4707 23.6334 22.8196 23.404 23.1118 23.1118C23.404 22.8196 23.6334 22.4707 23.7859 22.0866C23.9384 21.7025 24.0108 21.2913 23.9987 20.8782C23.9865 20.4651 23.8901 20.0589 23.7152 19.6844C23.5404 19.31 23.2908 18.9752 22.9819 18.7007L20.0089 15.7276C19.864 15.5827 19.7046 15.4532 19.5332 15.3411C20.3359 13.8843 20.8413 12.1896 20.8413 10.4058C20.8413 4.66774 16.1736 0 10.4355 0L10.4058 0.0297308ZM10.4058 3.00282C14.5384 3.00282 17.8385 6.30294 17.8385 10.4355C17.8385 12.3978 17.125 14.2113 15.8763 15.5492C15.8465 15.579 15.8168 15.6087 15.7871 15.6384C15.6466 15.7551 15.5173 15.8845 15.4006 16.0249C14.0924 17.2142 12.3086 17.898 10.3761 17.898C6.24348 17.898 2.94335 14.5978 2.94335 10.4653C2.94335 6.33267 6.24348 3.03255 10.3761 3.03255L10.4058 3.00282Z'
                            fill='black'
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SearchInput;

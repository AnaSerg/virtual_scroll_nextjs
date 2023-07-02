import React, { useState, useEffect } from 'react';
import { postData } from "../api/postData";
import { FixedSizeGrid as Grid } from 'react-window';
import ProductCard from "../components/ProductCard";

const Index = () => {
    const [data, setData] = useState(null);
    const [innerWidth, setInnerWidth] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await postData();
            setData(result);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        if (typeof window !== 'undefined') {
            setInnerWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    if (data === null || innerWidth === null) {
        return null;
    }

    let numColumns = 3;
    if (innerWidth < 760) {
        numColumns = 1;
    }

    const columnWidth = Math.floor(innerWidth / numColumns);
    const rowHeight = columnWidth * 1.5;

    const numRows = Math.ceil(data.api_data.aProduct.length / numColumns);
    const gridWidth = numColumns * columnWidth + (numColumns - 1);

    const renderItem = ({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * numColumns + columnIndex;
        const product = data.api_data.aProduct[index];

        if (!product) {
            return null;
        }

        return (
            <div style={style}>
                <ProductCard
                    key={product.article}
                    name={product.name}
                    price={product.format_price[2]}
                    photo={product.photos[0].thumbs["768_1024"]}
                />
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid
                columnCount={numColumns}
                rowCount={numRows}
                columnWidth={columnWidth}
                rowHeight={rowHeight}
                width={gridWidth}
                height={typeof window !== 'undefined' ? window.innerHeight : 0}
                itemData={data.api_data.aProduct}
            >
                {renderItem}
            </Grid>
        </div>
    );
};

export default Index;


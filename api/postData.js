import axios from 'axios';

export const postData = async () => {
    try {
        const response = await axios.post('https://api.lichi.com/category/get_category_product_list', {
            category: 'clothes',
            lang: 1,
            shop: 1,
            limit: 12,
            page: 1
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
